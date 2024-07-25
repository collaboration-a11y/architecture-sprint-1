import { useState } from "react";
import Profile from "./components/Profile/index.jsx";
import EditProfilePopup from "./components/EditProfilePopup/index.jsx";

import { useApplication } from "main-app/store";
import EditAvatarPopup from "./components/EditAvatarPopup/index.jsx";
import AddPlacePopup from "./components/AddPlacePopup/index.jsx";

const App = () => {
  const { api, setCurrentUser, cards, setCards } = useApplication();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const closeAll = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
  };

  const handleUpdateUser = (userUpdate) => {
    api
      .setUserInfo(userUpdate)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAll();
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateAvatar = (avatarUpdate) => {
    api
      .setUserAvatar(avatarUpdate)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAll();
      })
      .catch((err) => console.log(err));
  };

  const handleAddPlace = (newCard) => {
    api
      .addCard(newCard)
      .then((newCardFull) => {
        setCards([newCardFull, ...cards]);
        closeAll();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Profile
        onAddPlace={() => setIsAddPlacePopupOpen(true)}
        onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
        onEditProfile={() => setIsEditProfilePopupOpen(true)}
      />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAll}
        onUpdateUser={handleUpdateUser}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAll}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onAddPlace={handleAddPlace}
        onClose={closeAll}
      />
    </>
  );
};

export default App;
