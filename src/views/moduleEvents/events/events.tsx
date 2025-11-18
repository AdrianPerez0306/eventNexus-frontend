import { useState } from "react";
import { EventCard } from "../../../components/eventCard/eventCard";
import { EventDTO } from "../../../domain/createEvent";
import { EventFilter } from "./eventFilter";
import { StyledGrid } from "./event.style";
import { useNavigate } from "react-router-dom";
import './events.css'

export const Events = () => {
	const [events, setEvents] = useState<EventDTO[]>();
	const nav = useNavigate()

	return <>
		<div className="container__events">
			<EventFilter eventSetter={setEvents} />
			<button className="button_floating" onClick={(_) => (nav('/module-events/create-event'))}>+</button>
			<StyledGrid container>
				{events?.length ? (
					events.map((event, index) => (
						<div
							key={index}
							style={{ animationDelay: `${index * 0.3}s` }}
							className="card-animated"
						>
							<EventCard
								key={event.id}
								eventDTO={event}
							/>
						</div>


					))
				) : (
					<h2>No hay eventos</h2>
				)}
			</StyledGrid>
		</div>

	</>
};

