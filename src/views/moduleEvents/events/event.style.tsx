import { Grid, styled } from "@mui/material";

export const StyledGrid = styled(Grid)(() => ({
    height: '100%',
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 25rem), 1fr))',
	gridAutoRows: 'minmax(auto, 25rem)',
	overflowY: 'scroll',
	padding: "clamp(16px, 5vw, 30px);",
	gap: "clamp(10px, 5vw, 20px);",
	

}));