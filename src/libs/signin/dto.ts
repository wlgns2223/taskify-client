import { z } from "zod";

export const signInDtoSchema = z.object({
  email: z.string().email({ message: "이메일 형식이 아닙니다." }),
  password: z
    .string()
    .min(4, { message: "비밀번호는 4글자 이상이어야 합니다." }),
});

export type SignInDtoSchema = z.infer<typeof signInDtoSchema>;
