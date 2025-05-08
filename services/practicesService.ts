import { Practice } from '@/types/practice';

// Mock practices data
const mockPractices: Practice[] = [
  {
    id: '1',
    name: 'Acupuntura',
    definition: 'Técnica terapêutica que consiste na aplicação de agulhas em pontos específicos do corpo para promover o equilíbrio energético.',
    origin: 'Originária da China antiga, com mais de 2.000 anos de história.',
    application: 'Aplica-se agulhas em pontos específicos do corpo para estimular o fluxo de energia.',
    indications: 'Dores crônicas, enxaqueca, ansiedade, insônia, entre outros.',
    benefits: 'Alívio de dores, redução do estresse, melhora do sono, equilíbrio emocional e fortalecimento do sistema imunológico.',
    contraindications: 'Hemofilia, uso de anticoagulantes, fobia de agulhas, gravidez de risco.',
    imageUrl: 'https://images.pexels.com/photos/3865560/pexels-photo-3865560.jpeg',
  },
  {
    id: '2',
    name: 'Yoga',
    definition: 'Prática que combina posturas físicas, técnicas de respiração e meditação para promover saúde física e mental.',
    origin: 'Originária da Índia, com mais de 5.000 anos de tradição.',
    application: 'Consiste em sequências de posturas (asanas), exercícios respiratórios (pranayama) e meditação.',
    indications: 'Estresse, ansiedade, dores musculares, flexibilidade reduzida, hipertensão.',
    benefits: 'Aumento da flexibilidade, fortalecimento muscular, redução do estresse, melhora da concentração e equilíbrio emocional.',
    contraindications: 'Algumas posturas são contraindicadas para gestantes, pessoas com hérnia de disco ou lesões específicas.',
    imageUrl: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg',
  },
  {
    id: '3',
    name: 'Fitoterapia',
    definition: 'Uso de plantas medicinais para o tratamento e prevenção de doenças.',
    origin: 'Prática milenar encontrada em diversas culturas ao redor do mundo.',
    application: 'Utilização de plantas medicinais na forma de chás, infusões, tinturas, cápsulas, entre outros.',
    indications: 'Diversos problemas de saúde, desde resfriados até condições crônicas como ansiedade e insônia.',
    benefits: 'Tratamento natural com menos efeitos colaterais, fortalecimento do sistema imunológico e ação preventiva.',
    contraindications: 'Algumas plantas podem interagir com medicamentos ou causar reações alérgicas. Gestantes e lactantes devem consultar um profissional.',
    imageUrl: 'https://images.pexels.com/photos/6663/desk-white-plant-herbal.jpg',
  },
  {
    id: '4',
    name: 'Meditação',
    definition: 'Prática de treinamento mental que promove atenção plena, concentração e consciência do momento presente.',
    origin: 'Presente em diversas tradições espirituais, especialmente no budismo e hinduísmo.',
    application: 'Consiste em técnicas para acalmar a mente e focar a atenção, geralmente na respiração ou em um mantra.',
    indications: 'Estresse, ansiedade, depressão, insônia, hipertensão.',
    benefits: 'Redução do estresse, melhora da concentração, equilíbrio emocional, redução da pressão arterial e aumento da imunidade.',
    contraindications: 'Geralmente segura, mas pessoas com transtornos psiquiátricos graves devem praticar sob orientação.',
    imageUrl: 'https://images.pexels.com/photos/3822863/pexels-photo-3822863.jpeg',
  },
  {
    id: '5',
    name: 'Reiki',
    definition: 'Técnica terapêutica que utiliza a imposição das mãos para canalizar energia vital e promover equilíbrio energético.',
    origin: 'Desenvolvido no Japão no início do século XX por Mikao Usui.',
    application: 'O terapeuta posiciona as mãos sobre ou próximo ao corpo do paciente para transferir energia vital.',
    indications: 'Estresse, ansiedade, dores, baixa imunidade, desequilíbrios emocionais.',
    benefits: 'Relaxamento profundo, alívio do estresse, equilíbrio emocional, fortalecimento do sistema imunológico.',
    contraindications: 'Não possui contraindicações, mas não substitui tratamentos médicos convencionais.',
    imageUrl: 'https://images.pexels.com/photos/8413049/pexels-photo-8413049.jpeg',
  },
  {
    id: '6',
    name: 'Arteterapia',
    definition: 'Uso de expressões artísticas como ferramenta terapêutica para promover autoconhecimento e bem-estar emocional.',
    origin: 'Desenvolvida a partir do século XX, com influências da psicanálise e da psicologia.',
    application: 'Utiliza desenho, pintura, modelagem, colagem e outras formas de expressão artística como meio terapêutico.',
    indications: 'Ansiedade, depressão, traumas, dificuldades de comunicação, conflitos emocionais.',
    benefits: 'Autoconhecimento, expressão de emoções reprimidas, redução do estresse, melhora da autoestima.',
    contraindications: 'Não possui contraindicações específicas.',
    imageUrl: 'https://images.pexels.com/photos/6684372/pexels-photo-6684372.jpeg',
  },
  {
    id: '7',
    name: 'Musicoterapia',
    definition: 'Uso da música e seus elementos como ferramenta terapêutica para promover saúde física e mental.',
    origin: 'Utilizada desde a antiguidade com finalidades curativas, formalizada como terapia no século XX.',
    application: 'Envolve escutar, cantar, tocar instrumentos e criar música sob orientação de um musicoterapeuta.',
    indications: 'Transtornos de desenvolvimento, doenças neurológicas, depressão, ansiedade, autismo.',
    benefits: 'Redução do estresse, melhora da comunicação, estímulo cognitivo, expressão emocional.',
    contraindications: 'Não possui contraindicações específicas, mas deve ser adaptada às necessidades individuais.',
    imageUrl: 'https://images.pexels.com/photos/4062561/pexels-photo-4062561.jpeg',
  },
  {
    id: '8',
    name: 'Homeopatia',
    definition: 'Sistema terapêutico baseado no princípio da similitude, utilizando substâncias diluídas e dinamizadas.',
    origin: 'Criada pelo médico alemão Samuel Hahnemann no final do século XVIII.',
    application: 'Utiliza medicamentos homeopáticos produzidos a partir de substâncias de origem vegetal, animal ou mineral, altamente diluídas.',
    indications: 'Diversas condições agudas e crônicas, tratando o indivíduo como um todo.',
    benefits: 'Tratamento individualizado, sem efeitos colaterais, estímulo à capacidade de autocura do organismo.',
    contraindications: 'Não substitui tratamentos convencionais em doenças graves ou emergências médicas.',
    imageUrl: 'https://images.pexels.com/photos/8540921/pexels-photo-8540921.jpeg',
  },
  {
    id: '9',
    name: 'Terapia Comunitária',
    definition: 'Abordagem que promove encontros comunitários para compartilhamento de experiências e apoio mútuo.',
    origin: 'Desenvolvida no Brasil pelo psiquiatra Adalberto Barreto na década de 1980.',
    application: 'Realizada em rodas de conversa onde os participantes compartilham problemas e soluções.',
    indications: 'Sofrimento emocional, isolamento social, conflitos familiares e comunitários.',
    benefits: 'Fortalecimento de vínculos sociais, resgate da autoestima, valorização da cultura e dos saberes locais.',
    contraindications: 'Não substitui tratamento psiquiátrico em casos graves.',
    imageUrl: 'https://images.pexels.com/photos/7148894/pexels-photo-7148894.jpeg',
  },
  {
    id: '10',
    name: 'Shantala',
    definition: 'Técnica de massagem para bebês originária da Índia, que promove vínculo afetivo e desenvolvimento saudável.',
    origin: 'Prática tradicional indiana trazida ao ocidente pelo médico francês Frédérick Leboyer nos anos 1970.',
    application: 'Série de movimentos realizados com as mãos em sequência específica no corpo do bebê.',
    indications: 'Cólicas, irritabilidade, problemas de sono, estresse do bebê.',
    benefits: 'Fortalecimento do vínculo mãe-bebê, estímulo ao desenvolvimento neurológico, melhora da digestão e do sono.',
    contraindications: 'Febre, infecções cutâneas, feridas abertas, após vacinação recente.',
    imageUrl: 'https://images.pexels.com/photos/4473765/pexels-photo-4473765.jpeg',
  },
];

// Simulate API calls
export const getPractices = async (): Promise<Practice[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return mockPractices;
};

export const getPracticeById = async (id: string): Promise<Practice> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const practice = mockPractices.find(practice => practice.id === id);
  
  if (!practice) {
    throw new Error('Practice not found');
  }
  
  return practice;
};