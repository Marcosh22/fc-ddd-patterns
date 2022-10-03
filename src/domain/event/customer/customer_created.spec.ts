import EventDispatcher from "../@shared/event_dispatcher";
import SendConsoleLog1Handler from "./handler/send_console_log_1.handler";
import SendConsoleLog2Handler from "./handler/send_console_log_2.handler";
import CustomerCreatedEvent from "./customer_created.event";

describe("customer created events tests", () => {

  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler01 = new SendConsoleLog1Handler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler01);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);
  })

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler01 = new SendConsoleLog1Handler();
    const eventHandler02 = new SendConsoleLog2Handler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler01);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler02);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler01);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler02);

    eventDispatcher.unregister("CustomerCreatedEvent", eventHandler01);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);

    eventDispatcher.unregister("CustomerCreatedEvent", eventHandler02);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(0);
  })

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler01 = new SendConsoleLog1Handler();
    const eventHandler02 = new SendConsoleLog2Handler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler01);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler02);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler01);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler02);

    eventDispatcher.unregisterAll();

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeUndefined();
  })

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler01 = new SendConsoleLog1Handler();
    const eventHandler02 = new SendConsoleLog2Handler();
    const spyEventHandle01 = jest.spyOn(eventHandler01, "handle");
    const spyEventHandle02 = jest.spyOn(eventHandler02, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler01);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler02);
    
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);

    const customerCreatedEvent = new CustomerCreatedEvent(eventDispatcher);

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandle01).toHaveBeenCalled();
    expect(spyEventHandle02).toHaveBeenCalled();
  })

})