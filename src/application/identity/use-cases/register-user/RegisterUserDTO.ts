export interface RegisterUserInput {
  email: string;
  plainPassword: string;
}

export type RegisterUserOutput = Promise<void>;
