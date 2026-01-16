import { getRecord } from "../utils/record";
import { useNavigate } from "react-router-dom";

export default function Records() {
  const data = getRecord();
  const nav = useNavigate();

  return (
    <div className="game">
      <h1>🏆 BẢNG XẾP HẠNG</h1>

      {data.length === 0 && <p>Chưa có dữ liệu</p>}

      {data.map((r, i) => (
        <div key={i}>
          {r.name} – {r.money.toLocaleString()} VND
        </div>
      ))}

      <br />
      <button onClick={() => nav("/")}>Quay lại</button>
    </div>
  );
}
