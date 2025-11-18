import { Box, Typography, Badge } from "@mui/material"
import { NotificationDTO } from "../../domain/notification"
import { useEffect, useState } from "react";
import { getNotificationsByUserId, trySSE } from "../../services/notification.service";

import './notification.css'
import { useToast } from "../../context/toast/useToast";

export const NotificationComponent = () => {
	const [openMenu, setOpenMenu] = useState(false);
	const {open} = useToast()
	// ESTO HAY QUE ACOPLARLO A UNO SOLO, ES EL MISMO ESTADO. UN OBJECTO QUE MANEJE NUEVAS Y T0DAS

	// ESTO HAY QUE ACOPLARLO A UNO SOLO, ES EL MISMO ESTADO. UN OBJECTO QUE MANEJE NUEVAS Y T0DAS
	const [notifications, setNotifications] = useState<NotificationDTO[]>([]);
	const [newNotifications, setNewNotifications] = useState<NotificationDTO[]>([]);
	const [unreadCount, setUnreadCount] = useState(0);
	const [onlyNew, setOnlyNew] = useState(false);
	const id = Number(sessionStorage.getItem("userId"));
	const [activeNotifications, setActiveNotifications] = useState(false);

	let eventSource: EventSource | null = null;

	const handleOpen = async () => {
		const notifications = await getNotificationsByUserId(id)
		setNotifications(notifications)
		setUnreadCount(0);
		setOpenMenu(!openMenu)
	};

	const handleClose = () => {
		setOpenMenu(false)
		setNewNotifications([])
	};

	const formatIsoToDdMmAaaa = (isoString: string) =>{
		const date = new Date(isoString);
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();
		return `${day}/${month}/${year}`;
	}

	async function activateNotifications() {
		const button = document.querySelector('button.activable') as HTMLButtonElement;
		if(button.classList.contains('active')){
			setActiveNotifications(false);
			await trySSE(setUnreadCount, setNewNotifications, id, activeNotifications, eventSource)
			button.classList.remove('active')
			button.classList.add('inactive')
			open("Notificaciones desactivadas", "info")
		}else{
			setActiveNotifications(true);
			button.classList.remove('inactive')
			button.classList.add('active')
			trySSE(setUnreadCount, setNewNotifications, id, activeNotifications, eventSource)
			open("Notificaciones activadas", "info")


		}
	}
	function handleActivate() {
		setOnlyNew(!onlyNew);
	}

	useEffect(() => {
		// trySSE(setUnreadCount)
		const fetchNotifications = async () => {
			const newNotifications = await getNotificationsByUserId(id);

			// if (!open) {
			// 	setUnreadCount(newNotifications.length);
			// }
			// if (!open) {
			// 	setUnreadCount(newNotifications.length);
			// }

			setNotifications(newNotifications);
		};
		fetchNotifications();
	}, [openMenu]);


	const style = {
		position: "absolute",
		display: 'flex',
		flexDirection: 'column',
		overflowY: 'scroll',
		gap: 2,
		width: 300,
		height: 400,
		top: '60%',
		right: '2%',
		//transform: 'translate(-50%, 10%)',
		bgcolor: 'var(--header-nav)',
		border: '2px solid #000',
		borderRadius: '2rem',
		float: "right",
		p: 4,
		zIndex: 9999
	};

	const style2 = {
		height: 100,
		bgcolor: '#5b6271',
		border: '1px solid #000',
		borderRadius: '1rem',
		boxShadow: 10,
		color: "#fffffff",
		p: 1
	};

	return (
		<>
			<div className="header-right" onClick={handleOpen} style={{ position:'absolute',right:'1rem',cursor: 'pointer' }}>
				<Badge
					badgeContent={unreadCount}
					color="error"
					overlap="circular"
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					sx={{
						'& .MuiBadge-badge': {
							fontSize: '1.2rem',
							height: 25,
							minWidth: 25,
							padding: '0 6px',
						},
					}}
				>
					<img
						src="/icons/notification.svg"
						alt="Notificación"
						className="notificationIcon"
						style={{ width: 40, height: 40 }}
					/>
				</Badge>
			</div>

			{openMenu ? (
				<div>
				<Box sx={style}>
					<div className="butons">
						<button onClick={activateNotifications} className="notification activable inactive">{activeNotifications ? "Desactivar" : "Activar"} notificaciones</button>
						<button onClick={handleActivate} className="notification toggle">{onlyNew ? "Nuevas" : "Todas"}</button>
						<button onClick={handleClose} className="notification close">X</button>
					</div>

					{onlyNew ? (
						// Display new notifications
						newNotifications.length === 0 ? (
							<Typography sx={{ mt: 2 }}>No tienes notificaciones nuevas.</Typography>
						) : (
							notifications.map((notification) => (<>
								<Box key={notification.id} sx={style2}>
									<Typography sx= {{textAlign: "left"}} variant="h6">{notification.title}</Typography>
									<Typography sx={{ mt: 2 }}>{formatIsoToDdMmAaaa(notification.date)}</Typography>
								</Box>
							</>))
						)
					) : (
						// Display all notifications
						notifications.length === 0 ? (
							<Typography sx={{ mt: 2 }}>No tienes notificaciones.</Typography>
						) : (
							notifications.map((notification) => (<>
								<Box key={notification.id} sx={style2}>
									<Typography sx= {{textAlign: "left"}} variant="h6">{notification.title}</Typography>
									<Typography sx={{ mt: 2 }}>{formatIsoToDdMmAaaa(notification.date)}</Typography>
								</Box>

							</>))
						)
					)}
				</Box>
				</div>
			):(<div></div>)}
		</>
	);
}
