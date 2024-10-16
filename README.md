# 학습

1. Server Action은 항상 5xx에러를 던진다. 커스텀에러는 못던진다.
   그래서 useFormState를 사용해서 클라이언트에 에러를 전달한다.
   에러객체를 정의해서 클라이언트에 statusCode를 주고 코드에 맞게 에러를 핸들링하도록하면 어떨까?
   [serverActionError](https://joulev.dev/blogs/throwing-expected-errors-in-react-server-actions)

2. formState 초기화

- formState를 직접 초기화하여 리렌더링 시키는 방법은 없어서 formState의 에러를 상태로 담았다.

# TO-DOs

[ ] api 요청시 access token 만료시 refresh token으로 재발급
[ ] create dashboard useMutation으로 로직 개발
