import React, { useContext } from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import LawyerCard from '../ui/LawyerCard';
import LawyerForm from '../ui/LawyerForm';
import useLawyers from '../hooks/useLawyers';

export default function MainPage():JSX.Element {
  const { LawyersSubmitHandler, lawyers, deleteHandler, editHandler } = useLawyers();

  return (
    <>
    <LawyerForm LawyersSubmitHandler={LawyersSubmitHandler}/>
    <SimpleGrid columns={3} spacing={5}>
      {lawyers.map((el) => (<LawyerCard lawyer={el} key={el.id} deleteHandler={deleteHandler}
      editHandler={editHandler}/>))}
    </SimpleGrid>
    </>
  )
}