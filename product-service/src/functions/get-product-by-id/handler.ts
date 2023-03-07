import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { Product } from "src/types";
import ProductService from "src/service";

import schema from "./schema";
import { HTTP_STATUS_CODES } from "src/constants";

const getProductById: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event) => {
  try {
    const { productId } = event.pathParameters;
    const product: Product = await ProductService.getProductById(productId);
    const status = product
      ? HTTP_STATUS_CODES.SUCCESS
      : HTTP_STATUS_CODES.NOT_FOUND;

    return formatJSONResponse(product, status);
  } catch (e) {
    return formatJSONResponse(e, HTTP_STATUS_CODES.SERVER_ERROR);
  }
};

export const main = middyfy(getProductById);
