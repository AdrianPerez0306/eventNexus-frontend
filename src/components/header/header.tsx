import { useEffect, useState } from "react";
import { useProfileImg } from "../../context/contextImg";
import { HeaderDto } from "../../domain/user";
import { serviceUser } from "../../services/serviceUser";
import "./header.css";
import WestIcon from '@mui/icons-material/West';
import { NavLink, useLocation } from "react-router-dom";
import { getNotificationsByUserId } from "../../services/notification.service";
import { NotificationComponent } from "../notification/notification";

export const Header = () => {
	const id = Number(sessionStorage.getItem("userId"));
	const location = useLocation()
	const [data, setData] = useState<HeaderDto>(new HeaderDto(0, "", ""));
	const { img } = useProfileImg();

	useEffect(() => {
		const getData = async () => {
			try {
				const res = await serviceUser.getHeaderData(id)
				setData(res)
			} catch (error) {
				console.error("Error fetching header data:", error)
			}
		};

		getData();


	}, [])

	const getTitle = () => {
		if (location.pathname.includes("module-admin")) return "Administrador"
		if (location.pathname.includes("module-events")) return "Eventos"
		if (location.pathname.includes("module-directive-info")) return "Información Directiva"
		return "Eventos"
	};

	const isHome = () => {
		return location.pathname === '/home' || location.pathname === '/profile';
	}

	function getNotifications() {
		getNotificationsByUserId(id)
	}
	return (
		<header className="header">
			
			<div className="header-left">
				{isHome() ? (
					<div className="imgName">
						<img src={img} className="image" alt="Profile" />
						<p>{data.name} {data.lastname}</p>
					</div>
				) : (
					<NavLink to="home">
						<WestIcon className="imgName" sx={{ fontSize: "3rem", color: 'var(--fixed-text-color-light)' }} />
					</NavLink>
				)}
			</div>

			<div className="header-center">
				{!isHome() && <h2 className="header-title">{getTitle()}</h2>}
			</div>
			<NotificationComponent></NotificationComponent>
		</header>
	);
};