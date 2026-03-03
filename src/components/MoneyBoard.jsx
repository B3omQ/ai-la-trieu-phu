import { prize } from "../data/prize";

export default function MoneyBoard({ current }) {
  // Reversing the array to show highest value at top
  const totalQuestions = prize.length;

  return (
    <div className="money-board">
      {prize.map((m, index) => {
        let statusClass = "upcoming";
        if (index === current) statusClass = "active";
        else if (index < current) statusClass = "passed";

        const isMilestone = index === 4 || index === 9 || index === 14;
        const milestoneClass = isMilestone ? "milestone" : "";

        return (
          <div
            key={index}
            className={`money-item ${statusClass} ${milestoneClass}`}
          >
            <span>{index + 1}</span>
            <span>{m.toLocaleString()}</span>
          </div>
        );
      })}
    </div>
  );
}
