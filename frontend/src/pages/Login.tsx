import React from "react";
import { useAuth } from "../providers/AuthContext/AuthProviders";
import { LoginTS } from "../types";
import { useForm } from "react-hook-form";
import LoginForm from "../components/LoginForm";

type Props = {};

export default function Login({}: Props) {
  return (
    <>
      <section className="flex justify-center h-[50vh] items-center border-2 border-black">
        <LoginForm />
      </section>
    </>
  );
}
