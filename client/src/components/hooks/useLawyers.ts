import type React from 'react';
import { useEffect } from 'react';
import { createLawyerThunk, deleteLawyerThunk, editLawyerThunk, getLawyersThunk } from '../../redux/Lawyers/LawyerAsyncActions';
import type { EditLawyerType, LawyerType } from '../../types/LawyerTypes';
import { useAppDispatch, useAppSelector } from './reduxHooks';

export default function useLawyers(): {
  lawyers: LawyerType[];
  LawyersSubmitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  deleteHandler: (id: LawyerType['id']) => void
  editHandler: ( obj: EditLawyerType) => void
} {
  const lawyers = useAppSelector((state) => state.lawyers.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getLawyersThunk());
  }, [dispatch]);

  const LawyersSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as unknown as LawyerType;
    void dispatch(createLawyerThunk(data));
  };

  const deleteHandler = (id: LawyerType['id']): void => {
    void dispatch(deleteLawyerThunk(id));
  }

  const editHandler = ( obj: EditLawyerType): void => {
    void dispatch(editLawyerThunk(obj));
  }

  return { lawyers, LawyersSubmitHandler, deleteHandler, editHandler };
};