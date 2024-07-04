// import { z } from "zod";
// import { HTTPError } from "../error/http-error";

export interface ServerActionStatus<ErrorBody = any> {
  success?: boolean;
  errors?: {
    networkMessage?: string;
    fieldMessage?: ErrorBody;
  };
  statusCode?: number;
}

// const createServerAction =
//   (keys: string[], schema: z.ZodType, apiCallback: () => Promise<any>) =>
//   async <T extends { [key: string]: any } = {}>(
//     formState: ServerActionStatus<T>,
//     formData: FormData
//   ) => {
//     // const schema: SignUpDtoSchema = {
//     //   email: formData.get("email") as string,
//     //   nickname: formData.get("nickname") as string,
//     //   password: formData.get("password") as string,
//     //   repassword: formData.get("repassword") as string,
//     // };

//     const formObj = keys.reduce(
//       (acc, key) => ({ ...acc, [key]: formData.get(key) }),
//       {}
//     );

//     const result = schema.safeParse(formObj);

//     if (!result.success) {
//       const errors: T = {} as T;

//       for (const key in result.error.flatten().fieldErrors) {
//         errors[key] = result.error.flatten().fieldErrors[key as keyof T];
//       }

//       formState.success = false;
//       formState.errors = {
//         fieldMessage: errors,
//       };

//       return formState;
//     }
//     try {
//       //   const response = await apiHandler.post<SignUpDtoSchema>("/users", schema);
//       const response = await apiCallback();

//       formState.success = true;
//       formState.errors = undefined;
//     } catch (e) {
//       console.error("Server action Error");
//       if (e instanceof HTTPError) {
//         console.error("HTTP Error");
//         console.error(e.statusCode);
//         console.error(e.message);

//         formState.success = false;
//         formState.errors = {
//           networkMessage: e.message,
//         };
//         formState.statusCode = e.statusCode;
//       } else {
//         console.error("Unknown Error");
//         throw e;
//       }
//     }
//     return formState;
//   };
