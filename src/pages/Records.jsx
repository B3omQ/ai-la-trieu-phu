import { listenRecords } from "../utils/record";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../App.css";

export default function Records() {
  const [data, setData] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const unsubscribe = listenRecords((records) => {
      // 🔥 SORT Ở ĐÂY
      records.sort((a, b) =>
        b.money !== a.money
          ? b.money - a.money
          : new Date(a.date) - new Date(b.date)
      );

      setData(records);
    });

    return () => unsubscribe();
  }, []);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="game">
      <h1 className="title" style={{ fontSize: '40px' }}>🏆 BẢNG XẾP HẠNG</h1>

      {data.length === 0 && <p style={{ color: 'var(--gold)' }}>Chưa có dữ liệu</p>}

      <div className="records-list" style={{ width: '100%', maxWidth: '600px', textAlign: 'left', background: 'var(--blue-base)', border: '2px solid var(--gold)', borderRadius: '20px', padding: '20px', boxShadow: '0 0 15px var(--gold-glow)' }}>
        {data.map((r, i) => (
          <div key={r.id || i} className="record-row" style={{ color: 'var(--text-primary)', padding: '10px', borderBottom: i < data.length - 1 ? '1px solid rgba(255,184,0,0.3)' : 'none', fontSize: '18px' }}>
            <b style={{ color: 'var(--gold)', marginRight: '10px' }}>#{i + 1}</b>
            {r.name} <span style={{ float: 'right', color: 'var(--green)', fontWeight: 'bold' }}>{Number(r.money).toLocaleString()} VND</span>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>{r.date ? formatDate(r.date) : "N/A"}</div>
          </div>
        ))}
      </div>

      <button className="btn-start" onClick={() => nav("/")} style={{ marginTop: '30px' }}>
        QUAY LẠI
      </button>
    </div>
  );
}