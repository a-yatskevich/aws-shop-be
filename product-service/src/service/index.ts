import { Product } from "../types";
import products from "../mocks/index.json";

class ProductService {
  constructor() {}

  async getAllProducts(): Promise<Product[]> {
    return new Promise<Product[]>((resolve) => {
      resolve(products);
    });
  }

  async getProductById(id: string): Promise<Product> {
    return new Promise<Product>((resolve) => {
      resolve(products.find((product: Product) => product.id === id));
    });
  }
}

export default new ProductService();
