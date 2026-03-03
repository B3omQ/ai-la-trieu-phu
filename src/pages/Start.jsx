import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Start() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  function startGame() {
    if (!name.trim()) return alert("Nhập tên trước!");
    localStorage.setItem("player", name);
    navigate("/game");
  }

  return (
    <div className="game">
      <h1 className="title">AI LÀ TRIỆU PHÚ</h1>

      <input
        className="input-field"
        placeholder="Nhập tên người chơi..."
        value={name}
        onChange={e => setName(e.target.value)}
        onKeyDown={e => e.key === "Enter" && startGame()}
      />
      <button className="btn-start" onClick={startGame}>
        BẮT ĐẦU CHƠI
      </button>
      <button className="btn-start" onClick={() => navigate("/records")} style={{ fontSize: '16px', padding: '10px 20px', marginTop: '20px' }}>
        Xem Ranking
      </button>
    </div>
  );
}
