import {
  Button,
  Container,
  Flex,
  SimpleGrid,
  Select,
  HStack,
  Box,
  
} from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorIndicator from "../components/ErrorIndicator";
import TicketCard from "../components/TicketCard";

export default function Tickets() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [err, setErr] = useState(false);
  const [sortOrderValue, setSortOrderValue] = useState("");
  const [filterValue, setFilterValue] = useState("");

  async function fetchAndUpdateData(sortOrderValue, filterValue) {
    setLoading(true);
    try {
      let queryParams = {};
      if (filterValue) {
        queryParams.status = filterValue;
      }

      if (sortOrderValue) {
        queryParams._sort = "priority";
        queryParams._order = sortOrderValue;
      }

      let res = await axios({
        method: "get",
        url: `http://localhost:3000/tickets`,
        params: queryParams,
      });

      let data = res?.data;
      setLoading(false);
      setTickets(data);
    } catch (error) {
      setLoading(false);
      setErr(true);
    }
  }

  useEffect(() => {
    fetchAndUpdateData(sortOrderValue, filterValue);
  }, [sortOrderValue, filterValue]);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (err) {
    return <ErrorIndicator />;
  }

  return (
    <Flex justify={"space-between"} >
    <>
    <Container maxW="sm" >
      {/* <Flex direction="row"> */}
        <Button
          variant="outline"
          colorScheme="red"
          w={"30%"}
          onClick={() => {
            navigate(`/swimlanecard/create`);
          }}
          marginY={1}
        >
          Create Ticket
        </Button>
      {/* </Flex> */}
      <HStack spacing={4} my={4} w={"30%"}>
        {/* <Select
          placeholder="Sort by Priority"
          value={sortOrderValue}
          onChange={(e) => {
            setSortOrderValue(e.target.value);
          }}
        >
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </Select> */}
        <Select
          placeholder="Filter by Status"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        >
          <option value="progress">Progress</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </Select>
      </HStack>

      <SimpleGrid columns={{ base: 1, md: 1, lg: 1 }} spacing={10} width={"300px"}>
        {tickets?.map((ticket) => (
          <TicketCard {...ticket} key={ticket.id} />
        ))}
      </SimpleGrid>
    </Container>
    
    <Box bg='gray.200' w='50%' p={5} m={5}  color='gray.800'>
        Progress
      </Box>
      <Box bg='gray.200' w='50%' p={5} m={5} color='gray.800'>
     completed
      </Box>
    
    </>
    </Flex>
  );
}


 