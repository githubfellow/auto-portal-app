import Home from '@/screens/home/Home';
import { ProductService } from '@/services/product/product.service';
import { GetStaticProps, NextPage } from 'next';

const HomePage: NextPage<{ products: any, topProducts: any[] }> = ({ products, topProducts }) => {
	return <Home products={products} topProducts={topProducts} />;
};

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: products } = await ProductService.getProducts();
		const { data: topProducts } = await ProductService.getTopProducts();
		return {
			props: {
				products,
				topProducts
			}
		};
	} catch (error) {
		return {
			notFound: true,
		};
	}
};

export default HomePage;
