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
        placeholder="Nhập tên người chơi"
        value={name}
        onChange={e => setName(e.target.value)}
        style={{ padding: 10, fontSize: 18 }}
      />
      <button className="answer" onClick={startGame}>
        BẮT ĐẦU CHƠI
      </button>
      <button className="answer" onClick={() => navigate("/records")}>
        Xem bảng xếp hạng
      </button>
    </div>
  );
}
