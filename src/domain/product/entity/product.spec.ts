import Product from "./product";

describe("Product unit tests", () => {

  it("should throw error when id is empty", () => {
    expect(() => {
      const product = new Product("", "Product 01", 100);
    }).toThrowError("Id is required");
  })

  it("should throw error when name is empty", () => {
    expect(() => {
      const product = new Product("123", "", 100);
    }).toThrowError("Name is required");
  })

  it("should throw error when price is invalid", () => {
    expect(() => {
      const product = new Product("123", "Product 01", -1);
    }).toThrowError("Price must greater than 0");
  })

  it("should change name", () => {
    const product = new Product("123", "Product 01", 100);
    product.changeName("Product 02");

    expect(product.name).toBe("Product 02");
  })

  it("should change price", () => {
    const product = new Product("123", "Product 01", 100);
    product.changePrice(150);

    expect(product.price).toBe(150);
  })

})