import { useRouter } from "next/router";
import React, { Dispatch, useEffect } from "react";
import { withAuth } from "@/auth/context";
import { IAction, IState } from "@/types/auth";
import { authenticate } from "@/auth/actions";
import { useToast } from "@chakra-ui/react";
import Loader from "@/components/loader";

interface IsAuthProps {
  state: IState;
  dispatch: Dispatch<IAction>;
  children: React.ReactNode;
}

const IsAuth: React.FC<IsAuthProps> = (props: IsAuthProps) => {
  const { isAuthenticated, loading } = props.state;

  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    const login = async () => {
      const [success, message] = await authenticate(props.dispatch);
      toast({
        title: message,
        status: success ? "success" : "error",
        variant: "top-accent",
        duration: 1000,
        isClosable: true,
      });
    };

    if (loading === false && isAuthenticated === false) {
      router.push("/login");
    } else if (loading === true) {
      login();
    }
  }, [isAuthenticated, loading, router, props.dispatch, toast]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>{isAuthenticated === true ? <>{props.children}</> : null}</>
      )}
    </>
  );
};

export default withAuth(IsAuth);
