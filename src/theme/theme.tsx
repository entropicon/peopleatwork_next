import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
	interface TypeText {
		light: string;
	}

	interface Palette {
		border: Palette["primary"];
	}
	interface PaletteOptions {
		border?: PaletteOptions["primary"];
	}
}

const theme = createTheme({
	palette: {
		primary: {
			main: "#4640de",
			light: "#e9ebfd",
		},
		secondary: {
			main: "#f9a826",
			light: "#F8F8FD",
		},
		success: {
			main: "#00cc00",
		},
		error: {
			main: "#ff6550",
		},
		warning: {
			main: "#ff9800",
		},
		info: {
			main: "#2196f3",
		},
		text: {
			primary: "#252430",
			secondary: "#7C8493",
		},
		border: {
			main: "rgba(0, 0, 0, 0.12)",
		},
	},
	typography: {
		fontFamily: "Epilogue Regular, sans-serif",
		h1: {
			fontFamily: "Lora Bold, sans-serif",
			fontSize: "2.5rem",
		},
		h2: {
			fontFamily: "Lora Bold, sans-serif",
			fontSize: "2rem",
		},
		h3: {
			fontFamily: "Lora Bold, sans-serif",
			fontSize: "1.75rem",
		},
		h4: {
			fontFamily: "Lora Bold, sans-serif",
			fontSize: "1.5rem",
		},
		h5: {
			fontFamily: "Lora Bold, sans-serif",
			fontSize: "1.25rem",
		},
		h6: {
			fontFamily: "Lora Bold, sans-serif",
			fontSize: "1rem",
		},
		button: {
			fontSize: "1rem",
			textTransform: "none",
			fontFamily: "Epilogue Bold, sans-serif",
		},
	},
	components: {
		MuiTypography: {
			styleOverrides: {
				root: {
					"&.text-neutral-dark": {
						color: "#7C8493",
					},
					"&.text-neutral-darker": {
						color: "#515B6F",
					},
				},
			},
		},
		MuiFormLabel: {
			styleOverrides: {
				asterisk: {
					color: "#ff6550",
				},
			},
		},

		MuiAlert: {
			styleOverrides: {
				root: {
					alignItems: "center",
					justifyContent: "center",
					fontSize: "16px",
					fontFamily: "Epilogue Regular, sans-serif",
				},
			},
		},
		//select
		MuiSelect: {
			styleOverrides: {
				root: {
					border: "1px solid var(--border-color)",
					height: "40px",
					"& *": {
						border: "none!important",
						outline: "none!important",
					},
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					height: "40px",
					padding: "0 24px",
					textOverflow: "ellipsis",
					overflow: "hidden",
					whiteSpace: "nowrap",
					maxWidth: "100%",
					"&.iconButton": {
						padding: "0",
					},
					"&.active": {
						backgroundColor: "#e9ebfd",
					},
					"&.height-40": {
						height: "40px",
					},
					"&.MuiButton-contained :is(svg, path)": {
						fill: "#fff",
					},
					"&.MuiButton-contained": {
						color: "var(--white)",
					},
					"&.status-button": {
						height: "40px",
						width: "100%",
						borderRadius: "5px",
					},
				},
			},
		},
		MuiIconButton: {
			styleOverrides: {
				root: {
					"&.edit-button": {
						border: "1px solid var(--border-color)",
						borderRadius: 0,
						"& svg": {
							fill: "var(--primary-color)",
						},
					},
					"&.remove-button": {
						position: "absolute",
						top: "5px",
						right: "5px",
						width: 30,
						height: 30,
						backgroundColor: "var(--red)",
						"& svg": {
							fill: "var(--white)",
							fontSize: 20,
						},
					},
				},
			},
		},
		MuiButtonGroup: {
			styleOverrides: {
				root: {
					"& .MuiButton-root": {
						height: "100%",
						"&:hover": {
							boxShadow: "none",
						},
					},
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					height: "40px",
				},
			},
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					"& .MuiOutlinedInput-root": {
						height: "auto",
					},
					"& *::not(.MuiError)": {
						borderColor: "var(--border-color)!important",
					},
				},
			},
		},
		MuiAppBar: {
			styleOverrides: {
				root: {
					backgroundColor: "transparent",
					boxShadow: "none",
				},
			},
		},
		MuiListItem: {
			styleOverrides: {
				root: {
					color: "#515B6F",
					padding: 0,
				},
			},
		},
		MuiStack: {
			styleOverrides: {
				root: {
					"&.activeStep": {
						"& .img-box": {
							backgroundColor: "var(--primary-color)",
						},
						"& .MuiTypography-body2": {
							color: "var(--primary-color)",
						},
						"& .MuiTypography-body1": {
							fontFamily: "Epilogue Bold, sans-serif",
							color: "var(--text-color)",
						},
					},
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					boxShadow: "var(--box-shadow)",
					borderRadius: "1rem",
					border: "1px solid var(--border-color)",
				},
			},
		},
		MuiSlider: {
			styleOverrides: {
				root: {
					height: "6px",
					'& .MuiSlider-thumb[data-index="0"]': {
						color: "var(--primary-color)",
					},
					'& .MuiSlider-thumb[data-index="1"]': {
						color: "var(--primary-color)",
					},
					"& .MuiSlider-rail": {
						backgroundColor: "#E9EBFD",
					},
					"& .MuiSlider-track": {
						backgroundColor: "var(--primary-color)",
						border: 0,
					},
					"& .MuiSlider-valueLabel": {
						backgroundColor: "var(--primary-color)",
						"& span": {
							color: "#fff",
						},
					},
				},
			},
		},
		MuiChip: {
			styleOverrides: {
				root: {
					"& .MuiChip-deleteIcon ": {
						"& path": {
							fill: "var(--red)",
						},
					},
				},
			},
		},
		MuiFormControl: {
			styleOverrides: {
				root: {
					"& .Mui-error + .MuiAutocomplete-root fieldset": {
						border: "1px solid var(--red)",
						outline: "none",
					},
				},
			},
		},
		MuiCircularProgress: {
			styleOverrides: {
				root: {
					color: "var(--primary-color)!important",
				},
			},
		},

		MuiAccordion: {
			styleOverrides: {
				root: {
					backgroundColor: "transparent",
					boxShadow: "none",
				},
			},
		},
		MuiAccordionSummary: {
			styleOverrides: {
				root: {
					paddingLeft: 0,
					paddingRight: 0,

					"& .MuiAccordionSummary-content": {
						margin: 0,
						fontFamily: "Epilogue SemiBold, sans-serif",
						"&.Mui-expanded": {
							margin: 0,
						},
					},
					"&.Mui-expanded": {
						minHeight: "initial",
					},
				},
			},
		},
		MuiAccordionDetails: {
			styleOverrides: {
				root: {
					paddingLeft: 0,
					paddingRight: 0,
				},
			},
		},
		MuiContainer: {
			styleOverrides: {
				root: {
					"&.mt": {
						marginTop: "56px",
						paddingTop: "2rem",
						"@media (min-width:900px)": {
							marginTop: "64px",
						},
					},
				},
				maxWidthLg: {
					"@media (min-width: 1280px)": {
						maxWidth: "1280px",
					},
				},
			},
		},
	},
});

export default theme;
