import { Op } from "sequelize";
import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/repository/order.interface";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order_item.model";

export default class OrderRepository implements OrderRepositoryInterface{
 
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    let order: OrderModel;

    try {
      order = await OrderModel.findOne({ where: {id: entity.id}, include: [{ model: OrderItemModel }]});
    } catch (error) {
      throw new Error("Can't find the order");
    }

    const items = order.items.map(item => item.id);

    try {
      await OrderItemModel.destroy({
        where: {
          id: {
            [Op.or]: items,
          },
        },
      });
    } catch (error) {
      throw new Error("Can't remove items");
    }
    
    try {
      await OrderItemModel.bulkCreate(entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
        order_id: order.id
      })));
    } catch (error) {
      throw new Error("Can't insert items");
    }
    
    try {
      await OrderModel.update(
        {
          customer_id: entity.customerId,
          total: entity.total(),
        },
        {
          where: { id: entity.id},
        }
      );
      } catch (error) {
      throw new Error("Can't update order");
    }
  }

  async find(id: string): Promise<Order> {

    let order;
    
    try {
      order =  await OrderModel.findOne({ where: {id: id}, include: [{ model: OrderItemModel }]});
    } catch(error) {
      throw new Error("Order not found")
    }

    let items = order.items.map(item => (new OrderItem(
        item.id,
        item.name,
        item.price / item.quantity,
        item.product_id,
        item.quantity
    )));

    const foundOrder = new Order(order.id, order.customer_id, items);
    return foundOrder;
  }

  async findAll(): Promise<Order[]> {
    const ordersModel = await OrderModel.findAll({ include: [{ model: OrderItemModel }] });

    const orders = ordersModel.map((orderModel) => {

      let items = orderModel.items.map(item => (new OrderItem(
        item.id,
        item.name,
        item.price / item.quantity,
        item.product_id,
        item.quantity
      )));

      const order = new Order(orderModel.id, orderModel.customer_id, items);
  
      return order;
    });

    return orders;
  }
}
