import { PersistentStore } from "../../util/PersistentStore";

interface ProfileProps {
  profileImageUrl: string;
  displayName: string;
}

const Profile = (props: ProfileProps) => {
  const logout = () => {
    PersistentStore.removeKey("token");
    window.location.reload();
  };

  return (
    <div className="home-user-container-profile">
      <img
        className="home-user-container-profile-image"
        src={props.profileImageUrl}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = "../assets/logo-kezman.png";
        }}
      />
      <h3>@{props.displayName}</h3>
      <button onClick={logout}>Wyloguj</button>
    </div>
  );
};

export default Profile;
