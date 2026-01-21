import { useEffect, useState } from "react";

export default function Timer({ onTimeout, onTick }) {
  const [time, setTime] = useState(30);

  useEffect(() => {
    if (time === 0) {
      onTimeout();
      return;
    }
    
    onTick?.(30 - time);
    const t = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(t);
  }, [time]);

  return (
    <div style={{ textAlign: "center", fontSize: 24 }}>
      <span className={`time ${time <= 5 ? "danger" : time <= 10 ? "warning" : "safe"}`}>
          {time}
      </span>
    </div>
  );
}
