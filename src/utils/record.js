import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy
} from "firebase/firestore";
import { db } from "./firebase";

/**
 * Lưu kết quả người chơi
 */
export async function saveRecord(name, money) {
  await addDoc(collection(db, "rankings"), {
    name,
    money,
    date: new Date().toISOString()
  });
}

/**
 * Lấy lịch sử / bảng xếp hạng
 */
export async function getRecord() {
  const q = query(
    collection(db, "rankings"),
    orderBy("date", "desc")
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data());
}

