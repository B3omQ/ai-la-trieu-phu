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
    if (i === q.answer) {
      setMoney(prize[current]);
      if (current === 9) finish(prize[current]);
      else {
        setCurrent(current + 1);
        setHiddenOptions([]);
      }
    } else finish(money);
  }

  function finish(finalMoney) {
    saveRecord(player, finalMoney);
    setGameOver(true);
  }

  if (gameOver)
  return (
  <div className="game end-screen">
    <h1>🎉 KẾT THÚC</h1>
    <h2>{player} đạt {money.toLocaleString()} VND</h2>
    <button className="answer" onClick={() => location.href = "/"}>
      Về trang đầu
    </button>
  </div>
);


  return (
    <div style={{ display: "flex", gap: 20 }}>
      <MoneyBoard current={current} />

      <div className="game">
        <Timer key={current} onTimeout={() => finish(money)} />

        <div className="question-box">
          <h2>{q.question}</h2>
        </div>

        <div className="answers">
          {q.options.map((o, i) =>
            hiddenOptions.includes(i) ? null : (
              <button
                key={i}
                className="answer"
                onClick={() => chooseAnswer(i)}
              >
                {String.fromCharCode(65 + i)}. {o}
              </button>
            )
          )}
        </div>

        <Lifelines
          used={used}
          use5050={() => {
            const wrong = q.options
              .map((_, i) => i)
              .filter(i => i !== q.answer)
              .sort(() => Math.random() - 0.5)
              .slice(0, 2);
            setHiddenOptions(wrong);
            setUsed({ ...used, fifty: true });
          }}
          useChange={() => setUsed({ ...used, change: true })}
          useCall={() => {
            alert(`📞 Người thân nghĩ là: ${q.options[q.answer]}`);
            setUsed({ ...used, call: true });
          }}
        />
      </div>
    </div>
  );
}
