import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Carousel from "@/shared/ui/carousel/Carousel";
import Heading from "@/shared/ui/heading/Heading";

const TopProductsCarousel: FC<{ products: any[] }> = ({products}) => {

	return (
		<>
			<Box sx={{ display: 'flex', justifyContent: 'center', mt: '1rem' }}>
				<Heading title='Лучшие товары'></Heading>
			</Box>
			<Box
				display="flex"
				justifyContent="center"
				sx={{ background: "#f8f9fa", p: 2, width: '50%', margin: '1rem auto' }}
			>
				<Carousel products={products} />
			</Box>
		</>
	)
};

export default TopProductsCarousel;