import { EventCategory } from "./eventTypes";

export class CreateEventDTO {
  id : number = 0
	creatorId: number;
	participantsIds: number[] = [];
	date: Date;
	name: string;
	description: string;
	eventType: EventCategory;

	constructor(
		creatorId: number,
    participantsIds: number[] = [],
		date: Date,
		name: string,
		description: string,
		eventType: EventCategory 
	) {
		this.creatorId = creatorId;
    this.participantsIds = participantsIds
		this.name = name;
		this.description = description;
		this.date = date;
		this.eventType = eventType; 
	}
}

export class EventParticipantDTO{
  id: number;
  name: string;
  image: string;

  constructor(id: number, name: string, image: string) {
    this.id = id;
    this.name = name;
    this.image = image;
  }
}

export class EventDTO{
    id: number
    creatorName:string
    creatorImage: string
    creatorId: number
    dateFinished: Date
    title: string
    description: string
    isActive: boolean 
    participants: EventParticipantDTO[]
    type: EventCategory

    constructor(
      id: number,
      creatorName:string,
      creatorImage: string,
      creatorId: number,
      dateFinished: Date,
      title: string,
      description: string,
      isActive: boolean,
      participants: EventParticipantDTO[],
      type: EventCategory
    ) {

        this.id = id
        this.creatorName = creatorName
        this.creatorImage = creatorImage
        this.creatorId = creatorId
        this.dateFinished = dateFinished
        this.title = title
        this.description = description
        this.isActive = isActive
        this.participants = participants
        this.type = type
    }

}

export class ResponseEntityDTO {
  responseMessage: string;
  responseBody: EventParticipantDTO[];

  constructor(responseMessage: string, responseBody: EventParticipantDTO[]) {
    this.responseMessage = responseMessage;
    this.responseBody = responseBody;
  }
}

