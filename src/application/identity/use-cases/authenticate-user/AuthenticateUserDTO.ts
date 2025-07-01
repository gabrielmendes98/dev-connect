export type AuthenticateUserInput<T> = T;

export type AuthenticateUserOutput = Promise<{
  token: string;
}>;
