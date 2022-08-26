import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Divider from "@mui/material/Divider";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import product from "../../assets/images/product.png";

const ProductCard = ({ displayDeal = true }) => {
	return (
		<Card
			sx={{
				maxWidth: 290,
				"&:hover": {
					boxShadow:
						"0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
				},
			}}
		>
			<Box
				sx={{
					height: "319px",
					backgroundImage: `url(${product})`,
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
					backgroundPosition: "center",
					padding: "0.8rem",
					width: {
						xs: "290px",
					},
				}}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						height: "100%",
					}}
				>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						{displayDeal && (
							<Box sx={{ backgroundColor: "#fff", padding: "0.3rem" }}>
								<Typography
									variant="body2"
									color="text.secondary"
									fontFamily="'Digital-7 Mono'"
									sx={{
										fontSize: "20px",
										lineHeight: "11px",
										mb: "0.2rem",
									}}
								>
									00:00:02:58
								</Typography>
								<Box
									sx={{
										display: "flex",
										fontSize: "0.5rem",
										color: "secondary",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<EmojiEventsIcon
										sx={{
											fontSize: "0.5rem",
											color: "secondary.main",
											mr: "0.2rem",
										}}
									/>
									<Typography
										variant="body1"
										display="block"
										sx={{
											display: "flex",
											fontSize: "0.5rem",
											color: "secondary.main",
											textTransform: "capitalize",
										}}
									>
										Notobama
									</Typography>
								</Box>
							</Box>
						)}
						<IconButton
							aria-label="view-icon"
							sx={{
								backgroundColor: "#fff",
								height: "1.7rem",
								width: "1.7rem",
								ml: "auto",
							}}
							component="span"
						>
							<VisibilityIcon sx={{ fontSize: "0.9rem" }} />
						</IconButton>
					</Box>
					<Box
						sx={{
							marginTop: "auto",
							display: "flex",
							marginLeft: "auto",
						}}
					>
						<Box
							sx={{
								height: "1.7rem",
								width: "1.7rem",
								backgroundColor: "secondary.main",
								borderRadius: "50%",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Typography
								variant="body1"
								display="block"
								sx={{
									display: "flex",
									fontSize: "0.8rem",
									color: "white",
									textTransform: "uppercase",
									textAlign: "center",
								}}
							>
								3x
							</Typography>
						</Box>
					</Box>
				</Box>
			</Box>
			<CardContent>
				<Typography
					gutterBottom
					variant="body1"
					sx={{ color: "#5F5F5F" }}
					component="div"
				>
					Fashion Crochet Bag
				</Typography>
				<Typography
					variant="body2"
					sx={{ color: "secondary.main", fontStyle: "italic" }}
					gutterBottom
				>
					99% off
				</Typography>
				<Divider />
			</CardContent>
			<CardActions sx={{ display: "flex", justifyContent: "center" }}>
				<Box sx={{ mr: "1rem" }}>
					<Typography
						variant="body2"
						sx={{
							color: "#594E4E",
							textDecoration: "line-through",
							fontWeight: "bold",
						}}
						component="div"
					>
						₦6,200.00
					</Typography>
					<Typography
						gutterBottom
						variant="body1"
						sx={{ color: "#5F5F5F", fontWeight: "bold" }}
						component="div"
					>
						₦4,500.00
					</Typography>
				</Box>
				{displayDeal && (
					<Button
						variant="contained"
						sx={{
							textTransform: "capitalize",
							padding: "0.7rem 3rem",
							borderRadius: "0.5rem",
						}}
					>
						Deal
					</Button>
				)}
				{!displayDeal && (
					<IconButton
						variant="contained"
						sx={{
							textTransform: "capitalize",
							padding: "0.7rem 3rem",
							borderRadius: "0.5rem",
							backgroundColor: "secondary.main",
						}}
					>
						<ThumbUpIcon sx={{ color: "white" }} />
					</IconButton>
				)}
			</CardActions>
		</Card>
	);
};

export default ProductCard;
