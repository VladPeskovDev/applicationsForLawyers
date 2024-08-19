import { Card, CardBody, Stack, Heading, Divider, CardFooter, ButtonGroup,
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
  } from '@chakra-ui/react';
  import React, { useState } from 'react';
  import type { EditLawyerType, LawyerType } from '../../types/LawyerTypes';
  
  type LawyerCardTypes = {
    lawyer: LawyerType;
    deleteHandler: (id: LawyerType['id']) => void;
    editHandler: (obj: EditLawyerType) => void;
  };
  
  export default function LawyerCard({ lawyer, deleteHandler, editHandler }: LawyerCardTypes): JSX.Element {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [editName, setEditName] = useState(lawyer.name);
    const [editDescription, setEditDescription] = useState(lawyer.description);
    const [editEducation, setEditEducation] = useState(lawyer.education);
    const [editPhoto, setEditPhoto] = useState(lawyer.photo);
    const [editPhone, setEditPhone] = useState(lawyer.phone);
    const [editTelegram, setEditTelegram] = useState(lawyer.telegram);

  
    const handleSave = (): void => {
      editHandler({ id: lawyer.id, data: { name: editName, description: editDescription,  education: editEducation, photo: editPhoto, phone: editPhone, telegram: editTelegram } });
      onClose();
    };
  
    return (
      <Card maxW="sm" backgroundColor="rgba(212, 207, 207, 0.5)">
        <CardBody>
          <Stack mt="6" spacing="3">
          <Image src={lawyer.photo} alt="Todo Image" 
          objectFit="cover"
          height="200px"
          width="100%"
          borderTopLeftRadius="lg"
          borderTopRightRadius="lg" />
            <Heading size="md">{lawyer.name}</Heading>
            <Text>{lawyer.education}</Text>
            <Text>{lawyer.description}</Text>
            <Text color="blue.600" fontSize="2xl">
              {lawyer.phone} 
            </Text>
            <Text>{lawyer.telegram}</Text>
          </Stack>
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
                    value={editEducation.toString()}
                    onChange={(e) => setEditEducation(e.target.value)}
                    placeholder="Редактировать учебное заведение"
                  />
                  <Input
                    value={editDescription.toString()}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Редактировать описание профиля"
                  />
                  <Input
                    value={editPhone.toString()}
                    onChange={(e) => setEditPhone(e.target.value)}
                    placeholder="Редактировать телефон"
                  />
                  <Input
                    value={editTelegram.toString()}
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
          <Button onClick={onOpen} variant="outline" colorScheme="gray">
              Редактировать
            </Button>
            <Button onClick={() => deleteHandler(lawyer.id)} variant="outline" colorScheme="red">
              Удалить
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    );
  }