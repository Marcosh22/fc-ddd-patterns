import EventInterface from "../../../@shared/event/event.interface";
import EventHandlerInterface from "../../../@shared/event/event_handler.interface";

interface NotifyAddressChangeHandlerProps extends EventInterface {
  eventData: {
    id: string,
    name: string,
    address: string
  }
}

export default class NotifyAddressChangeHandler implements EventHandlerInterface {
  handle(event: NotifyAddressChangeHandlerProps): void {
   console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.address}`)
  }
}