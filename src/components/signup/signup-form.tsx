"use client";

import { useFormState } from "react-dom";
import { JHInput } from "../../core/ui/jh-input";
import { createUser } from "../../libs/signup/actions";
import { JhCheckbox } from "../../core/ui/jh-checkbox";
import { useState } from "react";
import { JhButton } from "../../core/ui/jh-button";

export const SignupForm: React.FC = () => {
  const [signUpFormState, createUserAction] = useFormState(createUser, {
    errors: {},
  });

  const [isTermChecked, setIsTermChecked] = useState<boolean>(false);

  return (
    <form action={createUserAction}>
      <ul className="text-neutral-700  space-y-4">
        <li>
          <label htmlFor="email">이메일</label>
          <JHInput
            type="text"
            id="email"
            name="email"
            placeholder="이메일을 입력해 주세요."
            className="mt-2"
          />
        </li>
        <li>
          <label htmlFor="nickname">닉네임</label>
          <JHInput
            type="text"
            id="nickname"
            name="nickname"
            placeholder="닉네임을 입력해 주세요."
            className="mt-2"
          />
        </li>
        <li>
          <label htmlFor="password">비밀번호</label>
          <JHInput
            type="password"
            id="password"
            name="password"
            placeholder="패스워드를 입력해 주세요."
            className="mt-2"
          />
        </li>
        <li>
          <label htmlFor="repassword">비밀번호 확인</label>
          <JHInput
            type="password"
            id="repassword"
            name="repassword"
            placeholder="패스워드를 다시 입력해 주세요."
            className="mt-2"
          />
        </li>
        <li>
          <JhCheckbox checked={isTermChecked} onChange={setIsTermChecked}>
            {"이용약관에 동의합니다."}{" "}
          </JhCheckbox>
        </li>
      </ul>

      <JhButton disabled={!isTermChecked} className="w-full mt-5" type="submit">
        {"가입하기"}
      </JhButton>
    </form>
  );
};
