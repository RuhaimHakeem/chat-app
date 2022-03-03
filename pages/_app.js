import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../components/loading";
import { auth, db } from "../firebase";
import "../styles/globals.css";
import Login from "./login";

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    // const docRef = doc(db, "users", user.uid);
    if (user) {
      const docRef = doc(db, "users", user.uid);
      setDoc(
        docRef,
        {
          email: user.email,
          lastSeen: serverTimestamp(),
          photoURL: user.photoURL,
        },
        { merge: true }
      );
    }
  }, [user]);

  if (loading) return <Loading />;

  if (!user) return <Login />;
  return <Component {...pageProps} />;
}

export default MyApp;
