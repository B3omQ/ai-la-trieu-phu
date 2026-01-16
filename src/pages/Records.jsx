import { getRecord } from "../utils/record";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Records() {
  const [data, setData] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    getRecord().then(setData);
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
      <h1>Rankings</h1>

      {data.length === 0 && <p>Chưa có dữ liệu</p>}

      {data.map((r, i) => (
  <div key={i}>
    {r?.name || "Unknown"} –{" "}
    {Number(r?.money || 0).toLocaleString()} VND –{" "}
    {r?.date ? formatDate(r.date) : "N/A"}
  </div>
))}


      <button className="answer" onClick={() => nav("/")}>
        Quay lại
      </button>
    </div>
  );
}

