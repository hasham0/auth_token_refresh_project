type RegisterTs = {
  username: string;
  email: string;
  password: string;
};

type LoginTS = Pick<RegisterTs, "email" | "password">;

export type { RegisterTs, LoginTS };
