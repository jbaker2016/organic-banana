import Featured from "@/components/Featured"
import Footer from "@/components/Footer";
import Header from "@/components/Header"
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components"

const Container = styled.div`
display: flex;
flex-direction: column;
min-height: 100vh;
`;

const Main  = styled.div`
  flex: 1;
`;

export default function HomePage({featuredProduct, newProducts}) {

  return(
    
    <Container>
      <Header />

      <Main>
        <Featured product={featuredProduct}/>
        <NewProducts products={newProducts}/>
      </Main>


      <Footer />
    </Container>
  )
  
}


export async function getServerSideProps() {
  const featuredProductId = '657d23d9c64ed6e6fa44dc5f';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);

  const newProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:4})

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts))
    },
  }
}