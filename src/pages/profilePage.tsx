
import AboutInfoProfileCard from "../components/AboutInfoProfileCard";
import ProfileImageCard from "../components/ProfileImageCard";


export default function ProfilePage() {
  return (
    <>
      <div>
        <div className="row h-100 m-4 border rounded p-3">
          <ProfileImageCard />
          <AboutInfoProfileCard />
        </div>
      </div>
    </>
  );
}
