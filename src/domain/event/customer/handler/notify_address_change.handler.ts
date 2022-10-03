import eventInterface from "../../@shared/event.interface";
import EventHandlerInterface from "../../@shared/event_handler.interface";

export default class NotifyAddressChangeHandler implements EventHandlerInterface {
  handle(event: eventInterface): void {
   console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.address}`)
  }

}