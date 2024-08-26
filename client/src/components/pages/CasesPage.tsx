import React from 'react';
import { Box } from '@chakra-ui/react';
import CasesCard from '../ui/CasesCard';

export default function CasesPage(): JSX.Element {
  // Пример кейсов (замени реальными данными)
  const cases = [
    {
      title: 'Кейс 1',
      images: ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg'],
    },
    {
      title: 'Кейс 2',
      images: ['image6.jpg', 'image7.jpg', 'image8.jpg', 'image9.jpg', 'image10.jpg'],
    },
  ];

  return (
    <Box p={8}>
      {cases.map((caseItem, index) => (
        <CasesCard key={index} caseItem={caseItem} />
      ))}
    </Box>
  );
}
