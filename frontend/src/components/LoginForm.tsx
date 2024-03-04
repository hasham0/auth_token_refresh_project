import { useAuth } from "../providers/AuthContext/AuthProviders";
import { LoginTS } from "../types";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
type Props = {};

export default function LoginForm({}: Props) {
  const { loginHanlder } = useAuth();

  const {
    register,
    reset,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginTS>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <section>
      <h1 className="uppercase text-center text-3xl  outline-double p-2">
        Login Form
      </h1>
      <form onSubmit={handleSubmit(loginHanlder)}>
        <div className="inputStyles">
          <label htmlFor="email">email</label>
          <div>
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
        </div>
        <div className="inputStyles">
          <label htmlFor="password">password</label>
          <div>
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
        </div>
        <div className="flex gap-4 justify-center">
          <button
            className="bg-black px-4 py-2 text-white rounded-md hover:bg-blue-600 duration-200 ease-in"
            type="submit"
          >
            Login
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
  );
}
