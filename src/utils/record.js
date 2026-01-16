export function saveRecord(name, money) {
  const old = JSON.parse(localStorage.getItem("record")) || [];
  old.push({
    name,
    money,
    date: new Date().toISOString()
  });
  localStorage.setItem("record", JSON.stringify(old));
}

export function getRecord() {
  return JSON.parse(localStorage.getItem("record")) || [];
}
