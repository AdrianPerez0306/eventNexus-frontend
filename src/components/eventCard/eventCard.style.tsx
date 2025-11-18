import { IconButton, Paper, styled, Theme } from "@mui/material";


export const StyledCard = styled(Paper)(({ theme }: { theme: Theme }) => ({
	borderRadius:'1rem',
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	boxShadow: theme.shadows[24],
    borderColor: theme.palette.success.main,
	// backgroundColor: theme.palette.primary.light,
    borderWidth: '10px',
    borderStyle: 'solid',
	padding:theme.spacing(1),
	// transition: 'ease-in 1s'

}));




export const StyledIconButton = styled(IconButton)(({ theme }: { theme: Theme }) => ({
	borderRadius: "0.5rem",
	":hover": {
		backgroundColor: theme.palette.grey[300],
	},
	// backgroundColor: theme.palette.primary.main,
	height: theme.spacing(3),
	width: theme.spacing(5),
}));
