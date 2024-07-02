import { twMerge } from "tailwind-merge";
import { JHInput, JHInputProps } from "../../core/ui/jh-input";
import clsx from "clsx";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { JhButton } from "../../core/ui/jh-button";
import { useRef, useState } from "react";

interface SignUpInputProps extends JHInputProps {
  labeltxt: string;
  error?: string[];
}

export const SignupInput: React.FC<SignUpInputProps> = ({
  labeltxt,
  error,
  ...props
}) => {
  const inputClasses = twMerge(
    clsx({
      "border-red-400 border": !!error,
    })
  );

  const [inputType, setInputType] = useState(props.type || "text");

  const handleEyeClick = () => {
    setInputType((prev) => (prev === "text" ? "password" : "text"));
  };

  return (
    <div className={"flex flex-col "}>
      <label htmlFor="email">{labeltxt}</label>
      <div className="relative mt-2">
        <JHInput {...props} type={inputType} className={inputClasses} />
        {props.type === "password" && (
          <JhButton
            variants="reset"
            className="absolute top-1/2 -translate-y-1/2 right-3 p-1"
            onClick={handleEyeClick}
          >
            {inputType === "text" ? (
              <EyeIcon className="w-6 h-6 " />
            ) : (
              <EyeSlashIcon className="w-6 h-6 " />
            )}
          </JhButton>
        )}
      </div>

      {!!error &&
        error.map((message, index) => (
          <p
            key={`${message}` + index}
            className="mt-2 text-red-400 text-sm line-clamp-2"
          >
            {message}
          </p>
        ))}
    </div>
  );
};
