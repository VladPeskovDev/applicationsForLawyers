import React, { useState } from 'react';
import { Box, Image, SimpleGrid, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalCloseButton } from '@chakra-ui/react';

interface Case {
  title: string;
  images: string[];
}

export default function CasesCard({ caseItem }: { caseItem: Case }): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    onOpen();
  };

  return (
    <Box mb={10}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        {caseItem.title}
      </Text>
      <SimpleGrid columns={5} spacing={4}>
        {caseItem.images.map((image, index) => (
          <Box key={index} onClick={() => handleImageClick(image)} cursor="pointer">
            <Image src={image} alt={`case image ${index}`} objectFit="cover" />
          </Box>
        ))}
      </SimpleGrid>

      {/* Модальное окно для увеличенного изображения */}
      {selectedImage && (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <Image src={selectedImage} alt="Enlarged case image" />
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
}
