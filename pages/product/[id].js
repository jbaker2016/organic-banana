

import Button from "@/components/Button";
import CartIcon from "@/components/icons/Cart";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useContext, useEffect, useState } from "react";
import styled, {css} from "styled-components";
import Footer from "@/components/Footer";
import Table from "@/components/Table";
import Popup from "@/components/Popup";


const Title = styled.h1`
    font-size: 1.5rem;
`;

const ColWrapper = styled.div`

    margin-top: 30px;
    display: grid;
    gap: 30px;
    grid-template-columns: 1fr;

    @media screen and (min-width: 768px){
        grid-template-columns: 1.25fr 0.75fr;
    }
`;

const PriceRow = styled.div`
    display: flex;
    align-items: center; 
    justify-content: space-between;
    margin-top: 5px;
`;

const Price = styled.div`
    font-size: 1rem;
`;

const WhiteBox = styled.div`
    background-color: #fff;
    padding: 20px;
    margin-top: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

`;

const ImageDiv = styled.div`

    text-align: center;
    
    img{
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.4);
        max-width: 100%;
        max-height: 600px;
    }
`;

const SelectorDiv = styled.div`
    display: flex;
    align-items: center; 
    justify-content: space-evenly;
    margin-bottom: 20px;

`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const ImgButton = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
    
`;

const ImgLargeDiv = styled.div`

    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    background: #EEEEEE;
    width: 100%;
    height: 100%;

    
    img{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        max-width: 95%;
        max-height: 95%;
        object-fit: contain;
        border: 3px solid #fff;
        
    }
`;


export default function ProductPage({product}){

    const [imgIndex, setImgIndex] = useState(0);
    const [imgLarge, setImgLarge] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const {addProduct} = useContext(CartContext);

    function increaseImgIndex() {

        if (imgIndex == product.images.length - 1) {
            setImgIndex(0);
        } else{
            setImgIndex(imgIndex+1);
        }
    }

    function decreaseImgIndex() {
        if (imgIndex == 0) {
            setImgIndex(product.images.length - 1);
        } else{
            setImgIndex(imgIndex-1);
        }
    }

    function addToCart() {
        setShowPopup(true);
        addProduct(product._id);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopup(false)
        }, 1000);
        return () => clearTimeout(timer);
      }, [showPopup]);

    const properties = product.properties || 0;

    return(
        
        <Container>  
            
            {imgLarge && (<ImgButton onClick={() => setImgLarge(false)}><ImgLargeDiv><img src={product.images[imgIndex]} alt="" /></ImgLargeDiv></ImgButton>)}
            {showPopup && <Popup />}
            <Header />

            <Center>
                <ColWrapper>
                    <WhiteBox>
                        <SelectorDiv>
                            <Button $primary onClick={() => decreaseImgIndex()}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                            </Button>
                            <div>{imgIndex+1} of {product.images.length}</div>
                            <Button $primary onClick={() => increaseImgIndex()}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </Button>
                        </SelectorDiv>
                        <ImgButton onClick={() => setImgLarge(true)}><ImageDiv><img src={product.images[imgIndex]} alt="" /></ImageDiv></ImgButton>
                    </WhiteBox>
                    <div>
                        <Title>{product.title}</Title>
                        {Object.keys(properties)?.length > 0 && (<Table>
                            <thead>
                                <tr>
                                    <th>Property</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(properties).map((property) => (
                                <tr key={property}>
                                    <td>{property}</td>
                                    <td>
                                    {properties[property]}
                                    </td>
                                </tr>))}
                            </tbody>
                        </Table>)}
                        <p>{product.description}</p>
                    

                        <PriceRow>
                            <Price>${product.price}</Price>
                            <div><Button $primary onClick={() => addToCart()}><CartIcon /></Button></div>
                        </PriceRow>
                    </div>
                </ColWrapper>
            </Center>

            <Footer />
            
        

        </Container>
    )
}

export async function getServerSideProps(context) {
    await mongooseConnect();

    const {id} = context.query;
    const product = await Product.findById(id);
    return {
      props:{
        product: JSON.parse(JSON.stringify(product)),
      }
    };
  }