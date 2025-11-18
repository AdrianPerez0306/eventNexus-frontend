import CreateIcon from '@mui/icons-material/Create';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useProfileImg } from "../../context/contextImg";
import { SesionStorage } from '../../domain/user';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemove from '@mui/icons-material/PersonRemove';
import "./invitedUserCard.css";

interface userCard {
    user: SesionStorage;
    click: (id: number) => void;
    invited: boolean;
}

export const InviteUserCard = ({ user, click, invited }: userCard) => {

    const { img } = useProfileImg();

    const handleClick = () => {
        click(user.id);
    };

    useEffect(() => {
         
    }, [invited])
    return (
        <div className="interactiveUserCard">
            <img className="img" src={img} alt="profile" />
            <div className="title">
                <h4>{user.name + " " + user.lastname}</h4>
                <h4>{user.rol}</h4>
            </div>
            <div className='icon'>
                {invited ?
                    <PersonRemove
                        fontSize='inherit'
                        style={{ color: 'red', fontSize: 28 }}
                        onClick={handleClick}
                    />
                    :
                    <PersonAddIcon
                        fontSize='inherit'
                        style={{ color: 'green', fontSize: 28 }}
                        onClick={handleClick}
                    />
                }

            </div>

            {/* Diálogo de confirmación de eliminación */}
            {/* <Dialog open={open} onClose={handleClose}>
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
            </Dialog> */}
        </div>
    );
};
