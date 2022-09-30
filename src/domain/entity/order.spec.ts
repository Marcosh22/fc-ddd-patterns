import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {

  it("should throw error when id is empty", () => {
    expect(() => {
      const order = new Order("", "123", []);
    }).toThrowError("Id is required");
  })

  it("should throw error when customerId is empty", () => {
    expect(() => {
      const order = new Order("123", "", []);
    }).toThrowError("CustomerId is required");
  })

  it("should throw error when there is no items", () => {
    expect(() => {
      const order = new Order("1", "123", []);
    }).toThrowError("Items are required");
  })

  it("should calculate total", () => {

    const item = new OrderItem("1", "Item 01", 100, "p1", 2);
    const item2 = new OrderItem("2", "Item 02", 200, "p2", 2);

    const order = new Order("1", "123", [item]);
    let total = order.total();

    expect(total).toBe(200);

    const order2 = new Order("2", "123", [item, item2]);
    total = order2.total();

    expect(total).toBe(600);
  })

  it("should throw error if the item qtd is lower than 0", () => {

    expect(() => {
      const item = new OrderItem("1", "Item 01", 100, "p1", 0);
      const order = new Order("1", "123", [item]);
  
    }).toThrowError("Quantity must be greater than 0");

  })

})