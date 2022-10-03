import OrderItem from "./order_item";

describe("OrderItem unit tests", () => {

  it("should throw error when id is empty", () => {
    expect(() => {
      const item = new OrderItem("", "Item 01", 100, "p1", 2);
    }).toThrowError("Id is required");
  })

  it("should throw error when name is empty", () => {
    expect(() => {
      const item = new OrderItem("01", "", 100, "p1", 2);
    }).toThrowError("Name is required");
  })

  it("should throw error if the price is lower or equat to 0", () => {
    expect(() => {
      const item = new OrderItem("01", "Item 01", 0, "p1", 2);
    }).toThrowError("Price must be greater than 0");
  })

  it("should throw error when productId is empty", () => {
    expect(() => {
      const item = new OrderItem("01", "Item 01", 100, "", 2);
    }).toThrowError("ProductId is required");
  })

  it("should throw error if the quantity is lower or equat to 0", () => {
    expect(() => {
      const item = new OrderItem("01", "Item 01", 100, "p1", -1);
    }).toThrowError("Quantity must be greater than 0");
  })

})