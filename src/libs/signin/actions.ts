import { HTTPError } from "../../core/error/http-error";
import { END_POINT } from "../../core/network/end-point";
import { apiHandler } from "../../core/network/fetch";
import { ServerActionStatus } from "../../core/serverAction/createServerAction";
import { signInDtoSchema, SignInDtoSchema } from "./dto";

export type SignInFormFields = {
  email?: string[];
  password?: string[];
};

type SignInFormState = ServerActionStatus<SignInFormFields>;

export const signIn = async (
  formState: SignInFormState,
  formData: FormData
) => {
  const schema: SignInDtoSchema = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const schemaParseResult = signInDtoSchema.safeParse(schema);
  if (!schemaParseResult.success) {
    formState.success = false;
    formState.errors = {
      fieldMessage: schemaParseResult.error.flatten().fieldErrors,
    };

    return formState;
  }

  try {
    const response = await apiHandler.post<SignInDtoSchema>(
      END_POINT.auth.signIn(),
      schema
    );
    console.log({ response });
    formState.success = true;
    formState.errors = undefined;
  } catch (e) {
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
      console.error("Server action Error");
      throw e;
    }
  }

  return formState;
};
