
"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Scale, BookOpen, CheckCircle, XCircle, RotateCw, Shuffle, PenSquare, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Progress } from "@/components/ui";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/tabs";

const QUIZ_QUESTIONS = [
  { id: 1, question: "Quais são direitos básicos previstos no CDC?",
    options: [
      "Proteção da vida, saúde e segurança; informação adequada; proteção contra publicidade enganosa; acesso à justiça, entre outros",
      "Apenas direito de troca e reembolso imediato",
      "Somente direitos relacionados a garantia estendida",
      "Exclusivamente direitos sobre contratos bancários"
    ],
    correctIndex: 0, lawRef: "CDC, art. 6º",
    explanation: "O art. 6º do CDC elenca direitos básicos do consumidor, como proteção à vida, informação clara, educação para consumo, prevenção a publicidade enganosa e acesso à justiça."
  },
  { id: 2, question: "O que o CDC prevê quando o produto apresenta vício de qualidade?",
    options: [
      "O consumidor deve arcar com o conserto",
      "O fornecedor tem 30 dias para sanar o vício; não sanado, o consumidor pode escolher substituição, restituição ou abatimento do preço",
      "Somente troca por outro produto igual",
      "Apenas vale-compra é devido"
    ],
    correctIndex: 1, lawRef: "CDC, art. 18",
    explanation: "Se o vício não for sanado em até 30 dias, o consumidor pode optar entre substituição, restituição da quantia paga ou abatimento proporcional do preço (art. 18)."
  },
  { id: 3, question: "A oferta vincula o fornecedor?",
    options: ["Não, ofertas são apenas sugestões", "Sim, a oferta integra o contrato e deve ser cumprida", "Só vincula em promoções de TV", "Apenas quando registrada em cartório"],
    correctIndex: 1, lawRef: "CDC, arts. 30 e 35",
    explanation: "A oferta, suficientemente precisa, obriga o fornecedor. O descumprimento permite exigir o cumprimento forçado, aceitar equivalente ou rescindir com restituição (arts. 30 e 35)."
  },
  { id: 4, question: "Qual é o prazo para reclamar de vício aparente em produto não durável?",
    options: ["30 dias", "90 dias", "7 dias", "15 dias"],
    correctIndex: 0, lawRef: "CDC, art. 26, I",
    explanation: "Para bens não duráveis, o prazo é de 30 dias; para duráveis, 90 dias. O prazo conta do recebimento do produto (art. 26)."
  },
  { id: 5, question: "Direito de arrependimento em compras fora do estabelecimento?",
    options: ["Não existe no Brasil", "7 dias a partir do recebimento ou assinatura, com devolução de valores", "Somente 24 horas após a compra", "Apenas se o produto for importado"],
    correctIndex: 1, lawRef: "CDC, art. 49",
    explanation: "No prazo de 7 dias, o consumidor pode desistir da compra realizada fora do estabelecimento (internet, telefone), com devolução imediata dos valores (art. 49)."
  },
  { id: 6, question: "É válida cláusula contratual que coloca o consumidor em desvantagem exagerada?",
    options: ["Sim, se assinado", "Não, é nula de pleno direito", "Depende do valor", "Somente em serviços públicos"],
    correctIndex: 1, lawRef: "CDC, art. 51",
    explanation: "Cláusulas abusivas que coloquem o consumidor em desvantagem exagerada são nulas de pleno direito (art. 51)."
  },
  { id: 7, question: "Prática de vender produto sem informar claramente preço e características é…",
    options: ["Permitida, se o produto for popular", "Prática abusiva por falha de informação", "Aceitável em marketplaces", "Permitida quando o site é internacional"],
    correctIndex: 1, lawRef: "CDC, arts. 6º, III e 31",
    explanation: "Informação adequada, clara e ostensiva é direito básico. A falta configura prática abusiva (arts. 6º, III e 31)."
  },
  { id: 8, question: "Cobrança de dívida com constrangimento ou ameaça é…",
    options: ["Permitida para agilizar pagamento", "Proibida como prática abusiva", "Obrigatória antes de negativar", "Apenas antiética, mas legal"],
    correctIndex: 1, lawRef: "CDC, art. 42",
    explanation: "O CDC veda métodos de cobrança que exponham o consumidor ao ridículo ou ameaça/coação (art. 42)."
  }
];

const FLASHCARDS_DEFAULT = [
  { front: "Art. 6º – Direitos Básicos", back: "Vida/saúde/segurança, informação clara, educação para consumo, proteção contra publicidade enganosa e abusiva, acesso à justiça." },
  { front: "Art. 18 – Vício do Produto/Serviço", back: "Prazo de 30 dias para sanar vício; depois, escolha do consumidor: substituição, restituição ou abatimento do preço." },
  { front: "Art. 30 e 35 – Oferta e Descumprimento", back: "Oferta vincula o fornecedor. Não cumpriu? Consumidor pode exigir cumprimento, aceitar equivalente ou rescindir com devolução." },
  { front: "Art. 26 – Prazos para Reclamar", back: "Não duráveis: 30 dias. Duráveis: 90 dias. Conta do recebimento/entrega do serviço." },
  { front: "Art. 49 – Arrependimento", back: "7 dias para desistir de compra fora do estabelecimento, com devolução dos valores." },
  { front: "Art. 51 – Cláusulas Abusivas", back: "São nulas de pleno direito as cláusulas que coloquem o consumidor em desvantagem exagerada ou contrariem a boa-fé." }
];

const POEMAS_BASE = [
  { lei: "CDC, art. 6º", tema: "direitos básicos", resumo: "Proteção à vida e à informação; clareza e segurança no consumo; justiça acessível e respeito ao cidadão." },
  { lei: "CDC, art. 18", tema: "vício do produto", resumo: "Se o vício persiste, a escolha é tua: trocar, devolver ou abater — a lei te ampara na rua." },
  { lei: "CDC, arts. 30/35", tema: "oferta e cumprimento", resumo: "Palavra dada é contrato. Oferta não é promessa vazia: é dever firmado na via." },
  { lei: "CDC, art. 49", tema: "arrependimento", resumo: "Sete dias para pensar, sem pressa nem aperto: voltar atrás é direito certo." },
  { lei: "CDC, art. 51", tema: "cláusulas abusivas", resumo: "Não vale o que oprime, nem cláusula que humilha: ao consumidor, justiça brilha." },
  { lei: "CDC, art. 42", tema: "cobrança", resumo: "Cobrar sem constranger, exigir sem ameaçar: respeito é regra que a lei faz valer." }
];

function shuffleArray(a) {
  const arr = [...a];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function Header() {
  return (
    <div className="w-full">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-5xl">
        <div className="mt-6 grid gap-3 rounded-2xl bg-gradient-to-r from-rose-100 via-pink-50 to-rose-100 p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                <span className="inline-flex items-center gap-2">
                  <Heart className="h-6 w-6" />
                  Estudos da Aline — Direito do Consumidor
                </span>
              </h1>
              <p className="muted mt-1">Feito com carinho, sob medida para a Aline brilhar nas provas ✨</p>
            </div>
            <Badge className="rounded-xl px-3 py-1 text-sm flex items-center gap-1">
              <Scale className="h-4 w-4" /> CDC
            </Badge>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function QuizSection() {
  const [questions, setQuestions] = useState(() => shuffleArray(QUIZ_QUESTIONS));
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[current];
  const progress = Math.round((current / questions.length) * 100);

  function selectOption(index) {
    if (selected !== null) return;
    setSelected(index);
    if (index === q.correctIndex) setScore(s => s + 1);
  }

  function next() {
    if (current + 1 < questions.length) {
      setCurrent(c => c + 1);
      setSelected(null);
    } else {
      setDone(true);
    }
  }

  function restart() {
    setQuestions(shuffleArray(QUIZ_QUESTIONS));
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setDone(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" /> Quiz — Pratique com questões do CDC
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={done ? 100 : progress} />
        {!done ? (
          <div className="space-y-3">
            <div className="text-sm muted">{q.lawRef}</div>
            <h3 className="text-lg font-medium">{q.question}</h3>
            <div className="grid gap-2">
              {q.options.map((opt, i) => {
                const isCorrect = i === q.correctIndex;
                const isSelected = selected === i;
                const variant = selected === null ? "secondary" : (isSelected && isCorrect ? "primary" : (isSelected ? "destructive" : "secondary"));
                return (
                  <Button key={i} variant={variant} className="justify-start h-auto whitespace-normal text-left rounded-xl" onClick={() => selectOption(i)} disabled={selected !== null}>
                    <span className="flex items-start gap-2">
                      {selected !== null && isSelected && isCorrect && <CheckCircle className="h-5 w-5" />}
                      {selected !== null && isSelected && !isCorrect && <XCircle className="h-5 w-5" />}
                      <span>{opt}</span>
                    </span>
                  </Button>
                );
              })}
            </div>
            {selected !== null && (
              <div className="rounded-xl bg-gray-50 p-3 text-sm">
                <strong>Explicação:</strong> {q.explanation}
              </div>
            )}
            <div className="flex items-center justify-between pt-2">
              <div className="text-sm muted">Pontuação: {score}/{questions.length}</div>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={restart}><RotateCw className="h-4 w-4 mr-1" /> Reiniciar</Button>
                <Button onClick={next} disabled={selected === null}>Próxima</Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-center">
              <div className="text-2xl font-semibold">Parabéns, Aline! 🎉</div>
              <p className="muted mt-1">Você acertou {score} de {questions.length} questões.</p>
            </div>
            <div className="flex justify-center">
              <Button onClick={restart}><RotateCw className="h-4 w-4 mr-1" /> Fazer novamente</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function FlashcardsSection() {
  const [cards, setCards] = useState(FLASHCARDS_DEFAULT);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [mastered, setMastered] = useState({});
  const [newFront, setNewFront] = useState("");
  const [newBack, setNewBack] = useState("");

  const total = cards.length;
  const current = cards[index];

  function next(){ setFlipped(false); setIndex(i => (i + 1) % total); }
  function prev(){ setFlipped(false); setIndex(i => (i - 1 + total) % total); }
  function toggleMastered(){ setMastered(m => ({ ...m, [index]: !m[index] })); }
  function addCard(){
    if(!newFront.trim() || !newBack.trim()) return;
    setCards(c => [...c, { front: newFront.trim(), back: newBack.trim() }]);
    setNewFront(""); setNewBack("");
  }
  const masteredCount = Object.values(mastered).filter(Boolean).length;

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Shuffle className="h-5 w-5" /> Flashcards — Memorize os pontos-chave</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4">
            <div className="w-full flex justify-between text-sm muted">
              <span>Cartão {index + 1}/{total} {mastered[index] && <Badge className="ml-2">Dominado</Badge>}</span>
              <span>Dominados: {masteredCount}/{total}</span>
            </div>
            <motion.div key={`${index}-${flipped}`} initial={{ rotateY: 0, opacity: 0.9 }} animate={{ rotateY: flipped ? 180 : 0, opacity: 1 }} transition={{ duration: 0.4 }} className="w-full cursor-pointer select-none" onClick={() => setFlipped(f => !f)}>
              <div className="relative h-40 md:h-48 w-full rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 p-4 shadow">
                {!flipped ? (
                  <div className="h-full flex items-center justify-center text-center"><span className="text-lg font-medium">{current.front}</span></div>
                ) : (
                  <div className="h-full flex items-center justify-center text-center"><span className="text-base">{current.back}</span></div>
                )}
                <div className="absolute top-3 right-3 text-xs muted">Clique para virar</div>
              </div>
            </motion.div>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={prev}>Anterior</Button>
              <Button onClick={next}>Próximo</Button>
              <Button variant={mastered[index] ? "primary" : "outline"} onClick={toggleMastered}><CheckCircle className="h-4 w-4 mr-1" /> Marcar dominado</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><PenSquare className="h-5 w-5" /> Adicionar flashcard personalizado</CardTitle></CardHeader>
        <CardContent className="grid gap-3">
          <input className="border rounded-xl px-3 py-2" placeholder="Frente (ex.: Art. 39 – Práticas abusivas)" value={newFront} onChange={e => setNewFront(e.target.value)} />
          <textarea className="border rounded-xl px-3 py-2" placeholder="Verso (resumo do artigo, conceito, exemplo)" value={newBack} onChange={e => setNewBack(e.target.value)} />
          <div><Button onClick={addCard}>Adicionar</Button></div>
        </CardContent>
      </Card>
    </div>
  );
}

function PoemaSection() {
  const dayIndex = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const diff = Math.floor((now - start) / (1000 * 60 * 60 * 24));
    return diff % POEMAS_BASE.length;
  }, []);

  const item = POEMAS_BASE[dayIndex];

  const poema = useMemo(() => {
    const linhas = [
      `Aline, na trilha do justo saber,`,
      `no ${item.lei}, a luz pra te defender;`,
      `${item.resumo}`,
      `consumir com consciência é teu poder.`
    ];
    return linhas.join("\\n");
  }, [item]);

  return (
    <Card>
      <CardHeader><CardTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5" /> Poema do dia — {item.lei} ({item.tema})</CardTitle></CardHeader>
      <CardContent>
        <pre className="leading-relaxed text-base md:text-lg bg-gray-50 rounded-xl p-4">{poema}</pre>
        <p className="text-xs muted mt-2">Dica: leia em voz alta e tente explicar o artigo em uma frase — isso fixa muito!</p>
      </CardContent>
    </Card>
  );
}

export default function AlineCDCApp() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-5xl p-4 md:p-6">
        <Tabs defaultValue="quiz">
          <TabsList>
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
            <TabsTrigger value="flash">Flashcards</TabsTrigger>
            <TabsTrigger value="poema">Poema diário</TabsTrigger>
          </TabsList>
          <TabsContent value="quiz">
            <QuizSection />
          </TabsContent>
          <TabsContent value="flash">
            <FlashcardsSection />
          </TabsContent>
          <TabsContent value="poema">
            <PoemaSection />
          </TabsContent>
        </Tabs>
        <footer className="mt-10 text-center text-sm muted">
          Feito para <strong>Aline</strong> com foco em <strong>Direito do Consumidor</strong>. ✍️
        </footer>
      </main>
    </div>
  );
}
