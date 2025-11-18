import CreateIcon from '@mui/icons-material/Create';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from "@mui/material";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useProfileImg } from "../../context/contextImg";
import { SesionStorage } from '../../domain/user';
import "./profileCard.css";

interface userCard {
    user: SesionStorage;
    click: (id: number) => void;
}

export const ProfileCard = ({ user, click }: userCard) => {

    const nav = useNavigate();
    const { img } = useProfileImg();

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const toUpdate = () => {
         
        nav(`/module-admin/updateUser/${user.id}`);
    };

    const confirmDelete = () => {
        handleClose();
        click(user.id);
    };

    return (
        <div className="profile-box">
            <div className="row">
                <img className="img" src={img} alt="profile" />
                <div className="title">
                    <h4>{user.name + " " + user.lastname}</h4>
                    <h4>{user.rol}</h4>
                </div>
                <div className='icon'>
                    <CreateIcon
                        fontSize='inherit'
                        style={{ color: 'green', fontSize: 28 }}
                        onClick={toUpdate}
                    />
                    <DeleteForeverIcon
                        fontSize='inherit'
                        style={{ color: 'red', fontSize: 30 }}
                        onClick={handleOpen}
                    />
                </div>
            </div>

            {/* Diálogo de confirmación de eliminación */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirmar eliminación</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Estás seguro que deseas eliminar al usuario <strong>{user.name} {user.lastname}</strong>? Esta acción no se puede deshacer.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancelar</Button>
                    <Button onClick={confirmDelete} color="error" variant="contained">Eliminar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
