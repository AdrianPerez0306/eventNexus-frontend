import { Avatar, Dialog, DialogTitle, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { EventParticipantDTO } from "../../domain/createEvent";

export interface SimpleDialogProps {
  open: boolean;
  participants: EventParticipantDTO[];
  onClose: (value: string) => void;
}

export function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, participants, open } = props;

  const handleClose = () => {
    onClose(participants.length > 0 ? participants[0].name : '');
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Participantes</DialogTitle>
      <List sx={{ pt: 0 }}>
        {participants.map((participant) => (
          <ListItem disablePadding key={participant.id}>
            <ListItemButton onClick={() => handleListItemClick(participant.name)}>
              <Avatar alt="" src={participant.image} />
              <ListItemText primary={participant.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}