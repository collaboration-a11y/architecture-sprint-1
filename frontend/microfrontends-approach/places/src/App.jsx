import { useState, useEffect } from "react";
import Places from "./components/Places/index.jsx";
import ImagePopup from "lib-app/ImagePopup";

import { useApplication } from "main-app/store";

const App = () => {
  const { api, setCards } = useApplication();
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    api
      .getCardList()
      .then((cardData) => {
        setCards(cardData);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Places onCardClick={(card) => setSelectedCard(card)} />
      <ImagePopup card={selectedCard} onClose={() => setSelectedCard(null)} />
    </>
  );
};

export default App;
