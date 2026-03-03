import { useEffect, useState } from "react";

export default function Timer({ onTimeout, onTick, pause }) {
  const [time, setTime] = useState(30);

  useEffect(() => {
    if (pause) return; // Do not countdown if paused

    if (time === 0) {
      onTimeout();
      return;
    }

    onTick?.(30 - time);
    const t = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(t);
  }, [time, pause, onTimeout, onTick]);

  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
      <div className={`time ${time <= 5 ? "danger" : time <= 10 ? "warning" : "safe"}`}>
        {time}
      </div>
    </div>
  );
}
