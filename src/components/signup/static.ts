export type SignUpFormChildren = {
  type: string;
  id: string;
  name: string;
  placeholder: string;
  error?: string;
  label: string;
};

export const formChildren: SignUpFormChildren[] = [
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
    id: "passwordConfirm",
    name: "passwordConfirm",
    placeholder: "비밀번호를 다시 입력해 주세요.",
    type: "password",
  },
];
