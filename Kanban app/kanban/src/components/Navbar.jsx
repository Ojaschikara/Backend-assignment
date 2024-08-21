import { Link as ReactRouterLink } from "react-router-dom";
import {Link as ChakraLink, Flex } from "@chakra-ui/react";




const links = [
  {
    to: "/swimlanecard",
    label: "TICKETS",
  },
 
];

export default function Navbar() {
 

  return (
    <Flex
      align="center"
      justify="space-around"
      background="gray.200"
      padding={4}
    >
      {links?.map((link) => (
        <ChakraLink
          as={ReactRouterLink}
          key={link.to}
          to={link.to}
          color="gray.900"
        >
          {link.label}
        </ChakraLink>
      ))}
   
    </Flex>
  );
}
