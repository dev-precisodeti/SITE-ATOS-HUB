import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Particles from "./Particles.jsx";
import { AppWindow, GuardiaoSim, CelulasLiveSim, VisitanteSim, Mini } from "./Sims.jsx";
import { VoluntariadoSim } from "./VoluntariadoSim.jsx";
import { CheckinCelulaSim } from "./CheckinCelulaSim.jsx";
import { Arrow, Icons, MediaSlot, Reveal, LogoMark, PredetiLogo, WhatsIcon, waLink } from "./UI.jsx";
import { PerfilDashboard } from "./PerfisViews.jsx";
import { PILARES_CARTOES, PERFIS, PROTECAO } from "../data.js";
import { WHATSAPP_VENDAS, NOSSOS_PRODUTOS, SITE_PREDETI_URL, EMPRESA_LEGAL } from "../config.js";

/* ================= HERÓI ================= */
function Hero() {
  return (
    <section className="relative overflow-hidden pb-10 pt-36 md:pt-44">
      <Particles />
      <div className="relative mx-auto max-w-5xl px-5 text-center">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="mx-auto mb-6 flex flex-wrap items-center justify-center gap-2.5">
          <a href={SITE_PREDETI_URL} className="inline-flex items-center gap-2 rounded-full bg-surface px-3.5 py-1.5 text-[13px] font-medium text-muted ring-1 ring-line transition hover:bg-white hover:text-ink">
            <span>← Voltar à</span>
            <PredetiLogo className="h-4 w-auto" />
          </a>
          <a href="https://atoshub.predeti.com.br/" className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[14px] font-medium text-ink ring-1 ring-line transition hover:bg-surface">
            <LogoMark className="h-5 w-5" />
            ATOS HUB
          </a>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 24, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="h-display text-[clamp(38px,6.4vw,76px)] leading-[1.04]">
          Ninguém fica para trás.
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45, duration: 0.8 }}
          className="mx-auto mt-6 max-w-2xl text-[18px] leading-relaxed text-muted">
          <a href="https://atoshub.predeti.com.br/" className="font-medium text-ink underline-offset-4 hover:underline">Atos Hub</a> é o sistema de cuidado com pessoas para igrejas em células. Você acompanha cada membro, cada visitante e cada voluntário em um só lugar, do primeiro contato à vida em comunidade.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.7 }}
          className="mx-auto mt-10 inline-flex flex-col items-center gap-4 rounded-3xl bg-white/70 p-3 ring-1 ring-line backdrop-blur sm:flex-row">
          <a href="#demonstracao" className="btn-dark">Agendar uma demonstração <Arrow /></a>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-light"><WhatsIcon className="h-5 w-5 text-[#1FAF5A]" /> Falar no WhatsApp</a>
        </motion.div>
      </div>
    </section>
  );
}

/* ================= PAINEL QUE CRESCE NO SCROLL ================= */
function ShowcaseVideo() {
  const ref = useRef(null);
  const [paused, setPaused] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [48, 28]);
  const tilt = useTransform(scrollYProgress, [0, 1], [10, 0]);
  return (
    <section ref={ref} className="px-3 md:px-6 overflow-hidden" aria-label="Atos Hub em uso">
      <motion.div style={{ scale, borderRadius: radius, rotateX: tilt, transformPerspective: 1600 }}
        className="relative mx-auto aspect-[4/5] max-w-[1400px] overflow-hidden bg-[#0E0F13] sm:aspect-[16/10] md:aspect-[16/9]">
        <div className="absolute inset-0 opacity-60" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.18) 1px, transparent 1px)", backgroundSize: "26px 26px" }} />
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_100%,rgba(245,165,36,.18),transparent_70%)]" />
        <MediaSlot videoKey="hero">
          <div className="absolute inset-[4%] md:inset-[7%]"><AppWindow paused={paused} /></div>
        </MediaSlot>
        <button onClick={() => setPaused((p) => !p)} aria-label={paused ? "Reproduzir" : "Pausar"}
          className="absolute bottom-5 left-5 grid h-11 w-11 place-items-center rounded-full bg-white/90 text-ink shadow-lg transition hover:bg-white">
          {paused ? <Icons.play className="h-4 w-4" /> : <Icons.pause className="h-4 w-4" />}
        </button>
      </motion.div>
    </section>
  );
}

/* ================= FAIXA DE ÍCONES ================= */
function IconMarquee() {
  const items = ["heart", "home", "wave", "hands", "music", "kids", "chart", "lock", "team", "clock", "pin", "calendar", "bell", "route"];
  const row = [...items, ...items];
  return (
    <div className="relative mt-16 max-w-full overflow-hidden py-4 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]" aria-hidden="true">
      <motion.div className="flex w-max gap-4" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 38, ease: "linear", repeat: Infinity }}>
        {row.map((k, i) => {
          const C = Icons[k];
          return <span key={i} className="grid h-14 w-14 place-items-center rounded-full bg-surface text-ink"><C className="h-6 w-6" /></span>;
        })}
      </motion.div>
    </div>
  );
}

/* ================= O PROBLEMA: FRASE QUE ACENDE PALAVRA POR PALAVRA ================= */
function Word({ w, i, total, progress }) {
  const start = i / total, end = start + 1 / total;
  const opacity = useTransform(progress, [start, end], [0.18, 1]);
  return <motion.span style={{ opacity }} className="inline-block whitespace-pre">{w} </motion.span>;
}
function Problema() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const text = "Quando a igreja passa de centenas para milhares de pessoas, alguém começa a ficar de fora. O visitante que não recebeu ligação. O membro que parou de vir à célula e ninguém percebeu. O voluntário sobrecarregado.";
  const words = text.split(" ");
  return (
    <section id="cuidado" ref={ref} className="mx-auto max-w-4xl scroll-mt-24 px-5 py-28 text-center md:py-36">
      <span className="eyebrow">Igreja cresce. O cuidado não pode diminuir.</span>
      <p className="h-display mt-6 text-[clamp(26px,3.6vw,44px)] leading-[1.22]">
        {words.map((w, i) => <Word key={i} w={w} i={i} total={words.length} progress={scrollYProgress} />)}
      </p>
      <Reveal>
        <p className="mx-auto mt-10 max-w-2xl text-[17px] leading-relaxed text-muted">
          Planilhas e grupos de WhatsApp não dão conta disso. <span className="text-ink">A sua igreja precisa de um jeito de enxergar cada pessoa.</span>
        </p>
      </Reveal>
    </section>
  );
}

/* ================= PILARES EM SEÇÕES ALTERNADAS ================= */
function Feature({ eyebrow, title, text, bullets, children, flip, id, videoKey, dark, mobile }) {
  return (
    <div id={id} className={`mx-auto grid grid-cols-1 max-w-6xl scroll-mt-24 items-center gap-8 sm:gap-10 px-4 sm:px-5 py-10 md:gap-14 md:py-16 ${flip ? "md:grid-cols-[1.1fr_0.9fr]" : "md:grid-cols-[0.9fr_1.1fr]"}`}>
      <Reveal className={`w-full min-w-0 text-center md:text-left ${flip ? "md:order-2" : ""}`}>
        <span className="eyebrow">{eyebrow}</span>
        <h3 className="h-display mt-3 text-[clamp(26px,3vw,38px)] leading-tight">{title}</h3>
        <p className="mx-auto mt-4 max-w-md text-[15px] sm:text-[16px] leading-relaxed text-muted md:mx-0">{text}</p>
        <ul className="mx-auto mt-5 sm:mt-6 grid max-w-md gap-2.5 text-left text-[14px] sm:text-[14.5px] md:mx-0">
          {bullets.map((b) => (
            <li key={b} className="flex gap-2.5 sm:gap-3"><span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-amber" />{b}</li>
          ))}
        </ul>
      </Reveal>
      <Reveal delay={0.1} className={`flex justify-center w-full min-w-0 ${flip ? "md:order-1" : ""}`}>
        {mobile ? (
          <div className="relative w-full max-w-[320px] py-1 flex justify-center mx-auto">
            <div className="absolute -inset-4 rounded-[50px] bg-gradient-to-tr from-[#F26A21]/10 to-emerald-500/10 blur-xl pointer-events-none" />
            <div className="relative w-full">
              <MediaSlot videoKey={videoKey}>{children}</MediaSlot>
            </div>
          </div>
        ) : (
          <div className={`relative aspect-auto min-h-[380px] sm:min-h-[420px] md:aspect-[4/3] w-full max-w-xl mx-auto overflow-hidden rounded-[20px] sm:rounded-[28px] p-2.5 sm:p-5 md:p-8 ${dark ? "bg-[#0E0F13]" : "bloom"}`}>
            {dark && <div className="absolute inset-0 opacity-50" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.18) 1px, transparent 1px)", backgroundSize: "22px 22px" }} />}
            <div className="relative h-full min-h-[350px] sm:min-h-0 overflow-hidden rounded-xl sm:rounded-2xl bg-white shadow-[0_20px_50px_-20px_rgba(18,19,23,.25)] ring-1 ring-black/5">
              <MediaSlot videoKey={videoKey}>{children}</MediaSlot>
            </div>
          </div>
        )}
      </Reveal>
    </div>
  );
}

function Pilares() {
  return (
    <section id="pilares" className="scroll-mt-24">
      <Reveal className="mx-auto max-w-3xl px-5 text-center">
        <span className="eyebrow">Os pilares</span>
        <h2 className="h-display mt-4 text-[clamp(32px,4.6vw,56px)] leading-[1.06]">Tudo o que o cuidado precisa, em um só lugar</h2>
      </Reveal>
      
      {/* 1. Cuidado */}
      <Feature id="cuidado" videoKey="guardioes" eyebrow="Cuidado" title="Cuidado pastoral organizado"
        text="Cada pessoa tem alguém olhando por ela. Distribua membros entre equipes e núcleos de cuidado, acompanhe quem precisa de acolhimento e reconecte quem se afastou."
        bullets={["Membros distribuídos entre equipes e núcleos de cuidado", "Sinais de quem faltou, quem pediu oração e quem se afastou", "Visitas e reaproximações registradas no caminho de cada pessoa"]}>
        <GuardiaoSim />
      </Feature>

      {/* 2. Células */}
      <Feature flip dark id="celulas" videoKey="celulas" eyebrow="Células" title="A vida da igreja acontecendo"
        text="Gestão completa de células, redes e lideranças. Acompanhe presença, reuniões e a saúde de cada grupo, inclusive ao vivo, no momento em que as células estão acontecendo."
        bullets={["Células organizadas por rede, supervisão e liderança", "Presença registrada pelo líder durante o encontro", "Saúde de cada grupo: frequência, visitantes e multiplicação"]}>
        <CelulasLiveSim />
      </Feature>

      {/* 3. Novos Visitantes */}
      <Feature id="visitantes" videoKey="visitantes" eyebrow="Novos visitantes" title="Do primeiro “olá” à célula"
        text={<>Quem chega quer encontrar uma célula perto de casa. O <a href="https://atoshub.predeti.com.br" className="font-medium text-ink underline-offset-4 hover:underline">Atos Hub</a> conecta o visitante ao líder certo e mostra quanto tempo ele está esperando pelo primeiro contato.</>}
        bullets={["Sugestão de células próximas da casa do visitante", "Líder avisado na hora, com os dados de quem chegou", "Tempo até o primeiro contato sempre à vista"]}>
        <VisitanteSim />
      </Feature>

      {/* 4. Check-in de Célula (Vem primeiro conforme solicitado) */}
      <Feature flip id="checkin-celula" videoKey="checkin-celula" mobile eyebrow="Check-in de Célula"
        title="O líder registra em segundos. A liderança acompanha na hora."
        text="Nada de cobrar relatórios no domingo à noite. O líder inicia a reunião com um toque, marca presenças por QR code, reconhecimento facial ou lista manual, e os números sobem na hora para a liderança."
        bullets={[
          "Início da reunião com um toque e status ao vivo no app",
          "Presença por QR Code dinâmico, lista manual ou reconhecimento facial",
          "Adição rápida de visitantes durante o encontro",
          "Foto da comunhão e relatório enviado automaticamente para a liderança",
        ]}>
        <CheckinCelulaSim />
      </Feature>

      {/* 5. Voluntariado & Ministérios (Vem em seguida) */}
      <Feature id="voluntariado" videoKey="voluntariado" mobile eyebrow="Voluntariado"
        title="Escalas sem planilha. Voluntários sem confusão."
        text="Cada voluntário vê suas vagas abertas, confirma sua escala e acompanha a ordem do culto direto no celular — sem grupos perdidos no WhatsApp nem planilhas manuais."
        bullets={[
          "Vagas abertas com candidatura e confirmação instantânea pelo app",
          "Check-in do voluntário por QR Code dinâmico ou código no dia do culto",
          "Sincronização com Google Agenda para ninguém esquecer o dia de servir",
          "Ordem do culto em tempo real para toda a equipe de apoio, louvor e mídia",
        ]}>
        <VoluntariadoSim />
      </Feature>

      <div className="mx-auto max-w-6xl px-5 pb-24 pt-6 md:pb-32">
        <div className="grid gap-4 sm:grid-cols-2">
          {PILARES_CARTOES.map((p, k) => {
            const C = Icons[p.i];
            return (
              <Reveal key={p.t} delay={(k % 2) * 0.06}>
                <motion.div whileHover={{ y: -4 }} className="group flex h-full flex-col rounded-[28px] bg-surface p-6 transition-colors hover:bg-white hover:shadow-[0_20px_50px_-24px_rgba(18,19,23,.3)] hover:ring-1 hover:ring-line md:p-8">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-ink ring-1 ring-line transition group-hover:bg-ink group-hover:text-white"><C className="h-5 w-5" /></span>
                    <span className="eyebrow">{p.t}</span>
                  </div>
                  <h3 className="mt-5 text-[22px] font-medium tracking-tight">{p.s}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.d}</p>
                  <div className="mt-6 flex-1 content-end"><Mini tipo={p.mini} /></div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================= PARA QUEM É ================= */
function ParaQuem() {
  const [i, setI] = useState(0);
  const p = PERFIS[i];
  const go = (d) => setI((x) => (x + d + PERFIS.length) % PERFIS.length);
  return (
    <section id="para-quem" className="scroll-mt-24 bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="text-center">
          <span className="eyebrow">Para quem é</span>
          <h2 className="h-display mt-4 text-[clamp(32px,4.6vw,56px)] leading-[1.06]">Feito para igrejas em células,<br /><span className="text-muted">do jeito que elas funcionam</span></h2>
        </Reveal>

        <div className="mx-auto mt-8 sm:mt-10 flex max-w-full flex-wrap justify-center gap-1 rounded-2xl sm:rounded-full bg-white p-1 ring-1 ring-line sm:w-max" role="tablist">
          {PERFIS.map((x, k) => (
            <button key={x.t} role="tab" aria-selected={k === i} onClick={() => setI(k)}
              className={`relative rounded-xl sm:rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-[12.5px] sm:text-[14px] transition ${k === i ? "text-white" : "text-muted hover:text-ink"}`}>
              {k === i && <motion.span layoutId="perfil-pill" className="absolute inset-0 rounded-xl sm:rounded-full bg-ink" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
              <span className="relative">{x.t}</span>
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 items-stretch gap-8 md:grid-cols-[1.45fr_0.95fr]">
          <div className={`relative min-h-[440px] overflow-hidden rounded-[28px] bg-gradient-to-br ${p.grad} p-4 sm:p-6 md:p-8 flex flex-col justify-center`}>
            <AnimatePresence mode="wait">
              <motion.div key={p.t} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}
                className="flex h-full min-h-[380px] flex-col overflow-hidden rounded-2xl bg-white/95 shadow-xl ring-1 ring-black/5">
                <div className="flex items-center justify-between border-b border-line px-5 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#F26A21]" />
                    <span className="text-[13.5px] font-bold text-slate-800">{p.painel}</span>
                  </div>
                  <LogoMark className="h-5 w-5" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <PerfilDashboard index={i} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div key={p.t} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <span className="font-mono text-[12px] text-muted">0{i + 1} / 0{PERFIS.length}</span>
                <h3 className="mt-3 text-[28px] font-medium tracking-tight">{p.t}</h3>
                <p className="mt-3 text-[16.5px] leading-relaxed text-muted">{p.d}</p>
                <a href="#demonstracao" className="mt-5 inline-flex items-center gap-1 text-[15px] font-medium">Ver demonstração <Arrow /></a>
              </motion.div>
            </AnimatePresence>
            <div className="mt-8 inline-flex w-max gap-1 rounded-full bg-white p-1 ring-1 ring-line">
              <button onClick={() => go(-1)} aria-label="Anterior" className="grid h-10 w-10 place-items-center rounded-full hover:bg-surface"><Arrow className="h-4 w-4 rotate-180" /></button>
              <button onClick={() => go(1)} aria-label="Próximo" className="grid h-10 w-10 place-items-center rounded-full hover:bg-surface"><Arrow /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= CONFIANÇA ================= */
function Confianca({ onOpenLegal }) {
  const acessos = [["Pastor", "Igreja inteira"], ["Supervisor", "Sua rede"], ["Líder", "Sua célula"], ["Equipe de Cuidado", "Pessoas sob seu cuidado"]];
  const log = [["20:14", "Líder Marcos registrou presença · Célula Família Lima"], ["19:52", "Líder de Cuidado Sônia atualizou acompanhamento de Felipe A."], ["18:30", "Supervisora Carla exportou relatório da Rede Verde"]];
  return (
    <section id="seguranca" className="scroll-mt-24 px-5 py-24 md:py-32">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[28px] bg-ink p-8 text-white md:p-14">
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.25) 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
        <div className="absolute inset-0 bg-[radial-gradient(50%_60%_at_85%_100%,rgba(245,165,36,.22),transparent_70%)]" />
        <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
          <Reveal>
            <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-white/60">Confiança e Conformidade Legal</span>
            <h2 className="mt-4 text-[clamp(32px,4.2vw,52px)] leading-[1.06] tracking-tightest" style={{ fontWeight: 450 }}>Cuidar também é proteger</h2>
            <p className="mt-5 max-w-md text-[17px] leading-relaxed text-white/70">Dados de pessoas são sagrados. O <a href="https://atoshub.predeti.com.br" className="font-medium text-white underline-offset-4 hover:underline">Atos Hub</a> tem níveis de acesso por função, auditoria e recursos de adequação à LGPD, para que cada informação seja vista só por quem precisa.</p>
            <ul className="mt-8 grid gap-4">
              {PROTECAO.map((x) => {
                const C = Icons[x.i];
                return (
                  <li key={x.t} className="flex gap-4">
                    <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-white/10 text-amber"><C className="h-5 w-5" /></span>
                    <div><div className="text-[16px] font-medium">{x.t}</div><div className="text-[14.5px] text-white/60">{x.d}</div></div>
                  </li>
                );
              })}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onOpenLegal?.("privacidade")}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-[13.5px] font-medium text-white ring-1 ring-white/15 transition hover:bg-white/20"
              >
                <Icons.shield className="h-4 w-4 text-amber" /> Política de Privacidade e LGPD
              </button>
              <button
                type="button"
                onClick={() => onOpenLegal?.("direitos")}
                className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2.5 text-[13.5px] text-white/80 ring-1 ring-white/10 transition hover:bg-white/15 hover:text-white"
              >
                Canal do Titular (DPO)
              </button>
            </div>
            <p className="mt-3 font-mono text-[11.5px] text-white/50">
              {EMPRESA_LEGAL.razaoSocial} · CNPJ {EMPRESA_LEGAL.cnpj}
            </p>
          </Reveal>
          <Reveal delay={0.1} className="grid min-w-0 grid-cols-1 gap-3">
            <div className="rounded-2xl bg-white p-5 text-ink">
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-medium">Quem vê o quê</span>
                <Icons.eye className="h-4 w-4 text-muted" />
              </div>
              <div className="mt-3 grid gap-1.5">
                {acessos.map(([f, v]) => (
                  <div key={f} className="flex items-center justify-between rounded-xl bg-surface px-3 py-2.5 text-[13.5px]">
                    <span className="font-medium">{f}</span><span className="text-muted">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-white/[.06] p-5 ring-1 ring-white/10">
              <div className="flex items-center gap-2 text-[14px] font-medium"><Icons.history className="h-4 w-4 text-amber" /> Registro de auditoria</div>
              <ul className="mt-3 grid gap-2">
                {log.map(([h, t]) => (
                  <li key={h} className="flex gap-3 font-mono text-[12px] text-white/70"><span className="text-amber">{h}</span><span className="min-w-0 truncate">{t}</span></li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================= CHAMADA FINAL + FORMULÁRIO ================= */
function Field({ id, label, children }) {
  return (
    <label htmlFor={id} className="grid gap-1.5 text-left">
      <span className="text-[13.5px] font-medium">{label}</span>
      {children}
    </label>
  );
}
const input = "w-full rounded-2xl bg-surface px-4 py-3 text-[15.5px] outline-none ring-1 ring-transparent transition placeholder:text-muted/70 focus:bg-white focus:ring-ink";

function Formulario({ onOpenLegal }) {
  const [erro, setErro] = useState("");
  const [link, setLink] = useState("");
  function enviar(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const nome = f.get("nome").trim(), igreja = f.get("igreja").trim(), tel = f.get("tel").trim(), lgpd = f.get("lgpd");
    if (!nome || !igreja || tel.replace(/\D/g, "").length < 10) { setErro("Preencha seu nome, a igreja e um WhatsApp com DDD."); setLink(""); return; }
    if (!lgpd) { setErro("Para prosseguir, confirme sua ciência da Política de Privacidade e LGPD."); setLink(""); return; }
    setErro("");
    const msg = `Olá! Quero conhecer o Atos Hub.\nNome: ${nome}\nIgreja: ${igreja}\nCidade: ${f.get("cidade").trim() || "-"}\nPessoas na igreja: ${f.get("pessoas")}\nCélulas: ${f.get("celulas")}\nWhatsApp: ${tel}\nConsentimento LGPD: Aceito (${EMPRESA_LEGAL.cnpj})`;
    const url = `https://wa.me/${WHATSAPP_VENDAS}?text=${encodeURIComponent(msg)}`;
    setLink(url);
    window.open(url, "_blank", "noopener");
  }
  return (
    <form onSubmit={enviar} noValidate className="grid gap-4 rounded-[28px] bg-white p-6 text-left shadow-[0_30px_80px_-30px_rgba(18,19,23,.35)] ring-1 ring-line md:p-8">
      <div>
        <h3 className="text-[24px] font-medium tracking-tight">Agende uma demonstração</h3>
        <p className="mt-1 text-[15px] text-muted">Preencha e a conversa continua no nosso WhatsApp.</p>
      </div>
      <Field id="f-nome" label="Seu nome"><input id="f-nome" name="nome" autoComplete="name" placeholder="Ex.: Pr. João Silva" className={input} /></Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="f-igreja" label="Igreja"><input id="f-igreja" name="igreja" autoComplete="organization" placeholder="Ex.: Igreja Batista Central" className={input} /></Field>
        <Field id="f-cidade" label="Cidade"><input id="f-cidade" name="cidade" autoComplete="address-level2" placeholder="Ex.: Rio de Janeiro" className={input} /></Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="f-pessoas" label="Pessoas na igreja">
          <select id="f-pessoas" name="pessoas" defaultValue="500 a 2.000" className={input}><option>Até 500</option><option>500 a 2.000</option><option>2.000 a 5.000</option><option>Mais de 5.000</option></select>
        </Field>
        <Field id="f-celulas" label="Células">
          <select id="f-celulas" name="celulas" defaultValue="20 a 100" className={input}><option>Até 20</option><option>20 a 100</option><option>100 a 300</option><option>Mais de 300</option></select>
        </Field>
      </div>
      <Field id="f-tel" label="Seu WhatsApp"><input id="f-tel" name="tel" type="tel" inputMode="tel" autoComplete="tel" placeholder="(21) 99999-9999" className={input} /></Field>
      <label className="flex items-start gap-2.5 rounded-2xl bg-surface/80 p-3 text-[12.5px] leading-relaxed text-muted ring-1 ring-line/70">
        <input
          type="checkbox"
          name="lgpd"
          defaultChecked
          className="mt-0.5 h-4 w-4 flex-none rounded accent-ink"
        />
        <span>
          Autorizo o tratamento dos meus dados por <strong className="font-medium text-ink">{EMPRESA_LEGAL.razaoSocial}</strong> (CNPJ {EMPRESA_LEGAL.cnpj}) para contato comercial via WhatsApp, nos termos da{" "}
          <button type="button" onClick={() => onOpenLegal?.("privacidade")} className="font-medium text-ink underline underline-offset-2">
            Política de Privacidade (LGPD)
          </button>{" "}
          e dos{" "}
          <button type="button" onClick={() => onOpenLegal?.("termos")} className="font-medium text-ink underline underline-offset-2">
            Termos de Uso
          </button>.
        </span>
      </label>
      {erro && <p role="alert" className="rounded-2xl bg-coral-soft px-4 py-3 text-[14px] text-[#A3281C]">{erro}</p>}
      <button type="submit" className="btn-dark justify-center">Quero conhecer o Atos Hub <Arrow /></button>
      {link && <a href={link} target="_blank" rel="noopener noreferrer" className="text-center text-[13.5px] text-muted underline underline-offset-4">Se o WhatsApp não abriu, toque aqui</a>}
    </form>
  );
}

/* ================= NOSSOS PRODUTOS ================= */
function NossosProdutos() {
  return (
    <section id="nossos-produtos" className="scroll-mt-24 px-5 pb-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">Ecossistema PREDETI</span>
          <h2 className="h-display mt-4 text-[clamp(28px,4vw,48px)] leading-[1.08]">Nossos produtos</h2>
          <p className="mx-auto mt-4 max-w-xl text-[16.5px] text-muted">
            Conheça as plataformas conectadas ao ecossistema{" "}
            <a href="https://erp.predeti.com.br/" className="font-medium text-ink underline-offset-4 hover:underline">PREDETI ERP</a>,{" "}
            <a href="https://atosdesk.predeti.com.br" className="font-medium text-ink underline-offset-4 hover:underline">ATOS DESK</a> e{" "}
            <a href="https://atoshub.predeti.com.br/" className="font-medium text-ink underline-offset-4 hover:underline">ATOS HUB</a>.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {NOSSOS_PRODUTOS.map((p, k) => (
            <Reveal key={p.nome} delay={k * 0.06}>
              <motion.a
                whileHover={{ y: -4 }}
                href={p.url}
                className="group flex h-full flex-col justify-between rounded-3xl bg-surface p-6 ring-1 ring-line transition hover:bg-white hover:shadow-[0_20px_50px_-24px_rgba(18,19,23,.3)]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[19px] font-medium text-ink">{p.nome}</span>
                    {p.atual && <span className="rounded-full bg-ink px-2.5 py-0.5 font-mono text-[10.5px] text-white">Você está aqui</span>}
                  </div>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.desc}</p>
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-ink">
                  {p.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  <Arrow className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </motion.a>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.18} className="mt-6">
          <a
            href={SITE_PREDETI_URL}
            className="group flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-ink px-6 py-5 text-white transition hover:bg-ink/95 sm:px-8"
          >
            <div className="flex flex-wrap items-center gap-4">
              <PredetiLogo dark className="h-6 w-auto" />
              <span className="hidden h-5 w-px bg-white/15 sm:inline-block" aria-hidden="true" />
              <span className="text-[14.5px] text-white/80">
                Conheça todas as soluções no site principal da marca <strong className="font-medium text-white">predeti.com.br</strong>
              </span>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[13.5px] font-medium text-white ring-1 ring-white/15 transition group-hover:bg-white group-hover:text-ink">
              ← Voltar à Predeti
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function ChamadaFinal({ onOpenLegal }) {
  return (
    <section id="demonstracao" className="scroll-mt-20 px-5 pb-24">
      <div className="bloom relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 overflow-hidden rounded-[28px] p-8 md:grid-cols-[1fr_1.05fr] md:p-14">
        <Reveal>
          <span className="eyebrow">Demonstração</span>
          <h2 className="h-display mt-4 text-[clamp(32px,4.2vw,52px)] leading-[1.06]">Sua igreja tem muitas pessoas. Cada uma delas importa.</h2>
          <p className="mt-5 max-w-md text-[17px] leading-relaxed text-muted">Veja como o <a href="https://atoshub.predeti.com.br" className="font-medium text-ink underline-offset-4 hover:underline">Atos Hub</a> ajuda sua igreja a cuidar de todos, do primeiro visitante ao líder mais experiente.</p>
          <ul className="mt-8 grid gap-3 text-[15px]">
            {["Uma conversa de 20 minutos, no horário da sua igreja", "Demonstração com a estrutura de células e redes de vocês", "Caminho de implantação acompanhado pela nossa equipe"].map((t) => (
              <li key={t} className="flex gap-3"><Icons.check className="mt-0.5 h-5 w-5 flex-none text-mint" />{t}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}><div id="form-demo" className="scroll-mt-24"><Formulario onOpenLegal={onOpenLegal} /></div></Reveal>
      </div>
    </section>
  );
}

export default function Home({ onOpenLegal }) {
  return (
    <main>
      <Hero />
      <ShowcaseVideo />
      <IconMarquee />
      <Problema />
      <Pilares />
      <ParaQuem />
      <Confianca onOpenLegal={onOpenLegal} />
      <NossosProdutos />
      <ChamadaFinal onOpenLegal={onOpenLegal} />
    </main>
  );
}
