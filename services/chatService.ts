import { Chat, Message } from '@/types/chat';

// Mock chats data
const mockChats: Chat[] = [
  {
    id: '1',
    name: 'Dr. Augusto Mendes',
    avatarUrl: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg',
    lastMessage: 'Olá! Como está se sentindo após a sessão de acupuntura?',
    lastMessageTime: '2025-05-19T14:30:00Z',
    unreadCount: 2,
    online: true,
  },
  {
    id: '2',
    name: 'Dra. Julia Santos',
    avatarUrl: 'https://images.pexels.com/photos/5327584/pexels-photo-5327584.jpeg',
    lastMessage: 'Confirmo sua aula de yoga para amanhã às 15h.',
    lastMessageTime: '2025-05-18T10:15:00Z',
    unreadCount: 0,
    online: false,
  },
  {
    id: '3',
    name: 'UBS Centro',
    avatarUrl: 'https://images.pexels.com/photos/668298/pexels-photo-668298.jpeg',
    lastMessage: 'Sua consulta de homeopatia foi remarcada para a próxima quarta.',
    lastMessageTime: '2025-05-17T09:45:00Z',
    unreadCount: 1,
    online: false,
  },
];

// Mock messages data
const mockMessages: { [key: string]: Message[] } = {
  '1': [
    {
      id: '1',
      chatId: '1',
      senderId: '3', // Dr. Augusto
      text: 'Olá, Carlos! Como está se sentindo após nossa sessão de acupuntura?',
      timestamp: '2025-05-19T14:00:00Z',
    },
    {
      id: '2',
      chatId: '1',
      senderId: '1', // Patient
      text: 'Olá, Dr. Augusto! Estou me sentindo muito melhor. A dor nas costas diminuiu consideravelmente.',
      timestamp: '2025-05-19T14:15:00Z',
    },
    {
      id: '3',
      chatId: '1',
      senderId: '3', // Dr. Augusto
      text: 'Que ótima notícia! Isso é um sinal de que o tratamento está sendo eficaz.',
      timestamp: '2025-05-19T14:20:00Z',
    },
    {
      id: '4',
      chatId: '1',
      senderId: '3', // Dr. Augusto
      text: 'Lembre-se de fazer os exercícios de alongamento que recomendei também.',
      timestamp: '2025-05-19T14:22:00Z',
    },
    {
      id: '5',
      chatId: '1',
      senderId: '3', // Dr. Augusto
      text: 'Olá! Como está se sentindo após a sessão de acupuntura?',
      timestamp: '2025-05-19T14:30:00Z',
    },
  ],
  '2': [
    {
      id: '1',
      chatId: '2',
      senderId: '4', // Dra. Julia
      text: 'Olá, Carlos! Gostaria de confirmar sua presença na aula de yoga amanhã às 15h.',
      timestamp: '2025-05-18T10:00:00Z',
    },
    {
      id: '2',
      chatId: '2',
      senderId: '1', // Patient
      text: 'Olá, Dra. Julia! Sim, estarei presente. Preciso levar algum material específico?',
      timestamp: '2025-05-18T10:10:00Z',
    },
    {
      id: '3',
      chatId: '2',
      senderId: '4', // Dra. Julia
      text: 'Apenas traga roupas confortáveis e uma garrafa de água. Nós fornecemos os tapetes.',
      timestamp: '2025-05-18T10:15:00Z',
    },
  ],
  '3': [
    {
      id: '1',
      chatId: '3',
      senderId: '5', // UBS
      text: 'Prezado Carlos, informamos que sua consulta de homeopatia precisou ser remarcada devido a um imprevisto com o Dr. Henrique.',
      timestamp: '2025-05-17T09:30:00Z',
    },
    {
      id: '2',
      chatId: '3',
      senderId: '5', // UBS
      text: 'A nova data será na próxima quarta-feira, dia 21/05, às 14h. Por favor, confirme se essa data é possível para você.',
      timestamp: '2025-05-17T09:35:00Z',
    },
    {
      id: '3',
      chatId: '3',
      senderId: '1', // Patient
      text: 'Entendo. Sim, a nova data funciona para mim. Confirmo minha presença.',
      timestamp: '2025-05-17T09:40:00Z',
    },
    {
      id: '4',
      chatId: '3',
      senderId: '5', // UBS
      text: 'Sua consulta de homeopatia foi remarcada para a próxima quarta.',
      timestamp: '2025-05-17T09:45:00Z',
    },
  ],
};

// Simulate API calls
export const getChats = async (): Promise<Chat[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return mockChats;
};

export const getChatMessages = async (chatId: string): Promise<Message[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return mockMessages[chatId] || [];
};

export const sendMessage = async (messageData: {
  chatId: string;
  text: string;
  senderId: string;
}): Promise<Message> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newMessage: Message = {
    id: `${Date.now()}`, // Generate a unique ID
    chatId: messageData.chatId,
    senderId: messageData.senderId,
    text: messageData.text,
    timestamp: new Date().toISOString(),
  };
  
  // In a real app, we would add this to the database and sync with other clients
  // For this demo, we'll just add it to our mock data
  if (mockMessages[messageData.chatId]) {
    mockMessages[messageData.chatId].push(newMessage);
  } else {
    mockMessages[messageData.chatId] = [newMessage];
  }
  
  // Also update the corresponding chat's last message
  const chat = mockChats.find(chat => chat.id === messageData.chatId);
  if (chat) {
    chat.lastMessage = messageData.text;
    chat.lastMessageTime = newMessage.timestamp;
    chat.unreadCount = 0; // Reset unread count for the sender
  }
  
  return newMessage;
};