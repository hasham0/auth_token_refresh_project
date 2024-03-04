import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

type Props = {};

export default function Layout({}: Props) {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
