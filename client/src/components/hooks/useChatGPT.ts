/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../../redux/chatGPT/chatSlice';
import type { RootState } from '../../redux/store';


export default function useChatGPT(): {
  sendMessage: (message: string) => void;
} {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const username = useSelector((state: RootState) => state.auth.user?.username);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000'); // Подключение к WebSocket серверу
    setWs(socket);

    socket.onmessage = (event) => {
      dispatch(addMessage(`Помощник Федор: ${event.data}`)); // Получаем ответ от бота и обновляем состояние
    };

    return () => {
      socket.close(); // Закрываем соединение при размонтировании компонента
    };
  }, [dispatch]);

  const sendMessage = (message: string): void => {
    if (ws) {
      ws.send(message); // Отправляем сообщение через WebSocket
      dispatch(addMessage(`${username}: ${message}`)); // Обновляем состояние для пользователя
    }
  };

  return { sendMessage };
}
