/* eslint-disable react/display-name */
import IsAuth from "./is-auth";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const authenticatedView = (Child: any) => (props: any) =>
  (
    <IsAuth>
      <Child {...props} />
    </IsAuth>
  );

export default authenticatedView;
