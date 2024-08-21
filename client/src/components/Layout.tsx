import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container } from '@chakra-ui/react';
import NavBar from './ui/NavBar';
import Background from '../assets/Background3.jpg';

export default function Layout():JSX.Element {
  return (
    <Box bgImage={`url(${Background})`} // Замените на путь к вашему изображению
    bgSize="cover"
    bgPosition="center"
    bgRepeat="no-repeat"
    minH="100vh"
    color="white">
    <Container maxW="full">
      <NavBar />
      <Outlet />
    </Container>
  </Box>
  );
}
