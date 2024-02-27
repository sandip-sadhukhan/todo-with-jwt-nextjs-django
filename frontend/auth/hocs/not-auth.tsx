import { useRouter } from "next/router"
import React, { Dispatch, useEffect } from "react"
import { withAuth } from "../../auth/context"
import { IAction, IState } from "../../types/auth"
import { authenticate } from "../../auth/actions"
import { useToast } from "@chakra-ui/react"
import Loader from "../loader"

interface IsAuthProps {
  state: IState
  dispatch: Dispatch<IAction>
  children: React.ReactNode
}

const NotAuth: React.FC<IsAuthProps> = (props: IsAuthProps) => {
  const { isAuthenticated, loading } = props.state

  const router = useRouter()
  const toast = useToast()

  useEffect(() => {
    const login = async () => {
      const [success, message] = await authenticate(props.dispatch)
      toast({
        title: message,
        status: success ? "success" : "error",
        variant: "top-accent",
        duration: 1000,
        isClosable: true,
      })
    }

    if (loading === false && isAuthenticated === true) {
      router.push("/dashboard")
    } else if (loading === true) {
      login()
    }
  }, [isAuthenticated, loading, router, props.dispatch, toast])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>{isAuthenticated === false ? <>{props.children}</> : null}</>
      )}
    </>
  )
}

export default withAuth(NotAuth)
