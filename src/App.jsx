import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Home from "./components/Home.jsx";
import { Logo, Arrow, WhatsIcon, waLink } from "./components/UI.jsx";
import { WHATSAPP_EXIBIDO, NOSSOS_PRODUTOS } from "./config.js";

/* Links com #id rolam até a seção; #inicio volta ao topo. */
function useHashScroll() {
  useEffect(() => {
    const on = () => {
      const id = location.hash.slice(1);
      if (!id || id === "inicio") return window.scrollTo({ top: 0, behavior: "smooth" });
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };
    addEventListener("hashchange", on);
    if (location.hash) setTimeout(on, 150);
    return () => removeEventListener("hashchange", on);
  }, []);
}

const LINKS = [["O cuidado", "#cuidado"], ["Pilares", "#pilares"], ["Células", "#celulas"], ["Para quem é", "#para-quem"], ["Segurança", "#seguranca"]];

function Nav() {
  const [solid, setSolid] = useState(false);
  const [menu, setMenu] = useState(false);
  const [prodOpen, setProdOpen] = useState(false);
  const [mobileProdOpen, setMobileProdOpen] = useState(true);
  const dropRef = useRef(null);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 20));

  useEffect(() => {
    const onClickOutside = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setProdOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setProdOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <AnimatePresence>
        {!solid && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden border-b border-line bg-surface/80 backdrop-blur">
            <a href="#celulas" className="flex items-center justify-center gap-3 px-4 py-2 text-[13px]">
              <span className="rounded-full bg-ink px-2 py-0.5 text-[10.5px] font-medium uppercase tracking-wide text-white">Novo</span>
              <span className="truncate text-muted">Células ao vivo: acompanhe a presença no momento em que os encontros acontecem</span>
              <span className="hidden font-medium sm:inline">Conhecer →</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
      <div className={`transition-colors duration-300 ${solid ? "border-b border-line bg-white/85 backdrop-blur-xl" : "bg-transparent"}`}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5">
          <Logo />
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
            {LINKS.map(([t, h]) => <a key={h} href={h} className="rounded-full px-3.5 py-2 text-[14.5px] text-muted transition hover:bg-surface hover:text-ink">{t}</a>)}

            {/* Dropdown Nossos produtos (Desktop) */}
            <div ref={dropRef} className="relative" onMouseEnter={() => setProdOpen(true)} onMouseLeave={() => setProdOpen(false)}>
              <button
                type="button"
                onClick={() => setProdOpen((o) => !o)}
                aria-expanded={prodOpen}
                aria-haspopup="true"
                className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[14.5px] text-muted transition hover:bg-surface hover:text-ink"
              >
                Nossos produtos
                <svg viewBox="0 0 24 24" className={`h-3.5 w-3.5 transition-transform duration-200 ${prodOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              <AnimatePresence>
                {prodOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.16 }}
                    className="absolute right-0 top-full z-50 w-72 pt-2"
                  >
                    <div className="overflow-hidden rounded-2xl bg-white p-2 shadow-[0_20px_50px_-15px_rgba(18,19,23,.22)] ring-1 ring-line">
                      {NOSSOS_PRODUTOS.map((p) => (
                        <a
                          key={p.nome}
                          href={p.url}
                          target={p.atual ? "_self" : "_blank"}
                          rel="noopener noreferrer"
                          onClick={() => setProdOpen(false)}
                          className="group flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 transition hover:bg-surface"
                        >
                          <div>
                            <div className="flex items-center gap-2 text-[14px] font-medium text-ink">
                              {p.nome}
                              {p.atual && <span className="rounded-full bg-ink px-2 py-0.5 font-mono text-[10px] text-white">Atual</span>}
                            </div>
                            <div className="text-[12.5px] text-muted">{p.desc}</div>
                          </div>
                          <Arrow className="h-3.5 w-3.5 flex-none text-muted transition group-hover:translate-x-0.5 group-hover:text-ink" />
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>
          <div className="flex items-center gap-2">
            <a href="#demonstracao" className="btn-dark py-2.5 text-[14px]"><span className="hidden sm:inline">Agendar uma demonstração</span><span className="sm:hidden">Demonstração</span></a>
            <button onClick={() => setMenu((m) => !m)} aria-label="Menu" aria-expanded={menu} className="grid h-10 w-10 place-items-center rounded-full bg-surface lg:hidden">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d={menu ? "M6 6l12 12M18 6 6 18" : "M4 8h16M4 16h16"} /></svg>
            </button>
          </div>
        </div>
        <AnimatePresence>
          {menu && (
            <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-line bg-white lg:hidden">
              <div className="grid gap-1 p-4">
                {LINKS.map(([t, h]) => <a key={h} href={h} onClick={() => setMenu(false)} className="rounded-xl px-4 py-3 text-[16px] hover:bg-surface">{t}</a>)}

                {/* Dropdown Nossos produtos (Mobile) */}
                <div className="mt-1 rounded-2xl bg-surface/70 p-2">
                  <button
                    type="button"
                    onClick={() => setMobileProdOpen((o) => !o)}
                    aria-expanded={mobileProdOpen}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-[15.5px] font-medium text-ink"
                  >
                    <span>Nossos produtos</span>
                    <svg viewBox="0 0 24 24" className={`h-4 w-4 text-muted transition-transform duration-200 ${mobileProdOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                  <AnimatePresence initial={false}>
                    {mobileProdOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="grid gap-1 overflow-hidden pt-1"
                      >
                        {NOSSOS_PRODUTOS.map((p) => (
                          <a
                            key={p.nome}
                            href={p.url}
                            target={p.atual ? "_self" : "_blank"}
                            rel="noopener noreferrer"
                            onClick={() => setMenu(false)}
                            className="flex items-center justify-between rounded-xl bg-white px-3.5 py-2.5 text-[14.5px] ring-1 ring-line/60 transition hover:bg-surface"
                          >
                            <div>
                              <span className="font-medium text-ink">{p.nome}</span>
                              <span className="block text-[12px] text-muted">{p.desc}</span>
                            </div>
                            <Arrow className="h-3.5 w-3.5 text-muted" />
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

function BotaoWhatsApp() {
  return (
    <motion.a href={waLink()} target="_blank" rel="noopener noreferrer" aria-label={`Falar no WhatsApp: ${WHATSAPP_EXIBIDO}`}
      initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ y: -3 }} className="group fixed bottom-5 right-5 z-[60] flex items-center gap-3 rounded-full bg-[#25D366] py-3 pl-3 pr-3 text-white shadow-[0_14px_40px_-10px_rgba(37,211,102,.7)] md:pr-5">
      <span className="relative grid h-9 w-9 place-items-center rounded-full bg-white/15">
        <span className="absolute inset-0 animate-ping rounded-full bg-white/25" />
        <WhatsIcon className="relative h-6 w-6" />
      </span>
      <span className="hidden text-left leading-tight md:block">
        <span className="block text-[14.5px] font-semibold">Falar no WhatsApp</span>
        <span className="block font-mono text-[11.5px] opacity-90">{WHATSAPP_EXIBIDO}</span>
      </span>
    </motion.a>
  );
}

function Footer() {
  return (
    <footer className="overflow-hidden border-t border-line pt-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-[14.5px] text-muted">Sistema de cuidado com pessoas para igrejas em células. Membresia, células, voluntariado e eventos em um só lugar.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <a href="#demonstracao" className="btn-dark py-2.5 text-[14px]">Agendar demonstração <Arrow /></a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-light py-2.5 text-[14px]"><WhatsIcon className="h-4 w-4 text-[#1FAF5A]" /> {WHATSAPP_EXIBIDO}</a>
          </div>
        </div>
        {[
          ["Pilares", [["Guardiões", "#guardioes"], ["Células", "#celulas"], ["Novos visitantes", "#visitantes"], ["Voluntariado, cultos e Kids", "#pilares"]]],
          ["Igreja", [["Para quem é", "#para-quem"], ["Segurança e LGPD", "#seguranca"]]],
          ["ATOS HUB", [["Início", "#inicio"], ["Demonstração", "#demonstracao"]]],
          ["Nossos produtos", NOSSOS_PRODUTOS.map((p) => [p.nome, p.url, !p.atual])],
        ].map(([t, ls]) => (
          <div key={t}>
            <div className="text-[13px] font-medium">{t}</div>
            <ul className="mt-3 grid gap-2 text-[14.5px] text-muted">
              {ls.map(([l, h, ext]) => (
                <li key={l}>
                  <a href={h} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="hover:text-ink">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-14 flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 text-[13px] text-muted">
        <span>© {new Date().getFullYear()} <a href="https://atoshub.predeti.com.br" className="hover:text-ink">ATOS HUB</a> · Soluções <a href="https://predeti.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-ink">PREDETI ERP</a> · Ninguém fica para trás.</span>
        <div className="flex flex-wrap items-center gap-4">
          {NOSSOS_PRODUTOS.map((p) => (
            <a key={p.nome} href={p.url} target={p.atual ? "_self" : "_blank"} rel="noopener noreferrer" className="font-medium hover:text-ink">
              {p.nome}
            </a>
          ))}
        </div>
      </div>
      <div aria-hidden="true" className="mt-4 select-none whitespace-nowrap text-center font-medium leading-[0.8] tracking-tightest text-transparent"
        style={{ fontSize: "clamp(64px,16vw,260px)", backgroundImage: "linear-gradient(180deg,#121317 0%,rgba(18,19,23,.06) 85%)", WebkitBackgroundClip: "text", backgroundClip: "text" }}>
        ATOS HUB
      </div>
    </footer>
  );
}

export default function App() {
  useHashScroll();
  return (
    <>
      <Nav />
      <div id="inicio" />
      <Home />
      <Footer />
      <BotaoWhatsApp />
    </>
  );
}
