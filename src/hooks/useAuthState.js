import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const useAuthState = () => {
  const session = supabase.auth.session();
  const [user, setUser] = useState(session?.user ?? null);

  useEffect(() => {
    const {
      data: authListener
    } = supabase.auth.onAuthStateChange(
      (event, session) => {
        const currentUser = session?.user;
        setUser(currentUser ?? null);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  return { user };
};

export default useAuthState;