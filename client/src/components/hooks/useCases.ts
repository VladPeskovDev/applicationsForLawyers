import { useState } from 'react';

interface Case {
  title: string;
  images: string[];
}

export default function useCases() {
  const [cases, setCases] = useState<Case[]>([
    {
      title: 'Кейс 1',
      images: ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg'],
    },
    {
      title: 'Кейс 2',
      images: ['image6.jpg', 'image7.jpg', 'image8.jpg', 'image9.jpg', 'image10.jpg'],
    },
  ]);

  const addCase = (newCase: Case): void => {
    setCases([...cases, newCase]);
  };

  const deleteCase = (caseIndex: number): void => {
    setCases(cases.filter((_, index) => index !== caseIndex));
  };

  const editCase = (caseIndex: number, updatedCase: Case): void => {
    const updatedCases = [...cases];
    updatedCases[caseIndex] = updatedCase;
    setCases(updatedCases);
  };

  const handleCaseSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newCase = {
      title: formData.get('title') as string,
      images: Array.from(formData.getAll('images')) as string[], // assuming images are URLs for simplicity
    };
    addCase(newCase);
  };

  return {
    cases,
    addCase,
    deleteCase,
    editCase,
    handleCaseSubmit, // Возвращаем обработчик формы
  };
}
