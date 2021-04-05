import React, { useState, useEffect, useContext, createContext } from "react";

import nookies from "nookies";
import firebaseClient from "./firebaseClient";
//import firebaseAdmin from "./firebaseAdmin";
import "firebase/auth";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  firebaseClient();
  const [user, setUser] = useState(null);
  useEffect(() => {
    return firebase.auth().onIdTokenChange(async (user) => {
      if (!user) {
        setUser(null);
        nookies.set(undefined, "token", "", {});
        return;
      }
      const token = await user.getIdToken();
      setUser(user);
      nookies.set(undefined, "token", token, {});
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
