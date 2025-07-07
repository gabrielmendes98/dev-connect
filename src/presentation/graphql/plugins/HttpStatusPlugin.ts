import { ApolloServerPlugin, BaseContext, GraphQLRequestContext } from '@apollo/server';

export const httpStatusPlugin: ApolloServerPlugin = {
  async requestDidStart() {
    console.log('GraphQL Request started');
    return {
      async willSendResponse(requestContext: GraphQLRequestContext<BaseContext>) {
        const { response } = requestContext;
        const body = response.body;

        if (body?.kind === 'single' && body.singleResult.errors) {
          const highestStatusCode = body.singleResult.errors.reduce((prev, err) => {
            const code = err.extensions?.statusCode as number;
            return typeof code === 'number' && code > prev ? code : prev;
          }, 0);

          if (highestStatusCode && response.http) {
            console.log(`httpStatusPlugin: defining HTTP status to ${highestStatusCode}.`);
            response.http.status = highestStatusCode;
          }
        }
      },
    };
  },
};
