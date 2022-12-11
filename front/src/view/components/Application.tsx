import * as React from "react";
import { useMemo } from "react";
import "./Application.scss";
import { useAppSelector } from "../../store";
import { toggleTheme } from "../../store/module/theme/theme.action";
import { createDrawerAction, withDrawer } from "./utils/drawer/Drawer.hoc";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { DarkMode, LightMode } from "@mui/icons-material";
import { Azure } from "./Azure";

function Application() {
	const dispatch = useDispatch();

	const { theme, themeIcon } = useAppSelector((s) => ({
		theme: s.theme.current,
		themeIcon: s.theme.current === "dark" ? <LightMode /> : <DarkMode />,
	}));

	const actions = useMemo(
		() => [
			createDrawerAction(theme === "dark" ? "Light Mode" : "Dark Mode", {
				icon: themeIcon,
				onClick: () => dispatch(toggleTheme()),
			}),
		],
		[dispatch]
	);

	const drawer = withDrawer({
		component: <Azure />,
		actions,
		title: "Azure",
	});

	return (
		<Box className={"Application"} bgcolor={"background.default"}>
			{drawer}
		</Box>
	);
}

export default Application;
