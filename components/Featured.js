import styled from "styled-components"
import Center from "./Center"
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/Cart";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import Popup from "./Popup";

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


export default function Featured({product}) {

    const {addProduct} = useContext(CartContext);
    const [showPopup, setShowPopup] = useState(false);

    function addFeaturedToCart() {
        addProduct(product._id)
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


    return(
        <Bg>
            <Center>
                {showPopup && <Popup />}
                <ColumnsWrapper>
                    <Column>
                        <div>
                            <Title>Featured: {product.title}</Title>
                            <Desc>{product.description}</Desc>
                            <ButtonsWrapper>
                                <ButtonLink href={'/product/'+product._id} $white>Read more</ButtonLink>
                                <Button $primary onClick={() => addToCart()}>
                                    <CartIcon />
                                    Add to cart
                                </Button>
                            </ButtonsWrapper>
                        </div> 
                    </Column>
                    <Column>
                        <img src="https://ecommerce-project-nextjs.s3.amazonaws.com/1702699905202.png"/>
                    </Column>
                </ColumnsWrapper>
            </Center>
        </Bg>
    )
}