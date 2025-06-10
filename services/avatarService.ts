export interface PresetAvatar {
  id: string;
  name: string;
  imageUrl: string;
  category: 'diverse-ethnicity' | 'accessibility' | 'lgbtq+' | 'age-diverse' | 'general';
  description: string;
}

// Avatares inclusivos com diversidade étnica, de gênero, idade e acessibilidade
export const presetAvatars: PresetAvatar[] = [
  // Diversidade Étnica
  {
    id: 'avatar-1',
    name: 'Mulher Negra',
    imageUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    category: 'diverse-ethnicity',
    description: 'Avatar de mulher negra sorridente'
  },
  {
    id: 'avatar-2',
    name: 'Homem Asiático',
    imageUrl: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    category: 'diverse-ethnicity',
    description: 'Avatar de homem asiático profissional'
  },
  {
    id: 'avatar-3',
    name: 'Mulher Latina',
    imageUrl: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    category: 'diverse-ethnicity',
    description: 'Avatar de mulher latina confiante'
  },
  {
    id: 'avatar-4',
    name: 'Homem Indígena',
    imageUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    category: 'diverse-ethnicity',
    description: 'Avatar de homem indígena'
  },
  {
    id: 'avatar-5',
    name: 'Mulher Árabe',
    imageUrl: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    category: 'diverse-ethnicity',
    description: 'Avatar de mulher árabe com hijab'
  },
  
  // Acessibilidade
  {
    id: 'avatar-6',
    name: 'Pessoa em Cadeira de Rodas',
    imageUrl: 'https://images.pexels.com/photos/6975474/pexels-photo-6975474.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    category: 'accessibility',
    description: 'Avatar de pessoa em cadeira de rodas'
  },
  {
    id: 'avatar-7',
    name: 'Pessoa com Deficiência Visual',
    imageUrl: 'https://images.pexels.com/photos/6975462/pexels-photo-6975462.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    category: 'accessibility',
    description: 'Avatar de pessoa com deficiência visual'
  },
  {
    id: 'avatar-8',
    name: 'Pessoa com Prótese',
    imageUrl: 'https://images.pexels.com/photos/6975456/pexels-photo-6975456.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    category: 'accessibility',
    description: 'Avatar de pessoa com prótese no braço'
  },
  
  // Diversidade de Idade
  {
    id: 'avatar-9',
    name: 'Idoso Ativo',
    imageUrl: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    category: 'age-diverse',
    description: 'Avatar de homem idoso ativo'
  },
  {
    id: 'avatar-10',
    name: 'Idosa Sorridente',
    imageUrl: 'https://images.pexels.com/photos/1559484/pexels-photo-1559484.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    category: 'age-diverse',
    description: 'Avatar de mulher idosa sorridente'
  },
  {
    id: 'avatar-11',
    name: 'Jovem Estudante',
    imageUrl: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    category: 'age-diverse',
    description: 'Avatar de jovem estudante'
  },
  
  // LGBTQ+
  {
    id: 'avatar-12',
    name: 'Pessoa Não-Binária',
    imageUrl: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    category: 'lgbtq+',
    description: 'Avatar de pessoa não-binária'
  },
  {
    id: 'avatar-13',
    name: 'Homem Trans',
    imageUrl: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    category: 'lgbtq+',
    description: 'Avatar de homem trans'
  },
  {
    id: 'avatar-14',
    name: 'Mulher Trans',
    imageUrl: 'https://images.pexels.com/photos/1181687/pexels-photo-1181687.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    category: 'lgbtq+',
    description: 'Avatar de mulher trans'
  },
  
  // Gerais
  {
    id: 'avatar-15',
    name: 'Profissional de Saúde',
    imageUrl: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    category: 'general',
    description: 'Avatar de profissional de saúde'
  },
  {
    id: 'avatar-16',
    name: 'Pessoa com Tatuagens',
    imageUrl: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    category: 'general',
    description: 'Avatar de pessoa com tatuagens'
  }
];

export const getAvatarsByCategory = (category?: string): PresetAvatar[] => {
  if (!category) return presetAvatars;
  return presetAvatars.filter(avatar => avatar.category === category);
};

export const getAvatarById = (id: string): PresetAvatar | undefined => {
  return presetAvatars.find(avatar => avatar.id === id);
};

export const getDefaultAvatar = (): PresetAvatar => {
  return presetAvatars[0];
};