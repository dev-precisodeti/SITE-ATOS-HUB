import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons, LogoMark } from "./UI.jsx";

/**
 * ScenePlayer: Componente base reutilizável para demonstrações em formato de vídeo guiado.
 * 
 * Suporta:
 * - Passos roteirizados com duração, ação, coordenadas do cursor e efeito de toque (ripple)
 * - Toasts nativos do app móvel
 * - Barra de progresso segmentada por capítulos (clicáveis)
 * - Pausa / Play manual + pausa automática por IntersectionObserver
 * - Suporte a prefers-reduced-motion
 * - Moldura de smartphone fiel e responsiva
 */
export function ScenePlayer({
  chapters = [],
  badge = "Demonstração guiada",
  className = "",
}) {
  const containerRef = useRef(null);
  const [currentChapterIdx, setCurrentChapterIdx] = useState(0);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isInViewport, setIsInViewport] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50, visible: false, tapping: false });
  const [toast, setToast] = useState(null);
  const [chapterProgress, setChapterProgress] = useState(0);

  // Detecção de prefers-reduced-motion
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // IntersectionObserver: pausa automaticamente quando sai da tela
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const activeChapter = chapters[currentChapterIdx] || chapters[0] || { label: "", steps: [] };
  const steps = activeChapter?.steps || [];
  const activeStep = steps[currentStepIdx] || steps[0];

  // Executa o passo atual e posiciona o cursor com toque
  useEffect(() => {
    if (!isPlaying || !isInViewport || reducedMotion || !activeStep) return;

    if (activeStep.cursor) {
      setCursorPos({
        x: activeStep.cursor.x,
        y: activeStep.cursor.y,
        visible: true,
        tapping: false,
      });

      if (activeStep.cursor.tap) {
        const tapDelay = activeStep.cursor.tapDelay || 700;
        const tapTimer = setTimeout(() => {
          setCursorPos((prev) => ({ ...prev, tapping: true }));
          setTimeout(() => {
            setCursorPos((prev) => ({ ...prev, tapping: false }));
          }, 400);
        }, tapDelay);

        return () => clearTimeout(tapTimer);
      }
    } else {
      setCursorPos((prev) => ({ ...prev, visible: false }));
    }

    if (activeStep.toast) {
      const toastTimer = setTimeout(() => {
        setToast(activeStep.toast);
      }, activeStep.toastDelay || 800);

      const dismissTimer = setTimeout(() => {
        setToast(null);
      }, (activeStep.toastDelay || 800) + (activeStep.toastDuration || 2600));

      return () => {
        clearTimeout(toastTimer);
        clearTimeout(dismissTimer);
      };
    } else {
      setToast(null);
    }
  }, [currentChapterIdx, currentStepIdx, isPlaying, isInViewport, reducedMotion, activeStep]);

  // Temporizador para progresso contínuo e avanço de cenas
  useEffect(() => {
    if (!isPlaying || !isInViewport || reducedMotion || !activeStep) return;

    const stepDuration = activeStep.duration || 4000;
    const startTime = Date.now();

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, (elapsed / stepDuration) * 100);
      setChapterProgress(progress);
    }, 40);

    const stepTimer = setTimeout(() => {
      setChapterProgress(0);
      if (currentStepIdx < steps.length - 1) {
        setCurrentStepIdx((prev) => prev + 1);
      } else {
        setCurrentStepIdx(0);
        setCurrentChapterIdx((prev) => (prev + 1) % chapters.length);
      }
    }, stepDuration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(stepTimer);
    };
  }, [currentChapterIdx, currentStepIdx, isPlaying, isInViewport, reducedMotion, activeStep, steps.length, chapters.length]);

  const jumpToChapter = useCallback((idx) => {
    setCurrentChapterIdx(idx);
    setCurrentStepIdx(0);
    setChapterProgress(0);
  }, []);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <div
      ref={containerRef}
      className={`relative mx-auto flex w-full max-w-[320px] flex-col items-center select-none ${className}`}
    >
      {/* BARRA DE CONTROLE SUPERIOR DO PLAYER */}
      <div className="mb-2 flex items-center justify-between w-full px-1">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-0.5 text-[10.5px] font-semibold text-slate-700 shadow-2xs ring-1 ring-slate-200/80 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F26A21] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F26A21]" />
          </span>
          <span>{badge}</span>
        </div>

        {/* BOTÃO PAUSAR / REPRODUZIR */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pausar demonstração" : "Continuar demonstração"}
          className="group flex h-6.5 items-center gap-1 rounded-full bg-white/95 px-2.5 text-[11px] font-semibold text-slate-700 shadow-2xs ring-1 ring-slate-200/80 transition hover:bg-white hover:text-[#F26A21] active:scale-95"
        >
          {isPlaying ? (
            <>
              <Icons.pause className="h-2.5 w-2.5 text-slate-500 group-hover:text-[#F26A21]" />
              <span>Pausar</span>
            </>
          ) : (
            <>
              <Icons.play className="h-2.5 w-2.5 text-[#F26A21]" />
              <span className="text-[#F26A21]">Play</span>
            </>
          )}
        </button>
      </div>

      {/* MOLDURA DE SMARTPHONE REALISTA E COMPACTA */}
      <div className="relative w-full max-w-[310px] rounded-[44px] bg-slate-950 p-2.5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.38),0_0_0_1px_rgba(255,255,255,0.08)] ring-1 ring-black/50">
        
        {/* BOTÕES DE HARDWARE NA LATERAL */}
        <div className="absolute -left-1 top-20 h-6 w-1 rounded-l-xs bg-slate-800" />
        <div className="absolute -left-1 top-30 h-10 w-1 rounded-l-xs bg-slate-800" />
        <div className="absolute -left-1 top-44 h-10 w-1 rounded-l-xs bg-slate-800" />
        <div className="absolute -right-1 top-28 h-14 w-1 rounded-r-xs bg-slate-800" />

        {/* TELA INTERNA */}
        <div className="relative aspect-[9/17.2] w-full overflow-hidden rounded-[34px] bg-[#F8F9FA] text-slate-800 shadow-inner flex flex-col">
          
          {/* STATUS BAR DO DISPOSITIVO */}
          <div className="absolute top-0 inset-x-0 z-30 flex h-9 items-center justify-between px-5 pt-1 text-[11px] font-bold text-slate-800 select-none">
            <span>09:41</span>
            
            {/* ILHA DINÂMICA / CÂMERA FRONTAL */}
            <div className="absolute left-1/2 top-2 -translate-x-1/2 flex h-4.5 w-22 items-center justify-between rounded-full bg-black px-2 shadow-sm">
              <div className="h-1.5 w-1.5 rounded-full bg-slate-900 ring-1 ring-slate-800" />
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
            </div>

            <div className="flex items-center gap-1 text-slate-700">
              <span className="text-[9px] font-extrabold">5G</span>
              <div className="h-2 w-3.5 rounded-2xs border border-slate-700 p-0.5">
                <div className="h-full w-full bg-slate-700 rounded-3xs" />
              </div>
            </div>
          </div>

          {/* PALCO DA CENA ATIVA */}
          <div className="relative flex-1 pt-9 pb-3 overflow-hidden flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentChapterIdx}-${currentStepIdx}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="h-full w-full flex flex-col overflow-hidden"
              >
                {activeStep?.render ? (
                  activeStep.render({
                    step: activeStep,
                    chapter: activeChapter,
                    stepIdx: currentStepIdx,
                    chapterIdx: currentChapterIdx,
                    isLastStep: currentStepIdx === steps.length - 1,
                  })
                ) : (
                  <div className="p-4 text-center text-slate-400">Carregando cena...</div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* DEDO VIRTUAL COM ANIMAÇÃO DE RIPPLE AO TOCAR */}
          {!reducedMotion && cursorPos.visible && (
            <motion.div
              className="pointer-events-none absolute z-50 -translate-x-1/2 -translate-y-1/2"
              animate={{
                left: `${cursorPos.x}%`,
                top: `${cursorPos.y}%`,
                opacity: 1,
              }}
              transition={{
                type: "spring",
                stiffness: 160,
                damping: 22,
                mass: 0.7,
              }}
            >
              <motion.div
                animate={{
                  scale: cursorPos.tapping ? 0.8 : 1,
                }}
                transition={{ duration: 0.14 }}
                className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#F26A21]/30 border-2 border-white shadow-[0_6px_16px_rgba(242,106,33,0.45)] backdrop-blur-xs"
              >
                <div className="h-3 w-3 rounded-full bg-[#F26A21] shadow-xs" />

                {/* Efeito Ripple / Onda de Toque */}
                {cursorPos.tapping && (
                  <motion.span
                    initial={{ scale: 0.5, opacity: 0.95 }}
                    animate={{ scale: 3, opacity: 0 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full border-2 border-[#F26A21] bg-[#F26A21]/25"
                  />
                )}
              </motion.div>
            </motion.div>
          )}

          {/* TOAST DO APP MÓVEL */}
          <AnimatePresence>
            {toast && (
              <motion.div
                initial={{ opacity: 0, y: -24, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -18, scale: 0.92 }}
                transition={{ type: "spring", stiffness: 340, damping: 26 }}
                className="absolute top-12 inset-x-3.5 z-40 flex items-center gap-2.5 rounded-2xl bg-slate-900/95 px-3 py-2.5 text-white shadow-2xl backdrop-blur-md ring-1 ring-white/15"
              >
                <div className="grid h-6 w-6 place-items-center rounded-full bg-[#1FAF7A] text-white flex-none text-[11px] font-extrabold">
                  ✓
                </div>
                <div className="min-w-0 flex-1 text-left leading-tight">
                  <div className="truncate text-[11.5px] font-bold text-white">{toast.title}</div>
                  {toast.message && (
                    <div className="truncate text-[10px] text-slate-300 mt-0.5">{toast.message}</div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* HOME INDICATOR DA PARTE INFERIOR */}
          <div className="absolute bottom-1.5 inset-x-0 z-30 flex justify-center pointer-events-none">
            <div className="h-1 w-28 rounded-full bg-slate-400/80" />
          </div>

        </div>
      </div>

      {/* BARRA DE PROGRESSO COM CAPÍTULOS CLICÁVEIS (TOTALMENTE ANTI-SOBREPOSIÇÃO) */}
      <div className="mt-3 w-full">
        <div className="flex w-full items-center gap-1 rounded-xl bg-white p-1 shadow-2xs ring-1 ring-slate-200/80">
          {chapters.map((ch, idx) => {
            const isActive = idx === currentChapterIdx;
            const isCompleted = idx < currentChapterIdx;

            return (
              <button
                key={ch.id || idx}
                type="button"
                onClick={() => jumpToChapter(idx)}
                className={`group flex flex-1 min-w-0 flex-col items-center gap-1 rounded-lg px-1 py-1 text-center transition ${
                  isActive
                    ? "bg-[#FFF4EC] font-bold text-[#F26A21] shadow-2xs"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium"
                }`}
              >
                {/* Linha Segmentada de Progresso */}
                <div className="h-1 w-full overflow-hidden rounded-full bg-slate-100 ring-1 ring-black/5">
                  <motion.div
                    className="h-full bg-[#F26A21] rounded-full"
                    style={{
                      width: isCompleted
                        ? "100%"
                        : isActive
                        ? `${chapterProgress}%`
                        : "0%",
                    }}
                    transition={{ ease: "linear" }}
                  />
                </div>

                {/* Título do Capítulo Seguro com Truncate */}
                <span className="w-full block truncate text-[9.5px] tracking-tight leading-tight select-none">
                  {ch.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* LEGENDA DINÂMICA DA AÇÃO SENDO EXECUTADA */}
        <div className="mt-1.5 text-center text-[10.5px] text-slate-500 truncate px-1">
          <span className="font-bold text-slate-800">{activeChapter.label}:</span>{" "}
          <span>{activeStep?.description || "Visualizando fluxo automático"}</span>
        </div>
      </div>
    </div>
  );
}

/* ====================================================================
   DEMO EXECUTÁVEL DE TESTE DO SCENEPLAYER (Para validação no localhost)
   ==================================================================== */

export function DemoScenePlayerPreview() {
  const demoChapters = [
    {
      id: "escala",
      label: "Escalas",
      steps: [
        {
          id: "step-1-1",
          duration: 3800,
          description: "Visualizando próximas escalas e vagas abertas no Louvor",
          cursor: { x: 50, y: 56, tap: true, tapDelay: 1400 },
          render: () => (
            <div className="flex h-full flex-col bg-[#F8F9FA] text-left">
              {/* Header do App Móvel */}
              <div className="bg-[#F26A21] px-4 pt-3 pb-4 text-white shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <LogoMark className="h-6 w-6" dark />
                    <span className="text-[13px] font-extrabold tracking-tight">MINHA ESCALA</span>
                  </div>
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-[9.5px] font-bold">
                    Louvor
                  </span>
                </div>
                <div className="mt-2 text-[15px] font-extrabold leading-tight">
                  Olá, Lucas! 👋
                </div>
                <div className="text-[10.5px] text-white/80">
                  Próximos cultos disponíveis para servir
                </div>
              </div>

              {/* Lista de Escalas com Vaga Aberta */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider px-1">
                  DOMINGO · 24 DE NOVEMBRO
                </div>

                {/* Card Culto 10h (Completo) */}
                <div className="rounded-2xl border border-slate-200/80 bg-white p-3 shadow-xs opacity-60">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-extrabold text-slate-800">Culto Manhã · 10:00</span>
                    <span className="text-[10px] font-bold text-slate-400">Escala Fechada</span>
                  </div>
                  <div className="mt-1 text-[10.5px] text-slate-500">6/6 voluntários confirmados</div>
                </div>

                {/* Card Culto 18h (Com Vaga Aberta - Alvo do Toque) */}
                <div className="rounded-2xl border-2 border-[#F26A21] bg-white p-3 shadow-md relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[12.5px] font-extrabold text-slate-900">Culto Noite · 18:00</span>
                      <div className="text-[10.5px] text-slate-500 mt-0.5">Violão / Guitarra Base</div>
                    </div>
                    <span className="rounded-full bg-[#FFF4EC] px-2 py-0.5 text-[9.5px] font-extrabold text-[#F26A21]">
                      1 Vaga Aberta
                    </span>
                  </div>
                  <div className="mt-2.5 flex items-center justify-between border-t border-slate-100 pt-2 text-[10.5px]">
                    <span className="text-slate-400">Campus Central</span>
                    <span className="font-bold text-[#F26A21]">Tocar para ver detalhes →</span>
                  </div>
                </div>
              </div>
            </div>
          ),
        },
      ],
    },
    {
      id: "inscricao",
      label: "Inscrição",
      steps: [
        {
          id: "step-2-1",
          duration: 3800,
          description: "Confirmando disponibilidade para servir no culto",
          cursor: { x: 50, y: 78, tap: true, tapDelay: 1100 },
          toast: {
            title: "Inscrição confirmada!",
            message: "Você foi escalado para Violão no Culto das 18h",
          },
          toastDelay: 1300,
          render: () => (
            <div className="flex h-full flex-col bg-[#F8F9FA] text-left">
              {/* Header do Culto */}
              <div className="bg-[#F26A21] px-4 pt-3 pb-3 text-white">
                <span className="text-[10px] uppercase font-bold text-white/80">Detalhe da Escala</span>
                <div className="text-[14px] font-extrabold mt-0.5">Culto Noite · 18:00</div>
              </div>

              <div className="flex-1 p-3 space-y-2.5 overflow-y-auto">
                {/* Informações da escala */}
                <div className="rounded-2xl border border-slate-200/80 bg-white p-3 shadow-xs space-y-2 text-[11px]">
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-slate-400">Data e Hora</span>
                    <span className="font-bold text-slate-800">Dom, 24/11 às 18:00</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-slate-400">Ministério</span>
                    <span className="font-bold text-slate-800">Louvor & Adoração</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Sua Função</span>
                    <span className="font-bold text-[#F26A21]">Violão / Base</span>
                  </div>
                </div>

                {/* Equipe do Culto */}
                <div className="rounded-2xl border border-slate-200/80 bg-white p-3 shadow-xs">
                  <div className="text-[10px] font-bold uppercase text-slate-400 mb-2">Equipe Confirmada (4/5)</div>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex items-center gap-2 text-slate-700">
                      <div className="h-5 w-5 rounded-full bg-blue-100 text-blue-700 grid place-items-center text-[9px] font-bold">M</div>
                      <span>Mateus Silva · Vocal</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <div className="h-5 w-5 rounded-full bg-purple-100 text-purple-700 grid place-items-center text-[9px] font-bold">A</div>
                      <span>Aline Rocha · Teclado</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <div className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-700 grid place-items-center text-[9px] font-bold">G</div>
                      <span>Gabriel Dias · Bateria</span>
                    </div>
                  </div>
                </div>

                {/* Botão de Ação Alvo do Toque */}
                <motion.button
                  animate={{ scale: [1, 0.97, 1] }}
                  transition={{ delay: 1.1, duration: 0.3 }}
                  type="button"
                  className="w-full rounded-2xl bg-[#F26A21] py-3 text-center text-[12.5px] font-extrabold text-white shadow-md"
                >
                  Quero servir neste culto ✓
                </motion.button>
              </div>
            </div>
          ),
        },
      ],
    },
    {
      id: "checkin",
      label: "Check-in",
      steps: [
        {
          id: "step-3-1",
          duration: 3800,
          description: "Realizando check-in no dia do culto com registro de horário",
          cursor: { x: 50, y: 64, tap: true, tapDelay: 1200 },
          toast: {
            title: "Check-in registrado!",
            message: "Presença confirmada às 17:15 (45 min antes)",
          },
          toastDelay: 1400,
          render: () => (
            <div className="flex h-full flex-col bg-[#F8F9FA] text-left">
              <div className="bg-[#1FAF7A] px-4 pt-3 pb-3 text-white">
                <span className="text-[10px] uppercase font-bold text-white/80">Hoje é dia de servir!</span>
                <div className="text-[14px] font-extrabold mt-0.5">Check-in de Voluntário</div>
              </div>

              <div className="flex-1 p-3 flex flex-col justify-between">
                <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs text-center space-y-2 mt-2">
                  <div className="h-12 w-12 rounded-full bg-emerald-50 text-[#1FAF7A] grid place-items-center mx-auto text-xl font-bold">
                    🎸
                  </div>
                  <div className="text-[13px] font-extrabold text-slate-800">
                    Lucas · Violão Base
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Culto Noite · 18:00 (Passagem de som às 17:15)
                  </div>
                </div>

                {/* Botão Check-in Alvo */}
                <motion.button
                  animate={{ scale: [1, 0.96, 1] }}
                  transition={{ delay: 1.2, duration: 0.3 }}
                  type="button"
                  className="w-full rounded-2xl bg-[#1FAF7A] py-3 text-center text-[13px] font-extrabold text-white shadow-md mb-2"
                >
                  Fazer check-in agora ✓
                </motion.button>
              </div>
            </div>
          ),
        },
      ],
    },
    {
      id: "culto",
      label: "Ordem do Culto",
      steps: [
        {
          id: "step-4-1",
          duration: 3800,
          description: "Acompanhando a liturgia e momento atual em tempo real",
          render: () => (
            <div className="flex h-full flex-col bg-[#F8F9FA] text-left">
              <div className="bg-slate-900 px-4 pt-3 pb-3 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Ordem do Culto</span>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-[#1FAF7A]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1FAF7A] animate-pulse" /> Ao Vivo
                  </span>
                </div>
                <div className="text-[14px] font-extrabold mt-0.5">Culto Noite · 18:00</div>
              </div>

              <div className="flex-1 p-3 overflow-y-auto space-y-1.5 text-[11.5px]">
                <div className="rounded-xl bg-white p-2.5 border border-slate-200/70 text-slate-500 flex justify-between">
                  <span>18:00 · Boas-vindas e Oração</span>
                  <span className="text-[10px] text-slate-400">Concluído ✓</span>
                </div>

                <div className="rounded-xl bg-[#FFF4EC] p-2.5 border-2 border-[#F26A21] text-slate-900 flex justify-between items-center shadow-xs">
                  <div>
                    <span className="font-extrabold text-[#F26A21]">18:05 · Período de Louvor (4 músicas)</span>
                    <div className="text-[10px] text-slate-500 mt-0.5">Lucas no Violão Base</div>
                  </div>
                  <span className="rounded-full bg-[#F26A21] px-2 py-0.5 text-[9px] font-extrabold text-white">
                    AGORA
                  </span>
                </div>

                <div className="rounded-xl bg-white p-2.5 border border-slate-200/70 text-slate-700 flex justify-between">
                  <span>18:40 · Avisos da Semana</span>
                  <span className="text-[10px] text-slate-400">Em 12 min</span>
                </div>

                <div className="rounded-xl bg-white p-2.5 border border-slate-200/70 text-slate-700 flex justify-between">
                  <span>18:50 · Mensagem Pastoral</span>
                  <span className="text-[10px] text-slate-400">Pr. André</span>
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
      chapters={demoChapters}
      badge="Player de Vídeo Interativo"
    />
  );
}
