import React, { useState } from 'react';
import { Box, Image, SimpleGrid, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalCloseButton, useColorModeValue, Flex } from '@chakra-ui/react';
import type { CaseType } from '../../types/CasesTypes';

export default function CasesCard({ caseItem }: { caseItem: CaseType }): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (image: string): void => {
    setSelectedImage(image);
    onOpen();
  };

  return (
    <Flex
      direction="column"
      p={6}
      backgroundColor="black"
      borderRadius="md"
      boxShadow="lg"
      mb={10}
      opacity={0.75} // Прозрачность только для внешнего контейнера
    >
      <Box opacity={1}> {/* Внутренний контейнер с полной непрозрачностью */}
        <Text fontSize="2xl" fontWeight="bold" mb={4} color="white">
          {caseItem.title}
        </Text>
        <Text fontSize="md" fontWeight="bold" mb={4} color="gray.300">
          {caseItem.description}
        </Text>
        <SimpleGrid columns={5} spacing={4} >
          {caseItem.photo1 && (
            <Box onClick={() => handleImageClick(caseItem.photo1)} cursor="pointer">
              <Image src={`/api/${caseItem.photo1}`} alt="case image 1" objectFit="cover" />
            </Box>
          )}
          {caseItem.photo2 && (
            <Box onClick={() => handleImageClick(caseItem.photo2)} cursor="pointer">
              <Image src={`/api/${caseItem.photo2}`} alt="case image 2" objectFit="cover" />
            </Box>
          )}
          {caseItem.photo3 && (
            <Box onClick={() => handleImageClick(caseItem.photo3)} cursor="pointer">
              <Image src={`/api/${caseItem.photo3}`} alt="case image 3" objectFit="cover" />
            </Box>
          )}
          {caseItem.photo4 && (
            <Box onClick={() => handleImageClick(caseItem.photo4)} cursor="pointer">
              <Image src={`/api/${caseItem.photo4}`} alt="case image 4" objectFit="cover" />
            </Box>
          )}
          {caseItem.photo5 && (
            <Box onClick={() => handleImageClick(caseItem.photo5)} cursor="pointer">
              <Image src={`/api/${caseItem.photo5}`} alt="case image 5" objectFit="cover" />
            </Box>
          )}
        </SimpleGrid>
      </Box>

      {selectedImage && (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent maxW="70vw" maxH="70vh">
            <ModalCloseButton />
            <Image 
              src={`/api/${selectedImage}`} 
              alt="Enlarged case image" 
              objectFit="contain" 
              w="100%" 
              h="auto" 
            />
          </ModalContent>
        </Modal>
      )}
    </Flex>
  );
}
