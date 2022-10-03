import NotifyAddressChangedHandler from "./handler/notify_address_change.handler";
import CustomerAddressChangedEvent from "./customer_address_changed.event";
import EventDispatcher from "../../@shared/event/event_dispatcher";

describe("customer address changed events tests", () => {

  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new NotifyAddressChangedHandler();

    eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length).toBe(1);
  })

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new NotifyAddressChangedHandler();

    eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(eventHandler);

    eventDispatcher.unregister("CustomerAddressChangedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length).toBe(0);
  })

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new NotifyAddressChangedHandler();

    eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]).toBeUndefined();
  })

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new NotifyAddressChangedHandler();
    const spyEventHandle = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);
    
    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length).toBe(1);

    const customerAddressChangedEvent = new CustomerAddressChangedEvent({
      id: "123",
      name: "John",
      address: "Rua 1, 123, 14055-333, Ribeirão Preto"
    });

    eventDispatcher.notify(customerAddressChangedEvent);

    expect(spyEventHandle).toHaveBeenCalled();
  })

})