import { prize } from "../data/prize";

export default function MoneyBoard({ current }) {
  return (
    <div style={{ width: 250 }}>
      {prize.map((m, i) => (
        <div
          key={i}
          style={{
            padding: 8,
            background: current === i ? "#ffd700" : "#003566",
            color: current === i ? "#000" : "#ffd700",
            marginBottom: 4,
            borderRadius: 6
          }}
        >
          Câu {i + 1}: {m.toLocaleString()} VND
        </div>
      ))}
    </div>
  );
}
