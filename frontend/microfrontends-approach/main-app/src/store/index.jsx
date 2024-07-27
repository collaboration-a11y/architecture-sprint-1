import React, { createContext, useContext, useState } from "react";

import api from "../lib/api/index.js";

export const ApplicationContext = createContext({
  api: null,
  setCurrentUser: () => undefined,
  currentUser: null,
});

export function ApplicationProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [applicationTooltip, setApplicationTooltip] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  return (
    <ApplicationContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        api,
        cards,
        setCards,
        isLoggedIn,
        setIsLoggedIn,
        email,
        setEmail,
        applicationTooltip,
        setApplicationTooltip,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplication() {
  return useContext(ApplicationContext);
}
