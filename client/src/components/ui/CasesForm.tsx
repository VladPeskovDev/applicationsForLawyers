import React, { useState } from 'react';
import { Box, Button, Input, Stack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';

type PropsType = {
  CasesSubmitHandler: (e: React.FormEvent<HTMLFormElement>, formData: FormData) => void;
};

export default function CaseForm({ CasesSubmitHandler }: PropsType): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [photos, setPhotos] = useState<{ [key: string]: File | null }>({
    photo1: null,
    photo2: null,
    photo3: null,
    photo4: null,
    photo5: null,
  });

  const openModal = (): void => setIsOpen(true);
  const closeModal = (): void => setIsOpen(false);

  const wrappedCasesSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Добавляем фотографии в FormData с правильными именами полей
    Object.entries(photos).forEach(([key, file]) => {
      if (file) {
        formData.append(key, file);
      }
    });

    CasesSubmitHandler(e, formData);
    closeModal();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, key: string): void => {
    if (e.target.files && e.target.files[0]) {
      setPhotos((prevPhotos) => ({
        ...prevPhotos,
        [key]: e.target.files![0],
      }));
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

                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, 'photo1')}
                  placeholder="Загрузить фото 1"
                />
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, 'photo2')}
                  placeholder="Загрузить фото 2"
                />
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, 'photo3')}
                  placeholder="Загрузить фото 3"
                />
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, 'photo4')}
                  placeholder="Загрузить фото 4"
                />
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, 'photo5')}
                  placeholder="Загрузить фото 5"
                />

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
