"use server";

import { HTTPError } from "../../core/error/http-error";
import { apiHandler } from "../../core/network/fetch";
import { SignUpDtoSchema, signUpDtoSchema } from "./dto";

interface ServerActionStatus<ErrorBody = any> {
  success?: boolean;
  errors?: {
    message?: string;
    errorBody?: ErrorBody;
  };
  statusCode?: number;
}

type CreateFormFields = {
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

  // if (!result.success) {
  //   formState.errors = result.error.flatten().fieldErrors;
  //   return formState;
  // }

  try {
    const response = await apiHandler.post<SignUpDtoSchema>("/users", schema);

    formState.success = true;
    formState.errors = undefined;
  } catch (e) {
    console.error("Server action Error");
    if (e instanceof HTTPError) {
      console.error("HTTP Error");
      console.error(e.statusCode);
      console.error(e.message);

      formState.success = false;
      formState.errors = {
        message: e.message,
      };
      formState.statusCode = e.statusCode;
    } else {
      console.error("Unknown Error");
      throw e;
    }
  }
  return formState;
};
