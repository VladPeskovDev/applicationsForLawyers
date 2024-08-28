import React from 'react';
import { SimpleGrid, Button, Box, HStack } from '@chakra-ui/react';
import useLawyers from '../hooks/useLawyers';
import useCases from '../hooks/useCases';
import LawyerForm from '../ui/LawyerForm';
import CasesCard from '../ui/CasesCard';
import LawyerCard from '../ui/LawyerCard';
import CaseForm from '../ui/CasesForm';

export default function AdminPage(): JSX.Element {
  const { lawyers, deleteHandler, editHandler, LawyersSubmitHandler } = useLawyers();
  const { cases, deleteCaseHandler, editCaseHandler, CasesSubmitHandler } = useCases(); 

  return (
    <>
      <LawyerForm LawyersSubmitHandler={LawyersSubmitHandler} />
      <SimpleGrid columns={3} spacing={5} mb={10}>
        {lawyers.map((el) => (
          <Box key={el.id}>
            <LawyerCard 
              lawyer={el} 
              deleteHandler={deleteHandler} 
              editHandler={editHandler} 
              isAdminPage 
            />
          </Box>
        ))}
      </SimpleGrid>
      
      <CaseForm CasesSubmitHandler={CasesSubmitHandler} />
      {cases.map((caseItem, index) => (
        <Box key={index} mb={4}>
          <CasesCard caseItem={caseItem} />
          <HStack mt={4}>
            <Button colorScheme="gray" variant='outline' onClick={() => deleteCaseHandler(caseItem.id)}>Удалить</Button>
            <Button colorScheme="gray" variant='outline' onClick={() => editCaseHandler(caseItem.id)}>
              Редактировать
            </Button>
          </HStack>
        </Box>
      ))}
    </>
  );
}
