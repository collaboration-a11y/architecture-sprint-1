import UserProfile from "profile/Profile";
import Places from "places/Places";

import "../../styles/content/content.css";

const Main = ({ children }) => {
  return (
    <main className="content">
      <UserProfile />
      <Places />
    </main>
  );
};

export default Main;
