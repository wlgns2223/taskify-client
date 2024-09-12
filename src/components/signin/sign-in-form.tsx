"use client";

import { NextPage } from "next";
import { FormInput } from "../signup/signup-input";
import { JhButton } from "../../core/ui/jh-button";
import { useFormState } from "react-dom";
import { signIn } from "../../libs/signin/actions";
import { useEffect, useRef } from "react";
import { redirect } from "next/navigation";
import { PATH } from "../../core/path";
import { DevComponentWrapper } from "../../core/dev/dev-component-wrapper";
import { KeyInputHack } from "../../core/dev/keyboard-input-hack";
import { useKeyInputHack } from "../../core/dev/hooks/useKeyboardHack";

const SignInForm: NextPage = () => {
  const [signInFormState, signInAction] = useFormState(signIn, {});

  useEffect(() => {
    if (!!signInFormState.success) {
      redirect(PATH.myDashBoard());
    }
  }, [signInFormState.success]);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { handleKeyInputHack } = useKeyInputHack({
    callback: () => {
      if (emailRef.current && passwordRef.current) {
        emailRef.current.value = "test@gmail.com";
        passwordRef.current.value = "1234";
      }
    },
  });

  return (
    <>
      <DevComponentWrapper>
        <KeyInputHack callback={handleKeyInputHack} />
      </DevComponentWrapper>
      <form className="mt-9" action={signInAction}>
        <ul className="space-y-4">
          <li>
            <FormInput
              labeltxt="이메일"
              name="email"
              placeholder="이메일을 입력해 주세요."
              error={signInFormState?.errors?.fieldMessage?.email}
              ref={emailRef}
            />
          </li>
          <li>
            <FormInput
              labeltxt="비밀번호"
              type="password"
              name="password"
              placeholder="비밀번호를 입력해 주세요."
              error={signInFormState?.errors?.fieldMessage?.password}
              ref={passwordRef}
            />
          </li>
        </ul>
        <JhButton className="w-full mt-5" type="submit">
          {"로그인"}
        </JhButton>
      </form>
    </>
  );
};
export default SignInForm;
