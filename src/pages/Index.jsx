import { Container, Text, VStack, Box, Spinner, Alert, AlertIcon, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useEvents } from "../integrations/supabase/api";

const Index = () => {
  const { data: events, isLoading, isError } = useEvents();

  if (isLoading) {
    return (
      <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Spinner size="xl" />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Alert status="error">
          <AlertIcon />
          There was an error loading the events.
        </Alert>
      </Container>
    );
  }

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl" fontWeight="bold">Events</Text>
        {events.map(event => (
          <Box key={event.id} p={4} borderWidth="1px" borderRadius="md" width="100%">
            <Link as={RouterLink} to={`/event/${event.id}`} fontSize="xl" fontWeight="bold">
              {event.name}
            </Link>
            <Text>{event.date}</Text>
            <Text>{event.description}</Text>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;