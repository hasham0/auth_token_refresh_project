import { useEffect } from "react";
import { useAuth } from "../providers/AuthContext/AuthProviders";

type Props = {};

export default function Profile({}: Props) {
  const { user, userProfile } = useAuth();
  useEffect(() => {
    userProfile();
  }, []);

  console.log(user);
  return <div>Profile</div>;
}
