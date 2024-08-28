import React, { useState } from 'react';
import { Box, Image, SimpleGrid, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalCloseButton, useColorModeValue } from '@chakra-ui/react';
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
    <Box mb={10} >
      <Text fontSize="2xl" fontWeight="bold" mb={4} color='white' backgroundColor={useColorModeValue('gray.900', 'gray.900')}
    opacity={0.75}>
        {caseItem.title}
      </Text>
      <Text fontSize="2xl" fontWeight="bold" mb={4} color='black' backgroundColor={useColorModeValue('gray.900', 'gray.900')}>
        {caseItem.description}
      </Text>
      <SimpleGrid columns={5} spacing={4}>
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

      {selectedImage && (
       <Modal isOpen={isOpen} onClose={onClose} isCentered>
       <ModalOverlay />
       <ModalContent maxW="70vw" maxH="70vh"> 
         <ModalCloseButton />
         <Image 
           src={`/api/${selectedImage}`} 
           alt="Enlarged case image" 
           objectFit="contain" // Чтобы изображение адаптировалось к размеру окна
           w="100%" // Ширина изображения 100% от модального окна
           h="auto" // Автоматическая высота для сохранения пропорций
         />
       </ModalContent>
     </Modal>
      )}
    </Box>
  );
}
