# BioSearch

BioSearch é um aplicativo web que recebe a foto de uma planta e usa IA para identificar informações úteis sobre ela, como espécie provável, cuidados, sinais de saúde e orientações básicas de manutenção.

## Sobre

O projeto visa utilizar de maneira real os conhecimentos obtidos na matéria de Ferramentas Web e UX, realizando a produção de um website a partir de um protótipo de aplicação feita no figma.


## Como rodar o site

### Pré-requisitos

- Node.js 18 ou superior
- npm 9 ou superior

### Passo a passo

1. Clone o repositório.

```bash
git clone https://github.com/biosearch-web/biosearch-website.git
```

2. Acesse a pasta do app.

```bash
cd BioSearch
```

3. Instale as dependências:

```bash
npm install
```

4. Instale o TailwindCSS no projeto:

```bash
npm install tailwindcss @tailwindcss/vite
```

5. Configure o plugin do TailwindCSS no Vite (arquivo `vite.config.js`):

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

6. Importe o TailwindCSS no CSS global (exemplo em `src/index.css`):

```css
@import "tailwindcss";
```

7. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

8. Abra no navegador o endereço exibido no terminal (exemplo: `http://localhost:5173`).

## Scripts disponíveis

- `npm run dev`: inicia em modo desenvolvimento
- `npm run build`: gera versão de produção
- `npm run preview`: visualiza build localmente

## Contribuição

1. Faça um fork do projeto.
2. Crie uma branch para sua feature.
3. Commit suas alterações.
4. Abra um Pull Request.
