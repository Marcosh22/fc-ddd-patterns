import { Sequelize } from "sequelize-typescript"
import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";

describe("Customer repository unit test", () => {

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  })

  afterEach(async () => {
    await sequelize.close();
  })

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "José");
    const address = new Address("Rua 01", 1, "14056722", "Ribeirão Preto");
    customer.Address = address;

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({where: {id: "1"}});

    expect(customerModel.toJSON()).toStrictEqual({
      id: "1",
      name: customer.name,
      street: customer.Address.street,
      number: customer.Address.number,
      zipcode: customer.Address.zip,
      city: customer.Address.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints
    })
  })

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "José");
    const address = new Address("Rua 01", 1, "14056722", "Ribeirão Preto");
    customer.Address = address;

    await customerRepository.create(customer);

    let customerModel = await CustomerModel.findOne({where: {id: "1"}});

    expect(customerModel.toJSON()).toStrictEqual({
      id: "1",
      name: customer.name,
      street: customer.Address.street,
      number: customer.Address.number,
      zipcode: customer.Address.zip,
      city: customer.Address.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints
    })

    customer.changeName("José Abreu");
    
    await customerRepository.update(customer);

    customerModel = await CustomerModel.findOne({where: {id: "1"}});

    expect(customerModel.toJSON()).toStrictEqual({
      id: "1",
      name: customer.name,
      street: customer.Address.street,
      number: customer.Address.number,
      zipcode: customer.Address.zip,
      city: customer.Address.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints
    })
  })

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "José");
    const address = new Address("Rua 01", 1, "14056722", "Ribeirão Preto");
    customer.Address = address;

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({where: {id: "1"}});

    const foundCustomer = await customerRepository.find("1");

    expect(customerModel.toJSON()).toStrictEqual({
      id: foundCustomer.id,
      name: customer.name,
      street: customer.Address.street,
      number: customer.Address.number,
      zipcode: customer.Address.zip,
      city: customer.Address.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints
    })
  })

  it("should throw an error when customer is not found", async () => {
    const customerRepository = new CustomerRepository();
    expect(async () => {
      await customerRepository.find("123ABC");
    }).rejects.toThrow("Customer not found");
  })

  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();
    
    const customer = new Customer("1", "José");
    const address = new Address("Rua 01", 1, "14056722", "Ribeirão Preto");
    customer.Address = address;
    customer.addRewardPoints(20);
    customer.activate();

    const customer2 = new Customer("2", "Maria");
    const address2 = new Address("Rua 02", 2, "14056722", "Ribeirão Preto");
    customer2.Address = address2;
    customer2.addRewardPoints(15);

    await customerRepository.create(customer);
    await customerRepository.create(customer2);

    const customers = await customerRepository.findAll();
  
    expect(customers).toHaveLength(2);
    expect(customers).toContainEqual(customer);
    expect(customers).toContainEqual(customer2);
  })

})