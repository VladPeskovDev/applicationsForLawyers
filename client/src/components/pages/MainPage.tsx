import React from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';
import LawyerCard from '../ui/LawyerCard';
import useLawyers from '../hooks/useLawyers';

export default function MainPage(): JSX.Element {
  const { lawyers, deleteHandler, editHandler } = useLawyers();

  return (
    <Box mt={10} px={4} ml={-4}>  {/* Добавляем отступ сверху и по бокам */}
      <SimpleGrid columns={3} spacing={5}>
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
  );
}
