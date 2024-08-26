import React from 'react';
import { Box } from '@chakra-ui/react';
import CasesCard from '../ui/CasesCard';
import useCases from '../hooks/useCases';

export default function CasesPage(): JSX.Element {
  const { cases } = useCases();

  return (
    <Box p={8}>
      {cases.map((caseItem) => (
        <CasesCard key={caseItem.id} caseItem={caseItem} />
      ))}
    </Box>
  );
}
