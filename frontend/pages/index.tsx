import { logout } from "@/auth/actions";
import { withAuth } from "@/auth/context";
import { IAction, IState } from "@/types/auth";
import axiosInstance from "@/utils/axiosInstance";
import {
  Button,
  Container,
  Divider,
  HStack,
  Heading,
  Input,
  List,
  ListIcon,
  ListItem,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Dispatch, FormEvent, useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";
import authenticatedView from "@/auth/hocs/authenticatedView";

interface Props {
  state: IState;
  dispatch: Dispatch<IAction>;
}

const Home = ({ state, dispatch }: Props) => {
  const toast = useToast();

  interface Todo {
    id: number;
    text: string;
  }

  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoForm, setTodoForm] = useState<string>("");

  const logoutUser = () => {
    logout(dispatch);

    toast({
      title: "Logout Successfully!",
      variant: "top-accent",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const fetchTodos = async () => {
    const response = await axiosInstance.get("/api/todos/", {
      headers: {
        Authorization: `Bearer ${state.user?.access}`,
      },
    });

    setTodos(response.data);
  };

  const createTodo = async (text: string) => {
    const response = await axiosInstance.post(
      "/api/todos/",
      {
        text,
      },
      {
        headers: {
          Authorization: `Bearer ${state.user?.access}`,
        },
      }
    );

    const data = response.data as Todo;

    setTodos([...todos, data]);
  };

  const onSubmit = async (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    await createTodo(todoForm);
    setTodoForm("");
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Container maxW="container.md" my={20} centerContent>
      <HStack spacing={5}>
        <Heading>Todos</Heading>
        <Button
          variant="outline"
          colorScheme="red"
          size="sm"
          onClick={logoutUser}
        >
          Logout
        </Button>
      </HStack>

      <Divider borderWidth={2} backgroundColor="gray.900" my={2} />

      <VStack align="start" w="full" spacing={2} mt={3}>
        <HStack w="full" as="form" onSubmit={onSubmit}>
          <Input
            flex={1}
            type="text"
            value={todoForm}
            onChange={(event) => setTodoForm(event.target.value)}
          />
          <Button type="submit" colorScheme="blue">
            Submit
          </Button>
        </HStack>

        <List spacing={3} my={5}>
          {todos.map((value) => (
            <ListItem key={value.id}>
              <Text fontSize="xl">
                <ListIcon as={MdCheckCircle} color="green.500" />
                {value.text}
              </Text>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default authenticatedView(withAuth(Home));
