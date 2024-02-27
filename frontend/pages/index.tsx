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
} from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";

export default function Home() {
  return (
    <Container maxW="container.md" my={20} centerContent>
      <Heading>Todos</Heading>
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
  );
}
