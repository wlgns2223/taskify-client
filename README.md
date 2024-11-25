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

# TO-DOs

[ ] useQuery로 사용한 부분 error,loading 처리하기
[ ] useSuspenseQuery로 다시 바꿔보기. 서버 컴포넌트에서 쿠키를 미리 받아서 쿠키를 주입해주고 데이터 페칭을 유도해보기
이것이 가능한 이유.

1.  사용자가 페이지를 요청한다. <-- 사용자가 페이지를 요청하기때문에 쿠키를 받아 올 수 있다고 한다.
2.  서버에서 페이지를 미리 페칭한다.
3.  사용자에게 HTML 파일을 전달한다.
4.  사용자의 브라우저에서 하이드레이션이 일어난다.

# Trouble Shooting

[ ] To-do suspense query 제대로 이해하여 적용하기 -> Client Component -> Serever Component interleaving 방식 이용해서
useSuspenseQuery를 서버 컴포넌트에 배치하기 그리고 클라이언트 컴포넌트에 dashboards data를 props로 내려주기

[ ] react-query 커서기반 페이지네이션시 이전 페이지로 돌아갈때 캐시데이터를 이용하도록 하기
