import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import LawyerCard from '../ui/LawyerCard';
import useLawyers from '../hooks/useLawyers';
import LawyerForm from '../ui/LawyerForm';

export default function AdminPage(): JSX.Element {
  const { lawyers, deleteHandler, editHandler, LawyersSubmitHandler } = useLawyers();

  return (
    <>
    <LawyerForm LawyersSubmitHandler={LawyersSubmitHandler} />
    <SimpleGrid columns={3} spacing={5}>
      {lawyers.map((el) => (
        <LawyerCard 
          lawyer={el} 
          key={el.id} 
          deleteHandler={deleteHandler} 
          editHandler={editHandler} 
          isAdminPage // для AdminPage
        />
      ))}
    </SimpleGrid>
    </>
  );
}
