import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { NavLink } from "react-router-dom";

export default function NavBar(): JSX.Element {
  return (
    <Breadcrumb
      width="100%"
      backgroundColor="blackAlpha.700"
      padding="1em"
      borderRadius="md"
       minHeight="65px"
    >
      <BreadcrumbItem>
        <BreadcrumbLink as={NavLink} to='/'>Main Page</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink as={NavLink} to='/filter' >Account Page</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink as={NavLink} to='/signup' ml={935}>SignUp</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink as={NavLink} to='/signin'>SignIn</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink as={NavLink} to='/logout'>Logout</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}