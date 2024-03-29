import styled from "styled-components"
import Center from "./Center"
import Button, { ButtonStyle } from "./Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import Popup from "./Popup";
import Link from "next/link";

const Bg = styled.div`
    background-color: #222;
    color: #fff;
    padding: 5px 0;
`;

const Title = styled.h1`
    margin: 0;
    font-weight: normal;
    font-size: 1.5rem;

    @media screen and (min-width: 768px){
        font-size: 3rem;
    }

`;

const Desc = styled.p`
    color: #aaa;
    font-size: 0.8rem;
`;

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;
    
    img{
        max-width: 100%;
        max-height: 300px;
        display: block;
        margin: 0 auto;
    }
    
    div:nth-child(1){
        order: 2;
    }

    @media screen and (min-width: 768px){
        grid-template-columns: 1.25fr 0.75fr;

        div:nth-child(1){
            order: 0;
        }

        img{
            max-width: 100%;
        }
    }
`;

const Column = styled.div`
    display: flex;
    align-items: center;
`;

const ButtonsWrapper = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 25px;
`
const Soldout = styled.span`
    display: inline-flex;
    font-weight: normal;
    font-size: 0.75rem;
    margin: 0;

    text-decoration: none;
    color: white;
    background: red;
    padding: 6px 8px;
    border-radius: 5px;
`;


export default function Featured({product}) {

    const {addProduct} = useContext(CartContext);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState(0);
    
    function addToCart() {
        setPopupMessage(addProduct(product._id));
        setShowPopup(true);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopup(false)
        }, 1000);
        return () => clearTimeout(timer);
    }, [showPopup]);
    
    return(
        <Bg>
            <Center>
                {showPopup && <Popup popupMessage={popupMessage}/>}
                <ColumnsWrapper>
                    <Column>
                        <div>
                            <Title>Featured: {product.title}</Title>
                            <Desc>{product.description}</Desc>
                            <ButtonsWrapper>
                                <Link href={'/product/'+product._id}><Button $white>Read more</Button></Link>
                                {product.quantity ? (<Button $primary onClick={() => addToCart()}>Add to cart</Button>) : (<Soldout>SOLD</Soldout>)}
                            </ButtonsWrapper>
                        </div> 
                    </Column>
                    <Column>
                        <img src={product.images[0]}/>
                    </Column>
                </ColumnsWrapper>
            </Center>
        </Bg>
    )
}