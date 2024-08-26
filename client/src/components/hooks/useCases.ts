import { useEffect } from 'react';
import { createCaseThunk, deleteCaseThunk, editCaseThunk, getCasesThunk } from '../../redux/cases/CaseAsyncActions';
import type { CaseType, EditCaseType } from '../../types/CasesTypes';
import { useAppDispatch, useAppSelector } from './reduxHooks';

export default function useCases(): {
  cases: CaseType[];
  CasesSubmitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  deleteCaseHandler: (id: CaseType['id']) => void;
  editCaseHandler: (obj: EditCaseType) => void;
} {
  const cases = useAppSelector((state) => state.cases.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getCasesThunk());
  }, [dispatch]);

  const CasesSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: CaseType = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      photo1: formData.get('photo1') as string,
      photo2: formData.get('photo2') as string,
      photo3: formData.get('photo3') as string,
      photo4: formData.get('photo4') as string,
      photo5: formData.get('photo5') as string,
    };
    void dispatch(createCaseThunk(data));
  };

  const deleteCaseHandler = (id: CaseType['id']): void => {
    void dispatch(deleteCaseThunk(id));
  };

  const editCaseHandler = (obj: EditCaseType): void => {
    void dispatch(editCaseThunk(obj));
  };

  return { cases, CasesSubmitHandler, deleteCaseHandler, editCaseHandler };
}
