import React, { useState } from 'react';
import { Box, Button, Input, Stack , Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';


type PropsType = {
  LawyersSubmitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function LawyerForm({ LawyersSubmitHandler }: PropsType): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (): void => setIsOpen(true);
  const closeModal = (): void => setIsOpen(false);


  const wrappedLawyersSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    LawyersSubmitHandler(e);
    closeModal();
  }

  return (
    <>
      <Button onClick={openModal} colorScheme="purple" mt={8} mb={8}>Добавить Задачу</Button>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Добавить новую задачу</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box onSubmit={wrappedLawyersSubmitHandler} as="form" mt={3}>
              <Stack spacing={3}>
                <Input name="name" placeholder="name" size="md" />
                <Input name="description" placeholder="description" size="md" />
                <Input name="educations" placeholder="educations" size="md" />
                <Input name="photo" placeholder="photo" size="md" />
                <Input name="phone" placeholder="phone" size="md" />
                <Input name="telegram" placeholder="telegram" size="md" />
                <Button type="submit" colorScheme="green">
                  Добавить Задачу
                </Button>
              </Stack>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={closeModal}>
              Закрыть
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}