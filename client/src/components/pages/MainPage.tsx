import React from 'react';
import { Box, SimpleGrid, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import LawyerCard from '../ui/LawyerCard';
import useLawyers from '../hooks/useLawyers';

export default function MainPage(): JSX.Element {
  const { lawyers, deleteHandler, editHandler } = useLawyers();

  return (
    <Flex direction="column" w="100%">
      {/* Первый текстовый блок на всю ширину */}
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
          Наша команда профессионалов готова помочь вам с любым уголовным делом. Опыт, знания и безупречная репутация — наши главные преимущества.
        </Text>
      </Box>

      {/* Flex контейнер для блоков с шириной 45% */}
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
            Наша команда профессионалов готова помочь вам с любым уголовным делом. Опыт, знания и безупречная репутация — наши главные преимущества.
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
            Наша команда профессионалов готова помочь вам с любым уголовным делом. Опыт, знания и безупречная репутация — наши главные преимущества.
          </Text>
        </Box>
      </Flex>

      {/* Блок с карточками адвокатов */}
      <Box mt={10} px={4}> 
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}> {/* Адаптивная сетка */}
          {lawyers.map((el) => (
            <LawyerCard 
              lawyer={el} 
              key={el.id} 
              deleteHandler={deleteHandler} 
              editHandler={editHandler} 
              isAdminPage={false} // для MainPage
            />
          ))}
        </SimpleGrid>
      </Box>
    </Flex>
  );
}
