import { useAuth } from "../providers/AuthContext/AuthProviders";
import { useForm } from "react-hook-form";
import { RegisterTs } from "../types";
import { DevTool } from "@hookform/devtools";

type Props = {};

export default function RegistrationForm({}: Props) {
  const { registerHanlder } = useAuth();

  const {
    register,
    reset,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterTs>();

  return (
    <>
      <section>
        <h1 className="uppercase text-center text-3xl  outline-double p-2">
          Registration Form
        </h1>
        <form onSubmit={handleSubmit(registerHanlder)}>
          <div className="inputStyles">
            <label htmlFor="username">username</label>
            <input
              className="inputsSeg"
              {...register("username", {
                required: true,
              })}
              aria-invalid={errors.username ? "true" : "false"}
            />
            {errors.username?.type === "required" && (
              <p role="alert">username is required</p>
            )}
          </div>
          <div className="inputStyles">
            <label htmlFor="email">email</label>
            <input
              className="inputsSeg"
              {...register("email", {
                required: true,
              })}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email?.type === "required" && (
              <p role="alert">email is required</p>
            )}
          </div>
          <div className="inputStyles">
            <label htmlFor="password">password</label>
            <input
              className="inputsSeg"
              {...register("password", {
                required: true,
              })}
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password?.type === "required" && (
              <p role="alert">password is required</p>
            )}
          </div>
          <div className="flex gap-4 justify-center">
            <button
              className="bg-black px-4 py-2 text-white rounded-md hover:bg-green-600 duration-200 ease-in"
              type="submit"
            >
              Register
            </button>
            <button
              className="bg-black px-4 py-2 text-white rounded-md hover:bg-green-600 duration-200 ease-in"
              type="button"
              onClick={() => reset()}
            >
              Reset
            </button>
          </div>
        </form>
        <DevTool control={control} />
      </section>
    </>
  );
}
