import React, { useState } from 'react';
import { Box, Button, Input, Stack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';

type PropsType = {
  CasesSubmitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function CaseForm({ CasesSubmitHandler }: PropsType): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState<File[]>([]);

  const openModal = (): void => setIsOpen(true);
  const closeModal = (): void => setIsOpen(false);

  const wrappedCasesSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    CasesSubmitHandler(e);
    closeModal();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  return (
    <>
      <Button onClick={openModal} colorScheme="teal" mt={8} mb={8}>
        Добавить новый кейс
      </Button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Добавить новый кейс</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box onSubmit={wrappedCasesSubmitHandler} as="form" mt={3}>
              <Stack spacing={3}>
                <Input name="title" placeholder="Заголовок" size="md" />
                <Input name="description" placeholder="Описание" size="md" />

                {/* Поле для загрузки фотографий */}
                <Input
                  type="file"
                  name="images"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />

                {/* Отображение выбранных фотографий */}
                {images.length > 0 && (
                  <Stack spacing={2}>
                    {images.map((image, index) => (
                      <Box key={index}>{image.name}</Box>
                    ))}
                  </Stack>
                )}

                <Button type="submit" colorScheme="green">
                  Добавить кейс
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
