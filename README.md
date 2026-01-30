# 🚗 Seguro Carro — Frontend

Frontend do projeto **Seguro Carro**, uma aplicação web para cotação, contratação e gerenciamento de seguros automotivos.  
Foco em **performance**, **acessibilidade** e **DX** (Developer Experience).

---

## ✨ Principais Funcionalidades

- Cotação de seguro por dados do veículo e perfil do condutor
- Simulação de planos e coberturas
- Carrinho/checkout com resumo da apólice
- Área autenticada: apólices, boletos/faturas e sinistros
- Painel administrativo (opcional)
- **Acessibilidade** (WAI-ARIA) e **design responsivo**
- Integração com API backend (`/api/*`)
<!-- Ajuste a lista conforme o seu escopo real -->

---

## 🧱 Stack Técnica

<!-- Ajuste conforme o seu projeto -->
- **Framework:** React (Vite) / Next.js
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS 
- **State Management:** React Query / Redux Toolkit / Context API
- **Formulários:** React Hook Form + Zod/Yup
- **HTTP Client:** fetch/axios
- **Qualidade:** ESLint + Prettier + Husky (pre-commit)
- **CI/CD:** GitHub Actions

---

## 📂 Estrutura de Pastas

```text
seguro-carro-front/
├─ public/                 # assets estáticos
├─ src/
│  ├─ assets/              # imagens, ícones
│  ├─ components/          # componentes reutilizáveis
│  ├─ features/            # domínios (ex.: quote, policy, auth)
│  ├─ hooks/               # hooks customizados
│  ├─ layouts/             # layouts de páginas
│  ├─ pages/ or app/       # roteamento (React Router ou Next.js app/)
│  ├─ services/            # chamadas à API, clients
│  ├─ store/               # estado global (se aplicável)
│  ├─ styles/              # estilos globais / tailwind.css
│  ├─ utils/               # helpers utilitários
│  ├─ main.tsx / index.tsx # entry point
│  └─ vite-env.d.ts        # tipos Vite (se Vite)
├─ .env.example
├─ package.json
├─ tsconfig.json
├─ README.md
└─ ... (eslint, prettier, configs)
``
 ##Como executar localmente

# 1) Instale as dependências
npm install
# ou
yarn

# 2) Rode em modo desenvolvimento
npm run dev
# ou
yarn dev

# Acesse: http://localhost:5173




