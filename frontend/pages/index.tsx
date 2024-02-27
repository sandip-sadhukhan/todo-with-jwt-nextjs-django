import { logout } from "@/auth/actions";
import { withAuth } from "@/auth/context";
import IsAuth from "@/auth/hocs/is-auth";
import { IAction, IState } from "@/types/auth";
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
import { Dispatch } from "react";
import { MdCheckCircle } from "react-icons/md";

interface Props {
  state: IState;
  dispatch: Dispatch<IAction>;
}

const Home = ({ dispatch }: Props) => {
  const toast = useToast();

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

  return (
    <IsAuth>
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
          <HStack w="full" as="form">
            <Input flex={1} type="text" />
            <Button type="submit" colorScheme="blue">
              Submit
            </Button>
          </HStack>

          <List spacing={3} my={5}>
            <ListItem>
              <Text fontSize="xl">
                <ListIcon as={MdCheckCircle} color="green.500" />
                Lorem ipsum dolor sit amet, consectetur adipisicing elit
              </Text>
            </ListItem>
            <ListItem>
              <Text fontSize="xl">
                <ListIcon as={MdCheckCircle} color="green.500" />
                Lorem ipsum dolor sit amet, consectetur adipisicing elit
              </Text>
            </ListItem>
            <ListItem>
              <Text fontSize="xl">
                <ListIcon as={MdCheckCircle} color="green.500" />
                Lorem ipsum dolor sit amet, consectetur adipisicing elit
              </Text>
            </ListItem>
          </List>
        </VStack>
      </Container>
    </IsAuth>
  );
};

export default withAuth(Home);
