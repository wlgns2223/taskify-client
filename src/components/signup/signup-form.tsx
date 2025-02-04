"use client";

import { useFormState } from "react-dom";
import { CreateFormFields, createUser } from "../../libs/signup/actions";
import { JhCheckbox } from "../../core/ui/jh-checkbox";
import { useEffect, useState } from "react";
import { JhButton } from "../../core/ui/jh-button";
import { FormInput } from "./signup-input";
import { useRouter } from "next/navigation";
import { PATH } from "../../core/types/path";
import { formChildren } from "./static";

/**
 *
 * useFormState와 Server Action 사용
 */

export const SignupForm: React.FC = () => {
  const [isTermChecked, setIsTermChecked] = useState<boolean>(false);

  const [signUpFormState, createUserAction] = useFormState(createUser, {});
  const [errors, setErrors] = useState<CreateFormFields>({});
  const handleResetError = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors({
      ...errors,
      [e.target.name]: undefined,
    });
  };

  const router = useRouter();

  useEffect(() => {
    if (signUpFormState.errors && signUpFormState.errors.fieldMessage) {
      setErrors(signUpFormState.errors.fieldMessage);
    }
  }, [signUpFormState.errors]);

  useEffect(() => {
    if (!!signUpFormState.success) {
      router.push(PATH.signIn());
    }
  }, [signUpFormState?.success]);

  const isSubmitDisabled = isTermChecked == false;
  return (
    <form action={createUserAction}>
      <ul className="text-neutral-700 space-y-4 ">
        {formChildren.map((formField) => (
          <li key={formField.id}>
            <FormInput
              labeltxt={formField.label}
              onChange={handleResetError}
              {...formField}
              error={errors[formField.name as keyof CreateFormFields]}
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
