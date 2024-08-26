/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Box, Button, Flex, HStack,
  Input,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../../redux/chatGPT/chatSlice';
import type { RootState } from '../../redux/store';

export default function HelpPage(): JSX.Element {
  const [inputValue, setInputValue] = useState<string>('');
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.chatGPT.messages);
  const username = useSelector((state: RootState) => state.auth.user?.username);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000');
    setWs(socket);

    // Получение сообщений от WebSocket сервера
    socket.onmessage = (event) => {
      dispatch(addMessage(`Помощник Федор: ${event.data}`));
    };

    return () => {
      socket.close(); // Закрываем соединение при размонтировании компонента
    };
  }, [dispatch]);

  const handleSendMessage = (): void => {
    if (inputValue.trim() !== '' && ws && username) {
      dispatch(addMessage(`${username}: ${inputValue}`)); // Добавляем сообщение пользователя в Redux
      ws.send(inputValue); // Отправляем сообщение на сервер через WebSocket
      setInputValue(''); // Очищаем поле ввода
    }
  };

  return (
    <Flex p={10} h="100vh" bg="rgba(255, 255, 255, 0.05)" mt={10}>
      <VStack spacing={4} w="70%" mr={8}>
        <Box
          p={6}
          borderRadius="md"
          boxShadow="lg"
          w="100%"
          h="250px"
          backgroundColor={useColorModeValue('gray.900', 'gray.900')}
          opacity={0.75}
        >
          <Text fontSize="lg" fontWeight="bold">
            Адвокаты по уголовным делам
          </Text>
          <Text mt={2}>
            Наша команда профессионалов готова помочь вам с любым уголовным делом. Опыт, знания и
            безупречная репутация — наши главные преимущества.
          </Text>
        </Box>

        <Box
          p={6}
          borderRadius="md"
          boxShadow="lg"
          w="100%"
          h="250px"
          backgroundColor={useColorModeValue('gray.900', 'gray.900')}
          opacity={0.75}
        >
          <Text fontSize="lg" fontWeight="bold">
            Защита ваших прав
          </Text>
          <Text mt={2}>
            Мы гарантируем качественную юридическую помощь и защиту ваших прав. Свяжитесь с нами для
            получения консультации.
          </Text>
        </Box>
      </VStack>

      <Box bg="rgba(255, 255, 255, 0.7)" p={4} borderRadius="md" boxShadow="lg" w="30%" maxH="80vh">
        <VStack spacing={4} h="100%">
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
              <Text color="gray.500">
                Напишите помощнику адвоката и получите консультацию прямо сейчас
              </Text>
            ) : (
              messages.map((msg, index) => (
                <Box
                  key={index}
                  bg={useColorModeValue('rgba(173, 216, 230, 0.99)', 'rgba(0, 123, 255, 0.99)')}
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

          <HStack w="100%" spacing={2}>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Введите сообщение..."
              bg="rgba(255, 255, 255, 0.5)"
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
