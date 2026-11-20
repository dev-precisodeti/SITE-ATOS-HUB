import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EMPRESA_LEGAL, WHATSAPP_EXIBIDO, WHATSAPP_VENDAS } from "../config.js";
import { Icons, LogoMark, WhatsIcon } from "./UI.jsx";

const CONSENT_KEY = "atoshub_lgpd_consent_v1";

export function LgpdBanner({ onOpenLegal }) {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(CONSENT_KEY)) setVisivel(true);
    } catch {
      setVisivel(true);
    }
  }, []);

  function aceitar() {
    try {
      localStorage.setItem(
        CONSENT_KEY,
        JSON.stringify({ aceitoEm: new Date().toISOString(), cnpj: EMPRESA_LEGAL.cnpj })
      );
    } catch {
      // ignora erro de storage restrito
    }
    setVisivel(false);
  }

  return (
    <AnimatePresence>
      {visivel && (
        <motion.aside
          role="region"
          aria-label="Aviso de Privacidade e LGPD"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 30, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-4 right-4 z-[55] max-w-xl rounded-3xl bg-white/95 p-5 shadow-[0_24px_60px_-18px_rgba(18,19,23,.32)] ring-1 ring-line backdrop-blur-xl sm:bottom-5 sm:left-5 sm:right-auto"
        >
          <div className="flex items-start gap-3.5">
            <span className="mt-0.5 grid h-9 w-9 flex-none place-items-center rounded-full bg-surface text-ink ring-1 ring-line">
              <Icons.shield className="h-4 w-4 text-mint" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[14px] font-medium text-ink">Privacidade e Proteção de Dados (LGPD)</span>
                <span className="rounded-full bg-surface px-2 py-0.5 font-mono text-[10px] text-muted">Lei 13.709/2018</span>
              </div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                A <strong className="font-medium text-ink">{EMPRESA_LEGAL.razaoSocial}</strong> (CNPJ {EMPRESA_LEGAL.cnpj}) utiliza apenas armazenamento essencial para funcionamento deste site e trata os dados do formulário exclusivamente para atendimento comercial.
              </p>
              <div className="mt-3.5 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={aceitar}
                  className="rounded-full bg-ink px-4 py-2 text-[13px] font-medium text-white transition hover:bg-ink/90"
                >
                  Aceitar e continuar
                </button>
                <button
                  type="button"
                  onClick={() => onOpenLegal("privacidade")}
                  className="rounded-full bg-surface px-3.5 py-2 text-[13px] font-medium text-ink ring-1 ring-line transition hover:bg-white"
                >
                  Política de Privacidade
                </button>
                <button
                  type="button"
                  onClick={() => onOpenLegal("termos")}
                  className="px-2 py-1.5 text-[12.5px] text-muted underline-offset-4 hover:text-ink hover:underline"
                >
                  Termos de Uso
                </button>
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

const TABS = [
  { id: "privacidade", label: "Política de Privacidade (LGPD)" },
  { id: "termos", label: "Termos de Uso" },
  { id: "direitos", label: "Direitos do Titular e DPO" },
];

export function LegalModal({ tab, onClose, onChangeTab }) {
  const [tipoSolicitacao, setTipoSolicitacao] = useState("Confirmação e acesso aos meus dados");
  const [nomeTitular, setNomeTitular] = useState("");
  const [contatoTitular, setContatoTitular] = useState("");
  const [detalhesTitular, setDetalhesTitular] = useState("");

  useEffect(() => {
    if (!tab) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [tab, onClose]);

  if (!tab) return null;

  const msgDpo = `Olá! Gostaria de exercer um direito previsto na LGPD (Art. 18) referente ao site ATOS HUB.\nControladora: ${EMPRESA_LEGAL.razaoSocial} (CNPJ ${EMPRESA_LEGAL.cnpj})\nSolicitação: ${tipoSolicitacao}\nNome: ${nomeTitular || "-"}\nContato: ${contatoTitular || "-"}\nDetalhes: ${detalhesTitular || "-"}`;
  const linkWhatsDpo = `https://wa.me/${WHATSAPP_VENDAS}?text=${encodeURIComponent(msgDpo)}`;
  const linkMailDpo = `mailto:${EMPRESA_LEGAL.emailDpo}?subject=${encodeURIComponent(`Solicitação LGPD — ${tipoSolicitacao}`)}&body=${encodeURIComponent(msgDpo)}`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/55 p-3 backdrop-blur-sm sm:p-6"
        onClick={onClose}
      >
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-[28px] bg-white text-ink shadow-2xl ring-1 ring-line"
        >
          {/* Cabeçalho */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line bg-surface/60 px-6 py-4">
            <div className="flex items-center gap-3">
              <LogoMark className="h-8 w-8" />
              <div>
                <h2 id="legal-modal-title" className="text-[17px] font-medium tracking-tight">
                  Conformidade Legal e LGPD · ATOS HUB
                </h2>
                <p className="font-mono text-[11.5px] text-muted">
                  {EMPRESA_LEGAL.razaoSocial} · CNPJ {EMPRESA_LEGAL.cnpj}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="hidden rounded-full bg-white px-3.5 py-1.5 text-[12.5px] font-medium text-muted ring-1 ring-line transition hover:text-ink sm:inline-flex"
              >
                Imprimir / PDF
              </button>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar documento legal"
                className="grid h-9 w-9 place-items-center rounded-full bg-white text-muted ring-1 ring-line transition hover:text-ink"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Abas */}
          <div className="flex flex-wrap gap-1.5 border-b border-line bg-white px-6 py-3" role="tablist">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => onChangeTab(t.id)}
                className={`rounded-full px-4 py-2 text-[13.5px] font-medium transition ${
                  tab === t.id ? "bg-ink text-white" : "bg-surface text-muted hover:text-ink"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Conteúdo rolável */}
          <div className="flex-1 overflow-y-auto px-6 py-6 text-[14.5px] leading-relaxed text-muted sm:px-8">
            {tab === "privacidade" && (
              <div className="grid gap-6">
                <div className="rounded-2xl bg-surface p-4 ring-1 ring-line">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-ink">Identificação do Controlador / Operador</span>
                    <span className="font-mono text-[11px] text-muted">Atualizado em {EMPRESA_LEGAL.atualizacao}</span>
                  </div>
                  <div className="mt-2 grid gap-1 text-[13.5px] text-ink sm:grid-cols-2">
                    <div><strong>Razão Social:</strong> {EMPRESA_LEGAL.razaoSocial}</div>
                    <div><strong>CNPJ:</strong> {EMPRESA_LEGAL.cnpj}</div>
                    <div><strong>Canal LGPD / DPO:</strong> {EMPRESA_LEGAL.emailDpo}</div>
                    <div><strong>Contato Comercial:</strong> {WHATSAPP_EXIBIDO}</div>
                  </div>
                </div>

                <section className="grid gap-2">
                  <h3 className="text-[17px] font-medium text-ink">1. Compromisso com a Privacidade e a LGPD</h3>
                  <p>
                    A <strong className="font-medium text-ink">{EMPRESA_LEGAL.razaoSocial}</strong>, inscrita no CNPJ sob o nº <strong className="font-medium text-ink">{EMPRESA_LEGAL.cnpj}</strong>, detentora das plataformas <strong className="font-medium text-ink">ATOS HUB</strong>, <strong className="font-medium text-ink">ATOS DESK</strong> e <strong className="font-medium text-ink">PREDETI ERP</strong>, atua em estrita conformidade com a <strong className="font-medium text-ink">Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 — LGPD)</strong> e com o Marco Civil da Internet (Lei nº 12.965/2014).
                  </p>
                </section>

                <section className="grid gap-2">
                  <h3 className="text-[17px] font-medium text-ink">2. Papéis na LGPD: Controlador vs. Operador</h3>
                  <ul className="grid gap-2 pl-4">
                    <li className="list-disc">
                      <strong className="font-medium text-ink">Neste Site Institucional (Controladora):</strong> A {EMPRESA_LEGAL.razaoSocial} é a <strong>Controladora</strong> dos dados pessoais informados voluntariamente por você no formulário de agendamento de demonstração e no contato comercial via WhatsApp.
                    </li>
                    <li className="list-disc">
                      <strong className="font-medium text-ink">Na Plataforma ATOS HUB contratada pelas Igrejas (Operadora):</strong> Quando uma Igreja utiliza o sistema ATOS HUB para gestão de membros, células, guardiões, visitantes, voluntariado e ministério infantil (Kids), a <strong>Igreja contratante é a Controladora</strong> dos dados de sua comunidade, e a {EMPRESA_LEGAL.razaoSocial} atua como <strong>Operadora</strong> (Art. 5º, VII da LGPD), tratando os dados estritamente conforme as diretrizes da Igreja Controladora.
                    </li>
                  </ul>
                </section>

                <section className="grid gap-2">
                  <h3 className="text-[17px] font-medium text-ink">3. Dados Coletados, Finalidades e Bases Legais</h3>
                  <div className="overflow-x-auto rounded-2xl ring-1 ring-line">
                    <table className="w-full text-left text-[13.5px]">
                      <thead className="bg-surface text-ink">
                        <tr>
                          <th className="p-3 font-medium">Dados</th>
                          <th className="p-3 font-medium">Finalidade</th>
                          <th className="p-3 font-medium">Base Legal (Art. 7º LGPD)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-line">
                        <tr>
                          <td className="p-3 text-ink">Nome, Igreja, Cidade, Porte (pessoas/células) e WhatsApp</td>
                          <td className="p-3">Agendar demonstração do sistema e realizar atendimento comercial solicitado pelo titular via WhatsApp.</td>
                          <td className="p-3">Consentimento (Art. 7º, I) e Procedimentos preliminares a contrato (Art. 7º, V)</td>
                        </tr>
                        <tr>
                          <td className="p-3 text-ink">Preferência de aviso LGPD (<code>localStorage</code>)</td>
                          <td className="p-3">Registrar sua ciência do aviso de privacidade no navegador para não exibi-lo repetidamente.</td>
                          <td className="p-3">Obrigação legal e Legítimo interesse (Art. 7º, II e IX)</td>
                        </tr>
                        <tr>
                          <td className="p-3 text-ink">Registros técnicos de conexão (IP, data/hora e navegador)</td>
                          <td className="p-3">Segurança da infraestrutura em nuvem, prevenção a abusos e entrega via HTTPS.</td>
                          <td className="p-3">Obrigação legal — Marco Civil da Internet (Art. 15)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-[13px]">
                    Não utilizamos cookies de rastreamento publicitário de terceiros e jamais comercializamos dados pessoais.
                  </p>
                </section>

                <section className="grid gap-2">
                  <h3 className="text-[17px] font-medium text-ink">4. Segurança, Crianças e Adolescentes (Kids) e Governança</h3>
                  <p>
                    O sistema ATOS HUB foi projetado segundo os princípios de <em>Privacy by Design</em> e <em>Security by Default</em>:
                  </p>
                  <ul className="grid gap-1.5 pl-4">
                    <li className="list-disc"><strong className="font-medium text-ink">Acesso restrito por função:</strong> Pastor, supervisor, líder de célula e guardião visualizam somente os dados necessários ao seu papel pastoral.</li>
                    <li className="list-disc"><strong className="font-medium text-ink">Proteção no módulo Kids (Art. 14 da LGPD):</strong> Os registros do ministério infantil são vinculados aos pais ou responsáveis legais por meio do Portal do Guardião e códigos seguros de check-in/check-out.</li>
                    <li className="list-disc"><strong className="font-medium text-ink">Trilha de auditoria e criptografia:</strong> Comunicações criptografadas via TLS/HTTPS (HSTS) e registro auditável de acessos e alterações.</li>
                  </ul>
                </section>

                <section className="grid gap-2">
                  <h3 className="text-[17px] font-medium text-ink">5. Compartilhamento e Retenção de Dados</h3>
                  <p>
                    Os dados são processados em infraestrutura segura de nuvem (Google Cloud / Firebase Hosting) e, quando você envia o formulário comercial, a conversa é iniciada diretamente no WhatsApp oficial da nossa equipe. Mantemos os dados comerciais apenas pelo tempo necessário ao atendimento ou até que você solicite sua eliminação.
                  </p>
                </section>
              </div>
            )}

            {tab === "termos" && (
              <div className="grid gap-6">
                <div className="rounded-2xl bg-surface p-4 ring-1 ring-line text-[13.5px] text-ink">
                  Termos e Condições Gerais de Uso do site <strong>https://atoshub.predeti.com.br</strong>, mantido por <strong>{EMPRESA_LEGAL.razaoSocial}</strong>, inscrita no CNPJ sob o nº <strong>{EMPRESA_LEGAL.cnpj}</strong>.
                </div>

                <section className="grid gap-2">
                  <h3 className="text-[17px] font-medium text-ink">1. Objeto do Site</h3>
                  <p>
                    Este site destina-se à apresentação institucional da plataforma <strong className="font-medium text-ink">ATOS HUB</strong> — sistema de cuidado com pessoas para igrejas em células — e ao agendamento de demonstrações comerciais junto à equipe da {EMPRESA_LEGAL.razaoSocial}.
                  </p>
                </section>

                <section className="grid gap-2">
                  <h3 className="text-[17px] font-medium text-ink">2. Propriedade Intelectual</h3>
                  <p>
                    Todos os direitos relativos às marcas <strong className="font-medium text-ink">ATOS HUB</strong>, <strong className="font-medium text-ink">ATOS DESK</strong> e <strong className="font-medium text-ink">PREDETI ERP</strong>, bem como logotipos, código-fonte, layout, textos e simulações interativas exibidas neste site são de titularidade exclusiva da <strong className="font-medium text-ink">{EMPRESA_LEGAL.razaoSocial} (CNPJ {EMPRESA_LEGAL.cnpj})</strong>, protegidos pelas Leis nº 9.609/1998 (Lei do Software), nº 9.610/1998 (Direitos Autorais) e nº 9.279/1996 (Propriedade Industrial).
                  </p>
                </section>

                <section className="grid gap-2">
                  <h3 className="text-[17px] font-medium text-ink">3. Condições de Uso e Contratação do Software</h3>
                  <ul className="grid gap-1.5 pl-4">
                    <li className="list-disc">As simulações animadas exibidas na página utilizam nomes e indicadores fictícios apenas para ilustrar o funcionamento da plataforma.</li>
                    <li className="list-disc">A contratação e implantação do sistema ATOS HUB por uma Igreja ou Organização são regidas por Contrato de Prestação de Serviços de Software (SaaS) e Acordo de Tratamento de Dados (DPA) próprios, firmados com a {EMPRESA_LEGAL.razaoSocial}.</li>
                    <li className="list-disc">O usuário compromete-se a fornecer dados verídicos nos canais de contato e a não praticar qualquer tentativa de intrusão, cópia não autorizada ou uso indevido do site.</li>
                  </ul>
                </section>

                <section className="grid gap-2">
                  <h3 className="text-[17px] font-medium text-ink">4. Legislação Aplicável e Foro</h3>
                  <p>
                    Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil, ficando eleito o foro da Comarca do Rio de Janeiro/RJ para dirimir quaisquer dúvidas ou litígios decorrentes deste documento.
                  </p>
                </section>
              </div>
            )}

            {tab === "direitos" && (
              <div className="grid gap-6">
                <section className="grid gap-2">
                  <h3 className="text-[17px] font-medium text-ink">Seus Direitos garantidos pelo Art. 18 da LGPD</h3>
                  <p>
                    A qualquer momento e sem nenhum custo, você pode solicitar à <strong className="font-medium text-ink">{EMPRESA_LEGAL.razaoSocial} (CNPJ {EMPRESA_LEGAL.cnpj})</strong>:
                  </p>
                  <div className="mt-2 grid gap-2.5 sm:grid-cols-2">
                    {[
                      ["Confirmação e Acesso", "Saber se tratamos dados seus e receber cópia das informações registradas."],
                      ["Correção de Dados", "Atualizar dados incompletos, inexatos ou desatualizados."],
                      ["Eliminação ou Bloqueio", "Solicitar a exclusão dos seus dados de contato comercial de nossa base."],
                      ["Revogação do Consentimento", "Retirar o consentimento dado anteriormente para comunicações comerciais."],
                    ].map(([t, d]) => (
                      <div key={t} className="rounded-2xl bg-surface p-3.5 ring-1 ring-line">
                        <div className="text-[14px] font-medium text-ink">{t}</div>
                        <div className="mt-1 text-[13px] text-muted">{d}</div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-2xl bg-surface p-5 ring-1 ring-line">
                  <h4 className="text-[16px] font-medium text-ink">Canal Direto do Titular / Encarregado de Dados (DPO)</h4>
                  <p className="mt-1 text-[13.5px]">
                    Preencha abaixo para enviar sua solicitação diretamente ao nosso Encarregado de Proteção de Dados por e-mail (<code className="text-ink">{EMPRESA_LEGAL.emailDpo}</code>) ou WhatsApp:
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <label className="grid gap-1 text-[13px] font-medium text-ink">
                      Tipo de solicitação (Art. 18 LGPD)
                      <select
                        value={tipoSolicitacao}
                        onChange={(e) => setTipoSolicitacao(e.target.value)}
                        className="rounded-xl bg-white px-3 py-2.5 text-[14px] ring-1 ring-line outline-none focus:ring-ink"
                      >
                        <option>Confirmação e acesso aos meus dados</option>
                        <option>Correção ou atualização de dados</option>
                        <option>Eliminação / exclusão dos meus dados</option>
                        <option>Revogação de consentimento</option>
                        <option>Dúvida sobre privacidade e LGPD</option>
                      </select>
                    </label>
                    <label className="grid gap-1 text-[13px] font-medium text-ink">
                      Seu nome
                      <input
                        type="text"
                        value={nomeTitular}
                        onChange={(e) => setNomeTitular(e.target.value)}
                        placeholder="Seu nome completo"
                        className="rounded-xl bg-white px-3 py-2.5 text-[14px] ring-1 ring-line outline-none focus:ring-ink"
                      />
                    </label>
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <label className="grid gap-1 text-[13px] font-medium text-ink">
                      E-mail ou WhatsApp para resposta
                      <input
                        type="text"
                        value={contatoTitular}
                        onChange={(e) => setContatoTitular(e.target.value)}
                        placeholder="Ex.: (21) 99999-9999 ou seu@email.com"
                        className="rounded-xl bg-white px-3 py-2.5 text-[14px] ring-1 ring-line outline-none focus:ring-ink"
                      />
                    </label>
                    <label className="grid gap-1 text-[13px] font-medium text-ink">
                      Observações adicionais (opcional)
                      <input
                        type="text"
                        value={detalhesTitular}
                        onChange={(e) => setDetalhesTitular(e.target.value)}
                        placeholder="Igreja ou detalhe da solicitação"
                        className="rounded-xl bg-white px-3 py-2.5 text-[14px] ring-1 ring-line outline-none focus:ring-ink"
                      />
                    </label>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    <a
                      href={linkMailDpo}
                      className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[13.5px] font-medium text-white transition hover:bg-ink/90"
                    >
                      Enviar por E-mail ({EMPRESA_LEGAL.emailDpo})
                    </a>
                    <a
                      href={linkWhatsDpo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[13.5px] font-medium text-ink ring-1 ring-line transition hover:bg-surface"
                    >
                      <WhatsIcon className="h-4 w-4 text-[#1FAF5A]" /> Enviar via WhatsApp DPO
                    </a>
                  </div>
                </section>
              </div>
            )}
          </div>

          {/* Rodapé do modal */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-surface/60 px-6 py-3.5 text-[12.5px] text-muted">
            <span>{EMPRESA_LEGAL.razaoSocial} · CNPJ: {EMPRESA_LEGAL.cnpj}</span>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-ink px-4 py-1.5 text-[13px] font-medium text-white transition hover:bg-ink/90"
            >
              Fechar
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
