import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'src/presentation/graphql/schemas/**/*.graphql',
  generates: {
    'src/presentation/graphql/generated/types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        contextType: '../context#GraphQLContext',
        useTypeImports: true,
        mappers: {
          Discussion: '@domain/content/entities/DiscussionEntity#DiscussionEntity',
        },
      },
    },
  },
};

export default config;
