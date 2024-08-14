# 학습

1. Server Action은 항상 5xx에러를 던진다. 커스텀에러는 못던진다.
   그래서 useFormState를 사용해서 클라이언트에 에러를 전달한다.
   에러객체를 정의해서 클라이언트에 statusCode를 주고 코드에 맞게 에러를 핸들링하도록하면 어떨까?
   [serverActionError](https://joulev.dev/blogs/throwing-expected-errors-in-react-server-actions)

2. formState 초기화

- formState를 직접 초기화하여 리렌더링 시키는 방법은 없어서 formState의 에러를 상태로 담았다.

# TO DOs

[ ] 쿠키 credential: true 이유 공부하기
[ ] 로그인 form 규칙
[ ] Auth 쿠키 핸들링 로직

# middleware 토큰 검증로직

[] access token 유효 -> next()
[] access token 만료 -> refresh token 검증
[] refresh token 만료 -> 로그인 페이지로 이동
