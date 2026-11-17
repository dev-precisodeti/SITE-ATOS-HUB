import { useEffect, useRef } from "react";

/* Fundo do herói: mensagens da vida da igreja chegando de todos os lados.
   Balões flutuam devagar para cima, fogem do cursor e ficam mais apagados no centro, atrás do título. */
export const MENSAGENS = [
  "Oi, tudo bem?", "Primeira vez na igreja!", "Onde tem célula perto de casa?", "Que horas é o culto?",
  "Posso servir no louvor?", "Orando por você", "Sentimos sua falta na célula", "Bem-vindo à família!",
  "Célula hoje às 20h", "Quero ser voluntário", "Meu filho pode ir no Kids?", "Escala de domingo confirmada",
  "Alguém pode me visitar?", "Cheguei agora na cidade", "Obrigado pelo cuidado!", "Visitante novo na recepção",
  "Presença confirmada", "Posso levar um amigo?", "Como faço para ser membro?", "Que bom te ver de volta!",
  "Reunião de líderes quinta", "Precisando de oração 🙏", "Tem célula para casais?", "Te espero no domingo!",
];
const TONS = [
  { bg: "#FFFFFF", bd: "#E3E5E8", tx: "#3C4043" },        // recebida
  { bg: "#DCF8E9", bd: "#BFEBD4", tx: "#1F4D3A" },        // verde WhatsApp
  { bg: "#FFF1D6", bd: "#F7DDA8", tx: "#5C3D00" },        // âmbar
  { bg: "#E6EEFF", bd: "#CADAFB", tx: "#1E3A6E" },        // azul
];

export default function Particles({ density = 0.000016 }) {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current, ctx = cv.getContext("2d");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w, h, dpr, items = [], raf, mouse = { x: -9999, y: -9999 }, last = 0;
    const font = '500 13px "Google Sans Flex","Google Sans",Figtree,system-ui,sans-serif';

    let fila = [], lado = 0;
    const proxima = () => { if (!fila.length) fila = [...MENSAGENS].sort(() => Math.random() - 0.5); return fila.pop(); };
    function make(y) {
      const txt = proxima(); lado++;
      ctx.font = font;
      const tw = ctx.measureText(txt).width;
      return {
        txt, tw, bw: tw + 26, bh: 30, tone: TONS[(Math.random() * TONS.length) | 0],
        x: w < 760 ? Math.random() * w : (lado % 2 ? 0.02 + Math.random() * 0.24 : 0.74 + Math.random() * 0.24) * w, y: y ?? Math.random() * h, vx: 0, vy: 0, ox: 0, oy: 0,
        speed: 0.12 + Math.random() * 0.22, ph: Math.random() * 6.28,
        side: Math.random() < 0.5 ? -1 : 1, s: 0.82 + Math.random() * 0.3,
        born: performance.now() - (y === undefined ? 2000 : 0),
      };
    }
    function fit(p) { p.x = Math.max(p.bw / 2 + 10, Math.min(w - p.bw / 2 - 10, p.x)); return p;
    }
    function size() {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(8, Math.min(22, Math.round(w * h * density)));
      items = Array.from({ length: count }, () => fit(make()));
    }
    function bubble(p, alpha) {
      const { bw, bh, tone } = p;
      ctx.save();
      ctx.translate(p.x + p.ox, p.y + p.oy); ctx.scale(p.s, p.s);
      ctx.globalAlpha = alpha;
      ctx.shadowColor = "rgba(18,19,23,0.08)"; ctx.shadowBlur = 12; ctx.shadowOffsetY = 4;
      ctx.fillStyle = tone.bg; ctx.strokeStyle = tone.bd; ctx.lineWidth = 1;
      const x = -bw / 2, y = -bh / 2, r = 14;
      ctx.beginPath();
      ctx.moveTo(x + r, y); ctx.lineTo(x + bw - r, y); ctx.quadraticCurveTo(x + bw, y, x + bw, y + r);
      ctx.lineTo(x + bw, y + bh - r); ctx.quadraticCurveTo(x + bw, y + bh, x + bw - r, y + bh);
      ctx.lineTo(x + r, y + bh); ctx.quadraticCurveTo(x, y + bh, x, y + bh - r);
      ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath();
      ctx.fill(); ctx.shadowColor = "transparent"; ctx.stroke();
      // rabinho do balão
      const tx = p.side < 0 ? x + 10 : x + bw - 10;
      ctx.beginPath(); ctx.moveTo(tx - 5, y + bh - 1); ctx.lineTo(tx + p.side * 7, y + bh + 6); ctx.lineTo(tx + 5, y + bh - 1); ctx.closePath();
      ctx.fill();
      ctx.fillStyle = tone.tx; ctx.font = font; ctx.textBaseline = "middle"; ctx.textAlign = "center";
      ctx.fillText(p.txt, 0, 1);
      ctx.restore();
    }
    function frame(t) {
      const dt = Math.min(48, t - (last || t)); last = t;
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2, cy = h * 0.46;
      for (let i = 0; i < items.length; i++) {
        const p = items[i];
        if (!reduce) {
          p.y -= p.speed * dt * 0.06;
          p.x += Math.sin(t / 2600 + p.ph) * 0.12;
          const dx = p.x + p.ox - mouse.x, dy = p.y + p.oy - mouse.y, d = Math.hypot(dx, dy);
          if (d < 160) { const f = (160 - d) / 160; p.vx += (dx / (d || 1)) * f * 1.6; p.vy += (dy / (d || 1)) * f * 1.6; }
          for (let j = 0; j < items.length; j++) {
            if (j === i) continue; const q = items[j];
            const sx = p.x + p.ox - (q.x + q.ox), sy = p.y + p.oy - (q.y + q.oy);
            const mx = (p.bw + q.bw) / 2 * 0.95, my = 40;
            if (Math.abs(sx) < mx && Math.abs(sy) < my) { p.vx += Math.sign(sx || 1) * 0.08; p.vy += Math.sign(sy || 1) * 0.05; }
          }
          p.vx += -p.ox * 0.03; p.vy += -p.oy * 0.03; p.vx *= 0.86; p.vy *= 0.86; p.ox += p.vx; p.oy += p.vy; p.ox = Math.max(-220, Math.min(220, p.ox)); p.oy = Math.max(-160, Math.min(160, p.oy));
          if (p.y < -40) items[i] = fit(make(h + 30));
        }
        // apagado atrás do título, nítido nas bordas; entra e sai suave
        const ex = (p.x - cx) / (w * 0.36), ey = (p.y - cy) / (h * 0.42);
        const center = Math.min(1, Math.sqrt(ex * ex + ey * ey));
        let a = center < 0.75 ? 0.06 * center : 0.06 + (center - 0.75) * 3.6;
        a *= Math.min(1, Math.max(0, (p.y - 90) / 60));
        a *= Math.min(1, (h + 30 - p.y) / 80) * Math.min(1, (p.y + 40) / 90);
        a *= Math.min(1, (t - p.born) / 900 + 0.001);
        bubble(p, Math.max(0, Math.min(0.95, a)));
      }
      if (!reduce) raf = requestAnimationFrame(frame);
    }
    const onMove = (e) => { const r = cv.getBoundingClientRect(); mouse = { x: e.clientX - r.left, y: e.clientY - r.top }; };
    const onLeave = () => (mouse = { x: -9999, y: -9999 });
    size();
    raf = requestAnimationFrame(frame);
    document.fonts?.ready.then(() => { items.forEach((p) => { ctx.font = font; p.tw = ctx.measureText(p.txt).width; p.bw = p.tw + 26; fit(p); }); });
    addEventListener("resize", size); addEventListener("pointermove", onMove); document.addEventListener("pointerleave", onLeave);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", size); removeEventListener("pointermove", onMove); document.removeEventListener("pointerleave", onLeave); };
  }, [density]);
  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
}
