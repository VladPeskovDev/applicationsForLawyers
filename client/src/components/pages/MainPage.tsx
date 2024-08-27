import React, { useState } from 'react';
import { Box, SimpleGrid, Flex, Text, useColorModeValue, IconButton, VStack, HStack, Input, Button} from '@chakra-ui/react';
import { ChatIcon, CloseIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import LawyerCard from '../ui/LawyerCard';
import useLawyers from '../hooks/useLawyers';
import { addMessage } from '../../redux/chatGPT/chatSlice';
import type { RootState } from '../../redux/store';

export default function MainPage(): JSX.Element {
  const { lawyers, deleteHandler, editHandler } = useLawyers();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.chatGPT.messages);
  const username = useSelector((state: RootState) => state.auth.user?.username);
  const [ws, setWs] = useState<WebSocket | null>(null);

  React.useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000');
    setWs(socket);

    socket.onmessage = (event) => {
      dispatch(addMessage(`Помощник адвоката Федор: ${event.data}`));
    };

    return () => {
      socket.close();
    };
  }, [dispatch]);

  const handleSendMessage = (): void => {
    if (inputValue.trim() !== '' && ws && username) {
      dispatch(addMessage(`${username}: ${inputValue}`));
      ws.send(inputValue);
      setInputValue('');
    }
  };

  return (
    <Flex direction="column" w="100%">
      <Box
        p={6}
        borderRadius="md"
        boxShadow="lg"
        w="100%"
        backgroundColor={useColorModeValue('gray.900', 'gray.900')}
        mt={10}
        opacity={0.85}
      >
        <Text fontSize="lg" fontWeight="bold" color="white">
          Адвокаты по уголовным делам
        </Text>
        <Text mt={2} color="white">
          Наша команда профессионалов готова помочь вам с любым уголовным делом. Опыт, знания и
          безупречная репутация — наши главные преимущества.
        </Text>
      </Box>

      <Flex w="100%" justifyContent="space-between" mt={10}>
        <Box
          p={6}
          borderRadius="md"
          boxShadow="lg"
          w="45%"
          backgroundColor={useColorModeValue('gray.900', 'gray.900')}
          opacity={0.85}
        >
          <Text fontSize="lg" fontWeight="bold" color="white">
            Адвокаты по уголовным делам
          </Text>
          <Text mt={2} color="white">
            Наша команда профессионалов готова помочь вам с любым уголовным делом. Опыт, знания и
            безупречная репутация — наши главные преимущества.
          </Text>
        </Box>

        <Box
          p={6}
          borderRadius="md"
          boxShadow="lg"
          w="45%"
          backgroundColor={useColorModeValue('gray.900', 'gray.900')}
          opacity={0.85}
        >
          <Text fontSize="lg" fontWeight="bold" color="white">
            Адвокаты по уголовным делам
          </Text>
          <Text mt={2} color="white">
            Наша команда профессионалов готова помочь вам с любым уголовным делом. Опыт, знания и
            безупречная репутация — наши главные преимущества.
          </Text>
        </Box>
      </Flex>

      <Box mt={10} px={4}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
          {lawyers.map((el) => (
            <LawyerCard
              lawyer={el}
              key={el.id}
              deleteHandler={deleteHandler}
              editHandler={editHandler}
              isAdminPage={false}
            />
          ))}
        </SimpleGrid>
      </Box>

      {!isChatOpen && (
        <Flex position="fixed" bottom={5} right={5} alignItems="center">
          <IconButton
            aria-label="Open Chat"
            icon={<ChatIcon boxSize={9} />} 
            size="lg"
            colorScheme="blue"
            borderRadius="full"
            onClick={() => setIsChatOpen(true)}
          />
          <Text ml={3} fontWeight="bold" 
          color="blue.300" 
          onClick={() => setIsChatOpen(true)} 
          cursor='pointer' 
          fontSize="lg">
            Срочная помощь в чате!
             <Text display="block" fontSize="lg">
             Круглосуточно!
             </Text>
          </Text>
        </Flex>
      )}

      {isChatOpen && (
        <Flex
          direction="column"
          position="fixed"
          bottom={5}
          right={5}
          w="400px"
          h="600px"
          bg="white"
          borderRadius="md"
          boxShadow="lg"
          zIndex={1000}
        >
          <Flex justify="space-between" p={4} bg="blue.500" color="white" borderRadius="md">
            <Text fontWeight="bold">Помощник адвоката</Text>
            <IconButton
              aria-label="Close Chat"
              icon={<CloseIcon />}
              size="sm"
              onClick={() => setIsChatOpen(false)}
            />
          </Flex>

          <Box flex={1} p={4} overflowY="auto">
            {messages.length === 0 ? (
              <Text color="gray.500">Напишите помощнику адвоката и получите консультацию прямо сейчас. <Text fontWeight="bold"> Для получения помощи в чате необходимо зарегистрироваться!</Text></Text>
              
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

          <HStack p={4}>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Введите сообщение..."
              bg="gray.100"
              color='black'
            />
            <Button colorScheme="blue" onClick={handleSendMessage} disabled={inputValue.trim() === ''}>
              Отправить
            </Button>
          </HStack>
        </Flex>
      )}
    </Flex>
  );
}
