# Nutrition AI App

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Fastify](https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white)

Um aplicativo mobile de geração de dietas personalizadas utilizando Inteligência Artificial (Google Gemini). O app coleta informações do usuário como peso, altura, idade, objetivo e nível de atividade física para criar um plano alimentar completo e personalizado.

## 📱 Demonstração

O aplicativo oferece uma experiência completa em 3 passos:
1. **Dados Pessoais**: Nome, peso, altura e idade
2. **Perfil Fitness**: Gênero, nível de atividade e objetivo
3. **Dieta Personalizada**: Plano alimentar completo gerado por IA

## 🚀 Tecnologias

### Backend
- **Node.js** - Runtime JavaScript
- **Fastify** - Framework web de alto desempenho
- **TypeScript** - Superset JavaScript com tipagem estática
- **Google Generative AI (Gemini)** - IA para geração de dietas
- **dotenv** - Gerenciamento de variáveis de ambiente
- **tsx** - TypeScript executor para desenvolvimento

### Mobile
- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma para aplicativos React Native
- **TypeScript** - Tipagem estática
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **Zustand** - Gerenciamento de estado global
- **TanStack Query (React Query)** - Gerenciamento de requisições
- **Axios** - Cliente HTTP
- **Expo Router** - Navegação baseada em arquivos

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Expo CLI
- Conta Google Cloud com API Key do Gemini AI
- Dispositivo físico ou emulador para rodar o app mobile

## 🔧 Instalação

### Backend

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz da pasta backend:
```env
API_KEY=sua_chave_api_do_gemini
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3333`

### Mobile

1. Navegue até a pasta mobile:
```bash
cd mobile
```

2. Instale as dependências:
```bash
npm install
```

3. Configure a URL da API:
Edite o arquivo `mobile/services/api.ts` e ajuste o `baseURL` para o IP da sua máquina:
```typescript
export const api = axios.create({
    baseURL: 'http://SEU_IP:3333',
})
```

4. Inicie o Expo:
```bash
npx expo start
```

## 📱 Como Usar

1. **Tela Inicial**: Clique em "Entrar" para começar
2. **Passo 1**: Preencha seus dados pessoais (nome, peso, altura, idade)
3. **Passo 2**: Selecione seu gênero, nível de atividade física e objetivo
4. **Aguarde**: A IA processará suas informações
5. **Resultado**: Visualize sua dieta personalizada com refeições e suplementos
6. **Compartilhar**: Exporte sua dieta via compartilhamento nativo

## 🏗️ Estrutura do Projeto

### Backend
```
backend/
├── src/
│   ├── controllers/
│   │   └── CreateNutritionController.ts
│   ├── services/
│   │   └── CreateNutritionService.ts
│   ├── routes.ts
│   └── server.ts
├── .env
├── .gitignore
├── package.json
└── tsconfig.json
```

### Mobile
```
mobile/
├── app/
│   ├── create/
│   │   └── index.tsx
│   ├── nutrition/
│   │   └── index.tsx
│   ├── step/
│   │   └── index.tsx
│   ├── _layout.tsx
│   └── index.tsx
├── components/
│   ├── header/
│   ├── input/
│   └── ...
├── constants/
│   └── colors.ts
├── services/
│   └── api.ts
├── store/
│   └── data.ts
├── types/
│   └── data.ts
└── package.json
```

## 🔑 Funcionalidades

- ✅ Formulário multi-etapa com validação
- ✅ Geração de dieta personalizada via IA
- ✅ Plano alimentar completo com horários
- ✅ Sugestões de suplementos
- ✅ Compartilhamento de dietas
- ✅ Interface responsiva e intuitiva
- ✅ Feedback visual durante processamento
- ✅ Tratamento de erros

## 🎨 Paleta de Cores

```typescript
background: '#090909'    // Preto principal
grey: '#181A1D'         // Cinza escuro
lightGrey: '#939696'    // Cinza claro
yellow: '#FFD03E'       // Amarelo destaque
white: '#fff'           // Branco
red: '#ff0000'          // Vermelho (erros)
```

## 📡 Endpoints da API

### `POST /create`
Cria uma dieta personalizada baseada nos dados do usuário.

**Body:**
```json
{
  "name": "string",
  "weight": "string",
  "height": "string",
  "age": "string",
  "gender": "string",
  "objective": "string",
  "level": "string"
}
```

**Response:**
```json
{
  "data": {
    "nome": "string",
    "sexo": "string",
    "idade": number,
    "peso": number,
    "altura": number,
    "objetivo": "string",
    "refeicoes": [
      {
        "horario": "string",
        "nome": "string",
        "alimentos": ["string"]
      }
    ],
    "suplementos": ["string"]
  }
}
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença ISC.

## 👨‍💻 Autor

Desenvolvido com 💪 por Luiz Lima.
Inspirado em Dieta.AI by Sujeito Programador

---

**Grow stronger everyday!** 🏋️‍♂️
