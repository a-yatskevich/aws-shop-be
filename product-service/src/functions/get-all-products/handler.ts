import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { HTTP_STATUS_CODES } from "src/constants";
import { Products } from "src/types";
import ProductsService from "src/service";
import schema from "./schema";

const getAllProducts: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async () => {
  try {
    const products: Products = await ProductsService.getAllProducts();
    return formatJSONResponse(products, HTTP_STATUS_CODES.SUCCESS);
  } catch (e) {
    return formatJSONResponse(e, HTTP_STATUS_CODES.SERVER_ERROR);
  }
};

export const main = middyfy(getAllProducts);
