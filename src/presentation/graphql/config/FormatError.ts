import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { BaseError } from '@domain/shared/errors/BaseError';

export const formatError = (
  formattedError: GraphQLFormattedError,
  error: unknown,
): GraphQLFormattedError => {
  console.error('[GraphQL Error]', error);

  const originalError = (error as GraphQLError)?.originalError;

  if (originalError instanceof BaseError) {
    return {
      message: originalError.message,
      path: formattedError.path,
      extensions: {
        code: originalError.constructor.name,
        statusCode: originalError.statusCode,
        details: originalError.details || [],
      },
    };
  }

  return {
    ...formattedError,
    message: formattedError.message,
    extensions: {
      ...formattedError.extensions,
      statusCode: 500,
    },
  };
};
