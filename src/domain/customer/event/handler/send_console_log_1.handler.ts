import EventInterface from "../../../@shared/event/event.interface";
import EventHandlerInterface from "../../../@shared/event/event_handler.interface";

export default class SendConsoleLog1Handler implements EventHandlerInterface {
  handle(event: EventInterface): void {
   console.log(`Esse é o primeiro console.log do evento: CustomerCreated`)
  }

}