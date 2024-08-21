import { Routes, Route } from "react-router-dom";

import Tickets from "../pages/Tickets";
import TicketView from "../pages/TicketView";
import TicketEdit from "../pages/TicketEdit";
import TicketCreate from "../pages/TicketCreate";

export default function AllRoutes() {
  return (
    <Routes>
   
      <Route
        path="/"
        element={
        
            <Tickets />
     
        }
      />

<Route
        path="/swimlanecard"
        element={
        
            <Tickets />
     
        }
      />
      <Route
        path="/swimlanecard/create"
        element={
        
            <TicketCreate />
          
        } />
         <Route
        path="/swimlanecard/view/:id"
        element={
          
            <TicketView />
          
        }
      />
      <Route
        path="/swimlanecard/edit/:id"
        element={
          
            <TicketEdit />
          
        } />
    </Routes>
  );
}
