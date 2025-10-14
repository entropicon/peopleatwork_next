"use client";

import React from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";

type SnackOptions = {
	message: string;
	variant?: AlertColor;
	duration?: number;
};

interface SnackbarContextValue {
	show: (options: SnackOptions) => void;
}

const SnackbarContext = React.createContext<SnackbarContextValue | undefined>(
	undefined
);

interface QueueItem extends SnackOptions {
	id: number;
}

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [queue, setQueue] = React.useState<QueueItem[]>([]);
	const [current, setCurrent] = React.useState<QueueItem | null>(null);
	const [open, setOpen] = React.useState(false);

	const processQueue = React.useCallback(() => {
		if (current || queue.length === 0) return;
		const [next, ...rest] = queue;
		setCurrent(next);
		setQueue(rest);
		setOpen(true);
	}, [current, queue]);

	React.useEffect(() => {
		if (!current) processQueue();
	}, [current, processQueue]);

	const show = React.useCallback((options: SnackOptions) => {
		setQueue((q) => [
			...q,
			{
				id: Date.now() + Math.random(),
				duration: 4000,
				variant: "info",
				...options,
			},
		]);
	}, []);

	const handleClose = (
		_?: unknown,
		reason?: "timeout" | "clickaway" | string
	) => {
		if (reason === "clickaway") return; 
	};

	const handleExited = () => {
		setCurrent(null);
	};

	return (
		<SnackbarContext.Provider value={{ show }}>
			{children}
			<Snackbar
				key={current?.id}
				open={open}
				autoHideDuration={5000}
				onClose={handleClose}
				TransitionProps={{ onExited: handleExited }}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}

			>
				<Alert
					onClose={handleClose}
					severity={current?.variant || "info"}
					variant="filled"
					sx={{ width: "100%" }}
				>
					{current?.message}
				</Alert>
			</Snackbar>
		</SnackbarContext.Provider>
	);
};

export const useSnackbar = () => {
	const ctx = React.useContext(SnackbarContext);
	if (!ctx) throw new Error("useSnackbar must be used within SnackbarProvider");
	return ctx;
};

type SnackAPI = {
	success: (message: string, duration?: number) => void;
	error: (message: string, duration?: number) => void;
	info: (message: string, duration?: number) => void;
	warning: (message: string, duration?: number) => void;
	_inject: (show: (o: SnackOptions) => void) => void; // internal
};

const snackImpl: SnackAPI = {
	success: () => console.warn("SnackbarProvider not mounted yet"),
	error: () => console.warn("SnackbarProvider not mounted yet"),
	info: () => console.warn("SnackbarProvider not mounted yet"),
	warning: () => console.warn("SnackbarProvider not mounted yet"),
	_inject: () => void 0,
};

export const snack = snackImpl;

const Injector: React.FC = () => {
	const { show } = useSnackbar();
	React.useEffect(() => {
		snack._inject = (s) => s; 
		snack.success = (message, duration) =>
			show({ message, variant: "success", duration });
		snack.error = (message, duration) =>
			show({ message, variant: "error", duration });
		snack.info = (message, duration) =>
			show({ message, variant: "info", duration });
		snack.warning = (message, duration) =>
			show({ message, variant: "warning", duration });
	}, [show]);
	return null;
};

export const GlobalSnackbarProvider: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => (
	<SnackbarProvider>
		<Injector />
		{children}
	</SnackbarProvider>
);

export default GlobalSnackbarProvider;
