import { useEffect, useState } from "react";
import Timer from "../components/Timer";
import Lifelines from "../components/Lifelines";
import MoneyBoard from "../components/MoneyBoard";
import { prize } from "../data/prize";
import { getRandomQuestions } from "../utils/getRandom";
import { saveRecord } from "../utils/record";

export default function Game() {
  const player = localStorage.getItem("player");

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [money, setMoney] = useState(0);
  const [hiddenOptions, setHiddenOptions] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  // States for animation and reveal logic
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);

  // ⏱️ tổng thời gian đã chơi (giây)
  const [duration, setDuration] = useState(0);

  const [used, setUsed] = useState({
    fifty: false,
    change: false,
    call: false
  });

  useEffect(() => {
    fetch("/questions.json")
      .then(r => r.json())
      .then(d => setQuestions(getRandomQuestions(d, 10)));
  }, []);

  if (!player) return <h2>Chưa nhập tên!</h2>;
  if (!questions.length) return <h2>Loading...</h2>;

  const q = questions[current];

  function chooseAnswer(i) {
    if (selectedAnswer !== null) return; // Prevent multiple clicks

    setSelectedAnswer(i);

    // Lock in answer (Orange) for 0.3s, then reveal
    setTimeout(() => {
      setIsRevealed(true);

      // Wait another 0.7s to show correct/wrong state before moving on
      setTimeout(() => {
        if (i === q.answer) {
          setMoney(prize[current]);
          if (current === 9) {
            finish(prize[current]);
          } else {
            setCurrent(current + 1);
            setHiddenOptions([]);
            setSelectedAnswer(null);
            setIsRevealed(false);
          }
        } else {
          finish(money);
        }
      }, 700);
    }, 300);
  }

  function finish(finalMoney) {
    setMoney(finalMoney);
    saveRecord(player, finalMoney, duration);
    setGameOver(true);
  }

  if (gameOver) {
    return (
      <div className="game end-screen">
        <h1 className="title">KẾT THÚC</h1>
        <h2 className="end-prizes">
          {player} đạt {money.toLocaleString()} VND
        </h2>

        <button
          className="btn-start"
          onClick={() => (window.location.href = "/")}
        >
          VỀ TRANG CHỦ
        </button>
      </div>
    );
  }

  const getAnswerClass = (index) => {
    let baseClass = "answer ";
    if (selectedAnswer === index && !isRevealed) {
      baseClass += "selected";
    } else if (isRevealed) {
      if (index === q.answer) {
        baseClass += "correct";
      } else if (selectedAnswer === index) {
        baseClass += "wrong";
      }
    }
    return baseClass.trim();
  };

  return (
    <div style={{ display: "flex", gap: 20, width: "100%", justifyContent: "center" }}>
      <div className="game" style={{ flex: 1, minHeight: 'auto' }}>
        <Timer
          key={current}
          onTimeout={() => finish(money)}
          onTick={setDuration}
          pause={selectedAnswer !== null}
        />

        <div className="question-box">
          {q.question}
        </div>

        <div className="answers">
          {q.options.map((o, i) =>
            hiddenOptions.includes(i) ? <div key={i} /> : (
              <button
                key={i}
                className={getAnswerClass(i)}
                onClick={() => chooseAnswer(i)}
                disabled={selectedAnswer !== null}
              >
                <span className="answer-letter">{String.fromCharCode(65 + i)}:</span> {o}
              </button>
            )
          )}
        </div>

        <Lifelines
          used={used}
          disabled={selectedAnswer !== null}
          use5050={() => {
            const wrong = q.options
              .map((_, i) => i)
              .filter(i => i !== q.answer)
              .sort(() => Math.random() - 0.5)
              .slice(0, 2);

            setHiddenOptions(wrong);
            setUsed({ ...used, fifty: true });
          }}
          useChange={() => {
            fetch("/questions.json")
              .then((r) => r.json())
              .then((d) => {
                // Find a question not currently in our 10 questions and swap
                const newPool = d.filter(q => !questions.some(existing => existing.question === q.question));
                const replacement = newPool[Math.floor(Math.random() * newPool.length)];

                const newQuestions = [...questions];
                newQuestions[current] = replacement;

                setQuestions(newQuestions);
                setHiddenOptions([]);
                setUsed({ ...used, change: true });
              });
          }}
          useCall={() => {
            alert(`📞 Người thân nghĩ là: ${q.options[q.answer]}`);
            setUsed({ ...used, call: true });
          }}
        />
      </div>

      <MoneyBoard current={current} />
    </div>
  );
}
