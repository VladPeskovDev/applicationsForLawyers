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
  const { cases, deleteCase, editCase, handleCaseSubmit } = useCases(); // Получаем обработчик из хука

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
      
      
      <CaseForm CasesSubmitHandler={handleCaseSubmit} />
      {cases.map((caseItem, index) => (
        <Box key={index} mb={4}>
          <CasesCard caseItem={caseItem} />
          <HStack mt={4}>
            <Button colorScheme="red" onClick={() => deleteCase(index)}>Удалить</Button>
            <Button colorScheme="blue" onClick={() => editCase(index, { ...caseItem, title: 'Обновленный заголовок' })}>
              Редактировать
            </Button>
          </HStack>
        </Box>
      ))}
    </>
  );
}
