import { Link } from "react-router-dom";
import { useAuth } from "../providers/AuthContext/AuthProviders";

type Props = {};

export default function Navbar({}: Props) {
  const { user, logoutHanlder } = useAuth();
  return (
    <>
      <header className="flex justify-around items-center">
        <div>
          <Link to={"/"}>
            <h1 className="text-2xl capitalize">
              authentication and authorization
            </h1>
          </Link>
        </div>
        <div className="flex gap-x-5">
          {user && user.email ? (
            <>
              <span>
                <Link to={"/profile"}>profile</Link>
              </span>
              <span>
                <button onClick={logoutHanlder}>Logout</button>
              </span>
            </>
          ) : (
            <>
              <span className="flex gap-x-5 text-lg">
                <Link to={"/register"}>Registration</Link>
                <Link to={"/login"}>LogIn</Link>
              </span>
            </>
          )}
        </div>
      </header>
    </>
  );
}
