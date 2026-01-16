export function getRandomQuestions(all, count = 10) {
  return [...all]
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
}
