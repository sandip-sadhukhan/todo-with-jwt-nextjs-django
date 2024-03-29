import { login } from "@/auth/actions";
import { withAuth } from "@/auth/context";
import anonymousView from "@/auth/hocs/anonymousView";
import { IAction, IState } from "@/types/auth";
import { Link } from "@chakra-ui/next-js";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ChangeEvent, Dispatch, FormEvent, useState } from "react";

interface Props {
  state: IState;
  dispatch: Dispatch<IAction>;
}

const Login = ({ dispatch }: Props) => {
  interface FormData {
    email: string;
    password: string;
  }

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const { email, password } = formData;

  const toast = useToast();

  const onSubmit = async (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    setLoading(true);

    const [success, message] = await login(email, password, dispatch);

    if (success) {
      toast({
        title: message,
        status: "success",
        variant: "top-accent",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: message,
        status: "error",
        variant: "top-accent",
        duration: 3000,
        isClosable: true,
      });
    }

    setLoading(false);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4} as="form" onSubmit={(event) => onSubmit(event)}>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                required
              />
            </FormControl>
            <Stack spacing={2}>
              <Button
                type="submit"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                isLoading={loading}
                loadingText="Signing in..."
              >
                Sign in
              </Button>
              <Text>
                Already have an account?
                <Link href="/register" color="blue.800" ml={1}>
                  Register here
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default anonymousView(withAuth(Login));
