// Textos e dados das simulações do site ATOS HUB

export const PESSOAS = [
  { nome: "Ana Paula Costa", cor: "#F5A524" },
  { nome: "Marcos Ribeiro", cor: "#1FAF7A" },
  { nome: "Juliana Freitas", cor: "#3B82F6" },
  { nome: "Pr. Ricardo Lima", cor: "#8B5CF6" },
  { nome: "Thiago Moura", cor: "#EF5A4C" },
  { nome: "Beatriz Santos", cor: "#0EA5E9" },
  { nome: "Daniel Souza", cor: "#D97706" },
  { nome: "Camila Rocha", cor: "#16A34A" },
  { nome: "Felipe Andrade", cor: "#DB2777" },
  { nome: "Larissa Nunes", cor: "#7C3AED" },
];

export const CELULAS = [
  { nome: "Célula Família Lima", lider: "Marcos", rede: "Rede Verde", total: 14, cor: "#1FAF7A" },
  { nome: "Célula Jovens Méier", lider: "Juliana", rede: "Rede Azul", total: 18, cor: "#3B82F6" },
  { nome: "Célula Casais Tijuca", lider: "Thiago", rede: "Rede Verde", total: 12, cor: "#F5A524" },
  { nome: "Célula Mulheres de Fé", lider: "Camila", rede: "Rede Lilás", total: 16, cor: "#8B5CF6" },
  { nome: "Célula Universitários", lider: "Felipe", rede: "Rede Azul", total: 11, cor: "#EF5A4C" },
];

// Pessoas sob o acompanhamento do cuidado pastoral
export const CUIDADO = [
  { nome: "Ana Paula Costa", st: "ok", txt: "Presente na célula esta semana" },
  { nome: "Daniel Souza", st: "atencao", txt: "Faltou 2 encontros seguidos" },
  { nome: "Larissa Nunes", st: "acolher", txt: "Pediu oração pela família" },
  { nome: "Felipe Andrade", st: "afastado", txt: "Sem vir à célula há 4 semanas" },
  { nome: "Beatriz Santos", st: "ok", txt: "Começou a servir no Kids" },
];

export const VISITANTES = [
  { nome: "Ana Paula Costa", bairro: "Méier", celula: "Célula Jovens Méier", lider: "Juliana", dist: "1,2 km", espera: "00:42" },
  { nome: "Rodrigo Teixeira", bairro: "Tijuca", celula: "Célula Casais Tijuca", lider: "Thiago", dist: "800 m", espera: "01:15" },
  { nome: "Priscila Gomes", bairro: "Vila Isabel", celula: "Célula Mulheres de Fé", lider: "Camila", dist: "2,0 km", espera: "00:18" },
];

// Pilares que aparecem em cartões (os três primeiros têm seção própria)
export const PILARES_CARTOES = [
  {
    i: "hands", t: "Voluntariado", s: "Servir com alegria, sem sobrecarga",
    d: "Organize ministérios, escalas e equipes. Cada voluntário sabe onde servir, e nenhum líder carrega tudo sozinho.",
    mini: "escala",
  },
  {
    i: "music", t: "Cultos e eventos", s: "Tudo pronto antes de começar",
    d: "Ordem de culto, programação e eventos organizados, com a equipe alinhada antes de as portas abrirem.",
    mini: "culto",
  },
  {
    i: "kids", t: "Kids", s: "Segurança para as famílias",
    d: "Os ministérios infantis são organizados em um ambiente seguro, e pais e responsáveis acompanham tudo pelo Portal da Família.",
    mini: "kids",
  },
  {
    i: "chart", t: "Relatórios", s: "Decisões com clareza",
    d: "Pastores e conselhos enxergam o crescimento, a presença e o engajamento por igreja, rede e célula.",
    mini: "relatorio",
  },
];

export const PERFIS = [
  {
    t: "Pastores e conselhos", d: "A visão da igreja inteira, de todas as sedes e redes.",
    painel: "Dashboard de Insights · Geral",
    itens: [["Sedes", "3"], ["Redes", "8"], ["Células ativas", "1.042"], ["Presença na semana", "86%"]],
    grad: "from-[#FFE7BF] via-[#FFF6E6] to-[#DCE9FF]",
  },
  {
    t: "Coordenadores e supervisores", d: "Acompanham redes, núcleos e lideranças sem perder detalhes.",
    painel: "SLA e Qualidade de Atendimento · Leads",
    itens: [["SLA Médio", "18h"], ["Leads aguardando", "28"], ["Células ativas", "214"], ["Novos membros/mês", "268"]],
    grad: "from-[#D4F5E6] via-[#F2FBF6] to-[#DCE9FF]",
  },
  {
    t: "Líderes de célula", d: "Sabem quem está chegando, quem faltou e quem precisa de uma visita.",
    painel: "Gestão do Líder · Célula Conexão",
    itens: [["Solicitações", "2 pendentes"], ["Roteiros ativos", "4 disponíveis"], ["Encontro", "Sexta · 20h"], ["Membros", "14 frequentes"]],
    grad: "from-[#EDE4FF] via-[#F7F3FF] to-[#FFE7BF]",
  },
  {
    t: "Membros e famílias", d: "Encontram sua célula, seu ministério e seu lugar.",
    painel: "Portal do Membro & Família",
    itens: [["Sua célula", "Conexão de Vida"], ["Ministério", "Voluntariado"], ["Kids", "QR Entrada Ativo"], ["Cursos", "Em andamento"]],
    grad: "from-[#DCE9FF] via-[#F2F6FF] to-[#D4F5E6]",
  },
];

export const PROTECAO = [
  { i: "lock", t: "Níveis de acesso por função", d: "Pastor, supervisor, líder e equipe de cuidado enxergam só o que precisam para cuidar." },
  { i: "history", t: "Auditoria", d: "Registro de quem acessou e alterou cada informação, e quando." },
  { i: "shield", t: "Adequação à LGPD", d: "Recursos para consentimento, correção e exclusão de dados pessoais." },
];
