import {
  Card,
  CardBody,
  Heading,
  ButtonGroup,
  Button,
  Image,
  Text,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Stack,
  Divider,
  CardFooter,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import type { EditLawyerType, LawyerType } from '../../types/LawyerTypes';

type LawyerCardTypes = {
  lawyer: LawyerType;
  deleteHandler: (id: LawyerType['id']) => void;
  editHandler: (obj: EditLawyerType) => void;
  isAdminPage: boolean; // новый пропс для проверки, какая страница
};

export default function LawyerCard({ lawyer, deleteHandler, editHandler, isAdminPage }: LawyerCardTypes): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editName, setEditName] = useState(lawyer.name);
  const [editDescription, setEditDescription] = useState(lawyer.description);
  const [editEducation, setEditEducation] = useState(lawyer.education);
  const [editPhoto, setEditPhoto] = useState(lawyer.photo);
  const [editPhone, setEditPhone] = useState(lawyer.phone);
  const [editTelegram, setEditTelegram] = useState(lawyer.telegram);

  const handleSave = (): void => {
    editHandler({
      id: lawyer.id,
      data: {
        name: editName,
        description: editDescription,
        education: editEducation,
        photo: editPhoto,
        phone: editPhone,
        telegram: editTelegram,
      },
    });
    onClose();
  };

  return (
    <Card maxW="md" borderRadius="lg" overflow="hidden" position="relative">
      <Box position="relative" height="575px" width="100%" mb={-10}>
        <Image 
          src={lawyer.photo}
          alt="Lawyer's Photo"
          objectFit="cover"
          width="100%"
          height="100%"
          opacity={0.9} // делаем изображение полупрозрачным
          position="absolute"
          top="0"
          left="0"
        />
        <Box
          position="absolute"
          bottom="0"
          left="0"
          width="100%"
          color="white"
          p="4"
          bgGradient="linear(to-t, rgba(0, 0, 0, 0.7), transparent)" // градиент для улучшения читабельности текста
        >
          <Heading size="md">{lawyer.name}</Heading>
          <Text>{lawyer.education}</Text>
          <Text>{lawyer.description}</Text>
          <Text color="blue.300" fontSize="lg">
            {lawyer.phone}
          </Text>
          <Text>{lawyer.telegram}</Text>
        </Box>
      </Box>

      <CardBody>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Редактировать</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={3}>
                <Input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Редактировать имя"
                />
                <Input
                  value={editPhoto}
                  onChange={(e) => setEditPhoto(e.target.value)}
                  placeholder="Редактировать фото"
                />
                <Input
                  value={editEducation}
                  onChange={(e) => setEditEducation(e.target.value)}
                  placeholder="Редактировать учебное заведение"
                />
                <Input
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Редактировать описание профиля"
                />
                <Input
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  placeholder="Редактировать телефон"
                />
                <Input
                  value={editTelegram}
                  onChange={(e) => setEditTelegram(e.target.value)}
                  placeholder="Редактировать Telegram"
                />
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleSave}>
                ОК
              </Button>
              <Button variant="outline" onClick={onClose}>
                Отмена
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          {isAdminPage ? (
            <>
              <Button onClick={onOpen} variant="outline" colorScheme="gray">
                Редактировать
              </Button>
              <Button onClick={() => deleteHandler(lawyer.id)} variant="outline" colorScheme="red">
                Удалить
              </Button>
            </>
          ) : (
            <>
              <Button variant='outline' colorScheme="teal">
                Записать на прием
              </Button>
              <Button variant="outline" colorScheme="teal" ml={111}>
                Заказать звонок
              </Button>
            </>
          )}
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}
