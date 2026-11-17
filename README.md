# Site ATOS HUB

React 18 + Tailwind CSS 3 + Framer Motion 11, com Vite — mesma base, fontes e design do site ATOS DESK.

## Rodar no computador
1. Instale o Node.js 20 ou mais novo.
2. Nesta pasta: `npm install`
3. `npm run dev` e abra o endereço que aparecer (http://localhost:5173).

## Configurar
Edite `src/config.js`:
- `WHATSAPP_VENDAS` / `WHATSAPP_EXIBIDO`: número que recebe os pedidos de demonstração.
- `VIDEOS`: coloque os MP4 em `public/videos/` e escreva o caminho. Sem vídeo, o site mostra a simulação animada.

Textos: `src/data.js` (pilares, perfis, segurança) e os componentes em `src/components/`.
Logo: `public/brand/` (SVG).

## Publicar
- `npm run build` gera a pasta `dist/`.
- `npm run build:single` gera um único `dist-single/index.html` com tudo embutido.
