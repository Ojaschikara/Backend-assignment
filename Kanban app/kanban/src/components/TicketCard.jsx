import {
  Box,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  StackDivider,
  Text,
  
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function TicketCard({ id, title, status,priority }) {
  const navigate = useNavigate();

  //title, status, priority
  return (
    <Card w={"100%"} >
      <CardHeader margin={2} padding={0}>
        <Heading size="sm">{title}</Heading>
      </CardHeader>

      <CardBody margin={1} padding={0} >
        <Stack divider={<StackDivider />} spacing="1" margin={0} padding={0}>
          <Box margin={0} padding={0} >
            <Heading size="sm" textTransform="uppercase" >
              Status
            </Heading>
            <Text pt="2" fontSize="sm" margin={0} padding={0}>
              {status}
            </Text>
          </Box>
          {/* <Box>
            <Heading size="xs" textTransform="uppercase">
              Priorit
            </Heading>
            <Text pt="2" fontSize="sm">
              {priority}
            </Text>
          </Box> */}
        </Stack>
      </CardBody>
      <CardFooter margin={0} padding={0}>
        <Button
          variant="outline"
          colorScheme="red"
          margin={0} 
      
          onClick={() => {
            navigate(`/swimlanecard/view/${id}`);
          }}
        >
          View Ticket
        </Button>
      </CardFooter>
    </Card>
  );
}
