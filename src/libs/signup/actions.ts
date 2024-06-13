"use server";

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
    new Promise((resolve) => {
      setTimeout(() => {
        resolve("fetch");
      }, 2500);
    });
  } catch (e) {
    console.error(e);
  }
  return formState;
};
