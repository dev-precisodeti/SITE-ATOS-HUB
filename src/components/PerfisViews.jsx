import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* =========================================================================
   1. PASTORES E CONSELHOS (Imagem 5 / Imagem 4 ajustada)
   - Dashboard de Insights
   - Indicadores de crescimento (dimensionados para caber perfeitamente sem cortes)
   - Indicadores de presença (sem maior/menor adesão, conforme solicitado)
   - Dados 100% fictícios
   ========================================================================= */
export function PastoresView() {
  return (
    <div className="flex h-full w-full flex-col justify-between overflow-y-auto p-3.5 sm:p-4 text-slate-800 text-left select-none">
      {/* CABEÇALHO */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#FFF2EA] text-[#F26A21]">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
            </svg>
          </span>
          <h4 className="text-[13.5px] font-bold text-slate-900 tracking-tight">Dashboard de Insights</h4>
        </div>
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9.5px] font-semibold text-slate-600">
          Visão Geral · Sede & Sedes
        </span>
      </div>

      {/* SEÇÃO 1: INDICADORES DE CRESCIMENTO (Ajustado para caber perfeitamente sem truncar) */}
      <div className="mt-2.5">
        <span className="text-[9px] font-bold tracking-wider text-slate-400 uppercase">
          Indicadores de Crescimento
        </span>
        <div className="mt-1.5 grid grid-cols-2 sm:grid-cols-5 gap-1.5">
          {/* Total Células */}
          <div className="flex items-center gap-1.5 rounded-xl bg-white p-2 shadow-2xs ring-1 ring-slate-100">
            <span className="grid h-7 w-7 flex-none place-items-center rounded-lg bg-blue-50 text-blue-600">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </span>
            <div className="min-w-0">
              <div className="text-[8px] font-bold text-slate-400 uppercase whitespace-nowrap leading-none">Total Células</div>
              <div className="mt-0.5 text-[15px] font-bold text-slate-900 leading-none">1.042</div>
            </div>
          </div>

          {/* Redes */}
          <div className="flex items-center gap-1.5 rounded-xl bg-white p-2 shadow-2xs ring-1 ring-slate-100">
            <span className="grid h-7 w-7 flex-none place-items-center rounded-lg bg-orange-50 text-orange-600">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </span>
            <div className="min-w-0">
              <div className="text-[8px] font-bold text-slate-400 uppercase whitespace-nowrap leading-none">Redes</div>
              <div className="mt-0.5 text-[15px] font-bold text-slate-900 leading-none">8</div>
            </div>
          </div>

          {/* Reuniões */}
          <div className="flex items-center gap-1.5 rounded-xl bg-white p-2 shadow-2xs ring-1 ring-slate-100">
            <span className="grid h-7 w-7 flex-none place-items-center rounded-lg bg-purple-50 text-purple-600">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </span>
            <div className="min-w-0">
              <div className="text-[8px] font-bold text-slate-400 uppercase whitespace-nowrap leading-none">Reuniões</div>
              <div className="mt-0.5 text-[15px] font-bold text-slate-900 leading-none">986</div>
            </div>
          </div>

          {/* Líderes */}
          <div className="flex items-center gap-1.5 rounded-xl bg-white p-2 shadow-2xs ring-1 ring-slate-100">
            <span className="grid h-7 w-7 flex-none place-items-center rounded-lg bg-emerald-50 text-emerald-600">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="8" r="6" />
                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
              </svg>
            </span>
            <div className="min-w-0">
              <div className="text-[8px] font-bold text-slate-400 uppercase whitespace-nowrap leading-none">Líderes</div>
              <div className="mt-0.5 text-[15px] font-bold text-slate-900 leading-none">1.180</div>
            </div>
          </div>

          {/* Membros */}
          <div className="col-span-2 sm:col-span-1 flex items-center gap-1.5 rounded-xl bg-white p-2 shadow-2xs ring-1 ring-slate-100">
            <span className="grid h-7 w-7 flex-none place-items-center rounded-lg bg-amber-50 text-amber-600">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
              </svg>
            </span>
            <div className="min-w-0">
              <div className="text-[8px] font-bold text-slate-400 uppercase whitespace-nowrap leading-none">Membros</div>
              <div className="mt-0.5 text-[15px] font-bold text-slate-900 leading-none">8.450</div>
            </div>
          </div>
        </div>
      </div>

      {/* SEÇÃO 2: INDICADORES DE PRESENÇA (Tirando maior e menor adesão como solicitado) */}
      <div className="mt-2.5">
        <span className="text-[9px] font-bold tracking-wider text-slate-400 uppercase">
          Indicadores de Presença e Saúde
        </span>
        <div className="mt-1.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
          {/* % Presença Geral */}
          <div className="flex items-center gap-2.5 rounded-xl bg-white p-2.5 shadow-2xs ring-1 ring-slate-100">
            <span className="grid h-9 w-9 flex-none place-items-center rounded-xl bg-blue-50 text-blue-600">
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </span>
            <div>
              <div className="text-[9px] font-bold text-slate-400 uppercase leading-none">% Presença Geral</div>
              <div className="mt-0.5 text-[17px] font-bold text-slate-900 leading-tight">86.4%</div>
              <div className="text-[9.5px] text-emerald-600 font-medium">↑ +3.2% vs mês anterior</div>
            </div>
          </div>

          {/* Maior Célula */}
          <div className="flex items-center gap-2.5 rounded-xl bg-white p-2.5 shadow-2xs ring-1 ring-slate-100">
            <span className="grid h-9 w-9 flex-none place-items-center rounded-xl bg-amber-50 text-[#F26A21]">
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
              </svg>
            </span>
            <div className="min-w-0">
              <div className="text-[9px] font-bold text-slate-400 uppercase leading-none">Maior Célula</div>
              <div className="mt-0.5 truncate text-[14px] font-bold text-slate-900 leading-tight">Betel Central</div>
              <div className="text-[10px] text-slate-500 font-medium">24 membros frequentes</div>
            </div>
          </div>

          {/* Média por Célula */}
          <div className="flex items-center gap-2.5 rounded-xl bg-white p-2.5 shadow-2xs ring-1 ring-slate-100">
            <span className="grid h-9 w-9 flex-none place-items-center rounded-xl bg-emerald-50 text-emerald-600">
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="12" cy="12" r="10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </span>
            <div>
              <div className="text-[9px] font-bold text-slate-400 uppercase leading-none">Média por Célula</div>
              <div className="mt-0.5 text-[17px] font-bold text-slate-900 leading-tight">11.8 membros</div>
              <div className="text-[9.5px] text-slate-500 font-medium">Equilíbrio saudável</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   2. COORDENADORES E SUPERVISORES (Imagem 6)
   - SLA e Qualidade de Atendimento — Leads Células
   - SLA Médio, Até 7 dias, 7-14 dias, +14 dias
   - Desistentes, Células sem membros, Sem reunião no mês
   - Entrada de novos membros por mês (gráfico)
   ========================================================================= */
export function CoordenadoresView() {
  return (
    <div className="flex h-full w-full flex-col justify-between overflow-y-auto p-4 md:p-5 text-slate-800 text-left select-none">
      {/* CABEÇALHO */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-orange-50 text-[#F26A21]">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </span>
          <h4 className="text-[13px] font-bold text-slate-900 tracking-tight">
            SLA E QUALIDADE DE ATENDIMENTO — LEADS CÉLULAS
          </h4>
        </div>
        <span className="text-[10.5px] font-semibold text-slate-500">Supervisão Geral</span>
      </div>

      {/* LINHA 1: 4 CARDS DE STATUS DE LEADS */}
      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
        {/* SLA Médio */}
        <div className="rounded-xl border border-blue-100 bg-white p-2.5 shadow-2xs">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-blue-600 uppercase">
            <span className="grid h-5 w-5 place-items-center rounded-md bg-blue-50">
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
            </span>
            SLA Médio
          </div>
          <div className="mt-1 text-[18px] font-bold text-slate-900 leading-none">18h</div>
          <div className="text-[9.5px] text-slate-500 mt-1">Tempo médio p/ 1º contato</div>
          <span className="text-[9.5px] font-bold text-blue-600 hover:underline cursor-pointer block mt-1">Ver ranking →</span>
        </div>

        {/* Até 7 dias */}
        <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-2.5 shadow-2xs">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-700 uppercase">
            <span className="grid h-5 w-5 place-items-center rounded-md bg-amber-100 text-amber-700">✓</span>
            Até 7 dias
          </div>
          <div className="mt-1 text-[18px] font-bold text-amber-800 leading-none">28</div>
          <div className="text-[9.5px] text-amber-700/80 mt-1">Aguardando acolhimento</div>
          <span className="text-[9.5px] font-bold text-amber-800 hover:underline cursor-pointer block mt-1">Ver lista →</span>
        </div>

        {/* 7 - 14 dias */}
        <div className="rounded-xl border border-orange-200 bg-orange-50/40 p-2.5 shadow-2xs">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-orange-700 uppercase">
            <span className="grid h-5 w-5 place-items-center rounded-md bg-orange-100 text-orange-700">!</span>
            7 - 14 dias
          </div>
          <div className="mt-1 text-[18px] font-bold text-orange-800 leading-none">4</div>
          <div className="text-[9.5px] text-orange-700/80 mt-1">Alerta moderado</div>
          <span className="text-[9.5px] font-bold text-orange-800 hover:underline cursor-pointer block mt-1">Ver lista →</span>
        </div>

        {/* + 14 dias */}
        <div className="rounded-xl border border-red-200 bg-red-50/40 p-2.5 shadow-2xs">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-red-700 uppercase">
            <span className="grid h-5 w-5 place-items-center rounded-md bg-red-100 text-red-700">✕</span>
            + 14 dias
          </div>
          <div className="mt-1 text-[18px] font-bold text-red-800 leading-none">1</div>
          <div className="text-[9.5px] text-red-700/80 mt-1">Alerta crítico</div>
          <span className="text-[9.5px] font-bold text-red-800 hover:underline cursor-pointer block mt-1">Ver lista →</span>
        </div>
      </div>

      {/* LINHA 2: 3 CARDS DE KPI */}
      <div className="mt-2.5 grid grid-cols-3 gap-2">
        <div className="rounded-xl bg-white p-2.5 shadow-2xs ring-1 ring-slate-100">
          <div className="text-[9.5px] font-bold text-slate-400 uppercase truncate">Desistentes (Mês)</div>
          <div className="mt-0.5 text-[16px] font-bold text-slate-900 leading-tight">2</div>
          <div className="text-[9px] text-slate-500 truncate">Saíram do funil</div>
        </div>

        <div className="rounded-xl bg-white p-2.5 shadow-2xs ring-1 ring-slate-100">
          <div className="text-[9.5px] font-bold text-slate-400 uppercase truncate">Células s/ Membros</div>
          <div className="mt-0.5 text-[16px] font-bold text-slate-900 leading-tight">12</div>
          <div className="text-[9px] text-slate-500 truncate">De 214 ativas</div>
        </div>

        <div className="rounded-xl bg-white p-2.5 shadow-2xs ring-1 ring-slate-100">
          <div className="text-[9.5px] font-bold text-slate-400 uppercase truncate">Sem Reunião no Mês</div>
          <div className="mt-0.5 text-[16px] font-bold text-slate-900 leading-tight">5</div>
          <div className="text-[9px] text-slate-500 truncate">Células inativas</div>
        </div>
      </div>

      {/* LINHA 3: ENTRADA DE NOVOS MEMBROS POR MÊS */}
      <div className="mt-2.5 rounded-xl bg-white p-3 shadow-2xs ring-1 ring-slate-100">
        <div className="flex items-center justify-between text-[10.5px]">
          <span className="font-bold text-slate-800">Entrada de Novos Membros por Mês (células)</span>
          <span className="text-[9px] font-semibold text-slate-400 uppercase">Tendência de Crescimento</span>
        </div>
        <div className="mt-2 flex h-14 items-end justify-between gap-2 border-b border-slate-100 pb-1">
          {[
            { m: "JUN", v: 140, max: 280 },
            { m: "JUL", v: 165, max: 280 },
            { m: "AGO", v: 195, max: 280 },
            { m: "SET", v: 245, max: 280, active: true },
            { m: "OUT", v: 210, max: 280 },
            { m: "NOV", v: 268, max: 280, active: true },
          ].map((bar) => {
            const pct = Math.round((bar.v / bar.max) * 100);
            return (
              <div key={bar.m} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-[9px] font-bold text-slate-700">{bar.v}</span>
                <div
                  style={{ height: `${pct}%` }}
                  className={`w-full max-w-[20px] rounded-t-sm transition ${
                    bar.active ? "bg-[#F26A21]" : "bg-slate-200"
                  }`}
                />
                <span className="text-[8.5px] font-semibold text-slate-400">{bar.m}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   3. LÍDERES DE CÉLULA (Imagens 7, 8 e 9 + Painel de Check-in da Célula)
   - Menu superior de abas: [Painel] [Minha Célula] [Solicitações] [Roteiros]
   - Aba Painel: Painel de Check-in da Célula em tempo real
   - Aba Minha Célula (Img 7): Local, Anfitrião, Convite personalizado
   - Aba Solicitações (Img 8): Solicitações de entrada com pendentes
   - Aba Roteiros (Img 9): Roteiros de Célula com busca e lista
   ========================================================================= */
export function LideresCelulaView() {
  const [tab, setTab] = useState("painel"); // 'painel' (check-in) | 'celula' | 'solicitacoes' | 'roteiros'

  return (
    <div className="flex h-full w-full flex-col justify-between overflow-y-auto p-4 md:p-5 text-slate-800 text-left select-none">
      {/* ABAS SUPERIORES (Fiel aos prints 7, 8 e 9) */}
      <div className="flex items-center gap-1.5 rounded-2xl bg-slate-100 p-1">
        <button
          type="button"
          onClick={() => setTab("painel")}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[11px] font-semibold transition ${
            tab === "painel"
              ? "bg-[#F26A21] text-white shadow-2xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          Painel
        </button>

        <button
          type="button"
          onClick={() => setTab("celula")}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[11px] font-semibold transition ${
            tab === "celula"
              ? "bg-[#F26A21] text-white shadow-2xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
          Minha Célula
        </button>

        <button
          type="button"
          onClick={() => setTab("solicitacoes")}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[11px] font-semibold transition ${
            tab === "solicitacoes"
              ? "bg-[#F26A21] text-white shadow-2xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          Solicitações
          <span className="rounded-full bg-white/25 px-1 text-[9.5px]">2</span>
        </button>

        <button
          type="button"
          onClick={() => setTab("roteiros")}
          className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[11px] font-semibold transition ${
            tab === "roteiros"
              ? "bg-[#F26A21] text-white shadow-2xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          Roteiros
        </button>
      </div>

      {/* CONTEÚDO DINÂMICO CONFORME A ABA SELECIONADA */}
      <div className="mt-3 flex-1">
        <AnimatePresence mode="wait">
          {/* TAB: PAINEL DE CHECK-IN DA CÉLULA (Conforme Imagem 5) */}
          {tab === "painel" && (
            <motion.div
              key="painel"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="space-y-2.5"
            >
              {/* Header do Encontro ao Vivo */}
              <div className="flex items-center justify-between rounded-xl bg-orange-50/60 p-2.5 border border-orange-200/80">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#F26A21] animate-ping" />
                    <span className="text-[12px] font-extrabold text-[#F26A21] uppercase">Reunião em Andamento</span>
                  </div>
                  <div className="text-[14px] font-bold text-slate-900 leading-tight">Célula Conexão de Vida</div>
                  <div className="text-[10px] text-slate-500">Sexta-feira • Início: 20:00 (Duração: 00:42:15)</div>
                </div>
                <div className="text-right">
                  <span className="text-[20px] font-black text-slate-900">9/12</span>
                  <div className="text-[9.5px] font-bold text-[#059669]">75% presença</div>
                </div>
              </div>

              {/* Botões Rápidos de Registro de Presença */}
              <div className="grid grid-cols-3 gap-1.5 text-center">
                <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-2 shadow-2xs">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-orange-50 text-[#F26A21] mb-1">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                  </span>
                  <span className="text-[10px] font-bold text-slate-800">Check-in Facial</span>
                </div>

                <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-2 shadow-2xs">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-blue-50 text-blue-600 mb-1">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                  </span>
                  <span className="text-[10px] font-bold text-slate-800">QR do Encontro</span>
                </div>

                <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-2 shadow-2xs">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-emerald-50 text-emerald-600 mb-1">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                  </span>
                  <span className="text-[10px] font-bold text-slate-800">Lista Manual</span>
                </div>
              </div>

              {/* Últimos Check-ins Registrados na Reunião */}
              <div className="rounded-xl border border-slate-100 bg-white p-2 shadow-2xs">
                <div className="flex items-center justify-between text-[9px] font-extrabold uppercase text-slate-400 pb-1 border-b border-slate-100">
                  <span>Últimos registros</span>
                  <span className="text-emerald-600">+1 Visitante</span>
                </div>
                <div className="mt-1 space-y-1 text-[10.5px]">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800">Lucas Silveira</span>
                    <span className="text-[9px] text-slate-400">Facial · 20:04</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800">Mariana Costa <span className="text-[#F26A21] font-bold text-[9px]">(Visitante)</span></span>
                    <span className="text-[9px] text-slate-400">QR Code · 20:08</span>
                  </div>
                </div>
              </div>

              {/* Botão de Finalizar Reunião */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-[#F26A21] py-1.5 text-[11.5px] font-bold text-white shadow-xs"
              >
                🏁 Encerrar Reunião & Enviar Relatório
              </button>
            </motion.div>
          )}

          {/* TAB: MINHA CÉLULA (Imagem 7) */}
          {tab === "celula" && (
            <motion.div
              key="celula"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="space-y-2.5"
            >
              {/* Título da Célula com botão de editar */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-[17px] font-bold text-slate-900">Célula Conexão de Vida</h4>
                  <p className="text-[11.5px] font-medium text-slate-500">Sexta-feira • 20:00</p>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-xl bg-[#F26A21] px-3 py-1.5 text-[11px] font-bold text-white shadow-xs"
                >
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                  Editar Célula
                </button>
              </div>

              {/* Local de Encontro */}
              <div className="flex items-center gap-3 rounded-xl bg-slate-50/70 p-2.5 ring-1 ring-slate-100">
                <span className="grid h-8 w-8 flex-none place-items-center rounded-lg bg-orange-100/70 text-[#F26A21]">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </span>
                <div className="min-w-0">
                  <div className="text-[9.5px] font-bold text-slate-400 uppercase">Local de Encontro</div>
                  <div className="truncate text-[12px] font-semibold text-slate-800">Rua das Acácias, 240 - Apto 402</div>
                </div>
              </div>

              {/* Anfitrião */}
              <div className="flex items-center gap-3 rounded-xl bg-slate-50/70 p-2.5 ring-1 ring-slate-100">
                <span className="grid h-8 w-8 flex-none place-items-center rounded-lg bg-orange-100/70 text-[#F26A21]">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                </span>
                <div className="min-w-0">
                  <div className="text-[9.5px] font-bold text-slate-400 uppercase">Anfitrião</div>
                  <div className="truncate text-[12px] font-semibold text-slate-800">Família Silveira (Carlos e Mariana)</div>
                </div>
              </div>

              {/* Convite Personalizado */}
              <div className="flex items-center justify-between rounded-xl bg-slate-50/70 p-2.5 ring-1 ring-slate-100">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-8 w-8 flex-none place-items-center rounded-lg bg-orange-100/70 text-[#F26A21]">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                  </span>
                  <div>
                    <div className="text-[11.5px] font-bold text-slate-800">Convite Personalizado</div>
                    <div className="text-[10px] text-slate-500">Gere um link para novos membros entrarem.</div>
                  </div>
                </div>
                <button
                  type="button"
                  className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10.5px] font-bold text-slate-700 hover:border-[#F26A21] hover:text-[#F26A21]"
                >
                  Gerar Convite
                </button>
              </div>
            </motion.div>
          )}

          {/* TAB: SOLICITAÇÕES (Imagem 8) */}
          {tab === "solicitacoes" && (
            <motion.div
              key="solicitacoes"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-[14px] font-bold text-slate-900">Solicitações de Entrada</h4>
                <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-bold text-[#F26A21]">
                  2 Pendentes
                </span>
              </div>

              {/* Lead 1 */}
              <div className="flex items-center justify-between rounded-xl bg-slate-50/80 p-2.5 ring-1 ring-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="grid h-8 w-8 flex-none place-items-center rounded-full bg-blue-100 text-blue-700 font-bold text-[12px]">
                    MD
                  </div>
                  <div>
                    <div className="text-[12px] font-bold text-slate-900">Mariana Duarte Costa</div>
                    <div className="text-[10px] text-slate-500">Chegou pelo site • Bairro Tijuca</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button type="button" className="rounded-lg bg-[#F26A21] px-2.5 py-1 text-[10px] font-bold text-white shadow-xs">
                    Aprovar
                  </button>
                </div>
              </div>

              {/* Lead 2 */}
              <div className="flex items-center justify-between rounded-xl bg-slate-50/80 p-2.5 ring-1 ring-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="grid h-8 w-8 flex-none place-items-center rounded-full bg-emerald-100 text-emerald-700 font-bold text-[12px]">
                    LG
                  </div>
                  <div>
                    <div className="text-[12px] font-bold text-slate-900">Lucas Gabriel Santos</div>
                    <div className="text-[10px] text-slate-500">Convidado por Carlos • Maracanã</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button type="button" className="rounded-lg bg-[#F26A21] px-2.5 py-1 text-[10px] font-bold text-white shadow-xs">
                    Aprovar
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB: ROTEIROS (Imagem 9) */}
          {tab === "roteiros" && (
            <motion.div
              key="roteiros"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-[13px] font-bold text-slate-900">ROTEIROS DE CÉLULA</span>
                  <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-bold text-[#F26A21]">
                    4 Disponíveis
                  </span>
                </div>
              </div>

              {/* Barra de Busca de Roteiro */}
              <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-1.5 ring-1 ring-slate-200">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                <input
                  type="text"
                  placeholder="Buscar por tema ou evento..."
                  disabled
                  className="w-full bg-transparent text-[11px] text-slate-700 placeholder-slate-400 outline-none"
                />
              </div>

              {/* Lista de Roteiros */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between rounded-xl bg-slate-50/80 p-2.5 ring-1 ring-slate-100">
                  <div>
                    <div className="text-[11.5px] font-bold text-slate-900">Roteiro 47: Amor que Transforma</div>
                    <div className="text-[9.5px] text-slate-500">Série Relacionamentos • Duração sugerida: 45 min</div>
                  </div>
                  <span className="rounded-lg bg-[#FFF2EA] px-2 py-1 text-[10px] font-bold text-[#F26A21]">Abrir</span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-slate-50/80 p-2.5 ring-1 ring-slate-100">
                  <div>
                    <div className="text-[11.5px] font-bold text-slate-900">Roteiro 46: Vivendo em Comunidade</div>
                    <div className="text-[9.5px] text-slate-500">Série Fundamentos • Duração sugerida: 40 min</div>
                  </div>
                  <span className="rounded-lg bg-[#FFF2EA] px-2 py-1 text-[10px] font-bold text-[#F26A21]">Abrir</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* =========================================================================
   4. MEMBROS E FAMÍLIAS (Imagem 10)
   - Excluindo os ícones de: Painel Administrativo e Casas de Fé
   - Mantendo os 6 cards:
     1. Células (Grupos pequenos e comunhão)
     2. Voluntariado (Escalas e serviços ministeriais)
     3. Kids (Ministério Infantil e Segurança)
     4. Eventos (Próximas programações)
     5. Cursos (Crescimento e discipulado)
     6. Redes Sociais (Conecte-se conosco)
   ========================================================================= */
export function MembrosFamiliasView() {
  const cards = [
    {
      title: "Células",
      desc: "Grupos pequenos e comunhão",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
          <path d="M10 6.5h4M17.5 10v4" />
        </svg>
      ),
    },
    {
      title: "Voluntariado",
      desc: "Escalas e serviços ministeriais",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 21s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z" />
          <path d="M12 11v6M9 14h6" />
        </svg>
      ),
    },
    {
      title: "Kids",
      desc: "Ministério Infantil e Segurança",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      ),
    },
    {
      title: "Eventos",
      desc: "Próximas programações",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      title: "Cursos",
      desc: "Crescimento e discipulado",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      ),
    },
    {
      title: "Redes Sociais",
      desc: "Conecte-se conosco",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex h-full w-full flex-col justify-between overflow-y-auto p-4 md:p-5 text-slate-800 text-left select-none">
      {/* CABEÇALHO */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
        <div>
          <h4 className="text-[14px] font-bold text-slate-900">Portal do Membro & Família</h4>
          <p className="text-[10.5px] text-slate-500">Tudo o que você precisa na vida da igreja em um toque</p>
        </div>
        <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
          ● Conectado
        </span>
      </div>

      {/* GRID DE CARDS FIEL AO PRINT DA IMAGEM 10 (Sem painel adm e casas de fé) */}
      <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2.5 flex-1 content-center">
        {cards.map((item) => (
          <div
            key={item.title}
            className="flex flex-col items-center justify-center rounded-2xl bg-white p-3.5 text-center shadow-2xs ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:shadow-sm"
          >
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#FFF2EA] text-[#F26A21]">
              {item.icon}
            </div>
            <div className="mt-2 text-[13px] font-bold text-slate-900 leading-tight">
              {item.title}
            </div>
            <div className="mt-0.5 text-[9.5px] text-slate-500 leading-tight">
              {item.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   ROTEADOR PRINCIPAL PARA O CARROSSEL DE PERFIS (ParaQuem)
   ========================================================================= */
export function PerfilDashboard({ index }) {
  switch (index) {
    case 0:
      return <PastoresView />;
    case 1:
      return <CoordenadoresView />;
    case 2:
      return <LideresCelulaView />;
    case 3:
      return <MembrosFamiliasView />;
    default:
      return <PastoresView />;
  }
}
