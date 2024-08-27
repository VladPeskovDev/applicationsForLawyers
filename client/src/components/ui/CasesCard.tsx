import React, { useState } from 'react';
import { Box, Image, SimpleGrid, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalCloseButton } from '@chakra-ui/react';
import type { CaseType } from '../../types/CasesTypes';

export default function CasesCard({ caseItem }: { caseItem: CaseType }): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  console.log(caseItem);

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
        {caseItem.photo1 && (
          <Box onClick={() => handleImageClick(caseItem.photo1)} cursor="pointer">
            <Image src={`/api${caseItem.photo1}`} alt="case image 1" objectFit="cover" />

          </Box>
        )}
        {caseItem.photo2 && (
          <Box onClick={() => handleImageClick(caseItem.photo2)} cursor="pointer">
            <Image src={caseItem.photo2} alt="case image 2" objectFit="cover" />
          </Box>
        )}
        {caseItem.photo3 && (
          <Box onClick={() => handleImageClick(caseItem.photo3)} cursor="pointer">
            <Image src={caseItem.photo3} alt="case image 3" objectFit="cover" />
          </Box>
        )}
        {caseItem.photo4 && (
          <Box onClick={() => handleImageClick(caseItem.photo4)} cursor="pointer">
            <Image src={caseItem.photo4} alt="case image 4" objectFit="cover" />
          </Box>
        )}
        {caseItem.photo5 && (
          <Box onClick={() => handleImageClick(caseItem.photo5)} cursor="pointer">
            <Image src={caseItem.photo5} alt="case image 5" objectFit="cover" />
          </Box>
        )}
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
