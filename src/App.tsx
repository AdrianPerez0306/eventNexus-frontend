import { CssBaseline, styled, Switch, ThemeProvider } from "@mui/material";
import "./App.css";
import { ProfileImgProvider } from "./context/contextImg";
import { LoaderProvider } from "./context/loader/useLoader";
import { ToastProvider } from "./context/toast/useToast";
import { AppRouter } from "./routes";
import { useEffect, useState } from "react";
import { appTheme } from "./MUI/theme";
import { MaterialUISwitch } from "./MUI/switch";

const StyledSwitchToggle = styled(Switch)(({ theme }) => ({
	background: theme.palette.secondary.main,
	position: 'absolute',
	bottom: 80,
	right: 2,
	zIndex: 'tooltip',
	borderRadius: '1rem',
	transform: 'rotate(90deg)'
}));

const StyledSwitchToggleLogin = styled(Switch)(({ theme }) => ({
	// background: theme.palette.primary.main,
	position: 'absolute',
	top: 180,
	right: 20,
	borderRadius: '1rem',
	zIndex: 999
}));

function App() {
	const [darkMode, setDarkMode] = useState(false);
	const theme = appTheme(darkMode)
	// const [themeAux, setThemeAux] = useState<ThemeAux>('light');

	function handleChange() {
		setDarkMode((darkModeValue)=>!darkModeValue)
	}

	useEffect(()=>{
		document.body.setAttribute('data-theme', (darkMode ? "dark" : "light"));
	},[darkMode])

	return (
		<>
			<ThemeProvider theme={theme}>
				<ToastProvider>
					<LoaderProvider>
						<ProfileImgProvider>
							<CssBaseline />
							<AppRouter />
							<SwitchToggleThemeMode checked={darkMode} change={handleChange} />
						</ProfileImgProvider>
					</LoaderProvider>
				</ToastProvider>
			</ThemeProvider>

		</>
	);
}

export default App;

interface SwitchToggleThemeModeProps {

	checked: boolean;

	change: () => void;

}


type ThemeAux = 'light' | 'dark'
function SwitchToggleThemeMode(props: SwitchToggleThemeModeProps) {



	return (
		<>
			{window.location.pathname != '/login' &&
				<MaterialUISwitch checked={props.checked} onChange={props.change} ></MaterialUISwitch>
				// <StyledSwitchToggleLogin checked={props.checked} onChange={props.change} />
			}
		</>
	);
}