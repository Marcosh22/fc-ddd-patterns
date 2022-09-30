import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerRepositoryInterface from "../../domain/repository/customer.interface";
import CustomerModel from "../db/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.Address.street,
      number: entity.Address.number,
      zipcode: entity.Address.zip,
      city: entity.Address.city,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update({
      name: entity.name,
      street: entity.Address.street,
      number: entity.Address.number,
      zipcode: entity.Address.zip,
      city: entity.Address.city,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
    },
    {
      where: {
        id: entity.id
      }
    });
  }

  async find(id: string): Promise<Customer> {

    let customerModel;

    try {
      customerModel = await CustomerModel.findOne({where: {id: id}, rejectOnEmpty: true});
    } catch(error) {
      throw new Error("Customer not found")
    }

    const address = new Address(customerModel.street, customerModel.number, customerModel.zipcode, customerModel.city);
    const foundCustomer = new Customer(customerModel.id, customerModel.name);
    foundCustomer.Address = address;

    if(customerModel.active) foundCustomer.activate();

    foundCustomer.addRewardPoints(customerModel.rewardPoints);

    return foundCustomer;
  }

  async findAll(): Promise<Customer[]> {
    const customersModel = await CustomerModel.findAll();

    const customers = customersModel.map((customerModel) => {
      const customer = new Customer(customerModel.id, customerModel.name);
      customer.addRewardPoints(customerModel.rewardPoints);

      const address = new Address(
        customerModel.street,
        customerModel.number,
        customerModel.zipcode,
        customerModel.city
      );

      customer.Address = address;

      if(customerModel.active) customer.activate();
  
      return customer;
    });

    return customers;
  }
}