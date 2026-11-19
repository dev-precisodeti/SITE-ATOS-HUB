import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScenePlayer } from "./ScenePlayer.jsx";
import { LogoMark } from "./UI.jsx";

/* Ícones fiéis aos prints da aba inferior */
const NavIcons = {
  eventos: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  ),
  agenda: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
    </svg>
  ),
  ministerio: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  perfil: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="8" r="4" />
      <path d="M6 21v-2a6 6 0 0 1 12 0v2" />
    </svg>
  ),
  qr: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect width="5" height="5" x="3" y="3" rx="1" />
      <rect width="5" height="5" x="16" y="3" rx="1" />
      <rect width="5" height="5" x="3" y="16" rx="1" />
      <path d="M21 16h-3a2 2 0 0 0-2 2v3M21 21v.01M12 7v3a2 2 0 0 1-2 2H7M3 12h.01M12 3h.01M12 16v.01M16 12h1M21 12v.01M12 21v-1" />
    </svg>
  ),
  google: (p) => (
    <svg viewBox="0 0 24 24" {...p}>
      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24Z" />
      <path fill="#FBBC05" d="M5.28 14.27a7.17 7.17 0 0 1 0-4.54V6.58H1.25a11.96 11.96 0 0 0 0 10.84l4.03-3.15Z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z" />
    </svg>
  ),
};

/* Barra de Navegação Inferior Móvel idêntica ao print */
function BottomNavBar({ activeTab = "eventos" }) {
  const tabs = [
    { id: "eventos", label: "Eventos", icon: NavIcons.eventos },
    { id: "agenda", label: "Agenda", icon: NavIcons.agenda },
    { id: "ministerio", label: "Ministério", icon: NavIcons.ministerio },
    { id: "perfil", label: "Perfil", icon: NavIcons.perfil },
  ];

  return (
    <div className="flex h-12 flex-none items-center justify-around border-t border-slate-200/80 bg-white px-2 text-[10px]">
      {tabs.map((t) => {
        const Icon = t.icon;
        const isActive = t.id === activeTab;
        return (
          <div
            key={t.id}
            className={`flex flex-col items-center justify-center gap-0.5 transition ${isActive ? "font-bold text-[#F26A21]" : "text-slate-400 font-medium"
              }`}
          >
            <div className={`p-1 rounded-xl ${isActive ? "bg-[#FFF4EC]" : ""}`}>
              <Icon className="h-4 w-4" />
            </div>
            <span className="leading-none">{t.label}</span>
          </div>
        );
      })}
    </div>
  );
}

/* Componente com animação sequencial das tarefas sendo concluídas uma a uma */
function OrdemCultoAnimatedScreen({ stepNumber = 1 }) {
  const isStep1Done = stepNumber >= 2;
  const isStep2Done = stepNumber >= 3;
  const isLouvorLive = stepNumber >= 4;

  return (
    <div className="flex h-full flex-col bg-[#F8F9FA] text-left select-none">
      {/* Header da Ordem de Culto */}
      <div className="bg-white p-3 border-b border-slate-100 shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 text-xs">←</span>
            <span className="text-orange-500 font-bold">≡</span>
            <div>
              <h4 className="text-[12.5px] font-extrabold text-slate-900 leading-none">
                Ordem de Culto
              </h4>
              <span className="text-[9px] text-slate-400">Culto de Celebração e Adoração</span>
            </div>
          </div>
          {isLouvorLive ? (
            <span className="rounded-full bg-orange-50 border border-orange-200 px-2 py-0.5 text-[8.5px] font-bold text-[#F26A21] flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F26A21] animate-ping" />
              Ao Vivo
            </span>
          ) : isStep1Done ? (
            <span className="rounded-full bg-orange-50 border border-orange-200 px-2 py-0.5 text-[8.5px] font-bold text-[#F26A21]">
              ⏱ Em Andamento
            </span>
          ) : (
            <span className="rounded-full bg-slate-100 border border-slate-200 px-2 py-0.5 text-[8.5px] font-bold text-slate-600">
              ⏱ Não Iniciada
            </span>
          )}
        </div>
      </div>

      {/* Seções da Liturgia */}
      <div className="flex-1 overflow-y-auto p-2.5 space-y-2 text-[10.5px]">
        {/* 1. PRÉ-CULTO E PREPARAÇÃO */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-2.5 shadow-2xs">
          <div className="flex items-center justify-between text-[9px] font-extrabold uppercase text-slate-500 pb-1.5 border-b border-slate-100">
            <span>PRÉ-CULTO E PREPARAÇÃO</span>
            <span className="font-bold">
              {isStep2Done ? "2 CONCLUÍDOS" : isStep1Done ? "1 CONCLUÍDO" : "2 ITENS ABERTOS"}
            </span>
          </div>

          <div className="mt-1.5 space-y-1.5">
            {/* Item 1: Oração com a equipe */}
            {isStep1Done ? (
              <motion.div
                key="step1-done"
                initial={{ scale: 0.94, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="flex items-start justify-between rounded-xl bg-emerald-50/80 p-1.5 border border-emerald-200 shadow-2xs"
              >
                <div className="flex items-start gap-1.5">
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="grid h-4 w-4 place-items-center rounded-full bg-[#059669] text-white font-extrabold text-[9px] shrink-0 mt-0.5"
                  >
                    ✓
                  </motion.span>
                  <div>
                    <div className="font-semibold text-slate-500 line-through">
                      Oração com a equipe de voluntários
                    </div>
                    <div className="text-[8.5px] text-[#059669] font-semibold">✓ Concluído por: Supervisão</div>
                  </div>
                </div>
                <span className="font-bold text-[#F26A21] text-[9.5px]">18:30</span>
              </motion.div>
            ) : (
              <div className="flex items-start justify-between p-1.5 rounded-xl border border-slate-100 bg-white transition-all">
                <div className="flex items-start gap-1.5">
                  <span className="text-slate-300 font-bold text-[12px] shrink-0 mt-0.5">○</span>
                  <div>
                    <div className="font-bold text-slate-800">
                      Oração com a equipe de voluntários
                    </div>
                    <div className="text-[8.5px] text-slate-400">Responsável: Líder de Louvor</div>
                  </div>
                </div>
                <span className="font-bold text-[#F26A21] text-[9.5px]">18:30</span>
              </div>
            )}

            {/* Item 2: Microfonação e passagem de som */}
            {isStep2Done ? (
              <motion.div
                key="step2-done"
                initial={{ scale: 0.94, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="flex items-start justify-between rounded-xl bg-emerald-50/80 p-1.5 border border-emerald-200 shadow-2xs"
              >
                <div className="flex items-start gap-1.5">
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="grid h-4 w-4 place-items-center rounded-full bg-[#059669] text-white font-extrabold text-[9px] shrink-0 mt-0.5"
                  >
                    ✓
                  </motion.span>
                  <div>
                    <div className="font-semibold text-slate-500 line-through">
                      Microfonação e passagem de som
                    </div>
                    <div className="text-[8.5px] text-[#059669] font-semibold">✓ Concluído por: Equipe de Áudio</div>
                  </div>
                </div>
                <span className="font-bold text-[#F26A21] text-[9.5px]">18:45</span>
              </motion.div>
            ) : (
              <div
                className={`flex items-start justify-between p-1.5 rounded-xl border transition-all ${
                  isStep1Done ? "border-orange-200 bg-orange-50/30 ring-1 ring-orange-200/50" : "border-slate-100 bg-white"
                }`}
              >
                <div className="flex items-start gap-1.5">
                  <span className={`shrink-0 mt-0.5 font-bold text-[12px] ${isStep1Done ? "text-[#F26A21]" : "text-slate-300"}`}>
                    ○
                  </span>
                  <div>
                    <div className="font-medium text-slate-800">Microfonação e passagem de som</div>
                    <div className="text-[8.5px] text-slate-400">Responsável: Equipe de Áudio / Produção</div>
                  </div>
                </div>
                <span className="font-bold text-[#F26A21] text-[9.5px]">18:45</span>
              </div>
            )}
          </div>
        </div>

        {/* 2. LOUVOR E ADORAÇÃO */}
        <div className={`rounded-2xl border p-2.5 shadow-2xs transition-all ${isLouvorLive ? "border-orange-300 bg-white" : "border-slate-200/80 bg-white"}`}>
          <div className="flex items-center justify-between text-[9px] font-extrabold uppercase text-slate-500 pb-1.5 border-b border-slate-100">
            <span className={isLouvorLive ? "text-[#F26A21] font-bold" : ""}>LOUVOR E ADORAÇÃO</span>
            {isLouvorLive ? (
              <span className="rounded-full bg-orange-100 px-1.5 py-0.2 text-[8px] font-bold text-[#F26A21] animate-pulse">
                AGORA AO VIVO
              </span>
            ) : (
              <span>4 ITENS</span>
            )}
          </div>

          <div className="mt-1.5 space-y-1.5">
            {isLouvorLive ? (
              <motion.div
                initial={{ scale: 0.97 }}
                animate={{ scale: 1 }}
                className="flex items-start justify-between p-1.5 rounded-lg bg-orange-50/90 border border-orange-200 shadow-2xs"
              >
                <div className="flex items-start gap-1.5">
                  <span className="text-[#F26A21] font-bold text-[13px]">●</span>
                  <div>
                    <div className="font-bold text-slate-900">Música 1: A Casa É Sua (Tom D)</div>
                    <div className="text-[8.5px] text-slate-500">Banda / Ministério de Louvor</div>
                  </div>
                </div>
                <span className="font-extrabold text-[#F26A21] text-[9.5px]">19:00</span>
              </motion.div>
            ) : (
              <div className="flex items-start justify-between p-1 text-slate-700">
                <div className="flex items-start gap-1.5">
                  <span className="text-slate-300">○</span>
                  <div>
                    <div className="font-medium text-slate-800">Música 1: A Casa É Sua (Tom D)</div>
                    <div className="text-[8.5px] text-slate-400">Banda / Ministério de Louvor</div>
                  </div>
                </div>
                <span className="font-bold text-[#F26A21] text-[9.5px]">19:00</span>
              </div>
            )}

            <div className="flex items-start justify-between p-1 text-slate-600">
              <div className="flex items-start gap-1.5">
                <span className="text-slate-300">○</span>
                <span className="font-medium">Música 2: Ruja o Leão (Tom Em)</span>
              </div>
              <span className="text-slate-400 text-[9.5px]">19:08</span>
            </div>
          </div>
        </div>
      </div>

      <BottomNavBar activeTab="eventos" />
    </div>
  );
}

/* =========================================================================
   ROTEIRO DE CENAS DO VOLUNTARIADO (Fiel aos Prints 1, 2, 3, 4 e 5)
   ========================================================================= */

export function VoluntariadoSim() {
  const chapters = [
    /* ----------------------------------------------------
       CAPÍTULO 1: ESCALAS & VAGAS ABERTAS (Fiel ao Novo Print 3)
       ---------------------------------------------------- */
    {
      id: "escalas",
      label: "1. Escalas",
      steps: [
        {
          id: "esc-1",
          duration: 4200,
          description: "Próximos cultos com contagem de vagas abertas e funções",
          cursor: { x: 50, y: 74, tap: true, tapDelay: 1800 },
          render: () => (
            <div className="flex h-full flex-col bg-[#FFFBF8] text-left">
              {/* Header do App */}
              <div className="flex items-center justify-between px-3.5 py-2 border-b border-orange-100 bg-white">
                <div className="flex items-center gap-1.5">
                  <LogoMark className="h-5 w-5" />
                  <span className="text-[11.5px] font-extrabold uppercase tracking-tight text-slate-800">ATOS HUB</span>
                </div>
                <span className="rounded-full bg-orange-50 border border-orange-200 px-2 py-0.5 text-[9px] font-extrabold text-[#F26A21]">
                  4 vagas abertas
                </span>
              </div>

              {/* Lista Scrollável Fiel ao Print 3 */}
              <div className="flex-1 overflow-y-auto p-2.5 space-y-2">
                {/* Card Culto de Jovens (Fiel ao Print 3) */}
                <div className="rounded-2xl border border-orange-200 bg-white p-3 shadow-xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-[12.5px] font-extrabold text-slate-900 leading-snug">
                        Culto de Celebração de Jovens
                      </h4>
                      <div className="mt-0.5 flex items-center gap-1.5 text-[9.5px]">
                        <span className="rounded-full bg-orange-100 px-1.5 py-0.2 font-extrabold text-[#F26A21]">1 DATA</span>
                        <span className="text-slate-400">Próxima: Sábado, às 19:30</span>
                      </div>
                      <div className="mt-1 text-[10px] font-bold text-[#F26A21]">
                        4 vagas abertas no total
                      </div>
                    </div>
                    <span className="text-slate-400 text-xs">∧</span>
                  </div>

                  {/* Subcard Aberto do Print 3 */}
                  <div className="mt-2 rounded-xl border border-orange-200/60 bg-[#FFFDFB] p-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="grid h-9 w-9 place-items-center rounded-xl border border-orange-200 bg-white text-center leading-none shadow-2xs">
                          <span className="text-[8px] font-extrabold uppercase text-slate-400">SÁB</span>
                          <span className="text-[13px] font-black text-slate-800">21</span>
                        </div>
                        <div>
                          <div className="text-[11px] font-bold text-slate-800">Sábado, 21 nov</div>
                          <div className="text-[9.5px] font-extrabold text-[#F26A21]">19:30</div>
                        </div>
                      </div>
                      <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[8.5px] font-extrabold text-[#F26A21]">
                        4 VAGAS ABERTAS ›
                      </span>
                    </div>

                    <div className="mt-2 text-[9.5px] text-slate-500 font-medium">
                      Funções disponíveis para este dia:
                    </div>
                    <div className="mt-1 flex flex-col gap-1 text-[9.5px]">
                      <div className="flex items-center justify-between rounded-lg bg-slate-50 px-2 py-1 border border-slate-100">
                        <span className="text-slate-700 font-medium">Equipe de Apoio e Conectividade</span>
                        <span className="rounded-full bg-orange-100 px-1.5 py-0.2 font-bold text-[#F26A21]">2</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-orange-50/70 px-2 py-1 border border-orange-200/60 font-semibold text-slate-800">
                        <span>Recepção e Check-in One</span>
                        <span className="rounded-full bg-[#F26A21] px-1.5 py-0.2 font-bold text-white">2</span>
                      </div>
                    </div>

                    {/* Botões do Print 3 */}
                    <div className="mt-2.5 space-y-1">
                      <button type="button" className="w-full rounded-xl bg-[#F26A21] py-2 text-center text-[11px] font-extrabold text-white shadow-xs">
                        QUERO SERVIR / ESCALAR ›
                      </button>
                      <button type="button" className="w-full rounded-xl border border-orange-200 bg-orange-50/50 py-1.5 text-center text-[10px] font-bold text-[#F26A21]">
                        ≡ Ordem de Culto
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card Domingo (Fechado) */}
                <div className="rounded-2xl border border-orange-200/60 bg-white p-2.5 shadow-2xs flex items-center justify-between">
                  <div>
                    <h4 className="text-[11.5px] font-bold text-slate-800">Culto de Celebração (Manhã)</h4>
                    <span className="text-[9.5px] text-slate-400">Domingo, 10:00 · 3 vagas abertas</span>
                  </div>
                  <span className="text-slate-400 text-xs">∨</span>
                </div>
              </div>

              <BottomNavBar activeTab="eventos" />
            </div>
          ),
        },
      ],
    },

    /* ----------------------------------------------------
       CAPÍTULO 2: CANDIDATAR-SE NA VAGA (Fiel ao Novo Print 4)
       ---------------------------------------------------- */
    {
      id: "vagas",
      label: "2. Se Escalar",
      steps: [
        {
          id: "vag-1",
          duration: 4200,
          description: "Visualizando voluntários confirmados e preenchendo a vaga aberta",
          cursor: { x: 38, y: 68, tap: true, tapDelay: 1400 },
          toast: {
            title: "Inscrição Confirmada! ✓",
            message: "Você agora faz parte da Recepção no Culto de Sábado",
          },
          toastDelay: 1600,
          render: () => (
            <div className="flex h-full flex-col bg-[#F8F9FA] text-left">
              {/* Header Detalhe da Função (Fiel ao Print 4) */}
              <div className="bg-white p-3 border-b border-slate-100 shadow-2xs">
                <div className="flex items-center justify-between">
                  <h4 className="text-[12.5px] font-black text-slate-900">
                    Recepção e Check-in One
                  </h4>
                  <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[8.5px] font-extrabold text-[#F26A21]">
                    MINISTÉRIO DE JOVENS
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between text-[10px]">
                  <span className="font-extrabold text-[#F26A21]">2 de 4 vagas preenchidas</span>
                  <span className="text-slate-400 text-[9px] italic">Check-in na chegada</span>
                </div>
              </div>

              {/* Lista dos Voluntários (Fiel ao Print 4) */}
              <div className="flex-1 overflow-y-auto p-2.5 space-y-1.5 text-[10.5px]">
                {/* 1. Voluntário Confirmado */}
                <div className="flex items-center justify-between rounded-xl bg-white p-2 border border-slate-200/80 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <div className="grid h-6 w-6 place-items-center rounded-lg bg-[#059669] text-white font-extrabold text-[9px]">
                      GU
                    </div>
                    <div>
                      <div className="font-bold text-slate-800">Voluntário Lucas Silveira</div>
                      <span className="text-[8.5px] font-extrabold text-[#059669]">CONFIRMADO</span>
                    </div>
                  </div>
                  <span className="text-slate-400 text-xs">⇄</span>
                </div>

                {/* 2. Voluntário Confirmado */}
                <div className="flex items-center justify-between rounded-xl bg-white p-2 border border-slate-200/80 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <div className="grid h-6 w-6 place-items-center rounded-lg bg-[#059669] text-white font-extrabold text-[9px]">
                      AL
                    </div>
                    <div>
                      <div className="font-bold text-slate-800">Alice Pires Cardoso</div>
                      <span className="text-[8.5px] font-extrabold text-[#059669]">CONFIRMADO</span>
                    </div>
                  </div>
                  <span className="text-slate-400 text-xs">⇄</span>
                </div>

                {/* 3. Vaga Disponível - Alvo do Toque (Fiel ao Print 4) */}
                <div className="rounded-xl border border-dashed border-orange-300 bg-orange-50/40 p-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-[9px] font-bold text-slate-500 border border-slate-200">
                        3
                      </span>
                      <span className="font-bold text-slate-700 text-[10px]">Vaga Disponível</span>
                    </div>
                  </div>
                  <div className="mt-1.5 flex gap-1.5">
                    <button type="button" className="flex-1 rounded-lg bg-[#F26A21] py-1 text-center font-extrabold text-white text-[9.5px] shadow-xs active:bg-orange-700">
                      👤 QUERO SERVIR
                    </button>
                    <button type="button" className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-center font-bold text-slate-600 text-[9px]">
                      + ESCALAR
                    </button>
                  </div>
                </div>

                {/* 4. Vaga Disponível */}
                <div className="rounded-xl border border-dashed border-slate-200 bg-white/70 p-2">
                  <div className="flex items-center gap-2">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-slate-100 text-[9px] font-bold text-slate-400">
                      4
                    </span>
                    <span className="font-medium text-slate-400 text-[10px]">Vaga Disponível</span>
                  </div>
                </div>
              </div>

              <BottomNavBar activeTab="eventos" />
            </div>
          ),
        },
      ],
    },

    /* ----------------------------------------------------
       CAPÍTULO 3: CHECK-IN & QR DE PRESENÇA (Prints Anteriores)
       ---------------------------------------------------- */
    {
      id: "checkin",
      label: "3. Check-in",
      steps: [
        {
          id: "chk-1",
          duration: 3800,
          description: "Tela de serviço do dia com botão para exibir QR Code dinâmico",
          cursor: { x: 50, y: 44, tap: true, tapDelay: 1400 },
          render: () => (
            <div className="flex h-full flex-col bg-[#F8F9FA] text-left">
              <div className="flex-1 p-2.5 overflow-y-auto space-y-2.5">
                <div className="rounded-3xl bg-gradient-to-br from-[#059669] to-[#047857] p-3.5 text-white shadow-md relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-[8.5px] font-extrabold uppercase">
                      ✨ VOCÊ SERVE HOJE!
                    </span>
                    <span className="rounded-full bg-white px-2 py-0.5 text-[9px] font-extrabold text-[#047857]">
                      CONFIRMADO
                    </span>
                  </div>

                  <div className="mt-2.5">
                    <div className="text-[10px] text-white/80">sábado, 21 de novembro · 19:30</div>
                    <h3 className="mt-0.5 text-[13.5px] font-black tracking-tight leading-tight">
                      Culto de Celebração de Jovens
                    </h3>
                  </div>

                  <div className="mt-2 rounded-xl bg-black/15 p-1.5 text-[9.5px] border border-white/10">
                    <div>FUNÇÃO: <span className="font-extrabold text-emerald-200">Recepção & Check-in</span></div>
                  </div>

                  <div className="mt-2.5">
                    <button type="button" className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-white py-2 text-[11px] font-extrabold text-[#047857] shadow-sm">
                      <NavIcons.qr className="h-3.5 w-3.5" /> FAZER CHECK-IN AGORA
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-2.5 shadow-2xs text-center text-[10px] text-slate-500">
                  Mostre seu QR Code na entrada do templo para confirmar sua presença.
                </div>
              </div>

              <BottomNavBar activeTab="eventos" />
            </div>
          ),
        },
        {
          id: "chk-2",
          duration: 4000,
          description: "QR Code dinâmico com código numérico de 6 dígitos",
          toast: {
            title: "Presença Confirmada! ✓",
            message: "Check-in registrado às 19:12 na Recepção",
          },
          toastDelay: 1600,
          render: () => (
            <div className="relative flex h-full flex-col bg-slate-900/60 text-left p-2.5">
              <div className="my-auto rounded-3xl bg-white p-3.5 shadow-2xl border border-slate-100 flex flex-col items-center text-center">
                <div className="flex items-center justify-between w-full border-b border-slate-100 pb-1.5">
                  <span className="text-[11px] font-extrabold text-slate-900">MEU QR DE PRESENÇA</span>
                  <span className="text-slate-400 text-xs">✕</span>
                </div>

                <div className="my-2 p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=ATOS-HUB-VOLUNTARIO-59188"
                    alt="QR Code"
                    className="h-24 w-24 object-contain"
                  />
                </div>

                <div className="text-[8.5px] font-bold uppercase text-slate-400 tracking-wider">
                  CÓDIGO NUMÉRICO DE 6 DÍGITOS
                </div>
                <div className="mt-0.5 flex items-center justify-center gap-1.5 font-mono text-[17px] font-black tracking-widest text-slate-900">
                  <span>1 8 6</span>
                  <span className="text-[#F26A21]">9 1 0</span>
                </div>

                <span className="mt-1.5 rounded-full bg-orange-50 border border-orange-200 px-2 py-0.2 text-[8.5px] font-extrabold text-[#F26A21]">
                  RECEPÇÃO & CHECK-IN
                </span>

                <button type="button" className="mt-2.5 w-full rounded-xl bg-slate-100 py-1.5 text-[10.5px] font-bold text-slate-600">
                  Fechar
                </button>
              </div>
            </div>
          ),
        },
      ],
    },

    /* ----------------------------------------------------
       CAPÍTULO 4: ORDEM DE CULTO AO VIVO (Tarefas concluídas uma a uma com animação)
       ---------------------------------------------------- */
    {
      id: "culto",
      label: "4. Ordem Culto",
      steps: [
        /* Passo 1: Tarefas abertas e livres sem conclusão */
        {
          id: "cul-1",
          duration: 2600,
          description: "Tarefas abertas aguardando início do pré-culto",
          action: {
            type: "tap",
            target: { x: 50, y: 31 },
          },
          render: () => <OrdemCultoAnimatedScreen stepNumber={1} />,
        },

        /* Passo 2: 1ª Tarefa concluída com animação e checkmark */
        {
          id: "cul-2",
          duration: 2800,
          description: "Oração com voluntários concluída em tempo real",
          action: {
            type: "tap",
            target: { x: 50, y: 41 },
          },
          toast: {
            title: "Oração Concluída ✓",
            message: "Registrada pela Supervisão às 18:30",
          },
          render: () => <OrdemCultoAnimatedScreen stepNumber={2} />,
        },

        /* Passo 3: 2ª Tarefa concluída com animação e checkmark */
        {
          id: "cul-3",
          duration: 2800,
          description: "Microfonação e som concluídos com sucesso",
          action: {
            type: "tap",
            target: { x: 50, y: 55 },
          },
          toast: {
            title: "Passagem de Som Concluída ✓",
            message: "Áudio e microfones aprovados",
          },
          render: () => <OrdemCultoAnimatedScreen stepNumber={3} />,
        },

        /* Passo 4: Louvor e Adoração ao vivo com destaque */
        {
          id: "cul-4",
          duration: 3200,
          description: "Louvor e Adoração iniciado ao vivo com Tom D",
          toast: {
            title: "Louvor Ao Vivo 🎵",
            message: "Música 1: A Casa É Sua (Tom D)",
          },
          render: () => <OrdemCultoAnimatedScreen stepNumber={4} />,
        },
      ],
    },

    /* ----------------------------------------------------
       CAPÍTULO 5: AGENDA & GOOGLE CALENDAR (Print 5)
       ---------------------------------------------------- */
    {
      id: "agenda",
      label: "5. Agenda Google",
      steps: [
        {
          id: "age-1",
          duration: 4400,
          description: "Calendário mensal sincronizado com Google Agenda",
          render: () => (
            <div className="flex h-full flex-col bg-[#FFFBF8] text-left">
              <div className="flex-1 p-2.5 overflow-y-auto space-y-2">
                {/* Calendário Mensal */}
                <div className="rounded-2xl border border-slate-200/80 bg-white p-2.5 shadow-xs">
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                    <span className="text-[11.5px] font-extrabold text-slate-900">Novembro 2026</span>
                    <span className="rounded-lg bg-slate-100 px-2 py-0.5 text-[8.5px] font-extrabold text-slate-600">HOJE</span>
                  </div>

                  <div className="flex items-center justify-between py-1 text-[8.5px] font-bold border-b border-slate-100">
                    <span className="flex items-center gap-1 text-[#1FAF7A]"><span className="h-1.5 w-1.5 rounded-full bg-[#1FAF7A]" /> Confirmada</span>
                    <span className="flex items-center gap-1 text-[#F59E0B]"><span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]" /> Candidatura</span>
                    <span className="flex items-center gap-1 text-rose-500"><span className="h-1.5 w-1.5 rounded-full bg-rose-500" /> Indisponível</span>
                  </div>

                  <div className="grid grid-cols-7 gap-1 pt-1.5 text-center text-[8.5px] font-bold text-slate-400">
                    <span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span><span>S</span><span>D</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1 pt-0.5 text-center text-[9.5px] font-semibold text-slate-700">
                    <span /><span /><span /><span /><span /><span /><span>1</span>
                    <span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span>
                    <span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span>
                    <span>16</span><span>17</span><span>18</span><span>19</span><span>20</span>
                    {/* Dia 21 Selecionado */}
                    <span className="rounded-lg border-2 border-[#F26A21] bg-orange-100 font-extrabold text-[#F26A21] relative">
                      21
                      <span className="absolute bottom-0.2 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-[#1FAF7A]" />
                    </span>
                    <span>22</span>
                    <span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span><span>29</span>
                    <span>30</span>
                  </div>
                </div>

                {/* Sincronização Google Calendar */}
                <div className="flex items-center justify-between rounded-xl bg-white p-2 border border-slate-200 shadow-2xs">
                  <div className="flex items-center gap-1.5">
                    <NavIcons.google className="h-3.5 w-3.5 flex-none" />
                    <div className="text-left leading-none">
                      <div className="text-[10px] font-bold text-slate-800">Sincronizado com Google Agenda</div>
                      <div className="text-[8.5px] text-slate-400 mt-0.5">Escalas salvas no seu calendário</div>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-1.5 py-0.2 text-[8px] font-extrabold text-emerald-800">ATIVO ✓</span>
                </div>

                {/* Compromissos */}
                <div className="rounded-xl border border-slate-200/80 bg-white p-2 shadow-2xs space-y-1 text-left">
                  <div className="text-[10px] font-bold text-slate-800">📅 Sábado, 21 nov · 2 eventos</div>
                  <div className="rounded-lg bg-orange-50/60 p-1.5 border border-orange-100 flex items-center justify-between text-[9.5px]">
                    <div>
                      <div className="font-bold text-slate-800">Culto de Jovens</div>
                      <div className="text-[8.5px] text-slate-400">19:30 · Recepção</div>
                    </div>
                    <span className="text-[8.5px] font-bold text-[#1FAF7A]">Confirmado</span>
                  </div>
                </div>
              </div>

              <BottomNavBar activeTab="agenda" />
            </div>
          ),
        },
      ],
    },
  ];

  return (
    <ScenePlayer
      chapters={chapters}
      badge="App do Voluntário · Ao Vivo"
    />
  );
}
