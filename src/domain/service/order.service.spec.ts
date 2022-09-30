import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order Service unit tests", () => {

  it("should place an order", () => {
    const customer = new Customer("123", "John");
    const item = new OrderItem("1", "Item 01", 100, "p1", 2);

    const order = OrderService.placeOrder(customer, [item]);

    expect(customer.rewardPoints).toBe(100);
    expect(order.total()).toBe(200);
  })

  it("should get total of all orders", () => {
    const item1 = new OrderItem("1", "Item 01", 100, "p1", 1);
    const item2 = new OrderItem("2", "Item 02", 200, "p2", 2);

    const order1 = new Order("1", "123", [item1]);
    const order2 = new Order("2", "123", [item2]);

    const orders = [order1, order2];

    const total = OrderService.total(orders);

    expect(total).toBe(500);

  })
})