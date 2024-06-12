import { JHInput } from "../../core/ui/jh-input";

export const SignupForm: React.FC = () => {
  return (
    <form>
      <ul className="text-neutral-700  space-y-4">
        <li>
          <label htmlFor="email">이메일</label>
          <JHInput
            type="email"
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
      </ul>
    </form>
  );
};
