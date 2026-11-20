import { motion } from "framer-motion";
import { VIDEOS, WHATSAPP_VENDAS, MENSAGEM_WHATSAPP } from "../config.js";

/* Marca ATOS HUB: logotipo e símbolo oficiais com selo laranja (#F26A21) */
export function LogoMark({ className = "h-7 w-7", dark = false }) {
  const src = dark
    ? "/brand/atoshub-selo-laranja-fundo-escuro-transparente.svg"
    : "/brand/atoshub-selo-laranja-transparente.svg";
  return (
    <img
      src={src}
      alt="ATOS HUB"
      className={`${className} object-contain`}
      aria-hidden="true"
    />
  );
}

export function Logo({ className = "", dark = false }) {
  const src = dark
    ? "/brand/atoshub-horizontal-fundo-escuro-transparente.svg"
    : "/brand/atoshub-horizontal-fundo-claro-transparente.svg";
  return (
    <a href="#inicio" className={`inline-flex items-center ${className}`} aria-label="ATOS HUB, início">
      <img
        src={src}
        alt="ATOS HUB"
        className="h-7 w-auto sm:h-8 md:h-9"
      />
    </a>
  );
}

export const Arrow = ({ className = "h-4 w-4" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

/* Revela ao entrar na tela, partindo de um estado já visível. */
export function Reveal({ children, delay = 0, className = "", y = 24 }) {
  return (
    <motion.div className={className} initial={{ opacity: 0.5, y }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

/* Mostra o vídeo configurado ou, sem vídeo, a simulação animada. */
export function MediaSlot({ videoKey, children, className = "" }) {
  const src = VIDEOS[videoKey];
  if (src) return <video className={`h-full w-full object-cover ${className}`} src={src} autoPlay muted loop playsInline aria-hidden="true" />;
  return children;
}

/* Ícones simples, traço fino */
const I = (d) => (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>{d}</svg>
);
export const Icons = {
  heart: I(<path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z" />),
  home: I(<><path d="M3.5 11 12 4l8.5 7" /><path d="M5.5 9.5V20h13V9.5" /><path d="M10 20v-5h4v5" /></>),
  wave: I(<><path d="M7 11V6.5a1.5 1.5 0 0 1 3 0V11" /><path d="M10 10V5a1.5 1.5 0 0 1 3 0v5" /><path d="M13 10V6a1.5 1.5 0 0 1 3 0v6" /><path d="M16 9.5a1.5 1.5 0 0 1 3 0V14a7 7 0 0 1-7 7h-.5a6.5 6.5 0 0 1-5.4-2.9L3.6 14.6a1.5 1.5 0 0 1 2.4-1.8L7 14" /></>),
  hands: I(<><path d="M12 21V11l-3.5-5.5a1.4 1.4 0 0 0-2.4 1.4L8 11" /><path d="M12 21V11l3.5-5.5a1.4 1.4 0 0 1 2.4 1.4L16 11" /><path d="M8 11l-3 3v4l3 3M16 11l3 3v4l-3 3" /></>),
  music: I(<><path d="M9 18V5l11-2v13" /><circle cx="6.5" cy="18" r="2.5" /><circle cx="17.5" cy="16" r="2.5" /></>),
  kids: I(<><circle cx="12" cy="7" r="3" /><path d="M7 21v-4.5a5 5 0 0 1 10 0V21" /><path d="M4.5 12.5 7 14M19.5 12.5 17 14" /></>),
  chart: I(<path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />),
  lock: I(<><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>),
  team: I(<><circle cx="9" cy="8" r="3.5" /><path d="M3 20c.8-3.5 3.2-5 6-5s5.2 1.5 6 5" /><path d="M16 4.5a3.5 3.5 0 0 1 0 7M21 20c-.4-2-1.4-3.4-3-4.2" /></>),
  clock: I(<><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>),
  pin: I(<><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></>),
  calendar: I(<><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M3.5 10h17M8 3v4M16 3v4" /></>),
  shield: I(<><path d="M12 3 4.5 6v5.5c0 4.6 3.2 8 7.5 9.5 4.3-1.5 7.5-4.9 7.5-9.5V6Z" /><path d="m9 12 2 2 4-4" /></>),
  history: I(<><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5M12 7v5l3 2" /></>),
  bell: I(<><path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15Z" /><path d="M10 21h4" /></>),
  route: I(<><circle cx="6" cy="18" r="2.5" /><circle cx="18" cy="6" r="2.5" /><path d="M8.5 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.5" /></>),
  eye: I(<><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" /><circle cx="12" cy="12" r="2.8" /></>),
  check: I(<path d="m5 12.5 4.5 4.5L19 7.5" />),
  play: I(<path d="M8 5v14l11-7Z" fill="currentColor" />),
  pause: I(<><rect x="7" y="5" width="3.5" height="14" rx="1" fill="currentColor" /><rect x="13.5" y="5" width="3.5" height="14" rx="1" fill="currentColor" /></>),
};

export const waLink = (msg = MENSAGEM_WHATSAPP) => `https://wa.me/${WHATSAPP_VENDAS}?text=${encodeURIComponent(msg)}`;

export const WhatsIcon = ({ className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z" />
  </svg>
);
