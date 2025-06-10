# Funcionalidades de Avatar e Acessibilidade

Este documento descreve as novas funcionalidades implementadas para seleção de avatar inclusivo e configurações de acessibilidade.

## 🎭 Sistema de Avatar Inclusivo

### Características
- **Diversidade Étnica**: Avatares representando diferentes etnias e culturas
- **Acessibilidade**: Representação de pessoas com deficiências
- **LGBTQ+**: Inclusão de diversidade de gênero e sexualidade
- **Diversidade Etária**: Avatares de diferentes faixas etárias
- **Upload Personalizado**: Opção de usar foto própria via câmera ou galeria

### Como Usar
1. Acesse o perfil do usuário
2. Toque no avatar atual (ícone de câmera aparecerá)
3. Escolha entre:
   - **Avatares Predefinidos**: Organizados por categorias inclusivas
   - **Câmera**: Tire uma nova foto
   - **Galeria**: Selecione uma foto existente

### Categorias de Avatares
- 🌍 **Diversidade Étnica**: Representação de diferentes etnias
- ♿ **Acessibilidade**: Pessoas com deficiências
- 🏳️‍🌈 **LGBTQ+**: Diversidade de gênero e sexualidade
- 👶👴 **Todas as Idades**: Diferentes faixas etárias
- 👤 **Geral**: Avatares diversos

## ♿ Sistema de Acessibilidade

### Funcionalidades

#### 1. Ajuste de Tamanho de Texto
- **Pequeno**: 14px
- **Médio**: 16px (padrão)
- **Grande**: 18px
- **Extra Grande**: 22px

#### 2. Alto Contraste
- Melhora a legibilidade para pessoas com baixa visão
- Aumenta o contraste entre texto e fundo
- Útil para usuários com deficiência visual

#### 3. Lupa de Aumento
- **Ativação**: Toque duplo em qualquer área da tela
- **Navegação**: Arraste para mover a área ampliada
- **Desativação**: Toque simples na tela
- **Ampliação**: 2x o tamanho original

### Como Configurar
1. Acesse o perfil do usuário
2. Na seção "Acessibilidade", toque em:
   - **Tamanho do Texto**: Para ajustar o tamanho da fonte
   - **Lupa de Aumento**: Para ativar/desativar a lupa
3. Ajuste as configurações conforme necessário
4. Visualize as mudanças na seção de preview
5. Salve as configurações

## 🛠️ Implementação Técnica

### Arquivos Criados

#### Serviços
- `services/avatarService.ts`: Gerenciamento de avatares predefinidos

#### Componentes
- `components/profile/AvatarSelector.tsx`: Seletor de avatar com categorias
- `components/profile/AccessibilitySettings.tsx`: Configurações de acessibilidade
- `components/ui/Magnifier.tsx`: Componente de lupa com gestos

#### Hooks
- `hooks/useAccessibility.ts`: Hook para gerenciar configurações globalmente

#### Tipos
- Extensão do tipo `User` em `types/user.ts` para incluir avatar e acessibilidade

### Dependências Adicionadas
- `expo-image-picker`: Para seleção de imagens
- `react-native-gesture-handler`: Para gestos da lupa
- `react-native-reanimated`: Para animações suaves

### Estrutura de Dados

```typescript
interface User {
  // ... campos existentes
  avatar?: {
    type: 'preset' | 'custom';
    value: string; // ID do preset ou URL da imagem
  };
  accessibility?: {
    fontSize: 'small' | 'medium' | 'large' | 'extra-large';
    highContrast: boolean;
    magnifierEnabled: boolean;
  };
}
```

## 🎯 Benefícios

### Inclusão e Diversidade
- Representação visual de diferentes grupos sociais
- Promoção da inclusão no ambiente digital
- Respeito à diversidade de usuários do SUS

### Acessibilidade
- Conformidade com diretrizes de acessibilidade
- Melhoria da experiência para usuários com deficiências
- Personalização conforme necessidades individuais

### Experiência do Usuário
- Interface mais personalizada
- Maior engajamento com o aplicativo
- Facilidade de uso para diferentes perfis de usuários

## 🔧 Configuração para Desenvolvimento

### Instalação de Dependências
```bash
npm install expo-image-picker react-native-gesture-handler react-native-reanimated
```

### Configuração do Expo
Certifique-se de que as permissões estão configuradas no `app.json`:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-image-picker",
        {
          "photosPermission": "O aplicativo acessa suas fotos para permitir que você escolha um avatar personalizado.",
          "cameraPermission": "O aplicativo acessa sua câmera para permitir que você tire uma foto para seu avatar."
        }
      ]
    ]
  }
}
```

## 📱 Uso da Lupa

### Gestos Suportados
- **Toque Duplo**: Ativa a lupa na posição tocada
- **Arrastar**: Move a área de ampliação
- **Toque Simples**: Desativa a lupa

### Características da Lupa
- Ampliação de 2x
- Posicionamento inteligente (evita sair da tela)
- Indicador visual (crosshair) no centro
- Animações suaves de entrada e saída

## 🎨 Personalização

### Adicionando Novos Avatares
1. Edite `services/avatarService.ts`
2. Adicione novos objetos ao array `presetAvatars`
3. Defina categoria, nome, URL da imagem e descrição

### Ajustando Configurações de Acessibilidade
1. Modifique `hooks/useAccessibility.ts` para novos tamanhos de fonte
2. Ajuste `components/ui/Magnifier.tsx` para diferentes níveis de ampliação
3. Personalize cores e contrastes em `constants/colors.ts`

Este sistema foi desenvolvido seguindo as melhores práticas de acessibilidade e inclusão, garantindo que o aplicativo seja utilizável por todos os usuários do SUS, independentemente de suas características ou necessidades especiais.