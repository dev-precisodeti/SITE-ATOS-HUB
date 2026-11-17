import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PESSOAS, CELULAS, CUIDADO, VISITANTES } from "../data.js";
import { LogoMark, Icons } from "./UI.jsx";

/* Intervalo que respeita pausa */
export function useTick(ms, paused = false) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setN((x) => x + 1), ms);
    return () => clearInterval(id);
  }, [ms, paused]);
  return n;
}

const iniciais = (n) => n.replace(/^Pr\. /, "").split(" ").map((p) => p[0]).slice(0, 2).join("");
const corDe = (nome) => (PESSOAS.find((p) => p.nome === nome) || { cor: "#5F6368" }).cor;

export function Avatar({ nome, size = 32 }) {
  return (
    <span className="grid flex-none place-items-center rounded-full text-[11px] font-semibold text-white"
      style={{ width: size, height: size, background: corDe(nome) }}>
      {iniciais(nome)}
    </span>
  );
}

const LiveDot = ({ className = "" }) => <span className={`live-dot inline-block h-2 w-2 flex-none rounded-full bg-mint ${className}`} />;

/* ---------- Células ao vivo (presença subindo) ---------- */
export function CelulasLiveSim({ paused, rows = 5, compact }) {
  const n = useTick(900, paused);
  const ciclo = n % 22;
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-line px-4 py-3 text-[13px] font-medium">
        <span className="flex items-center gap-2"><LiveDot /> Células acontecendo agora</span>
        <span className="font-mono text-[11px] font-normal text-muted">qui · 20:{String(10 + (ciclo % 20)).padStart(2, "0")}</span>
      </div>
      <div className="grid flex-1 content-start gap-1 overflow-hidden p-2">
        {CELULAS.slice(0, rows).map((c, k) => {
          const presentes = Math.min(c.total - (k % 3), Math.max(0, Math.floor((ciclo - k) * (c.total / 12))));
          const pct = presentes / c.total;
          return (
            <div key={c.nome} className="rounded-xl px-3 py-2.5 transition-colors hover:bg-surface">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-[13px] font-medium">{c.nome}</div>
                  {!compact && <div className="truncate text-[11px] text-muted">Líder {c.lider} · {c.rede}</div>}
                </div>
                <span className="flex-none font-mono text-[12px]"><b className="font-medium text-ink">{presentes}</b><span className="text-muted">/{c.total}</span></span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line/70">
                <motion.div className="h-full rounded-full" style={{ background: c.cor }} animate={{ width: `${pct * 100}%` }} transition={{ type: "spring", stiffness: 120, damping: 20 }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Guardiões: pessoas sob cuidado ---------- */
const ST = {
  ok: { t: "Acompanhando", c: "bg-mint-soft text-[#13704E]" },
  atencao: { t: "Atenção", c: "bg-amber-soft text-[#7A4D00]" },
  acolher: { t: "Precisa de acolhimento", c: "bg-lilac-soft text-[#5B34B8]" },
  afastado: { t: "Afastado", c: "bg-coral-soft text-[#A3281C]" },
  volta: { t: "Reconectado", c: "bg-mint text-white" },
};
export function GuardiaoSim({ paused }) {
  const n = useTick(2400, paused);
  const fase = n % 4; // 0: lista · 1: destaque Felipe · 2: visita marcada · 3: reconectado
  const lista = CUIDADO.map((p) => (p.nome === "Felipe Andrade" && fase === 3 ? { ...p, st: "volta", txt: "Voltou à célula esta semana" } : p));
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-amber-soft text-[#7A4D00]"><Icons.heart className="h-4 w-4" /></span>
          <div>
            <div className="text-[13px] font-medium">Guardiã Sônia</div>
            <div className="text-[11px] text-muted">Núcleo Esperança · Rede Verde</div>
          </div>
        </div>
        <span className="font-mono text-[11px] text-muted">18 pessoas</span>
      </div>
      <div className="relative grid flex-1 content-start gap-1.5 overflow-hidden p-3">
        {lista.map((p) => {
          const foco = p.nome === "Felipe Andrade" && (fase === 1 || fase === 2);
          return (
            <motion.div layout key={p.nome} animate={{ scale: foco ? 1.02 : 1 }}
              className={`flex items-center gap-3 rounded-xl bg-white px-3 py-2.5 ring-1 transition ${foco ? "ring-ink/20 shadow-[0_10px_24px_-12px_rgba(18,19,23,.35)]" : "ring-line"}`}>
              <Avatar nome={p.nome} size={28} />
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13px] font-medium">{p.nome}</div>
                <div className="truncate text-[11px] text-muted">{p.txt}</div>
              </div>
              <motion.span key={p.st} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className={`hidden flex-none rounded-full px-2 py-0.5 text-[10.5px] font-medium sm:inline ${ST[p.st].c}`}>{ST[p.st].t}</motion.span>
            </motion.div>
          );
        })}
        <AnimatePresence>
          {fase === 2 && (
            <motion.div initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="absolute bottom-3 left-3 right-3 flex items-center gap-3 rounded-xl bg-ink px-4 py-3 text-white shadow-xl">
              <Icons.calendar className="h-4 w-4 flex-none text-amber" />
              <div className="text-[12px] leading-tight"><b className="font-medium">Visita marcada para Felipe</b><br />
                <span className="font-mono text-[11px] text-white/70">sáb · 16h · com o líder Marcos</span></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------- Novo visitante: do "olá" à célula ---------- */
export function VisitanteSim({ paused }) {
  const n = useTick(2200, paused);
  const v = VISITANTES[Math.floor(n / 4) % VISITANTES.length];
  const passo = n % 4; // 0 chegou · 1 células próximas · 2 líder avisado · 3 primeiro contato feito
  const etapas = ["Chegou", "Célula sugerida", "Líder avisado", "Primeiro contato"];
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-line px-4 py-3 text-[13px] font-medium">
        Novos visitantes <span className="font-mono text-[11px] font-normal text-muted">3 aguardando contato</span>
      </div>
      <div className="flex flex-1 flex-col gap-3 overflow-hidden p-4">
        <AnimatePresence mode="wait">
          <motion.div key={v.nome} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            className="flex items-center gap-3 rounded-2xl bg-surface p-3">
            <Avatar nome={v.nome} size={36} />
            <div className="min-w-0 flex-1">
              <div className="truncate text-[14px] font-medium">{v.nome}</div>
              <div className="flex items-center gap-1 text-[11.5px] text-muted"><Icons.pin className="h-3 w-3" /> {v.bairro} · primeira vez no domingo</div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="grid grid-cols-4 gap-1.5">
          {etapas.map((e, i) => (
            <div key={e} className="grid gap-1.5">
              <div className="h-1 overflow-hidden rounded-full bg-line/80">
                <motion.div className="h-full bg-ink" animate={{ width: i <= passo ? "100%" : "0%" }} transition={{ duration: 0.5 }} />
              </div>
              <span className={`truncate text-[10.5px] ${i <= passo ? "text-ink" : "text-muted"}`}>{e}</span>
            </div>
          ))}
        </div>

        <div className="relative flex-1">
          <AnimatePresence mode="wait">
            {passo === 0 && (
              <motion.div key="busca" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex items-center gap-2 rounded-2xl border border-dashed border-line p-3 text-[12.5px] text-muted">
                <Icons.pin className="h-4 w-4 animate-pulse" /> Procurando células perto de {v.bairro}…
              </motion.div>
            )}
            {passo >= 1 && (
              <motion.div key={v.nome + (passo >= 2)} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="rounded-2xl bg-white p-3 ring-1 ring-line">
                <div className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">Célula mais perto de casa</div>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="truncate text-[13.5px] font-medium">{v.celula}</div>
                    <div className="text-[11.5px] text-muted">Líder {v.lider} · {v.dist}</div>
                  </div>
                  {passo >= 2
                    ? <span className="flex flex-none items-center gap-1 rounded-full bg-mint-soft px-2 py-1 text-[10.5px] font-medium text-[#13704E]"><Icons.check className="h-3 w-3" /> Líder avisado</span>
                    : <span className="flex-none rounded-full bg-ink px-2.5 py-1 text-[10.5px] font-medium text-white">Conectar</span>}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-ink px-4 py-3 text-white">
          <span className="flex items-center gap-2 text-[12px]"><Icons.clock className="h-4 w-4 text-amber" /> Tempo até o primeiro contato</span>
          <span className="font-mono text-[13px]">{passo === 3 ? <span className="text-mint">{v.espera}:00 ✓</span> : `${v.espera}:${String(10 + passo * 17).padStart(2, "0")}`}</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Painel geral (vitrine do topo) ---------- */
function Stat({ label, value, sub, tone }) {
  return (
    <div className="rounded-xl bg-white p-3 ring-1 ring-line">
      <div className="truncate text-[10.5px] text-muted">{label}</div>
      <div className="mt-1 text-[clamp(16px,1.8vw,24px)] font-medium tracking-tight">{value}</div>
      {sub && <div className={`truncate font-mono text-[10px] ${tone || "text-muted"}`}>{sub}</div>}
    </div>
  );
}

export function AppWindow({ paused }) {
  const n = useTick(3800, paused);
  const menu = [["heart", "Guardiões"], ["home", "Células"], ["wave", "Visitantes"], ["hands", "Voluntariado"], ["music", "Cultos"], ["kids", "Kids"], ["chart", "Relatórios"]];
  const toast = VISITANTES[(n >> 1) % VISITANTES.length];
  return (
    <div className="relative grid h-full w-full grid-cols-[52px_1fr] overflow-hidden rounded-2xl bg-white text-ink shadow-2xl ring-1 ring-black/5 md:grid-cols-[176px_1fr]">
      <div className="flex flex-col gap-1 border-r border-line bg-surface p-2 md:p-3">
        <a href="https://atoshub.predeti.com.br" className="mb-2 flex items-center gap-2 px-1 transition hover:opacity-80"><LogoMark className="h-7 w-7" /><span className="hidden text-[13px] font-medium md:inline">ATOS <span className="text-muted">HUB</span></span></a>
        {menu.map(([i, t], k) => {
          const C = Icons[i];
          return (
            <span key={t} className={`flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-[12.5px] ${k === 1 ? "bg-white font-medium shadow-sm ring-1 ring-line" : "text-muted"}`}>
              <C className="h-4 w-4 flex-none" /><span className="hidden md:inline">{t}</span>
            </span>
          );
        })}
      </div>
      <div className="flex min-w-0 flex-col bg-[#FAFAFB]">
        <div className="flex items-center justify-between border-b border-line bg-white px-4 py-3">
          <div className="text-[13px] font-medium">Painel · Igreja Atitude</div>
          <span className="flex items-center gap-2 font-mono text-[11px] text-muted"><LiveDot /> ao vivo</span>
        </div>
        <div className="grid grid-cols-2 gap-2 p-3 lg:grid-cols-4">
          <Stat label="Pessoas acompanhadas" value={(3482 + n).toLocaleString("pt-BR")} sub={`+${12 + n} este mês`} tone="text-mint" />
          <Stat label="Células ativas" value="214" sub="38 reunidas agora" />
          <Stat label="Visitantes aguardando" value={Math.max(2, 9 - (n % 6))} sub="contato em até 48h" tone="text-[#B26A00]" />
          <Stat label="Presença na semana" value="81%" sub="+4% vs. mês passado" tone="text-mint" />
        </div>
        <div className="grid min-h-0 flex-1 gap-3 px-3 pb-3 lg:grid-cols-[1.25fr_1fr]">
          <div className="min-h-0 overflow-hidden rounded-xl bg-white ring-1 ring-line"><CelulasLiveSim paused={paused} rows={4} /></div>
          <div className="hidden min-h-0 overflow-hidden rounded-xl bg-white ring-1 ring-line lg:block"><GuardiaoMini paused={paused} /></div>
        </div>
      </div>
      <AnimatePresence>
        {n % 2 === 1 && (
          <motion.div key={n} initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="absolute bottom-4 right-4 flex items-center gap-3 rounded-xl bg-ink px-4 py-3 text-white shadow-xl">
            <span className="h-2 w-2 rounded-full bg-mint" />
            <div className="text-[12px] leading-tight"><b className="font-medium">{toast.nome} conectada a uma célula</b><br />
              <span className="font-mono text-[11px] text-amber">{toast.celula} · líder {toast.lider}</span></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function GuardiaoMini({ paused }) {
  const n = useTick(2600, paused);
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-line px-4 py-3 text-[13px] font-medium">
        Precisam de cuidado <span className="font-mono text-[11px] font-normal text-muted">hoje</span>
      </div>
      <div className="grid content-start gap-1 p-2">
        {[1, 2, 3, 4].map((k) => {
          const p = CUIDADO[(n + k) % CUIDADO.length];
          return (
            <motion.div layout key={p.nome} className="flex items-center gap-2.5 rounded-xl px-2 py-2">
              <Avatar nome={p.nome} size={24} />
              <div className="min-w-0">
                <div className="truncate text-[12px] font-medium">{p.nome}</div>
                <div className="truncate text-[10.5px] text-muted">{p.txt}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Mini-visuais dos cartões ---------- */
export function Mini({ tipo }) {
  if (tipo === "escala") return (
    <div className="grid gap-1.5">
      {[["Recepção", "Dom 10h", "4/4", true], ["Louvor", "Dom 10h", "6/7", false], ["Mídia", "Dom 18h", "3/3", true]].map(([m, h, q, ok]) => (
        <div key={m} className="flex items-center justify-between rounded-xl bg-white px-3 py-2 text-[12.5px] ring-1 ring-line">
          <span className="font-medium">{m} <span className="font-normal text-muted">· {h}</span></span>
          <span className={`font-mono text-[11px] ${ok ? "text-mint" : "text-[#B26A00]"}`}>{q}</span>
        </div>
      ))}
    </div>
  );
  if (tipo === "culto") return (
    <ol className="grid gap-1 rounded-xl bg-white p-3 ring-1 ring-line">
      {[["10:00", "Boas-vindas"], ["10:05", "Louvor"], ["10:35", "Avisos e ofertas"], ["10:45", "Palavra"]].map(([h, t], k) => (
        <li key={h} className="flex items-center gap-3 text-[12.5px]">
          <span className="font-mono text-[11px] text-muted">{h}</span>
          <span className={k === 1 ? "font-medium" : ""}>{t}</span>
          {k === 1 && <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-mint"><LiveDot /> agora</span>}
        </li>
      ))}
    </ol>
  );
  if (tipo === "kids") return (
    <div className="flex items-center gap-3 rounded-xl bg-white p-3 ring-1 ring-line">
      <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-sky-soft text-sky"><Icons.kids className="h-5 w-5" /></span>
      <div className="min-w-0 flex-1">
        <div className="text-[13px] font-medium">Pedro, 6 anos · Sala Turminha</div>
        <div className="font-mono text-[11px] text-muted">check-in 09:52 · código K-4821</div>
      </div>
      <Icons.shield className="h-5 w-5 flex-none text-mint" />
    </div>
  );
  return (
    <div className="flex h-[92px] items-end gap-1.5 rounded-xl bg-white p-3 ring-1 ring-line">
      {[42, 55, 48, 63, 70, 66, 78, 84].map((h, k) => (
        <motion.span key={k} initial={{ height: 4 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ delay: k * 0.06, duration: 0.6 }}
          className={`flex-1 rounded-md ${k === 7 ? "bg-ink" : "bg-line"}`} />
      ))}
    </div>
  );
}
