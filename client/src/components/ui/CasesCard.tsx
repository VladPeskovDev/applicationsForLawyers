import React, { useState } from 'react';
import { Box, Image, SimpleGrid, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalCloseButton } from '@chakra-ui/react';
import type { CaseType } from '../../types/CasesTypes';

export default function CasesCard({ caseItem }: { caseItem: CaseType }): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (image: string): void => {
    setSelectedImage(image);
    onOpen();
  };

  return (
    <Box mb={10}>
      <Text fontSize="2xl" fontWeight="bold" mb={4} color='black'>
        {caseItem.title}
      </Text>
      <Text fontSize="2xl" fontWeight="bold" mb={4} color='black'>
        {caseItem.description}
      </Text>
      <SimpleGrid columns={5} spacing={4}>
        {[caseItem.photo1, caseItem.photo2, caseItem.photo3, caseItem.photo4, caseItem.photo5]
          .filter(Boolean) // Фильтруем пустые значения
          .map((image, index) => (
            <Box key={index} onClick={() => handleImageClick(image!)} cursor="pointer">
              <Image src={image} alt={`case image ${index}`} objectFit="cover" />
            </Box>
          ))}
      </SimpleGrid>

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
