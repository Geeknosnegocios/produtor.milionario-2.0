import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Preciso saber programar ou usar IA avançada?",
    answer: "Não. Os comandos fazem o trabalho. Você só copia, cola e ajusta o resultado. A aula 1.4 instala tudo no seu PC em 15 min."
  },
  {
    question: "Em quanto tempo lanço meu produto?",
    answer: "Seguindo o método com Claude: 1 hora pra ter produto vendendo. Os 7 comandos fazem 99% do trabalho · você apenas orquestra. Aluno que executa todos os comandos sai com produto no ar."
  },
  {
    question: "Por que Claude e não ChatGPT?",
    answer: "ChatGPT é generalista · bom pra todo mundo. Claude é especialista · IA mais avançada do mercado, criada nos EUA. Mais precisa pra copy, mais consistente pra estrutura. ChatGPT brinca. Claude entrega produto vendendo. Claude tem versão grátis (claude.ai) · você não paga nada extra."
  },
  {
    question: "Quais ferramentas vou precisar?",
    answer: "Claude grátis (claude.ai) · IA principal do método. ChatGPT grátis (opcional). Conta Cakto (grátis pra criar produto). Conta Vercel (grátis pra publicar página). Tudo está no Módulo 1."
  },
  {
    question: "Funciona pra qualquer nicho?",
    answer: "Sim. Já validamos em: emagrecimento, finanças, relacionamento, concursos, design, fitness, espiritualidade, idiomas. A skill /pesquisar-nicho mostra se seu nicho dá dinheiro AGORA."
  },
  {
    question: "Já tenho um produto. Vale a pena?",
    answer: "Vale mais ainda. Você vai refazer copy (com IA), página (com 1 comando), criativos (17 ângulos). Aluno que já tinha produto cresceu 3-5x em 30 dias."
  },
  {
    question: "R$247 cabe em quantas vezes?",
    answer: "12x de R$20,59 sem juros no cartão. Pix à vista R$247,00. Acesso liberado em 1 minuto após confirmação."
  },
  {
    question: "E se eu desistir nos primeiros dias?",
    answer: "Você tem 7 dias de arrependimento garantido por lei (Art. 49 CDC). Cancela direto no painel do aluno, responde 3 perguntas, confirma pelo celular. Sem ligação. Sem perguntas. Devolução em 5 dias úteis."
  },
  {
    question: "E depois dos 7 dias?",
    answer: "Garantia se estende até 30 dias COM uma condição: você executar o método. Print de instalação (Módulo 1), link da página criada (Módulo 4), print de tentativa de venda. Executou e não funcionou? Devolvemos 100%. Não executou? Não devolvemos. Aqui não tem malandragem."
  },
  {
    question: "E se eu executar tudo e mesmo assim não vender?",
    answer: "Aí entra a garantia mais forte: garantia de RESULTADO. NÃO devolvemos dinheiro · entregamos: Sessão 1:1 com o Geek (R$297) + Vaga gratuita na próxima Mentoria + Atualizações vitalícias. Você sai com produto vendendo, não com dinheiro de volta."
  },
  {
    question: "O acesso é vitalício mesmo?",
    answer: "Sim. Acesso vitalício + todas as atualizações futuras inclusas. Sem mensalidade. Sem renovação. Compra uma vez, fica seu pra sempre."
  }
];

const FAQSection = () => {
  return (
    <section className="py-20 md:py-32 px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px]" />

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-blue-500/30 mb-6">
            <HelpCircle className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-blue-300">Perguntas Frequentes</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
            Perguntas Frequentes · <span className="gradient-text">Tira Suas Dúvidas</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            sobre Claude, garantia e método PIPE-IA
          </p>
        </div>

        <div className="relative animate-slide-up" style={{ animationDelay: "100ms" }}>
          <div className="absolute -inset-[1px] bg-gradient-to-br from-blue-500/30 via-blue-500/30 to-blue-500/30 rounded-3xl" />

          <div className="relative glass-card rounded-3xl p-6 md:p-10">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-white/5 rounded-xl px-6 data-[state=open]:border-blue-500/30 data-[state=open]:bg-white/[0.02] transition-all duration-300"
                >
                  <AccordionTrigger className="text-left text-base md:text-lg font-semibold hover:text-blue-400 hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
