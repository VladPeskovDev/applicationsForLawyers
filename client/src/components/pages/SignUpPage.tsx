import React from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import useAuth from '../hooks/useAuth';

export default function SignUpPage(): JSX.Element {
  const { signUpHandler } = useAuth();
  return (
    <Flex justify="center">
      <Box
        as="form"
        onSubmit={signUpHandler}
        bg={useColorModeValue('', 'gray.900')}
        w="lg"
        p={8}
        borderRadius="md"
      >
        <Text
          fontSize="2xl"
          fontWeight="bold"
          align="center"
          mb={4}
          color={useColorModeValue('gray.900', 'gray.100')}
        >
          Регистрация 
        </Text>

        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel color={useColorModeValue('gray.900', 'gray.100')}>Введите имя</FormLabel>
            <Input
              placeholder="Name"
              name="username"
              bg={useColorModeValue('gray.100', 'gray.900')}
              color='black'
              
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel color={useColorModeValue('gray.900', 'gray.100')}>Email</FormLabel>
            <Input
              type="email"
              name="email"
              placeholder="Введите ваш email"
              bg={useColorModeValue('gray.100', 'gray.900')}
              color='black'
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel color={useColorModeValue('gray.900', 'gray.100')}>Password</FormLabel>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              bg={useColorModeValue('gray.100', 'gray.900')}
              color='black'
            />
            <Text mt={1} color={useColorModeValue('gray.900', 'gray.100')}>
              At least 8 characters long
            </Text>
          </FormControl>

          <Button type="submit" colorScheme="blue" w="full" mt={4}>
            Зарегистрироваться
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
}
