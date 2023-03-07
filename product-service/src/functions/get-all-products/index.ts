import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      httpApi: {
        method: 'get',
        path: '/products',
        summary: "Get list of products",
        description: "Returns list of available products",
        responses: {
          200: {
            description: "Returns list of products",
            bodyType: "Products",
          },
          500: {
            description: "Server error",
          },
        },
      },
    },
  ],
};
