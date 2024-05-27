import { useParams } from "react-router-dom";
import { Container, Text, VStack, Box, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { useEvents, useComments } from "../integrations/supabase/api";

const EventDetails = () => {
  const { id } = useParams();
  const { data: events, isLoading: eventsLoading, isError: eventsError } = useEvents();
  const { data: comments, isLoading: commentsLoading, isError: commentsError } = useComments();

  if (eventsLoading || commentsLoading) {
    return (
      <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Spinner size="xl" />
      </Container>
    );
  }

  if (eventsError || commentsError) {
    return (
      <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Alert status="error">
          <AlertIcon />
          There was an error loading the event details.
        </Alert>
      </Container>
    );
  }

  const event = events.find(event => event.id === parseInt(id));
  const eventComments = comments.filter(comment => comment.event_id === parseInt(id));

  if (!event) {
    return (
      <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Alert status="error">
          <AlertIcon />
          Event not found.
        </Alert>
      </Container>
    );
  }

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl" fontWeight="bold">{event.name}</Text>
        <Text>{event.date}</Text>
        <Text>{event.description}</Text>
        <Box width="100%">
          <Text fontSize="xl" fontWeight="bold" mt={8}>Comments</Text>
          {eventComments.map(comment => (
            <Box key={comment.id} p={4} borderWidth="1px" borderRadius="md" mt={4}>
              <Text>{comment.content}</Text>
            </Box>
          ))}
        </Box>
      </VStack>
    </Container>
  );
};

export default EventDetails;