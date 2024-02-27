/* eslint-disable react/display-name */
import AuthContext from "./auth-context";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const withAuth = (Child: any) => (props: any) =>
  (
    <AuthContext.Consumer>
      {(context) => <Child {...props} {...context} />}
    </AuthContext.Consumer>
  );

export default withAuth;
