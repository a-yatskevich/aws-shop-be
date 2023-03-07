import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      httpApi: {
        method: "get",
        path: "/products/{productId}",
        summary: "Get product by id",
        description: "Returns product based on id from url",
        responseData: {
          200: {
            description: "Returns a product by id",
            bodyType: "Product",
          },
          404: {
            description: "Product not found",
          },
          500: {
            description: "Server Error",
          },
        },
      },
    },
  ],
};
