import UserProfile from "profile/Profile";

import "../../styles/content/content.css";

const Main = ({ children }) => {
  //TODO:
  // const imageStyle = { backgroundImage: `url(${currentUser.avatar})` };
  const imageStyle = {};
  return (
    <main className="content">
      <UserProfile
        imageStyle={imageStyle}
        onEditAvatar={() => undefined}
        currentUser={() => undefined}
        onEditProfile={() => undefined}
        onAddPlace={() => undefined}
      />
    </main>
  );
};

export default Main;
