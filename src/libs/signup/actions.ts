"use server";

import { redirect } from "next/navigation";
import { HTTPError } from "../../core/error/http-error";
import { END_POINT } from "../../core/network/end-point";
import { apiHandler } from "../../core/network/handlers/fetch/fetch";
import { ServerActionStatus } from "../../core/serverAction/createServerAction";
import { SignUpDtoSchema, signUpDtoSchema } from "./dto";
import { PATH } from "../../core/types/path";
import { STATUS_CODES } from "http";
import { StatusCodes } from "http-status-codes";

export type CreateFormFields = {
  email?: string[];
  nickname?: string[];
  password?: string[];
  repassword?: string[];
};

type CreateFormState = ServerActionStatus<CreateFormFields>;

export const createUser = async (
  formState: CreateFormState,
  formData: FormData
): Promise<CreateFormState> => {
  const schema: SignUpDtoSchema = {
    email: formData.get("email") as string,
    nickname: formData.get("nickname") as string,
    password: formData.get("password") as string,
    repassword: formData.get("repassword") as string,
  };
  const result = signUpDtoSchema.safeParse(schema);

  if (!result.success) {
    const errors: Partial<CreateFormFields> = {};
    for (const key in result.error.flatten().fieldErrors) {
      errors[key as keyof CreateFormFields] =
        result.error.flatten().fieldErrors[key as keyof CreateFormFields];
    }

    formState.success = false;
    formState.errors = {
      fieldMessage: errors,
    };

    return formState;
  }

  try {
    const response = await apiHandler.post<SignUpDtoSchema>(
      END_POINT.auth.signUp(),
      schema
    );

    formState.success = true;
    formState.errors = undefined;
    formState.statusCode = response.statusCode;
    if (!!formState.success && response.statusCode === StatusCodes.CREATED) {
      redirect(PATH.signIn());
    }
  } catch (e) {
    console.error("Server action Error");
    if (e instanceof HTTPError) {
      console.error("HTTP Error");
      console.error(e.statusCode);
      console.error(e.message);

      formState.success = false;
      formState.errors = {
        networkMessage: e.message,
      };
      formState.statusCode = e.statusCode;
    } else {
      console.error("Unknown Error");
      throw e;
    }
  }

  return formState;
};
