import theme from "@/theme/theme";
import {
	Facebook,
	LinkedIn,
	ShareOutlined,
	WhatsApp,
	X,
} from "@mui/icons-material";
import {
	SpeedDial,
	SpeedDialAction,
	styled,
	useMediaQuery,
} from "@mui/material";
import { memo, useCallback, useMemo } from "react";

const StyledSpeedDial = styled(SpeedDial)(() => ({
	"& .MuiFab-primary": {
		backgroundColor: "var(--white)",
		border: "1px solid var(--primary-color)",
		width: 50,
		height: 50,
		transition: "all 0.3s ease",
		"& svg": {
			fontSize: "1.5rem",
			fill: "var(--primary-color)",
		},
		boxShadow: "none",
		"&:hover": {
			backgroundColor: "var(--primary-color)",
			"& svg": {
				fill: "var(--white)",
			},
		},
	},
	"& .MuiSpeedDial-actions": {
		position: "absolute",
		margin: "1rem",
	},
}));

const ShareButtons = memo(
	({ id, direction = "left" }: { id: string; direction?: string }) => {
	const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"), { noSsr: true });

		const actions = useMemo(
			() => [
				{
					icon: <Facebook />,
					name: "Facebook",
					href: `https://www.facebook.com/sharer.php?u=${process.env.NEXT_PUBLIC_FRONT_URL}/job/${id}`,
				},
				{
					icon: <LinkedIn />,
					name: "Linkedin",
					href: `https://www.linkedin.com/sharing/share-offsite/?url=${process.env.NEXT_PUBLIC_FRONT_URL}/job/${id}`,
				},
				{
					icon: <X />,
					name: "X",
					href: `https://x.com/intent/tweet/?text=Hələdə Postu Oxumamısan?&url=${process.env.NEXT_PUBLIC_FRONT_URL}/job/${id}`,
				},
				{
					icon: <WhatsApp />,
					name: "Whatsapp",
					href: `https://api.whatsapp.com/send?text=H%C9%99l%C9%99d%C9%99%20postu%20oxumam%C4%B1san%3F%0A${process.env.NEXT_PUBLIC_FRONT_URL}/job/${id}`,
				},
			],
			[id]
		);

		const handleOpenLink = useCallback((url: string) => {
			if (typeof window !== "undefined") {
				window.open(url, "_blank");
			}
		}, []);

		return (
			<StyledSpeedDial
				ariaLabel="SpeedDial playground example"
				icon={<ShareOutlined />}
				direction={isMediumScreen ? "down" : (direction as "left" | "right")}
			>
				{actions.map((action, index) => (
					<SpeedDialAction
						key={index}
						icon={action.icon}
						tooltipTitle={action.name}
						onClick={() => handleOpenLink(action.href)}
					/>
				))}
			</StyledSpeedDial>
		);
	}
);

ShareButtons.displayName = "ShareButtons";
export default ShareButtons;
