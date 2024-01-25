import Center from "@/components/Center";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductBox_2 from "@/components/ProductBox_2";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";

const Title = styled.h1`
    font-size: 1.5rem;
`;

const ProductsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;

    @media screen and (min-width: 768px){
        grid-template-columns: 1fr 1fr 1fr;
    }
`;

const Container = styled.div`
display: flex;
flex-direction: column;
min-height: 100vh;
`;

export default function Gallery({products}) {

    return(
        <Container>

            <Header />
            <Center>
                <Title>Gallery</Title>
                
                <ProductsGrid>
                {products?.length > 0 && products.map(product => (
                    <ProductBox_2 key={product._id} {...product} />
                ))}
                </ProductsGrid>
            </Center>
            <Footer />
        
        </Container>
    )
}

export async function getServerSideProps() {
    await mongooseConnect();
    const products = await Product.find({}, null, {sort:{'_id':-1}});
    return {
      props:{
        products: JSON.parse(JSON.stringify(products)),
      }
    };
  }