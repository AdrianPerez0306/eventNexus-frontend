
import { useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./searchUss.css";
import { SesionStorage } from "../../../domain/user";
import { ProfileCard } from "../../../components/profileCard/profileCard";
import { serviceUser } from "../../../services/serviceUser";
import { adminService } from "../../../services/adminService";
import AddIcon from '@mui/icons-material/Add';
import { StyledFloatingButtonRight } from "../../moduleEvents/events/eventFilter.style";
import { useNavigate } from "react-router-dom";


export const SearchUser = () => {
	const [value, setValue] = useState("");
	const [expanded, setExpanded] = useState(false);
	const [users, setUsers] = useState<SesionStorage[]>();
	const containerRef = useRef<HTMLDivElement>(null);
	const nav = useNavigate()

	const fetchUSer = async () => {
		const response = await serviceUser.search(value);
		 
		setUsers(response);
	};

	useEffect(() =>{
			fetchUSer()
	},[])

	const deleteUser = async (id: number) => {
		await adminService.deleteUser(id);

		const newUsers = users?.filter((user) => user.id !== id);
		setUsers(newUsers);
		 
	}

	// Cerrar input si se clickea fuera
	useEffect(() => {const clickOut = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setExpanded(true);
			}
		};

		document.addEventListener("mousedown", clickOut);
		return () => {
			document.removeEventListener("mousedown", clickOut);
		};
	}, []);

	return (
		<section className="section">
			<h1>Buscar usuarios</h1>
			<h3>Aqui puedes editar o eliminar a los usuarios</h3>
			<StyledFloatingButtonRight color="primary" aria-label="add" onClick={(_) => (nav('/module-admin/create-user'))}>
			<AddIcon />
			</StyledFloatingButtonRight>
			<div
				ref={containerRef}
				className={`search-container ${expanded ? "expanded" : ""}`}
				onClick={(_) => setExpanded(true)}
			>
				<input
					type="text"
					name="search"
					placeholder="Search..."
					className="search-input"
					value={value}
					onChange={(e) => setValue(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							fetchUSer();
						}
					}}
				/>
				<SearchIcon
					className="search-icon"
					onClick={fetchUSer}
					style={{ fontSize: 36, background: "transparent", width: "auto" }}
				/>
			</div>

			<div className="usuarios">
				{users?.map((item, index) => (
					<div
						key={index}
						style={{ animationDelay: `${index * 0.3}s` }}
						className="card-animated"
					>
						<ProfileCard user={item} click={deleteUser} />
					</div>
				))}
			</div>
		</section>
	);
};
