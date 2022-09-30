import eventInterface from "../../@shared/event.interface";
import EventHandlerInterface from "../../@shared/event_handler.interface";

export default class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface {
  handle(event: eventInterface): void {
   console.log(`Sending email to ......`)
  }

}