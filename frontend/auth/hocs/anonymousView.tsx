/* eslint-disable react/display-name */
import NotAuth from "./not-auth";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const anonymousView = (Child: any) => (props: any) =>
  (
    <NotAuth>
      <Child {...props} />
    </NotAuth>
  );

export default anonymousView;
