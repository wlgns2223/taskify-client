"use server";

import { apiHandler } from "../../core/network/fetch";
import { SignUpDtoSchema, signUpDtoSchema } from "./dto";

interface CreateFormState {
  errors: {
    email?: string[];
    nickname?: string[];
    password?: string[];
    repassword?: string[];
  };
}

export const createUser = async (
  formState: CreateFormState,
  formData: FormData
): Promise<CreateFormState> => {
  console.log("createUser");

  const schema: SignUpDtoSchema = {
    email: formData.get("email") as string,
    nickname: formData.get("nickname") as string,
    password: formData.get("password") as string,
    repassword: formData.get("repassword") as string,
  };
  const result = signUpDtoSchema.safeParse(schema);

  if (!result.success) {
    formState.errors = result.error.flatten().fieldErrors;
    return formState;
  }

  try {
    const data = await apiHandler.post("/users", {
      body: JSON.stringify(schema),
    });
    console.log(data);
  } catch (e) {
    console.error(e);
  }
  return formState;
};
