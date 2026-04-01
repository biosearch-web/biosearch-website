# [NOME DO PROJETO]

> [Breve descrição do projeto]

## Sobre

[Descreva aqui o objetivo do projeto.]

## Tecnologias

- [Tecnologia 1]
- [Tecnologia 2]
- [Tecnologia 3]

## Como rodar o site

### Pré-requisitos

- [Node.js versão X ou superior]
- [npm versão X ou superior]

### Passo a passo

1. Clone o repositório:

```bash
git clone [URL_DO_REPOSITORIO]
```

2. Acesse a pasta do projeto:

```bash
cd [NOME_DA_PASTA_DO_PROJETO]
cd [NOME_DA_PASTA_DO_APP]
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
