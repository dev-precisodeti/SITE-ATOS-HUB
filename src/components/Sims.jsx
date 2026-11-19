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

/* ---------- Células ao vivo: Lista Fiel ao Print 5 ---------- */

export function CelulasLiveSim({ paused }) {
  const n = useTick(1800, paused);
  const ciclo = n % 15;

  // DADOS 100% FICTÍCIOS NO PADRÃO DO PRINT 5
  const celulasLista = [
    {
      id: "cel-1",
      nome: "DUNAMIS JARDIM OCEÂNICO C/KIDS",
      horario: "TERÇA ÀS 20:00",
      lider: "SÍLVIA GOMES DA SILVA",
      perfil: "MISTO",
      rede: "REDE VERMELHA",
      redeDot: "bg-[#EF4444]",
      campus: "CAMPUS CENTRAL",
      membros: 24,
      presentesBase: 19,
      reuniaoHoje: true,
    },
    {
      id: "cel-2",
      nome: "SUPERAÇÃO FAMÍLIA C/KIDS",
      horario: "TERÇA ÀS 20:30",
      lider: "ALEX MARTINS HERBURGO",
      perfil: "MISTO",
      rede: "REDE VERMELHA",
      redeDot: "bg-[#EF4444]",
      campus: "CAMPUS CENTRAL",
      membros: 22,
      presentesBase: 18,
      reuniaoHoje: true,
    },
    {
      id: "cel-3",
      nome: "ADORADORES DA NOVA GERAÇÃO",
      horario: "SEXTA ÀS 20:00",
      lider: "ALMIR DIAS DE ALBUQUERQUE",
      perfil: "JOVENS",
      rede: "REDE AMARELA",
      redeDot: "bg-[#F59E0B]",
      campus: "CAMPUS SUL",
      membros: 20,
      presentesBase: 16,
      reuniaoHoje: false,
    },
    {
      id: "cel-4",
      nome: "VIDA PLENA ILHA PURA C/KIDS",
      horario: "TERÇA ÀS 20:30",
      lider: "CAROLINA MAIA DE CASTRO",
      perfil: "MISTO",
      rede: "REDE VERMELHA",
      redeDot: "bg-[#EF4444]",
      campus: "CAMPUS CENTRAL",
      membros: 19,
      presentesBase: 15,
      reuniaoHoje: true,
    },
    {
      id: "cel-5",
      nome: "CONEXÃO GRAÇA & VIDA",
      horario: "QUINTA ÀS 19:30",
      lider: "LEANDRO ROCHA MENEZES",
      perfil: "CASAIS",
      rede: "REDE AZUL",
      redeDot: "bg-[#3B82F6]",
      campus: "CAMPUS LESTE",
      membros: 17,
      presentesBase: 14,
      reuniaoHoje: false,
    },
  ];

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white text-slate-800 shadow-2xl ring-1 ring-black/10 select-none font-sans">
      
      {/* CABEÇALHO DO MÓDULO DE CÉLULAS */}
      <div className="flex h-12 flex-none items-center justify-between border-b border-slate-200/80 bg-white px-3 md:px-5">
        <div className="flex items-center gap-2.5">
          <div className="grid h-7 w-7 place-items-center rounded-lg bg-[#FFF4EC] text-[#F26A21]">
            <DashIcons.cells className="h-4 w-4" />
          </div>
          <div className="flex flex-col text-left leading-none">
            <span className="text-[13px] font-bold text-slate-900">
              Gestão de Células
            </span>
            <span className="mt-0.5 text-[10px] text-slate-400">
              Lista e acompanhamento de reuniões em tempo real
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="hidden items-center gap-1.5 rounded-full bg-[#EAFBF3] px-2.5 py-1 text-[10.5px] font-bold text-[#1FAF7A] sm:inline-flex">
            <LiveDot /> 38 reunidas hoje
          </span>
          <span className="rounded-xl border border-slate-200/80 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600">
            Todas as Redes (214) ▾
          </span>
        </div>
      </div>

      {/* LISTA DE CÉLULAS (ESTILO IDÊNTICO AO PRINT 5) */}
      <div className="flex-1 overflow-y-auto bg-[#F8F9FA] p-2.5 md:p-3.5 space-y-2">
        {celulasLista.map((c, idx) => {
          // Animação sutil de presença ao vivo para células que se reúnem hoje
          const presentesDin = c.reuniaoHoje
            ? Math.min(c.membros, c.presentesBase + Math.floor((ciclo + idx) % (c.membros - c.presentesBase + 1)))
            : c.presentesBase;

          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group rounded-2xl border border-slate-200/70 bg-white p-3 shadow-sm transition hover:border-[#F26A21]/40 hover:shadow-md"
            >
              {/* ESTRUTURA ESPAÇOSA EM 2 LINHAS - NUNCA SOBREPÕE */}
              {/* LINHA 1: Nome da Célula + Perfil (Esquerda) | Rede com bolinha colorida (Direita) */}
              <div className="flex items-center justify-between gap-2 text-left">
                <div className="flex items-center gap-2 min-w-0">
                  <h5 className="truncate text-[12.5px] md:text-[13px] font-extrabold uppercase tracking-tight text-slate-900 leading-snug">
                    {c.nome}
                  </h5>
                  <span className="rounded-md bg-[#FFF4EC] px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wide text-[#F26A21] flex-none">
                    {c.perfil}
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-0.5 shadow-sm flex-none">
                  <span className={`h-2.5 w-2.5 rounded-full ${c.redeDot}`} />
                  <span className="text-[10px] md:text-[10.5px] font-extrabold uppercase tracking-tight text-slate-800 whitespace-nowrap">
                    {c.rede}
                  </span>
                </div>
              </div>

              {/* LINHA 2: Líder + Horário + Campus (Esquerda) | Membros & Presença ao Vivo (Direita) */}
              <div className="mt-2 flex items-center justify-between gap-2 border-t border-slate-100 pt-2 text-[11px] text-left">
                <div className="flex flex-wrap items-center gap-1.5 md:gap-2 min-w-0 text-slate-600">
                  <div className="flex items-center gap-1 font-bold text-slate-800">
                    <span className="rounded bg-[#FFF4EC] px-1 py-0.5 text-[8.5px] font-extrabold uppercase tracking-wider text-[#F26A21]">
                      LÍDER
                    </span>
                    <span className="truncate uppercase text-[11px] md:text-[11.5px]">{c.lider}</span>
                  </div>
                  <span className="text-slate-300">•</span>
                  <span className="font-semibold uppercase text-[10px] text-slate-500">{c.horario}</span>
                  <span className="text-slate-300 hidden sm:inline">•</span>
                  <span className="font-semibold uppercase text-[10px] text-slate-400 hidden sm:inline">{c.campus}</span>
                </div>

                <div className="flex items-center gap-2 flex-none pl-2 text-right">
                  <span className="text-[12px] font-extrabold text-slate-900">
                    {c.membros} <span className="text-[10px] font-semibold text-slate-400">membros</span>
                  </span>
                  {c.reuniaoHoje && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#EAFBF3] px-2 py-0.5 text-[10px] font-bold text-[#1FAF7A]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#1FAF7A] animate-pulse" />
                      <span>{presentesDin}/{c.membros} presentes</span>
                    </span>
                  )}
                </div>
              </div>

            </motion.div>
          );
        })}
      </div>

      {/* BARRA INFERIOR / INDICADOR AO VIVO */}
      <div className="flex h-9 flex-none items-center border-t border-slate-200/80 bg-white px-4 text-[11px] text-slate-500">
        <span className="flex items-center gap-1.5 font-medium text-slate-600">
          <span className="h-2 w-2 rounded-full bg-[#1FAF7A] animate-ping" />
          <span className="text-[10.5px]">Relatórios de presença sendo preenchidos em tempo real</span>
        </span>
      </div>

    </div>
  );
}

/* ---------- Guardiões: Resumo do Atendimento & Carteira do Cuidado Pastoral ---------- */

const CareIcons = {
  phone: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
  pin: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" /></svg>,
  copy: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect width="13" height="13" x="9" y="9" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>,
  clock: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
  calendar: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18M8 2v4M16 2v4" /></svg>,
  trend: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>,
  quote: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" /></svg>,
  sparkles: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /></svg>,
  close: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M18 6 6 18M6 6l12 12" /></svg>,
  whatsapp: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24" /></svg>,
};

export function GuardiaoSim({ paused }) {
  const n = useTick(4500, paused);
  const [tabManual, setTabManual] = useState(null);

  // Alterna suavemente entre visão Carteira e visão Resumo do Atendimento
  const tabAtiva = tabManual !== null ? tabManual : (n % 2 === 0 ? "carteira" : "detalhe");

  // DADOS 100% FICTÍCIOS E INVENTADOS COM AS ETIQUETAS DO SISTEMA REAL
  const membrosCarteira = [
    {
      id: "f-1",
      nome: "Larissa Silveira Ramos",
      tel: "(11) 98111-2233",
      idade: "34 anos",
      status: "ativo",
      statusLabel: "Ativo e Conectado",
    },
    {
      id: "f-2",
      nome: "Thiago Henrique Albuquerque",
      tel: "(11) 98222-3344",
      idade: "29 anos",
      status: "sem_celula",
      statusLabel: "Ativo e sem célula",
    },
    {
      id: "f-3",
      nome: "Camila Nogueira Prado",
      tel: "(11) 98333-4455",
      idade: "41 anos",
      status: "afastado",
      statusLabel: "Afastado",
    },
    {
      id: "f-4",
      nome: "Lucas Vasconcelos Lima",
      tel: "(11) 98444-5566",
      idade: "36 anos",
      status: "outra_igreja",
      statusLabel: "Em Outra Igreja",
    },
    {
      id: "f-5",
      nome: "Renata Farias Santana",
      tel: "(11) 98555-6677",
      idade: "45 anos",
      status: "pendente",
      statusLabel: "Não classificado",
    },
    {
      id: "f-6",
      nome: "Felipe Macedo Peixoto",
      tel: "(11) 98666-7788",
      idade: "52 anos",
      status: "ativo",
      statusLabel: "Ativo e Conectado",
    },
  ];

  const contatosFeitos = 23 + (n % 3);
  const reconexoesFeitas = 4 + (n % 2);

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white text-slate-800 shadow-2xl ring-1 ring-black/10 select-none font-sans">
      
      {/* BARRA SUPERIOR DE NAVEGAÇÃO ENTRE VISÕES */}
      <div className="flex h-12 flex-none items-center justify-between border-b border-slate-200/80 bg-white px-3 md:px-4">
        {/* Perfil do Guardião Responsável (Fictício - ajustado para caber nome, e-mail e telefone) */}
        <div className="flex items-center gap-2.5 min-w-0 pr-2">
          <div className="grid h-8 w-8 flex-none place-items-center rounded-full bg-[#FFEADC] font-bold text-[12px] text-[#F26A21]">
            M
          </div>
          <div className="flex flex-col text-left leading-none min-w-0">
            <span className="truncate text-[12.5px] font-bold text-slate-900">
              Mariana Duarte Costa
            </span>
            <div className="mt-1 flex items-center gap-1.5 text-[10px] text-slate-500 whitespace-nowrap">
              <span>m.costa@atos.org</span>
              <span className="text-slate-300">•</span>
              <span>(11) 97123-4567</span>
            </div>
          </div>
        </div>

        {/* Abas de visualização compactas e elegantes */}
        <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-0.5 text-[10.5px] font-medium flex-none">
          <button
            type="button"
            onClick={() => setTabManual("carteira")}
            className={`rounded-lg px-2.5 py-1 transition ${
              tabAtiva === "carteira"
                ? "bg-white font-bold text-[#F26A21] shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Carteira (48)
          </button>
          <button
            type="button"
            onClick={() => setTabManual("detalhe")}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 transition ${
              tabAtiva === "detalhe"
                ? "bg-white font-bold text-[#F26A21] shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <span>Ficha</span>
            <span className="h-1.5 w-1.5 rounded-full bg-mint" />
          </button>
        </div>
      </div>

      {/* ÁREA DE CONTEÚDO COM ANIMAÇÃO */}
      <div className="relative flex-1 overflow-hidden bg-[#F8F9FA]">
        <AnimatePresence mode="wait">
          
          {/* ================= VISÃO 1: CARTEIRA DO CUIDADO PASTORAL ================= */}
          {tabAtiva === "carteira" && (
            <motion.div
              key="carteira"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="flex h-full flex-col overflow-y-auto p-3 text-left md:p-4"
            >
              {/* 4 CARDS DE MÉTRICAS DA CARTEIRA */}
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                <div className="rounded-xl border border-slate-200/80 bg-white p-2.5 shadow-sm">
                  <span className="text-[9.5px] font-bold tracking-wider text-slate-400 uppercase">
                    CARTEIRA
                  </span>
                  <div className="mt-0.5 text-[14px] font-extrabold text-slate-900">
                    48 membros
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200/80 bg-white p-2.5 shadow-sm">
                  <span className="text-[9.5px] font-bold tracking-wider text-slate-400 uppercase">
                    CONTATOS
                  </span>
                  <div className="mt-0.5 text-[15px] font-extrabold text-[#1FAF7A]">
                    {contatosFeitos}
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200/80 bg-white p-2.5 shadow-sm">
                  <span className="text-[9.5px] font-bold tracking-wider text-slate-400 uppercase">
                    RECONEXÕES
                  </span>
                  <div className="mt-0.5 text-[15px] font-extrabold text-[#8B5CF6]">
                    {reconexoesFeitas}
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200/80 bg-white p-2.5 shadow-sm">
                  <span className="text-[9.5px] font-bold tracking-wider text-slate-400 uppercase">
                    STATUS SLA
                  </span>
                  <div className="mt-0.5 text-[14px] font-extrabold text-[#1FAF7A]">
                    Em Dia
                  </div>
                </div>
              </div>

              {/* LISTA DE MEMBROS EM CUIDADO (COM ETIQUETAS DO SISTEMA REAL) */}
              <div className="mt-3 flex flex-col gap-1.5">
                {membrosCarteira.map((m, idx) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className="group flex items-center justify-between rounded-xl border border-slate-200/70 bg-white px-3 py-2.5 shadow-sm transition hover:border-[#F26A21]/30 hover:bg-[#FFFDFB]"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="min-w-0 truncate">
                        <div className="flex items-center gap-2">
                          <span className="truncate text-[12.5px] font-bold text-slate-800">
                            {m.nome}
                          </span>
                        </div>
                        <div className="mt-0.5 flex flex-wrap items-center gap-2 text-[10.5px] text-slate-400">
                          <span>{m.tel}</span>
                          <span>•</span>
                          <span>{m.idade}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-none">
                      {/* ETIQUETA: ATIVO E CONECTADO */}
                      {m.status === "ativo" && (
                        <span className="flex items-center gap-1.5 rounded-full border border-[#F26A21]/40 bg-[#FFF6F0] px-2.5 py-0.5 text-[10px] font-bold text-[#F26A21] whitespace-nowrap">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#1FAF7A]" />
                          {m.statusLabel}
                        </span>
                      )}

                      {/* ETIQUETA: ATIVO E SEM CÉLULA */}
                      {m.status === "sem_celula" && (
                        <span className="flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-2.5 py-0.5 text-[10px] font-bold text-sky-700 whitespace-nowrap">
                          <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                          {m.statusLabel}
                        </span>
                      )}

                      {/* ETIQUETA: AFASTADO */}
                      {m.status === "afastado" && (
                        <span className="flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-2.5 py-0.5 text-[10px] font-bold text-rose-600 whitespace-nowrap">
                          <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                          {m.statusLabel}
                        </span>
                      )}

                      {/* ETIQUETA: EM OUTRA IGREJA */}
                      {m.status === "outra_igreja" && (
                        <span className="flex items-center gap-1.5 rounded-full border border-amber-200 bg-[#FFF9F0] px-2.5 py-0.5 text-[10px] font-bold text-amber-700 whitespace-nowrap">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                          {m.statusLabel}
                        </span>
                      )}

                      {/* ETIQUETA: NÃO CLASSIFICADO */}
                      {m.status === "pendente" && (
                        <span className="rounded-full border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-[10px] font-medium text-slate-600 whitespace-nowrap">
                          {m.statusLabel}
                        </span>
                      )}

                      {/* Botão de contato rápido */}
                      <button
                        type="button"
                        aria-label="Ligar ou enviar mensagem"
                        className="grid h-7 w-7 place-items-center rounded-lg bg-[#EAFBF3] text-[#1FAF7A] transition hover:bg-[#D4F7E7] hover:scale-105"
                      >
                        <CareIcons.phone className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ================= VISÃO 2: RESUMO DO ATENDIMENTO & RECONEXÃO ================= */}
          {tabAtiva === "detalhe" && (
            <motion.div
              key="detalhe"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="flex h-full flex-col overflow-y-auto p-3 text-left md:p-4 space-y-3"
            >
              {/* CABEÇALHO DO MEMBRO ATENDIDO (100% FICTÍCIO) */}
              <div className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-white p-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#EAFBF3] font-bold text-[14px] text-[#1FAF7A]">
                    J
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-[13.5px] font-bold text-slate-900">
                        Juliana Mendes Calheiros
                      </h4>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAFBF3] px-2.5 py-0.5 text-[10px] font-bold text-[#1FAF7A]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#1FAF7A]" />
                        Reconectado
                      </span>
                    </div>
                    <p className="mt-0.5 text-[10.5px] text-slate-400">
                      ID: 14082 • (11) 98777-8899 <span className="text-[#1FAF7A] font-semibold">WhatsApp</span> • Jardins, São Paulo
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setTabManual("carteira")}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
                  aria-label="Voltar para a lista"
                >
                  <CareIcons.close className="h-4 w-4" />
                </button>
              </div>

              {/* TIMELINE DE DURAÇÃO DO ACOLHIMENTO */}
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-200/70 bg-white p-2.5">
                  <span className="flex items-center gap-1.5 text-[9.5px] font-bold text-slate-400 uppercase">
                    <CareIcons.clock className="h-3 w-3 text-[#F26A21]" /> INÍCIO DA JORNADA
                  </span>
                  <div className="mt-1 text-[11px] font-bold text-slate-800">
                    14/09/2026, 19:40
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200/70 bg-white p-2.5">
                  <span className="flex items-center gap-1.5 text-[9.5px] font-bold text-slate-400 uppercase">
                    <CareIcons.calendar className="h-3 w-3 text-[#1FAF7A]" /> CONCLUSÃO / RECONEXÃO
                  </span>
                  <div className="mt-1 text-[11px] font-bold text-slate-800">
                    02/10/2026, 11:25
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200/70 bg-white p-2.5">
                  <span className="flex items-center gap-1.5 text-[9.5px] font-bold text-slate-400 uppercase">
                    <CareIcons.trend className="h-3 w-3 text-[#8B5CF6]" /> TEMPO DE ACOLHIMENTO
                  </span>
                  <div className="mt-1 text-[12px] font-extrabold text-[#8B5CF6]">
                    18 dias
                  </div>
                </div>
              </div>

              {/* RESPONSÁVEIS PELO CUIDADO */}
              <div className="rounded-xl border border-slate-200/80 bg-white p-3 shadow-sm">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#F26A21] uppercase tracking-wider">
                  <CareIcons.sparkles className="h-3 w-3" /> RESPONSÁVEIS PELO CUIDADO
                </div>
                <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                  <div className="rounded-lg bg-slate-50 p-2 text-[11px]">
                    <span className="text-[9px] text-slate-400 block uppercase">Líder de Cuidado</span>
                    <span className="font-bold text-slate-800">Mariana Duarte Costa</span>
                    <span className="text-[9.5px] text-slate-400 block mt-0.5">(11) 97123-4567</span>
                  </div>
                  <div className="rounded-lg bg-[#FAF5FF] p-2 text-[11px]">
                    <span className="text-[9px] text-[#8B5CF6] block uppercase font-bold">Núcleo</span>
                    <span className="font-bold text-slate-800">NÚCLEO 4</span>
                    <span className="text-[9.5px] text-slate-500 block mt-0.5">Cuidado Pastoral</span>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-2 text-[11px]">
                    <span className="text-[9px] text-slate-400 block uppercase">Supervisor</span>
                    <span className="font-bold text-slate-800">Rodrigo Antunes de Castro</span>
                    <span className="text-[9.5px] text-slate-400 block mt-0.5">(11) 97456-7890</span>
                  </div>
                </div>
              </div>

              {/* CÉLULA DE INTEGRAÇÃO */}
              <div className="rounded-xl border border-purple-100 bg-[#FAF7FF] p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#8B5CF6] uppercase tracking-wider">
                    CÉLULA DE DIRECIONAMENTO & INTEGRAÇÃO
                  </span>
                  <span className="rounded-full bg-[#EAFBF3] px-2 py-0.5 text-[9.5px] font-bold text-[#1FAF7A]">
                    Célula Canônica Vinculada
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[11.5px]">
                  <div>
                    <span className="font-bold text-slate-800">Célula Nova Aliança</span>
                    <span className="text-slate-500 block text-[10.5px]">Líder: Bruno Alcantara</span>
                  </div>
                  <span className="rounded-md bg-white px-2 py-1 text-[10px] text-slate-600 shadow-sm border border-purple-100">
                    ID: CEL-8391 • Vínculo confirmado
                  </span>
                </div>
              </div>

              {/* TESTEMUNHOS RELEVANTES */}
              <div className="rounded-xl border border-emerald-200 bg-[#F2FBF7] p-3 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-[10px] font-bold text-[#1FAF7A] uppercase">
                    <CareIcons.quote className="h-3 w-3" /> TESTEMUNHOS RELEVANTES
                  </span>
                  <span className="rounded-md bg-[#1FAF7A] px-2 py-0.5 text-[9px] font-bold text-white uppercase">
                    Reconexão ✨
                  </span>
                </div>
                <p className="mt-2 text-slate-700 leading-relaxed italic">
                  “Agradeço à equipe de cuidado que me ligou e me acolheu com tanto carinho. Estava afastada há meses e esse retorno à célula fez toda a diferença na minha vida e na minha família. Deus é bom!”
                </p>
                <div className="mt-2 flex items-center justify-between text-[9.5px] text-slate-400 border-t border-emerald-100 pt-1.5">
                  <span>Registrado por: Mariana Duarte</span>
                  <span>02/10/2026 · 11:30</span>
                </div>
              </div>

              {/* OBSERVAÇÃO DO FECHAMENTO */}
              <div className="rounded-xl border border-slate-200 bg-white p-3 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-700 uppercase">
                    OBSERVAÇÃO DO FECHAMENTO
                  </span>
                  <span className="flex items-center gap-1 rounded-full bg-[#EAFBF3] px-2 py-0.5 text-[9px] font-bold text-[#1FAF7A]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1FAF7A]" /> Ativo e Conectado
                  </span>
                </div>
                <p className="mt-1.5 text-slate-600 leading-snug">
                  “Membro acolhida com sucesso, integrada ao grupo e confirmada pelo líder na reunião semanal.”
                </p>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}

/* ---------- Novo visitante / Jornada do Membro: Timeline Animada Fiel ao Print 2 ---------- */

const TIMELINE_STEPS = [
  {
    id: "ativacao",
    dotColor: "bg-blue-500 ring-4 ring-blue-100",
    title: "Ativação no Painel de Atendimento",
    titleColor: "text-blue-600",
    quote: "Caso ativado da reserva interna da carteira para atendimento ativo.",
    date: "05/10/2026, 15:25:03",
  },
  {
    id: "contato",
    dotColor: "bg-emerald-500 ring-4 ring-emerald-100",
    title: "1. Primeiro Contato Realizado",
    titleColor: "text-slate-800",
    text: "Contato inicial acolhedor estabelecido com a família via WhatsApp em 05/10/2026, 15:29:13.",
    date: null,
  },
  {
    id: "direcionamento",
    dotColor: "bg-purple-500 ring-4 ring-purple-100",
    title: "Direcionamento para Célula (Fluxo Pastoral)",
    titleColor: "text-[#8B5CF6]",
    text: "Célula direcionada: Vivência & Fé (ID: CEL-3190) • em 06/10/2026, 11:40:17",
    badge: "Célula Canônica Vinculada",
    statusBadge: "Vínculo confirmado na célula",
    date: null,
  },
  {
    id: "desfecho",
    dotColor: "bg-teal-500 ring-4 ring-teal-100",
    title: "Desfecho da Jornada: • Reconectado",
    titleColor: "text-teal-700",
    text: "Jornada finalizada em 06/10/2026, 14:54:35. Concluído por: Mariana Duarte Costa.",
    date: null,
  },
  {
    id: "reconexao",
    dotColor: "bg-[#F26A21] ring-4 ring-orange-100",
    title: "Reconexão Confirmada ✨",
    titleColor: "text-[#F26A21]",
    quote: "Reconexão confirmada como 'Reconectado'. Atendimento finalizado com sucesso.",
    date: "Registrado por: Mariana Duarte Costa • Data: 06/10/2026, 14:54:35",
  },
];

export function VisitanteSim({ paused }) {
  const n = useTick(1600, paused);
  // Ciclo de exibição progressiva: revela passo a passo e pausa antes de recomeçar
  const cycleLength = 8;
  const currentTick = n % cycleLength;
  const visibleCount = Math.min(5, currentTick + 1);

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white text-slate-800 shadow-2xl ring-1 ring-black/10 select-none font-sans">
      {/* CABEÇALHO DO MODAL FIEL AO PRINT 2 */}
      <div className="flex h-14 flex-none items-center justify-between border-b border-slate-200/80 bg-white px-3.5 md:px-5">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="grid h-8 w-8 flex-none place-items-center rounded-lg bg-[#EAFBF3] text-[13px] font-extrabold text-[#1FAF7A]">
            R
          </div>
          <div className="flex flex-col text-left leading-none min-w-0">
            <div className="flex items-center gap-2">
              <span className="truncate text-[13px] font-extrabold text-slate-900">
                Roberta Lopes de Santana
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#EAFBF3] px-2 py-0.5 text-[9.5px] font-bold text-[#1FAF7A] border border-[#1FAF7A]/20 flex-none">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1FAF7A]" /> Reconectado
              </span>
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-[10px] text-slate-400 truncate">
              <span>ID: 59188</span>
              <span>•</span>
              <span className="text-slate-600 font-medium">(21) 98765-4321 WhatsApp</span>
              <span className="hidden sm:inline">•</span>
              <span className="truncate hidden sm:inline">Jardim Botânico, Rio de Janeiro</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          aria-label="Fechar"
          className="grid h-7 w-7 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition flex-none"
        >
          <CareIcons.close className="h-4 w-4" />
        </button>
      </div>

      {/* CORPO DA TIMELINE ANIMADA */}
      <div className="flex-1 overflow-y-auto p-4 md:p-5 text-left bg-white">
        <div className="relative pl-6 space-y-3.5">
          {/* Linha vertical conectora de fundo */}
          <div className="absolute left-[7px] top-2 bottom-4 w-0.5 bg-slate-200/80" />

          {TIMELINE_STEPS.map((step, idx) => {
            const isVisible = idx < visibleCount;
            if (!isVisible) return null;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -12, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative group"
              >
                {/* Marcador / Bolinha na linha */}
                <div className={`absolute -left-6 top-1 h-3.5 w-3.5 rounded-full ${step.dotColor} flex-none`} />

                {/* Conteúdo do Card / Etapa */}
                <div className="min-w-0 pr-1">
                  <div className={`text-[12px] font-extrabold tracking-tight ${step.titleColor}`}>
                    {step.title}
                  </div>

                  {step.quote && (
                    <p className="mt-0.5 text-[11px] text-slate-600 italic leading-snug">
                      "{step.quote}"
                    </p>
                  )}

                  {step.text && (
                    <p className="mt-0.5 text-[11px] text-slate-600 leading-snug">
                      {step.text}
                    </p>
                  )}

                  {/* Badges para etapas com vínculo de célula */}
                  {(step.badge || step.statusBadge) && (
                    <div className="mt-1 flex flex-wrap items-center gap-1.5">
                      {step.badge && (
                        <span className="rounded bg-[#FAF7FF] border border-purple-200 px-2 py-0.5 text-[9px] font-bold text-[#8B5CF6]">
                          {step.badge}
                        </span>
                      )}
                      {step.statusBadge && (
                        <span className="rounded bg-[#EAFBF3] border border-emerald-200 px-2 py-0.5 text-[9px] font-bold text-[#1FAF7A]">
                          {step.statusBadge}
                        </span>
                      )}
                    </div>
                  )}

                  {step.date && (
                    <div className="mt-1 text-[9.5px] font-medium text-slate-400">
                      {step.date}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* RODAPÉ DO MODAL: HISTÓRICO DE TRANSIÇÕES (FIEL AO PRINT 2) */}
      <div className="flex-none border-t border-slate-200/80 bg-slate-50/70 p-3 md:px-5">
        <div className="text-[9.5px] font-bold uppercase tracking-wider text-slate-400">
          HISTÓRICO DE TRANSIÇÕES (1)
        </div>
        <div className="mt-1.5 flex items-center justify-between rounded-xl border border-slate-200/70 bg-white px-3 py-1.5 text-[11px] shadow-xs">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 font-bold text-slate-800">
              <span className="h-2 w-2 rounded-full bg-rose-500" /> Afastado
            </span>
            <span className="text-slate-400">→</span>
            <span className="flex items-center gap-1 font-bold text-slate-800">
              <span className="h-2 w-2 rounded-full bg-blue-500" /> Reconectado
            </span>
            <span className="hidden sm:inline text-slate-400 text-[10px]">
              (Mariana Duarte Costa)
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-medium">
            06/10/2026, 14:54
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Painel geral (vitrine do topo: Tela 1 - Dashboard Principal) ---------- */

const DashIcons = {
  home: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5" /><path d="M10 21v-5a2 2 0 0 1 2-2v0a2 2 0 0 1 2 2v5" /></svg>,
  church: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m18 7 4 2v11a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V9l4-2" /><path d="M14 21V9a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v12" /><path d="M12 3v4M10 5h4" /></svg>,
  ticket: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M2 9a3 3 0 0 1 0 6v3a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3a3 3 0 0 1 0-6V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" /><path d="M12 4v2M12 10v2M12 16v4" /></svg>,
  users: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  cells: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect width="7" height="7" x="3" y="3" rx="1.5" /><rect width="7" height="7" x="14" y="3" rx="1.5" /><rect width="7" height="7" x="14" y="14" rx="1.5" /><rect width="7" height="7" x="3" y="14" rx="1.5" /></svg>,
  award: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="8" r="6" /><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.204 0l-3.58 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" /></svg>,
  heart: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>,
  sun: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></svg>,
  calendar: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18M8 2v4M16 2v4" /></svg>,
  chart: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 20V10M18 20V4M6 20v-4M2 20h20" /></svg>,
  forms: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect width="16" height="18" x="4" y="3" rx="2" /><path d="M8 7h8M8 11h8M8 15h5" /></svg>,
  gear: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>,
  help: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" /></svg>,
  grad: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>,
  moon: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>,
  bell: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>,
  refresh: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 12a9 9 0 0 1 15-6.7L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16" /><path d="M3 21v-5h5" /></svg>,
  shieldAlert: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="M12 8v4M12 16h.01" /></svg>,
  doc: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></svg>,
  userCheck: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="m16 11 2 2 4-4" /></svg>,
  chevron: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m9 18 6-6-6-6" /></svg>,
};

export function AppWindow({ paused }) {
  const n = useTick(3400, paused);
  const [spinning, setSpinning] = useState(false);

  // Dispara giro suave no botão de atualizar a cada ciclo
  useEffect(() => {
    setSpinning(true);
    const t = setTimeout(() => setSpinning(false), 900);
    return () => clearTimeout(t);
  }, [n]);

  // Dados fictícios com variações dinâmicas discretas
  const membrosTotal = 19480 + (n % 6) * 7;
  const celulasTotal = 5620 + (n % 3);
  const cuidadoTotal = 11340 + (n % 4) * 3;
  const pendentesFila = 8240 + (n % 5);

  const toasts = [
    { t: "Novo acolhimento registrado", sub: "Rede Esperança · Célula Família Silva", cor: "bg-mint" },
    { t: "Célula Graça & Paz ao vivo", sub: "18 presentes confirmados agora", cor: "bg-[#F26A21]" },
    { t: "Visita pastoral agendada", sub: "Equipe de Cuidado · retorno positivo", cor: "bg-sky" },
  ];
  const toastAtual = toasts[n % toasts.length];

  const sidebarLinks = [
    { id: "inicio", label: "Início", icon: DashIcons.home, active: true },
    { id: "igrejas", label: "Igrejas", icon: DashIcons.church },
    { id: "chamados", label: "Chamados", icon: DashIcons.ticket },
    { id: "usuarios", label: "Usuários", icon: DashIcons.users, hasSub: true },
    { id: "celulas", label: "Células", icon: DashIcons.cells, hasSub: true },
    { id: "voluntariado", label: "Voluntariado", icon: DashIcons.award, hasSub: true },
    { id: "cuidado", label: "Cuidado Pastoral", icon: DashIcons.heart, hasSub: true },
    { id: "kids", label: "Kids", icon: DashIcons.sun, hasSub: true },
    { id: "eventos", label: "Eventos", icon: DashIcons.calendar },
    { id: "relatorios", label: "Relatórios", icon: DashIcons.chart },
    { id: "formularios", label: "Formulários", icon: DashIcons.forms },
    { id: "configuracoes", label: "Configurações", icon: DashIcons.gear, hasSub: true },
    { id: "suporte", label: "Suporte", icon: DashIcons.help },
  ];

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white text-slate-800 shadow-2xl ring-1 ring-black/10 select-none">
      
      {/* 1. TOPBAR FIEL AO PRINT */}
      <header className="flex h-12 flex-none items-center justify-between border-b border-slate-200/80 bg-white px-3 md:px-5">
        <div className="flex items-center gap-2.5">
          <img src="/brand/atoshub-selo-laranja-transparente.svg" alt="Atos Hub" className="h-6 w-6 rounded-md shadow-sm" />
          <div className="flex flex-col text-left leading-none">
            <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">PLATAFORMA</span>
            <span className="text-[12.5px] font-extrabold uppercase tracking-tight text-slate-900">COMUNIDADE ESPERANÇA</span>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-5">
          <span className="hidden items-center gap-1 text-[11px] font-medium text-slate-400 transition hover:text-slate-600 cursor-pointer sm:inline-flex">
            ‹ Voltar Menu Principal
          </span>

          <div className="relative grid h-7 w-7 place-items-center rounded-full text-slate-500 hover:bg-slate-100 transition">
            <DashIcons.bell className="h-4 w-4" />
            <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-rose-500 ring-2 ring-white" />
          </div>

          <div className="flex items-center gap-2 border-l border-slate-200 pl-3 md:pl-4">
            <div className="hidden flex-col text-right leading-none md:flex">
              <span className="text-[11.5px] font-bold text-slate-800">Coordenação Geral</span>
              <span className="mt-0.5 text-[9.5px] font-semibold uppercase tracking-wide text-slate-400">ADMIN MASTER</span>
            </div>
            <div className="grid h-7 w-7 place-items-center rounded-full bg-[#FFEADC] text-[11.5px] font-bold text-[#F26A21]">
              C
            </div>
          </div>
        </div>
      </header>

      {/* 2. CORPO: SIDEBAR + DASHBOARD */}
      <div className="flex min-h-0 flex-1 overflow-hidden">
        
        {/* SIDEBAR ESQUERDA */}
        <aside className="hidden w-12 flex-none flex-col justify-between border-r border-slate-200/80 bg-white py-2.5 sm:flex md:w-44 lg:w-48">
          <nav className="flex flex-col gap-0.5 overflow-y-auto px-1.5">
            {sidebarLinks.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className={`group flex items-center justify-between rounded-lg px-2 py-1.5 text-[11.5px] font-medium transition ${
                    item.active
                      ? "bg-[#FFF4EC] text-[#F26A21] font-semibold border-l-[3px] border-[#F26A21]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={`h-4 w-4 flex-none ${item.active ? "text-[#F26A21]" : "text-slate-400 group-hover:text-slate-600"}`} />
                    <span className="hidden truncate md:inline">{item.label}</span>
                  </div>
                  {item.hasSub && (
                    <DashIcons.chevron className="hidden h-3 w-3 text-slate-300 md:inline flex-none" />
                  )}
                </div>
              );
            })}
          </nav>

          {/* Rodapé da sidebar */}
          <div className="border-t border-slate-200/80 px-2 pt-2 text-[10.5px] text-slate-500 grid gap-1">
            <div className="flex items-center gap-2 rounded-lg px-1 py-1 hover:bg-slate-50 cursor-pointer">
              <DashIcons.grad className="h-3.5 w-3.5 text-slate-400" />
              <span className="hidden md:inline font-medium text-[10px]">AJUDA & TUTORIAIS</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg px-1 py-1 hover:bg-slate-50 cursor-pointer">
              <DashIcons.moon className="h-3.5 w-3.5 text-slate-400" />
              <span className="hidden md:inline font-medium text-[10px]">TEMA ESCURO</span>
            </div>
          </div>
        </aside>

        {/* ÁREA PRINCIPAL DO DASHBOARD */}
        <main className="flex-1 overflow-y-auto bg-[#F8F9FA] p-3 text-left md:p-4 lg:p-5">
          <div className="mx-auto flex max-w-5xl flex-col gap-3.5 md:gap-4">

            {/* CARD DE BOAS-VINDAS */}
            <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)] ring-1 ring-slate-200/70">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#ECEBFF] text-[#6366F1]">
                  <DashIcons.moon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-[13.5px] font-bold text-slate-900 md:text-[14.5px]">
                    Boa noite, <span className="text-[#F26A21]">Coordenação Geral</span>
                  </h3>
                  <p className="text-[10.5px] text-slate-400">
                    quinta-feira, 19 de novembro de 2026
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600 shadow-sm transition hover:bg-slate-50"
              >
                <DashIcons.refresh className={`h-3 w-3 text-slate-500 transition-transform duration-700 ${spinning ? "rotate-180 text-[#F26A21]" : ""}`} />
                <span className="hidden sm:inline">Atualizar</span>
              </button>
            </div>

            {/* SEÇÃO 1: SITUAÇÃO GERAL DA IGREJA */}
            <section>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="grid h-5 w-5 place-items-center rounded-md bg-[#FFF4EC] text-[#F26A21]">
                    <DashIcons.cells className="h-3 w-3" />
                  </span>
                  <div>
                    <h4 className="text-[11.5px] font-bold tracking-tight text-slate-800 uppercase leading-none">
                      SITUAÇÃO GERAL DA IGREJA
                    </h4>
                    <span className="text-[10px] text-slate-400">Métricas consolidadas em tempo real</span>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
                  <LiveDot /> ao vivo
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                {/* Membros Ativos */}
                <div className="flex items-center justify-between rounded-2xl bg-white p-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] ring-1 ring-slate-200/70">
                  <div>
                    <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                      MEMBROS ATIVOS
                    </span>
                    <motion.div
                      key={membrosTotal}
                      initial={{ opacity: 0.8, y: -2 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-0.5 text-[20px] font-extrabold tracking-tight text-slate-900 md:text-[23px]"
                    >
                      {membrosTotal.toLocaleString("pt-BR")}
                    </motion.div>
                  </div>
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#EBF3FF] text-[#3B82F6]">
                    <DashIcons.users className="h-4 w-4" />
                  </div>
                </div>

                {/* Células Ativas */}
                <div className="flex items-center justify-between rounded-2xl bg-white p-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] ring-1 ring-slate-200/70">
                  <div>
                    <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                      CÉLULAS ATIVAS
                    </span>
                    <div className="mt-0.5 text-[20px] font-extrabold tracking-tight text-slate-900 md:text-[23px]">
                      {celulasTotal.toLocaleString("pt-BR")}
                    </div>
                  </div>
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#EAFBF3] text-[#1FAF7A]">
                    <DashIcons.cells className="h-4 w-4" />
                  </div>
                </div>

                {/* Em Cuidado Pastoral */}
                <div className="flex items-center justify-between rounded-2xl bg-white p-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] ring-1 ring-slate-200/70">
                  <div>
                    <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                      EM CUIDADO PASTORAL
                    </span>
                    <div className="mt-0.5 text-[20px] font-extrabold tracking-tight text-slate-900 md:text-[23px]">
                      {cuidadoTotal.toLocaleString("pt-BR")}
                    </div>
                  </div>
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#F5EDFF] text-[#8B5CF6]">
                    <DashIcons.heart className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </section>

            {/* SEÇÃO 2: FILA DE DECISÃO & PENDÊNCIAS */}
            <section>
              <div className="mb-2 flex items-center gap-2">
                <span className="grid h-5 w-5 place-items-center rounded-md bg-[#FFF4EC] text-[#F26A21]">
                  <DashIcons.shieldAlert className="h-3 w-3" />
                </span>
                <div>
                  <h4 className="text-[11.5px] font-bold tracking-tight text-slate-800 uppercase leading-none">
                    FILA DE DECISÃO & PENDÊNCIAS
                  </h4>
                  <span className="text-[10px] text-slate-400">Itens urgentes que necessitam da sua atenção</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {/* Item 1: Distribuição */}
                <div className="group flex items-center justify-between rounded-xl bg-white p-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] ring-1 ring-slate-200/70 transition hover:bg-slate-50/80">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="grid h-7 w-7 place-items-center rounded-lg bg-[#F5EDFF] text-[#8B5CF6] flex-none">
                      <DashIcons.heart className="h-3.5 w-3.5" />
                    </div>
                    <div className="truncate">
                      <div className="truncate text-[11.5px] font-semibold text-slate-800">
                        Membros aguardando distribuição em rede
                      </div>
                      <div className="text-[9.5px] text-slate-400">Clique para gerenciar</div>
                    </div>
                  </div>
                  <span className="ml-2 flex items-center gap-1 rounded-full bg-[#F5EDFF] px-2 py-0.5 text-[10.5px] font-bold text-[#8B5CF6] flex-none">
                    {pendentesFila.toLocaleString("pt-BR")} →
                  </span>
                </div>

                {/* Item 2: Sem rede alternativa */}
                <div className="group flex items-center justify-between rounded-xl bg-white p-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] ring-1 ring-slate-200/70 transition hover:bg-slate-50/80">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="grid h-7 w-7 place-items-center rounded-lg bg-slate-100 text-slate-500 flex-none">
                      <DashIcons.shieldAlert className="h-3.5 w-3.5" />
                    </div>
                    <div className="truncate">
                      <div className="truncate text-[11.5px] font-semibold text-slate-800">
                        Membros sem rede alternativa (Atenção)
                      </div>
                      <div className="text-[9.5px] text-slate-400">Clique para gerenciar</div>
                    </div>
                  </div>
                  <span className="ml-2 flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10.5px] font-bold text-slate-500 flex-none">
                    0 →
                  </span>
                </div>

                {/* Item 3: Chamados abertos */}
                <div className="group flex items-center justify-between rounded-xl bg-white p-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] ring-1 ring-slate-200/70 transition hover:bg-slate-50/80">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="grid h-7 w-7 place-items-center rounded-lg bg-[#FFF4EC] text-[#F26A21] flex-none">
                      <DashIcons.doc className="h-3.5 w-3.5" />
                    </div>
                    <div className="truncate">
                      <div className="truncate text-[11.5px] font-semibold text-slate-800">
                        Chamados abertos aguardando resposta
                      </div>
                      <div className="text-[9.5px] text-slate-400">Clique para gerenciar</div>
                    </div>
                  </div>
                  <span className="ml-2 flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10.5px] font-bold text-slate-500 flex-none">
                    0 →
                  </span>
                </div>

                {/* Item 4: Solicitações de células */}
                <div className="group flex items-center justify-between rounded-xl bg-white p-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] ring-1 ring-slate-200/70 transition hover:bg-slate-50/80">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="grid h-7 w-7 place-items-center rounded-lg bg-[#EBF3FF] text-[#3B82F6] flex-none">
                      <DashIcons.userCheck className="h-3.5 w-3.5" />
                    </div>
                    <div className="truncate">
                      <div className="truncate text-[11.5px] font-semibold text-slate-800">
                        Solicitações de entrada em células pendentes
                      </div>
                      <div className="text-[9.5px] text-slate-400">Clique para gerenciar</div>
                    </div>
                  </div>
                  <span className="ml-2 flex items-center gap-1 rounded-full bg-[#EBF3FF] px-2 py-0.5 text-[10.5px] font-bold text-[#3B82F6] flex-none">
                    7 →
                  </span>
                </div>
              </div>
            </section>

            {/* SEÇÃO 3: ATALHOS DE ACESSO RÁPIDO */}
            <section>
              <div className="mb-2 flex items-center gap-2">
                <span className="grid h-5 w-5 place-items-center rounded-md bg-[#FFF4EC] text-[#F26A21]">
                  <DashIcons.sun className="h-3 w-3" />
                </span>
                <div>
                  <h4 className="text-[11.5px] font-bold tracking-tight text-slate-800 uppercase leading-none">
                    ATALHOS DE ACESSO RÁPIDO
                  </h4>
                  <span className="text-[10px] text-slate-400">Módulos mais acessados no dia a dia</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
                {[
                  { t: "Cuidado Pastoral", icon: DashIcons.heart, c: "bg-[#F5EDFF] text-[#8B5CF6]" },
                  { t: "Central de Chamados", icon: DashIcons.ticket, c: "bg-[#FFF4EC] text-[#F26A21]" },
                  { t: "Gestão de Usuários", icon: DashIcons.users, c: "bg-[#EBF3FF] text-[#3B82F6]" },
                  { t: "Células & Redes", icon: DashIcons.cells, c: "bg-[#EAFBF3] text-[#1FAF7A]" },
                  { t: "Relatórios Gerais", icon: DashIcons.chart, c: "bg-[#E0F7FA] text-[#00838F]" },
                  { t: "Solicitações de Células", icon: DashIcons.userCheck, c: "bg-[#FCE4EC] text-[#C2185B]" },
                ].map((a) => {
                  const Icon = a.icon;
                  return (
                    <div
                      key={a.t}
                      className="group flex flex-col items-center justify-center rounded-xl bg-white p-3 text-center shadow-[0_1px_2px_rgba(0,0,0,0.03)] ring-1 ring-slate-200/70 transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className={`grid h-8 w-8 place-items-center rounded-xl ${a.c}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="mt-2 text-[10.5px] font-semibold text-slate-700 leading-snug">
                        {a.t}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

          </div>
        </main>
      </div>

      {/* TOAST FLUTUANTE DE EVENTO AO VIVO */}
      <AnimatePresence mode="wait">
        <motion.div
          key={toastAtual.t}
          initial={{ y: 20, opacity: 0, scale: 0.96 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 15, opacity: 0, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className="absolute bottom-3 right-3 hidden sm:flex items-center gap-2.5 rounded-xl bg-slate-900/95 px-3 py-2 text-white shadow-2xl backdrop-blur-md ring-1 ring-white/10"
        >
          <span className={`h-2 w-2 rounded-full ${toastAtual.cor} animate-pulse flex-none`} />
          <div className="text-left leading-tight">
            <div className="text-[11px] font-semibold">{toastAtual.t}</div>
            <div className="text-[10px] font-medium text-slate-400">{toastAtual.sub}</div>
          </div>
        </motion.div>
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
  /* ---------- Layout Real das Nossas Escalas (Imagem 3) ---------- */
  if (tipo === "escala") return (
    <div className="flex flex-col gap-2 rounded-2xl bg-white p-3 ring-1 ring-line text-ink">
      {/* Topo do Evento */}
      <div className="flex items-center justify-between border-b border-line/60 pb-2">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[12.5px] font-bold text-slate-900">Culto de Adoração & Avivamento</span>
            <span className="rounded-full bg-orange-100/80 px-2 py-0.2 text-[9px] font-bold text-[#F26A21]">1 DATA</span>
          </div>
          <div className="text-[9.5px] text-muted">Próxima: Quinta-feira, 19 nov às 20:00</div>
        </div>
      </div>

      {/* Card da Escala com Data e QR */}
      <div className="rounded-xl border border-orange-200/80 bg-[#FFFDFB] p-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 flex-col items-center justify-center rounded-lg border border-orange-200 bg-white leading-none">
              <span className="text-[8px] font-bold text-slate-400 uppercase">QUI</span>
              <span className="text-[13px] font-extrabold text-[#F26A21]">19</span>
            </div>
            <div>
              <div className="text-[11.5px] font-bold text-slate-900">Quinta-feira, 19 de novembro</div>
              <div className="text-[10px] font-extrabold text-[#F26A21]">20:00</div>
            </div>
          </div>
          <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[9px] font-extrabold text-[#059669]">
            CONFIRMADO ✓
          </span>
        </div>

        <div className="mt-2 text-[10px] border-t border-slate-100 pt-1.5">
          <span className="text-slate-400">Ministério:</span>{" "}
          <span className="font-bold text-slate-700">MINISTÉRIO DE INTEGRAÇÃO</span>
          <div className="font-bold text-[#F26A21] text-[10.5px]">Acolhimento e Recepção</div>
        </div>

        <button
          type="button"
          className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#F26A21] py-1.5 text-[11px] font-bold text-white shadow-xs"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
          MEU QR DE PRESENÇA
        </button>

        <div className="mt-2 grid grid-cols-2 gap-1.5 text-[10px]">
          <button type="button" className="flex items-center justify-center gap-1 rounded-lg border border-slate-200 bg-white py-1 font-semibold text-slate-600">
            ⇄ Trocar
          </button>
          <button type="button" className="flex items-center justify-center gap-1 rounded-lg border border-orange-200 bg-[#FFF2EA] py-1 font-bold text-[#F26A21]">
            ≡ Ordem de Culto
          </button>
        </div>
      </div>
    </div>
  );

  /* ---------- Layout Real da Ordem de Culto (Imagem 2) ---------- */
  if (tipo === "culto") return (
    <div className="flex flex-col gap-2 rounded-2xl bg-white p-3 ring-1 ring-line text-ink">
      {/* Topo da Ordem de Culto */}
      <div className="flex items-center justify-between border-b border-line/60 pb-2">
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400 text-xs">←</span>
          <span className="text-[#F26A21] font-bold text-sm">≡</span>
          <div>
            <div className="text-[12.5px] font-bold text-slate-900 leading-none">Ordem de Culto</div>
            <div className="text-[9px] text-muted">Culto de Celebração e Adoração</div>
          </div>
        </div>
        <span className="rounded-full bg-orange-50 border border-orange-200 px-2 py-0.5 text-[9px] font-bold text-[#F26A21]">
          ⏱ Em Andamento
        </span>
      </div>

      {/* 1. PRÉ-CULTO E PREPARAÇÃO */}
      <div className="rounded-xl border border-slate-100 bg-surface/50 p-2">
        <div className="flex items-center justify-between text-[8.5px] font-bold text-slate-400 uppercase">
          <span>Pré-culto e preparação</span>
          <span>2 itens</span>
        </div>
        <div className="mt-1 space-y-1">
          <div className="flex items-start justify-between rounded-lg bg-emerald-50/70 p-1 text-[10.5px]">
            <div className="flex items-start gap-1">
              <span className="text-emerald-600 font-bold text-[10px]">✓</span>
              <div>
                <span className="font-medium text-slate-500 line-through">Oração com a equipe de voluntários</span>
                <div className="text-[8px] text-emerald-600">✓ Concluído por: Supervisão</div>
              </div>
            </div>
            <span className="font-bold text-[#F26A21] text-[9.5px]">18:30</span>
          </div>

          <div className="flex items-start justify-between p-1 text-[10.5px] text-slate-700">
            <div className="flex items-start gap-1">
              <span className="text-slate-300">○</span>
              <div>
                <span className="font-medium">Microfonação e passagem de som</span>
                <div className="text-[8px] text-slate-400">Equipe de Áudio / Produção</div>
              </div>
            </div>
            <span className="font-bold text-[#F26A21] text-[9.5px]">18:45</span>
          </div>
        </div>
      </div>

      {/* 2. LOUVOR E ADORAÇÃO */}
      <div className="rounded-xl border border-orange-100 bg-[#FFFDFB] p-2">
        <div className="flex items-center justify-between text-[8.5px] font-bold text-[#F26A21] uppercase">
          <span>Louvor e Adoração</span>
          <span className="rounded-full bg-orange-100 px-1 py-0.2 text-[7.5px] font-extrabold text-[#F26A21]">AGORA</span>
        </div>
        <div className="mt-1 space-y-1">
          <div className="flex items-start justify-between rounded-lg bg-orange-50/80 p-1 text-[10.5px] border border-orange-200/80">
            <div className="flex items-start gap-1">
              <span className="text-[#F26A21] font-bold">●</span>
              <div>
                <span className="font-bold text-slate-900">Música 1: A Casa É Sua (Tom D)</span>
                <div className="text-[8px] text-slate-500">Banda / Ministério de Louvor</div>
              </div>
            </div>
            <span className="font-extrabold text-[#F26A21] text-[9.5px]">19:00</span>
          </div>

          <div className="flex items-start justify-between p-1 text-[10.5px] text-slate-600">
            <div className="flex items-start gap-1">
              <span className="text-slate-300">○</span>
              <span className="font-medium">Música 2: Ruja o Leão (Tom Em)</span>
            </div>
            <span className="text-slate-400 text-[9.5px]">19:08</span>
          </div>
        </div>
      </div>
    </div>
  );
  if (tipo === "kids") return (
    <div className="flex flex-col gap-2 rounded-2xl bg-white p-3 ring-1 ring-line text-ink">
      <div className="flex items-center justify-between border-b border-line/60 pb-2">
        <div>
          <div className="flex items-center gap-1 text-[13px] font-bold">
            <span>Meus Filhos</span>
            <span className="text-[#F26A21] text-[12px]">★</span>
          </div>
          <span className="text-[9px] font-bold tracking-wider text-muted uppercase">Gestão de Responsável</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-line bg-surface px-2 py-0.5 text-[10px] font-medium text-slate-700">
            🔑 Tenho convite
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#F26A21] px-2.5 py-1 text-[10px] font-bold text-white shadow-xs">
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            Meu QR Entrada
          </span>
        </div>
      </div>

      <div className="rounded-xl border border-line/80 bg-surface/40 p-2.5">
        <div className="flex items-start gap-2.5">
          <div className="grid h-8 w-8 flex-none place-items-center rounded-lg bg-[#FFF2EA] text-[#F26A21] font-bold text-[13px]">
            L
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[12.5px] font-bold text-ink truncate">Lucas Silveira</span>
              <span className="text-[10px] text-muted">NASC: 14/05/2018</span>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-md border border-[#F26A21]/40 bg-white px-2 py-0.5 text-[9.5px] font-semibold text-[#F26A21]">
                Célula Kids: Sem célula ▾
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Pronto para entrada
              </span>
            </div>
          </div>
        </div>

        <button type="button" className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#F26A21] py-1.5 text-[11px] font-bold text-white shadow-xs transition hover:bg-[#d85814]">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2"><rect x="3" y="3" width="6" height="6"/><rect x="15" y="3" width="6" height="6"/><rect x="3" y="15" width="6" height="6"/><path d="M15 15h3v3h-3zM18 18h3v3h-3z"/></svg>
          Abrir Meu QR de Entrada
        </button>

        <div className="mt-2 flex items-center justify-between text-[10px] text-muted border-t border-line/40 pt-1.5">
          <span className="flex items-center gap-1 truncate">
            <Icons.heart className="h-3 w-3 text-[#F26A21]" />
            <span className="truncate">Responsáveis: Mariana & Carlos Silveira</span>
          </span>
          <span className="text-[#F26A21] font-medium shrink-0 cursor-pointer">+ Convidar 2º</span>
        </div>
      </div>
    </div>
  );

  /* tipo === "relatorio" (Imagem 3) */
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 rounded-2xl bg-white p-2.5 ring-1 ring-line text-ink">
      {/* 1. Abertura / Fechamento */}
      <div className="rounded-xl border border-line/60 bg-surface/30 p-2 flex flex-col justify-between">
        <div className="text-[11px] font-bold text-ink leading-tight">Abertura / Fechamento</div>
        <div className="mt-2 flex h-20 items-end justify-between gap-1 border-b border-line/50 pb-1">
          {[
            { m: "dez", h: 35 },
            { m: "jan", h: 48 },
            { m: "mar", h: 62 },
            { m: "mai", h: 54 },
            { m: "jul", h: 76 },
            { m: "set", h: 92, active: true },
            { m: "nov", h: 84 },
          ].map((bar) => (
            <div key={bar.m} className="flex flex-1 flex-col items-center gap-0.5">
              <div
                style={{ height: `${bar.h}%` }}
                className={`w-full max-w-[8px] rounded-t-sm ${
                  bar.active ? "bg-[#EF5A4C]" : "bg-slate-300"
                }`}
              />
              <span className="text-[8px] text-muted">{bar.m}</span>
            </div>
          ))}
        </div>
        <div className="mt-1 flex items-center justify-between text-[8.5px] text-muted">
          <span>0</span>
          <span className="font-bold text-[#EF5A4C]">+92 células</span>
        </div>
      </div>

      {/* 2. Engajamento (Reuniões) */}
      <div className="rounded-xl border border-line/60 bg-surface/30 p-2 flex flex-col justify-between">
        <div className="text-[11px] font-bold text-ink leading-tight">Engajamento (Reuniões)</div>
        <div className="mt-2 relative h-20 w-full flex items-end">
          <svg viewBox="0 0 100 40" className="h-full w-full overflow-visible" preserveAspectRatio="none">
            <line x1="0" y1="10" x2="100" y2="10" stroke="#E2E8F0" strokeDasharray="2,2" strokeWidth="0.8" />
            <line x1="0" y1="25" x2="100" y2="25" stroke="#E2E8F0" strokeDasharray="2,2" strokeWidth="0.8" />
            <polyline
              fill="none"
              stroke="#2563EB"
              strokeWidth="2"
              points="0,32 16,28 33,22 50,18 66,14 83,10 100,8"
            />
            {[
              [0, 32], [16, 28], [33, 22], [50, 18], [66, 14], [83, 10], [100, 8]
            ].map(([cx, cy], idx) => (
              <circle key={idx} cx={cx} cy={cy} r="2.2" fill="#2563EB" stroke="#fff" strokeWidth="0.8" />
            ))}
          </svg>
        </div>
        <div className="mt-1 flex items-center justify-between text-[8.5px] text-muted">
          <span>dez</span>
          <span className="font-bold text-[#2563EB]">92% presença</span>
          <span>nov</span>
        </div>
      </div>

      {/* 3. Saúde do Grupo */}
      <div className="rounded-xl border border-line/60 bg-surface/30 p-2 flex flex-col justify-between">
        <div className="text-[11px] font-bold text-ink leading-tight">Saúde do Grupo</div>
        <div className="mt-2 flex h-20 flex-col justify-center gap-1.5">
          {[
            { l: "Comunhão", v: "3.9 / 4.0", p: 96, c: "bg-emerald-500" },
            { l: "Discipulado", v: "3.7 / 4.0", p: 92, c: "bg-blue-500" },
            { l: "Multiplicação", v: "3.5 / 4.0", p: 86, c: "bg-[#F26A21]" },
          ].map((item) => (
            <div key={item.l} className="space-y-0.5">
              <div className="flex justify-between text-[8px] font-medium text-slate-700">
                <span>{item.l}</span>
                <span className="font-bold">{item.v}</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div style={{ width: `${item.p}%` }} className={`h-full ${item.c} rounded-full`} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-1 flex items-center justify-between text-[8.5px] text-muted">
          <span>Média Geral</span>
          <span className="font-bold text-emerald-600">3.8 (Excelente)</span>
        </div>
      </div>
    </div>
  );
}
