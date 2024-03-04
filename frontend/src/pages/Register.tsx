import { useForm } from "react-hook-form";
import { useAuth } from "../providers/AuthContext/AuthProviders";
import RegistrationForm from "../components/RegistrationForm";

type Props = {};

export default function Register({}: Props) {
  return (
    <>
      <section className="flex justify-center h-[50vh] items-center border-2 border-black">
        <RegistrationForm />
      </section>
    </>
  );
}
