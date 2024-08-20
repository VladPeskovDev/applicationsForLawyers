import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container } from '@chakra-ui/react';
import NavBar from './ui/NavBar';

export default function Layout():JSX.Element {
  return (
    <Box bg="gray.600" minH="100vh" color="white">
    <Container maxW="full">
      <NavBar />
      <Outlet />
    </Container>
  </Box>
  

  );
}
