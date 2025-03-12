# 학습

1. Server Action은 항상 5xx에러를 던진다. 커스텀에러는 못던진다.
   그래서 useFormState를 사용해서 클라이언트에 에러를 전달한다.
   에러객체를 정의해서 클라이언트에 statusCode를 주고 코드에 맞게 에러를 핸들링하도록하면 어떨까?
   [serverActionError](https://joulev.dev/blogs/throwing-expected-errors-in-react-server-actions)

2. formState 초기화

- formState를 직접 초기화하여 리렌더링 시키는 방법은 없어서 formState의 에러를 상태로 담았다.

3. Suspense와 SSR
   https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming

- suspense는 서버 사이드에서 데이터 페칭이 일어난다. 그래서 쿠키에 담긴 토큰을 가져 올 수 없다.
  이는 서버측 에러로 이어진다.
