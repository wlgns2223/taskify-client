"use client";

import { useFormState } from "react-dom";
import { CreateFormFields, createUser } from "../../libs/signup/actions";
import { JhCheckbox } from "../../core/ui/jh-checkbox";
import { useMemo, useState } from "react";
import { JhButton } from "../../core/ui/jh-button";
import { SignupInput } from "./signup-input";

type SignUpFormChildren = {
  type: string;
  id: string;
  name: string;
  placeholder: string;
  error?: string;
  label: string;
};

export const SignupForm: React.FC = () => {
  const [signUpFormState, createUserAction] = useFormState(createUser, {});

  const [isTermChecked, setIsTermChecked] = useState<boolean>(false);

  const formChildren = useMemo<SignUpFormChildren[]>(
    () => [
      {
        id: "email",
        name: "email",
        placeholder: "이메일을 입력해 주세요.",
        type: "text",
        label: "이메일",
      },
      {
        id: "nickname",
        name: "nickname",
        placeholder: "닉네임을 입력해 주세요.",
        type: "text",
        label: "닉네임",
      },
      {
        label: "비밀번호",
        id: "password",
        name: "password",
        placeholder: "비밀번호를 입력해 주세요.",
        type: "password",
      },
      {
        label: "비밀번호 확인",
        id: "repassword",
        name: "repassword",
        placeholder: "비밀번호를 다시 입력해 주세요.",
        type: "password",
      },
    ],
    []
  );

  const isSubmitDisabled = isTermChecked == false || signUpFormState?.errors;

  return (
    <form action={createUserAction}>
      <ul className="text-neutral-700 space-y-4 ">
        {formChildren.map((formField) => (
          <li key={formField.id}>
            <SignupInput
              labeltxt={formField.label}
              {...formField}
              error={
                signUpFormState?.errors?.fieldMessage?.[
                  formField.name as keyof CreateFormFields
                ]
              }
            />
          </li>
        ))}
        <li>
          <JhCheckbox checked={isTermChecked} onChange={setIsTermChecked}>
            {"이용약관에 동의합니다."}{" "}
          </JhCheckbox>
        </li>
      </ul>

      <JhButton
        disabled={!!isSubmitDisabled}
        className="w-full mt-5"
        type="submit"
      >
        {"가입하기"}
      </JhButton>
    </form>
  );
};
