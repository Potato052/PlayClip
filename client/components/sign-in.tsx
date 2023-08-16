import { signInWithGoogle, signOut } from "../app/firebase/firebase";
import { User } from "firebase/auth";

interface SignInProps {
  user: User | null;
}

export default function SignIn({ user }: SignInProps) {
  return (
    <div>
      {user ? (
        <button
          className="border border=gray px-4 py-2 rounded-full font-bold text-base cursor-pointer"
          onClick={signOut}
        >
          Sign Out
        </button>
      ) : (
        <button
          className="border border=gray px-4 py-2 rounded-full font-bold text-base cursor-pointer"
          onClick={signInWithGoogle}
        >
          Sign in
        </button>
      )}
    </div>
  );
}
