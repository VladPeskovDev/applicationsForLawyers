import { useEffect } from 'react';
import { createCaseThunk, deleteCaseThunk, editCaseThunk, getCasesThunk } from '../../redux/cases/CaseAsyncActions';
import type { CaseType, EditCaseType } from '../../types/CasesTypes';
import { useAppDispatch, useAppSelector } from './reduxHooks';

export default function useCases(): {
  cases: CaseType[];
  CasesSubmitHandler: (e: React.FormEvent<HTMLFormElement>, formData: FormData) => void;
  deleteCaseHandler: (id: CaseType['id']) => void;
  editCaseHandler: (obj: EditCaseType) => void;
} {
  const cases = useAppSelector((state) => state.cases.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getCasesThunk());
  }, [dispatch]);

  const CasesSubmitHandler = (e: React.FormEvent<HTMLFormElement>, formData: FormData): void => {
    e.preventDefault();
    
    // Отправка формы с фотографиями
    void dispatch(createCaseThunk(formData));
  };

  const deleteCaseHandler = (id: CaseType['id']): void => {
    void dispatch(deleteCaseThunk(id));
  };

  const editCaseHandler = (obj: EditCaseType): void => {
    void dispatch(editCaseThunk(obj));
  };

  return { cases, CasesSubmitHandler, deleteCaseHandler, editCaseHandler };
}
