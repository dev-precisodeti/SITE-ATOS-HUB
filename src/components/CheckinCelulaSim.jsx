import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScenePlayer } from "./ScenePlayer.jsx";
import { LogoMark } from "./UI.jsx";

/* Ícones específicos da Gestão de Célula (fiéis aos prints) */
const CelulaIcons = {
  check: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  camera: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  ),
  users: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  star: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
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
  clock: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
};

/* =========================================================================
   COMPONENTE DO CHECK-IN DE CÉLULA (Roteirizado Fiel aos Prints)
   ========================================================================= */

export function CheckinCelulaSim() {
  const chapters = [
    /* ----------------------------------------------------
       CENA 1: TELA INICIAL DA LÍDER (Print 2)
       ---------------------------------------------------- */
    {
      id: "inicio",
      label: "1. Iniciar",
      steps: [
        {
          id: "ini-1",
          duration: 4200,
          description: "Líder visualiza o painel da célula e inicia o encontro de hoje",
          cursor: { x: 50, y: 56, tap: true, tapDelay: 1700 },
          render: () => (
            <div className="flex h-full flex-col bg-[#F8F9FA] text-left">
              {/* Header Laranja com Ondas (Fiel ao Print 2) */}
              <div className="rounded-b-3xl bg-[#F26A21] p-3.5 text-white shadow-md relative overflow-hidden">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-white/80 uppercase">
                  <CelulaIcons.users className="h-3.5 w-3.5" /> PAINEL DA CÉLULA
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <h3 className="text-[16px] font-black tracking-tight">CÉLULA VIDA NOVA</h3>
                  <CelulaIcons.star className="h-4 w-4 text-white/80" />
                </div>
                <p className="mt-1 text-[9.5px] text-white/90 leading-tight">
                  Gerencie os membros da sua célula, lance presenças, triagem e baixe os roteiros.
                </p>
              </div>

              {/* Abas Secundárias (Fiel ao Print 2) */}
              <div className="mt-2.5 px-3">
                <div className="flex items-center justify-between rounded-xl bg-white p-1 shadow-2xs border border-slate-200/70 text-[10px]">
                  <span className="rounded-lg bg-[#F26A21] px-2.5 py-1 font-bold text-white shadow-xs">
                    ⏱ Painel
                  </span>
                  <span className="px-2 py-1 text-slate-500 font-medium">Minha Célula</span>
                  <span className="px-2 py-1 text-slate-500 font-medium">Solicitações</span>
                  <span className="px-2 py-1 text-slate-500 font-medium">Roteiros</span>
                </div>
              </div>

              {/* Card de Registro de Reuniões (Fiel ao Print 2) */}
              <div className="flex-1 p-3 space-y-2.5">
                <div className="rounded-2xl border border-slate-200/80 bg-white p-3 shadow-xs">
                  <h4 className="text-[12.5px] font-extrabold text-slate-900 leading-snug">
                    Registro de Reuniões
                  </h4>
                  <p className="mt-0.5 text-[10px] text-slate-400">
                    Inicie a contagem de presenças ou registre a ausência da semana.
                  </p>

                  {/* Botão de Iniciar Reunião Alvo */}
                  <div className="mt-3 grid grid-cols-1 gap-2">
                    <button
                      type="button"
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#F26A21] py-2.5 text-[11.5px] font-extrabold text-white shadow-sm transition active:scale-98"
                    >
                      <CelulaIcons.check className="h-4 w-4" /> INICIAR REUNIÃO
                    </button>
                    <button
                      type="button"
                      className="w-full rounded-xl border border-slate-200 bg-white py-2 text-[10.5px] font-medium text-slate-500"
                    >
                      ✕ Não Houve Reunião
                    </button>
                  </div>
                </div>

                {/* Histórico Vazio do Print 2 */}
                <div className="rounded-2xl border border-dashed border-slate-200 bg-white/60 p-3 text-center">
                  <div className="flex items-center justify-between text-[10px] font-extrabold text-slate-400 uppercase">
                    <span>HISTÓRICO DE CÉLULAS</span>
                    <span>0 SESSÕES</span>
                  </div>
                  <div className="py-4 text-[10.5px] text-slate-400">
                    Nenhuma célula finalizada ainda.
                  </div>
                </div>
              </div>
            </div>
          ),
        },
      ],
    },

    /* ----------------------------------------------------
       CENA 2: REUNIÃO EM ANDAMENTO, QR & CHECK-IN FACIAL (Print 3 & Lista)
       ---------------------------------------------------- */
    {
      id: "presenca",
      label: "2. Presença",
      steps: [
        /* 2.1: Tela com QR Code Dinâmico + Opção Facial (Fiel ao Print 3) */
        {
          id: "pre-1",
          duration: 3800,
          description: "QR Code e opção de check-in com reconhecimento facial",
          cursor: { x: 50, y: 88, tap: true, tapDelay: 1600 },
          render: () => (
            <div className="flex h-full flex-col bg-[#F8F9FA] text-left">
              {/* Badge Verde Pulsante de Reunião em Andamento */}
              <div className="p-3 pb-1">
                <div className="rounded-xl bg-[#EAFBF3] border border-[#1FAF7A]/25 py-1.5 text-center text-[10.5px] font-extrabold text-[#1FAF7A] flex items-center justify-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#1FAF7A] animate-pulse" />
                  <span>Reunião em andamento · 00:24:18</span>
                </div>
              </div>

              <div className="flex-1 px-3 py-1 flex flex-col items-center text-center justify-between overflow-y-auto">
                <h3 className="text-[14px] font-black text-slate-800">CÉLULA VIDA NOVA</h3>

                {/* Bloco do QR Code (Fiel ao Print 3) */}
                <div className="my-1 rounded-2xl bg-white p-3 border border-slate-200 shadow-sm flex flex-col items-center">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=ATOS-HUB-CELULA-VIDA-NOVA"
                    alt="QR Code"
                    className="h-24 w-24 object-contain"
                  />
                  <span className="mt-1 text-[9px] text-slate-400">QR Code dinâmico</span>
                  <div className="mt-1.5 pt-1.5 border-t border-slate-100 w-full text-[9px] text-slate-500">
                    Membro sem câmera?
                    <button type="button" className="mt-0.5 block w-full rounded-md border border-slate-200 bg-slate-50 py-1 text-[9px] font-bold text-slate-700">
                      Gerar código único
                    </button>
                  </div>
                </div>

                {/* Botões Inferiores do Print 3 */}
                <div className="w-full space-y-1.5 mb-2">
                  <button type="button" className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-[#F26A21] bg-white py-2 text-[10.5px] font-extrabold text-[#F26A21] shadow-2xs">
                    <CelulaIcons.check className="h-3.5 w-3.5" /> LANÇAR PRESENÇA MANUAL
                  </button>
                  <button type="button" className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-[#1FAF7A] bg-emerald-50/50 py-2 text-[10.5px] font-extrabold text-[#1FAF7A]">
                    <CelulaIcons.camera className="h-3.5 w-3.5" /> CHECK-IN FACIAL (FOTO)
                  </button>
                </div>
              </div>
            </div>
          ),
        },

        /* 2.2: Marcação Rápida de Presença da Lista + Visitante */
        {
          id: "pre-2",
          duration: 4000,
          description: "Contador de presentes subindo em tempo real e adição de visitante",
          toast: {
            title: "Visitante Adicionado!",
            message: "Gabriel Fontes vinculado à reunião de hoje",
          },
          toastDelay: 1500,
          render: () => (
            <div className="flex h-full flex-col bg-[#F8F9FA] text-left">
              {/* Topo com contador dinâmico */}
              <div className="bg-[#1FAF7A] p-3 text-white flex items-center justify-between">
                <div>
                  <span className="text-[9.5px] uppercase font-bold text-white/80">Chamada da Célula</span>
                  <div className="text-[13px] font-extrabold">Lista de Presença</div>
                </div>
                <div className="rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-black">
                  9 de 12 presentes
                </div>
              </div>

              {/* Lista dos Membros da Célula com Check */}
              <div className="flex-1 p-3 overflow-y-auto space-y-1.5 text-[11px]">
                {[
                  { nome: "Camila Nogueira (Líder)", status: "Presente", checked: true },
                  { nome: "Mariana Ferreira", status: "Presente", checked: true },
                  { nome: "Thiago Albuquerque", status: "Presente", checked: true },
                  { nome: "Renata Santana", status: "Presente", checked: true },
                  { nome: "Gabriel Fontes (Visitante)", status: "Novo Visitante ✨", checked: true, isNew: true },
                  { nome: "Lucas Lima", status: "Não respondeu", checked: false },
                ].map((m) => (
                  <div
                    key={m.nome}
                    className={`flex items-center justify-between rounded-xl p-2 border ${m.checked ? "bg-white border-slate-200/80 shadow-2xs" : "bg-slate-50 border-slate-200 text-slate-400"
                      }`}
                  >
                    <div>
                      <div className={`font-bold ${m.isNew ? "text-[#F26A21]" : "text-slate-800"}`}>{m.nome}</div>
                      <div className="text-[9px] text-slate-400">{m.status}</div>
                    </div>
                    <div
                      className={`h-5 w-5 rounded-full grid place-items-center text-[10px] font-bold ${m.checked ? "bg-[#1FAF7A] text-white" : "border border-slate-300 bg-white"
                        }`}
                    >
                      {m.checked && "✓"}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 border-t border-slate-200 bg-white">
                <button type="button" className="w-full rounded-xl bg-[#F26A21] py-2 text-center text-[11.5px] font-extrabold text-white">
                  Avançar para Encerramento →
                </button>
              </div>
            </div>
          ),
        },
      ],
    },

    /* ----------------------------------------------------
       CENA 3: FOTO DA CÉLULA & ENCERRAMENTO (Print 4)
       ---------------------------------------------------- */
    {
      id: "foto",
      label: "3. Foto & Fim",
      steps: [
        {
          id: "fot-1",
          duration: 4200,
          description: "Envio opcional de foto da comunhão e encerramento com relatório automático",
          cursor: { x: 50, y: 72, tap: true, tapDelay: 1500 },
          toast: {
            title: "Reunião Concluída! 🎉",
            message: "Relatório de 10 participantes enviado ao supervisor",
          },
          toastDelay: 1800,
          render: () => (
            <div className="relative flex h-full flex-col bg-slate-900/60 text-left p-3">
              {/* Modal Sheet Central (Fiel ao Print 4) */}
              <div className="my-auto rounded-3xl bg-white p-4 shadow-2xl border border-slate-100 text-center">
                <div className="flex justify-end">
                  <span className="text-slate-400 text-xs">✕</span>
                </div>

                {/* Ícone de Câmera em Círculo Laranja Suave (Fiel ao Print 4) */}
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-orange-100 text-[#F26A21]">
                  <CelulaIcons.camera className="h-6 w-6" />
                </div>

                <h3 className="mt-2.5 text-[13.5px] font-extrabold text-slate-900 leading-snug">
                  Compartilhe aqui uma foto de como foi sua célula! 📸 ✨
                </h3>
                <p className="mt-0.5 text-[9.5px] text-slate-400">
                  Opcional — mas a gente adoraria ver!
                </p>

                {/* Duas Opções de Foto (Fiel ao Print 4) */}
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="rounded-xl border border-dashed border-slate-300 p-2.5 text-center">
                    <span className="block text-lg">🖼</span>
                    <span className="mt-1 block text-[9.5px] font-semibold text-slate-700 leading-tight">Escolher da galeria</span>
                  </div>
                  <div className="rounded-xl border border-dashed border-[#F26A21] bg-orange-50/50 p-2.5 text-center">
                    <span className="block text-lg">📷</span>
                    <span className="mt-1 block text-[9.5px] font-bold text-[#F26A21] leading-tight">Tirar foto agora</span>
                  </div>
                </div>

                {/* Botões de Ação (Fiel ao Print 4) */}
                <div className="mt-3.5 space-y-1.5">
                  <button type="button" className="w-full rounded-xl bg-[#F26A21] py-2.5 text-[11px] font-extrabold text-white shadow-xs">
                    Finalizar com foto
                  </button>
                  <button type="button" className="w-full rounded-xl border border-slate-200 bg-white py-2 text-[10.5px] font-semibold text-slate-700">
                    Finalizar sem foto
                  </button>
                </div>
              </div>
            </div>
          ),
        },
      ],
    },
  ];

  return (
    <ScenePlayer
      chapters={chapters}
      badge="App do Líder de Célula"
    />
  );
}
