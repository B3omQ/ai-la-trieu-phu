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
    <div className="game safe">
      <h1>🏆 BẢNG XẾP HẠNG</h1>

      {data.length === 0 && <p>Chưa có dữ liệu</p>}

      <div className="records-list">
        {data.map((r, i) => (
          <div key={r.id || i} className="record-row">
            <b>#{i + 1}</b> {r.name} – {Number(r.money).toLocaleString()} VND –{" "}
            {r.date ? formatDate(r.date) : "N/A"}
          </div>
        ))}
      </div>

      <button className="answer" onClick={() => nav("/")} style={{ marginTop: '20px' }}>
        Quay lại
      </button>
    </div>
  );
}