import { Event } from '@/types/event';

// Mock data for events
const mockEvents: Event[] = [
  {
    id: '1',
    eventName: 'Palestra sobre Bem-Estar',
    date: '',
    location: 'Auditório Principal da UNB',
    description: 'Uma palestra inspiradora sobre como manter um estilo de vida saudável e equilibrado.',
    imageUrl: 'https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    organizer: 'Secretaria de Saúde',
    category: 'Saúde',
  },
  {
    id: '2',
    eventName: 'Grupo de Caminhada Matinal',
    date: '',
    location: 'Parque da Cidade',
    description: 'Junte-se ao nosso grupo de caminhada para começar o dia com energia e boa companhia.',
    imageUrl: 'https://images.pexels.com/photos/1571673/pexels-photo-1571673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    organizer: 'Comunidade Ativa',
    category: 'Exercício',
  },
  {
    id: '3',
    eventName: 'Workshop de Alimentação Saudável',
    date: '',
    location: 'Cozinha Comunitária do Varjão',
    description: 'Aprenda receitas fáceis e nutritivas para o dia a dia neste workshop prático.',
    imageUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    organizer: 'Nutricionistas da UBS',
    category: 'Nutrição',
  },
  {
    id: '4',
    eventName: 'Aula de Yoga ao Ar Livre',
    date: '',
    location: 'Jardim da Cidade',
    description: 'Relaxe e conecte-se com a natureza em nossa aula de yoga ao ar livre.',
    imageUrl: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    organizer: 'Instrutores de Yoga Voluntários',
    category: 'Bem-Estar',
  },
];

// Function to get all events (mocked)
export const getAllEvents = async (): Promise<Event[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockEvents;
};

// Function to get a single event by ID (mocked)
export const getEventById = async (id: string): Promise<Event | undefined> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockEvents.find(event => event.id === id);
};

// Adicione mais funções conforme necessário, como criar, atualizar ou deletar eventos.