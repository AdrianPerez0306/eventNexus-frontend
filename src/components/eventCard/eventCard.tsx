import { EventDTO } from "../../domain/createEvent";
import { eventShadowColor2 } from "../../utils/typeEvent";
import { Avatar, AvatarGroup, Button, Divider, Tooltip } from "@mui/material";
import { EventCategory } from "../../domain/eventTypes";
import { useEffect, useState } from "react";
import { deleteEvent, moduleService } from "../../services/moduleService";
import { useToast } from "../../context/toast/useToast";
import { StyledCard, StyledIconButton } from "./eventCard.style";
import { calculateTimeLeft, formatDate } from "../../utils/functions";
import { mapEventTypeToIcon } from "./eventTypeIcon";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { PersonAdd } from "@mui/icons-material";
import './event.css'
import { SimpleDialog } from "./eventParticipantsDialog";

export const EventCard = ({ eventDTO }: { eventDTO: EventDTO }) => {
	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(eventDTO.dateFinished.toString()));
	const [event, setEvent] = useState<EventDTO>(eventDTO);
	const userId = Number(sessionStorage.getItem("userId"));
	const { open, } = useToast()
	const [openDialog, setOpenDialog] = useState(false);

	const handleDialog = () => {
		setOpenDialog(!openDialog);
	};

	function mapCardColorByEventType(eventType: EventCategory): string {
		return eventShadowColor2[eventType];
	}

	async function joinleaveEvent() {
		try {
			const response = await moduleService.joinleaveEvent(event.id);
			setEvent((prevEvent) => ({
				...prevEvent,
				participants: response.responseBody,
			}));
			open(response.responseMessage, 'success')

		} catch (error: any) {
			open(error, "error");

		}
	}
	async function handleDelete() {
		try {
			const response = await deleteEvent(event.id);
			 
			// setEvent((prevEvent) => ({
			// 	...prevEvent,
			// 	participants: response.responseBody,
			// }));
			open(response, 'success')

		} catch (error: any) {
			open(error, "error");

		}
	}

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft(calculateTimeLeft(eventDTO.dateFinished.toString()));
		}, 60 * 1000); // 60 segundos * 1000 ms = 1 minuto

		return () => clearInterval(timer);
	}, [eventDTO.dateFinished]);

	return (
		<StyledCard sx={{ border: `2px solid`, borderColor: mapCardColorByEventType(event.type) }} elevation={24}>
			<div className="event__header">
				<div className="mock">
					<img src={event.creatorImage} alt="" className="foton" />
					<div className="event__header-info">
						<div className="header-info__title">{event.title}</div>
						<div className="header-info__creator-name">From: {event.creatorName}</div>
						<div className="header-info__date">
							{formatDate(event.dateFinished)} | {timeLeft.hours} : {timeLeft.minutes}
						</div>
					</div>
				</div>
				<div className="header__help">
					{mapEventTypeToIcon(event.type)}
				</div>
			</div>
			<Divider />
			<div className="event__content">
				{event.description}
			</div>
			<Divider />
			<div className="event__footer">
				{event.creatorId == userId && (
					<Button size="medium" onClick={handleDelete}>Delete</Button>
				)}

				{event.creatorId != userId && (<>
					{event.participants.map((participant, index) => (participant.id)).includes(userId) ? (
						<StyledIconButton onClick={joinleaveEvent}>
							<PersonRemoveIcon sx={{ color: "red" }} />
						</StyledIconButton>
					) : (
						<StyledIconButton onClick={joinleaveEvent}>
							<PersonAdd sx={{ color: "green" }} />
						</StyledIconButton>
					)}
				</>)}

				{event.participants.length > 0 && (
					<Tooltip
						title={
							<h2 style={{ color: "black", fontSize: "12px" }}>
								PARTICIPANTES
							</h2>
						}
						placement="top"
						arrow
					>
						<AvatarGroup max={4} spacing="medium" onClick={handleDialog} sx={{ cursor: 'pointer' }}>
							{event.participants.map((participant, index) => (
								<Avatar key={index} alt={participant.name} src={participant.image} sx={{ width: 15, height: 15 }} />
							))}
						</AvatarGroup>
					</Tooltip>

				)}

				<SimpleDialog
					participants={eventDTO.participants}
					open={openDialog}
					onClose={handleDialog}
				/>


			</div>
		</StyledCard>

	);
};

