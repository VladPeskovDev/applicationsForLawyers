import React, { useState } from 'react';
import { Box, Button, Input, VStack, HStack, Text, Flex, useColorModeValue } from '@chakra-ui/react';

export default function HelpPage(): JSX.Element {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const handleSendMessage = (): void => {
    if (inputValue.trim() !== '') {
      setMessages([...messages, inputValue]);
      setInputValue(''); 
    }
  };

  return (
    <Flex p={10}
    h="100vh"
    bg="rgba(255, 255, 255, 0.05)" 
    mt={10}>
      {/* Левая колонка с текстовыми блоками */}
      <VStack spacing={4} w="70%" mr={8}>
        <Box
          p={6}
          borderRadius="md"
          boxShadow="lg"
          w="100%"
          h="250px"
          backgroundColor={useColorModeValue('gray.900', 'gray.900')}   
        >
          <Text fontSize="lg" fontWeight="bold">
            Адвокаты по уголовным делам
          </Text>
          <Text mt={2}>
            Наша команда профессионалов готова помочь вам с любым уголовным делом. Опыт, знания и безупречная репутация — наши главные преимущества.
          </Text>
        </Box>

        <Box
          bg="rgba(255, 255, 255, 0.7)" // Прозрачный белый фон
          p={6}
          borderRadius="md"
          boxShadow="lg"
          w="100%"
          h="250px"
          backgroundColor={useColorModeValue('gray.900', 'gray.900')} 
        >
          <Text fontSize="lg" fontWeight="bold">
            Защита ваших прав
          </Text>
          <Text mt={2}>
            Мы гарантируем качественную юридическую помощь и защиту ваших прав. Свяжитесь с нами для получения консультации.
          </Text>
        </Box>
      </VStack>

      {/* Правая колонка с чатом */}
      <Box
        bg="rgba(255, 255, 255, 0.7)" 
        p={4}
        borderRadius="md"
        boxShadow="lg"
        w="30%"
        maxH="80vh"
      >
        <VStack spacing={4} h="100%">
          {/* Окно с перепиской */}
          <Box
            bg="rgba(255, 255, 255, 0.7)" 
            p={4}
            borderRadius="md"
            boxShadow="inner"
            w="100%"
            h="600px"
            overflowY="auto"
          >
            {messages.length === 0 ? (
              <Text color="gray.500">Напишите помощнику адвоката и получите консультацию прямо сейчас</Text>
            ) : (
              messages.map((msg, index) => (
                <Box
                  key={index}
                  bg={useColorModeValue('rgba(173, 216, 230, 0.7)', 'rgba(0, 123, 255, 0.9)')} // Прозрачный фон для сообщений
                  p={2}
                  borderRadius="md"
                  mb={2}
                  alignSelf="flex-start"
                >
                  <Text>{msg}</Text>
                </Box>
              ))
            )}
          </Box>

          {/* Поле ввода и кнопка отправки */}
          <HStack w="100%" spacing={2}>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Введите сообщение..."
              bg="rgba(255, 255, 255, 0.5)" // Прозрачный фон для ввода
              borderRadius="md"
              backgroundColor={useColorModeValue('gray.400', 'gray.900')}
            />
            <Button
              colorScheme="blue"
              onClick={handleSendMessage}
              disabled={inputValue.trim() === ''}
            >
              Отправить
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Flex>
  );
}
