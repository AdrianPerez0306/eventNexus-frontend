import { Box, Fab, List, Menu, MenuItem, styled, Theme } from "@mui/material";

export const StyleBoxContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '15rem',
    width: '100%',
    flexWrap:'wrap',
    padding: theme.spacing(1),
    // paddingTop: 0,
    // paddingBottom: 0,
    gap: theme.spacing(1),
}));

export const StyledList = styled(List)(({ theme }: { theme: Theme }) => ({
    width:'min(100%, 45rem)',
    padding: theme.spacing(2),
    paddingTop: 0,
    paddingBottom: 0,
    borderRadius:'1rem'
}));

export const StyleMenuItem = styled(MenuItem)(() => ({
    width:'min(100%, 45rem)'
}));

export const StyledFloatingButton = styled(Fab)(() => ({
    position:'absolute',
    left:'2rem',
    bottom:'1rem',
    width:'60px',
    height:'60px',
    // backgroundColor: theme.palette.
}));

export const StyledFloatingButtonRight = styled(Fab)(() => ({
    position:'absolute',
    right:'2rem',
    bottom:'1rem',
    width:'60px',
    height:'60px',
    // backgroundColor: theme.palette.
}));

export const StyledFloatingConfirmEventButton = styled(Fab)(() => ({
    position:'absolute',
    right:'2rem',
    bottom:'1rem',
    width:'60px',
    height:'60px'

}));

