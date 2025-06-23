import { z } from 'zod';
import { PlainPasswordVO } from '../../../domain/shared/value-objects/PlainPasswordVO';
import { EmailVO } from '../../../domain/shared/value-objects/EmailVO';

export const registerUserRequestSchema = z.object({
  body: z.object({
    email: z
      .string()
      .regex(EmailVO.validationRules.EMAIL_REGEX, { message: 'Invalid email format.' }),
    password: z.string().min(PlainPasswordVO.validationRules.PASSWORD_MIN_LENGTH, {
      message: `Password must be at least ${PlainPasswordVO.validationRules.PASSWORD_MIN_LENGTH} characters long.`,
    }),
  }),
});

export type RegisterUserRequestSchema = z.infer<typeof registerUserRequestSchema>['body'];
