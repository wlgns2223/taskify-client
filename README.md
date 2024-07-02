# 학습

1. Server Action은 항상 5xx에러를 던진다. 커스텀에러는 못던진다.
   그래서 useFormState를 사용해서 클라이언트에 에러를 전달한다.
   에러객체를 정의해서 클라이언트에 statusCode를 주고 코드에 맞게 에러를 핸들링하도록하면 어떨까?
   [serverActionError](https://joulev.dev/blogs/throwing-expected-errors-in-react-server-actions)

# TO DOs

[ ] 회원가입 form 규칙
[ ] 회원가입 form validation
[ ] 회원가입 에러메세지

[ ] 로그인 form 규칙
[ ] 로그인 form validation
[ ] 로그인 페이지
[ ] 로그인 로직
[ ] Auth 쿠키 핸들링 로직
