import eventInterface from "../../@shared/event.interface";
import EventHandlerInterface from "../../@shared/event_handler.interface";

export default class SendConsoleLog1Handler implements EventHandlerInterface {
  handle(event: eventInterface): void {
   console.log(`Esse é o primeiro console.log do evento: CustomerCreated`)
  }

}