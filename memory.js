// ফায়ারবেস ডাটাবেস ব্যবহার করে ইউজারের ডাটা সেভ বা লোড করার জন্য
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore();

export async function saveUserData(uid, data) {
    await setDoc(doc(db, "users", uid), data);
}
