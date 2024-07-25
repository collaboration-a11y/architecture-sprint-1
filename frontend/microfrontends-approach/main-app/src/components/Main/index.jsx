import UserProfile from "profile/Profile";
import Places from 'places/Places';

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
      <Places />

    </main>
  );
};

export default Main;
