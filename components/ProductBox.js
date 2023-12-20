import styled from "styled-components"
import Button from "./Button";
import CartIcon from "./icons/Cart";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import Popup from "./Popup";

const ProductWrapper = styled.div`

`;

const WhiteBox = styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;


    img{
        max-width: 100%;
        max-height: 100px;
    }
`;

const ImageDiv = styled.div`

    text-align: center;
    
    img{
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.4);
    }

`;

const Title = styled(Link)`
    font-weight: normal;
    font-size: 0.75rem;
    font-weight: bold;
    margin: 0;

    text-decoration: none;
    color: inherit;
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

export default function ProductBox({_id, title, description, price, images}){
    const {addProduct} = useContext(CartContext);
    const [showPopup, setShowPopup] = useState(false);
    const url = '/product/'+_id;

    function addToCart() {
        setShowPopup(true);
        addProduct(_id);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopup(false)
        }, 1000);
        return () => clearTimeout(timer);
      }, [showPopup]);
    
    return(
        <ProductWrapper>
            {showPopup && <Popup />}
            <WhiteBox>
                <Title href={url}>{title}</Title>
                <Link href={url}><ImageDiv><img src={images[0]} alt="" /></ImageDiv></Link>
                <div>
                    <PriceRow>
                        <Price>${price}</Price>
                        <div><Button $primary onClick={() => addToCart()}><CartIcon /></Button></div>
                    </PriceRow>
                </div>
            </WhiteBox>
        </ProductWrapper>
    )
}