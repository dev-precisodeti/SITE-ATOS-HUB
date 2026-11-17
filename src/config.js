// ===== CONFIGURAÇÃO DO SITE ATOS HUB =====

// Número do WhatsApp que recebe os pedidos de demonstração: DDI + DDD + número, só dígitos.
export const WHATSAPP_VENDAS = "5521999854271";
export const WHATSAPP_EXIBIDO = "(21) 99985-4271";

// Vídeos de uso do app. Coloque os MP4 em public/videos/ e escreva o caminho.
// Ex.: hero: "videos/hero.mp4". Vazio = mostra a simulação animada do app.
export const VIDEOS = {
  hero: "",
  guardioes: "",
  celulas: "",
  visitantes: "",
};

// Mensagem que já vem escrita quando a pessoa clica em "Falar no WhatsApp"
export const MENSAGEM_WHATSAPP = "Olá! Vim pelo site e quero conhecer o Atos Hub.";

// Ecossistema de produtos
export const NOSSOS_PRODUTOS = [
  {
    nome: "PREDETI ERP",
    url: "https://predeti.com.br",
    desc: "Gestão administrativa e financeira",
  },
  {
    nome: "ATOS DESK",
    url: "https://atosdesk.predeti.com.br",
    desc: "Atendimento no WhatsApp, Kanban e IA",
  },
  {
    nome: "ATOS HUB",
    url: "https://atoshub.predeti.com.br",
    desc: "Cuidado com pessoas e células",
    atual: true,
  },
];
