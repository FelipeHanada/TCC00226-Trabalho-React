
import AboutInfoProfileCard from "../components/AboutInfoProfileCard";
import ProfileImageCard from "../components/ProfileImageCard";
import { useAuthStore } from "../store/authStore";

export default function ProfilePage() {
  const { user } = useAuthStore();

  return (
    <>
      <div className="container-fluid">
        <div className="row h-100 m-4 border rounded p-3">
          <ProfileImageCard user={user || undefined} />
          <AboutInfoProfileCard />
        </div>
      </div>
    </>
  );
}
