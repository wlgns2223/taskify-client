# 학습

1. Server Action은 항상 5xx에러를 던진다. 커스텀에러는 못던진다.
   그래서 useFormState를 사용해서 클라이언트에 에러를 전달한다.
   에러객체를 정의해서 클라이언트에 statusCode를 주고 코드에 맞게 에러를 핸들링하도록하면 어떨까?
   [serverActionError](https://joulev.dev/blogs/throwing-expected-errors-in-react-server-actions)

2. formState 초기화

- formState를 직접 초기화하여 리렌더링 시키는 방법은 없어서 formState의 에러를 상태로 담았다.

# TO DOs

## 로그인 시나리오

[o] 로그인 성공
[o] 토큰 발급
[o] 토큰 저장
[] 리다이렉트

## 로그인 실패

[] 이메일, 비밀번호 불일치
[] 서버에러

## 토큰 시나리오

[] 토큰 저장
[] 토큰 삭제
[] 토큰 유효성 검사
[] 토큰 만료
[] 토큰 재발급

[ ] 쿠키 credential: true 이유 공부하기
[ ] 로그인 form 규칙
[ ] Auth 쿠키 핸들링 로직
