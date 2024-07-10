"use client";

import { NextPage } from "next";
import { FormInput } from "../signup/signup-input";
import { JhButton } from "../../core/ui/jh-button";
import { useFormState } from "react-dom";
import { signIn } from "../../libs/signin/actions";

const SignInForm: NextPage = () => {
  const [signInFormState, signInAction] = useFormState(signIn, {});

  return (
    <form className="mt-9" action={signInAction}>
      <ul className="space-y-4">
        <li>
          <FormInput
            labeltxt="이메일"
            name="email"
            placeholder="이메일을 입력해 주세요."
            error={signInFormState?.errors?.fieldMessage?.email}
          />
        </li>
        <li>
          <FormInput
            labeltxt="비밀번호"
            type="password"
            name="password"
            placeholder="비밀번호를 입력해 주세요."
            error={signInFormState?.errors?.fieldMessage?.password}
          />
        </li>
      </ul>
      <JhButton className="w-full mt-5" type="submit">
        {"로그인"}
      </JhButton>
    </form>
  );
};
export default SignInForm;
