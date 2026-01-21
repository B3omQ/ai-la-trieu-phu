import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./firebase";

/**
 * LƯU RECORD (GAME OVER)
 */
export async function saveRecord(name, money, time) {
  await addDoc(collection(db, "rankings"), {
    name,
    money: Number(money),
    time: Number(time), // ⏱️ thời gian làm bài (giây)
    date: new Date().toISOString()
  });
}

export async function getRecord() {
  const records = []; // lấy từ Firebase hoặc local

  // 🔥 SORT: tiền cao → nhanh hơn
  records.sort((a, b) =>
    b.money !== a.money
      ? b.money - a.money
      : a.time - b.time
  );

  return records;
}

/**
 * LISTEN REALTIME RECORDS
 */
export function listenRecords(callback) {
  const q = query(
    collection(db, "rankings"),
    orderBy("date", "desc")
  );

  return onSnapshot(q, snapshot => {
    const data = snapshot.docs.map(doc => {
      const d = doc.data();
      return {
        name: d.name || "Unknown",
        money: Number(d.money || 0),
        date: d.date || null ,  
        time : d.time,
      };
    });

    callback(data);
  });
}
