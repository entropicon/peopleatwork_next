"use client";
import {
	Button,
	Container
} from "@mui/material";
import axios from "axios";

export default function PaymentPage() {
const pay = async () => {
	const response = await axios.post("http://127.0.0.1:8000/payment/epoint/create/", {
		amount: 0.1,
		order_id: 123,
		description: "Premium Plan"
	});
	console.log(response);
};

	return (
		<Container maxWidth="lg" sx={{ py: 6, mt: { xs: "56px", md: "64px" } }}>
			{/* Button */}
			<Button fullWidth variant="contained" onClick={pay}>
				Make a payment →
			</Button>
		</Container>
	);
}
