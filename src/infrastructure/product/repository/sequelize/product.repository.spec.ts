import { Sequelize } from "sequelize-typescript"
import Product from "../../../../domain/product/entity/product";
import ProductModel from "./product.model";
import ProductRepository from "./product.repository";

describe("Product repository unit test", () => {

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  })

  afterEach(async () => {
    await sequelize.close();
  })

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 01", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({where: {id: "1"}});

    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 01",
      price: 100
    })
  })

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 01", 100);

    await productRepository.create(product);
    let productModel = await ProductModel.findOne({where: {id: "1"}});

    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 01",
      price: 100
    })

    product.changeName("Product 02");
    product.changePrice(150);

    await productRepository.update(product);
    productModel = await ProductModel.findOne({where: {id: "1"}});

    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 02",
      price: 150
    })
  })

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 01", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({where: {id: "1"}});

    const foundProduct = await productRepository.find("1");

    expect(productModel.toJSON()).toStrictEqual({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price
    })
  })

  it("should find all products", async () => {
    const productRepository = new ProductRepository();
    
    const product = new Product("1", "Product 01", 100);
    await productRepository.create(product);

    const product2 = new Product("2", "Product 02", 200);
    await productRepository.create(product2);

    const foundProducts = await productRepository.findAll();
    const products = [product, product2];

    expect(products).toEqual(foundProducts);
  })

})