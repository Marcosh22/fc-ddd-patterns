import Product from "../entity/product"
import ProductService from "./product.service";

describe("Product Service unit tests", () => {
  it("should change the prices of all products", () => {
    const product01 = new Product("1", "Product 01", 10);
    const product02 = new Product("2", "Product 02", 20);
    const products = [product01, product02];

    ProductService.increasePrice(products, 100);

    expect(product01.price).toBe(20);
    expect(product02.price).toBe(40);
  })
})