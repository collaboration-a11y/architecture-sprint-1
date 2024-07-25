import React, { createContext, useContext, useState } from "react";

import api from "../lib/api/index.js";

export const ApplicationContext = createContext({
  api: null,
  setCurrentUser: () => undefined,
  currentUser: null,
});

export function ApplicationProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([])

  return (
    <ApplicationContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        api,
        cards,
        setCards
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplication() {
  return useContext(ApplicationContext);
}
