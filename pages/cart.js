import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Table from "@/components/Table";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;
    margin-top: 0px;

    @media screen and (min-width: 768px){
        grid-template-columns: 1fr 1fr;
    }
`;

const Box = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
    margin-top: 40px;
    min-height: 250px;
`;

const ProductInfoCell = styled.td`

    width: 60%;

    img{
        max-width: 80px;
        max-height: 80px;
        margin: 10px;
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.4);
    }
`;

const CityHolder = styled.div`
    display: flex;
    gap: 5px;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const Main  = styled.div`
  flex: 1;
`;

const TotalRow  = styled.tr`
  margin-top: 40px;
`;


export default function CartPage() {
    const {cartProducts, addProduct, removeProduct, clearCart} = useContext(CartContext);
    const [products, setProducts] = useState([]);

    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[address, setAddress] = useState('');
    const[address2, setAddress2] = useState('');
    const[city, setCity] = useState('');
    const[state, setState] = useState('');
    const[postal, setPostal] = useState('');
    const[country, setCountry] = useState('');
    const[isSuccess, setIsSuccess] = useState(false);
    
    useEffect(() => {
        if (cartProducts.length > 0) {
          axios.post('/api/cart', {ids:cartProducts})
            .then(response => {
              setProducts(response.data);
            })
        } else {
          setProducts([]);
        }
    }, [cartProducts]);

    useEffect(() => {
        if (window?.location.href.includes('success')){
            setIsSuccess(true);
            clearCart();
        }
    }, [])

    function lessOfThisProduct(id) {
        removeProduct(id);
    }

    async function goToPayment(){
        const response = await axios.post('/api/checkout', {
            name, email, address, address2, city, state, postal, country, cartProducts,
        });
        
        if(response.data.url){
            window.location = response.data.url;
        }
    }
    
    let total = 0;
    for (const productId of cartProducts) {
      const price = products.find(p => p._id === productId)?.price || 0;
      total += price;
    }

    if (isSuccess){

        
        return(
            <Container>
                <Header />
                <Main>
                    <Center>
                        <Box>
                            <h1>Thank you for your order!</h1>
                            <p>An email has been sent with your order details</p>
                        </Box>
                    </Center>
                </Main>
                <Footer />
            </Container>
        )
    }

    return(
        <Container>
            <Header />
                `<Main>
                    <Center>
                        <ColumnsWrapper>
                            <Box>
                                <h2>Cart</h2>
                                {!cartProducts?.length &&(<div>Your cart is empty</div> )}

                                {products?.length > 0  && (
                                    <>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>Item</th>
                                                <th>Price</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map(product => (
                                            <tr key={product._id}>

                                                <ProductInfoCell>
                                                    <div>
                                                        <img src={product.images[0]} alt="" />
                                                    </div>
                                                    {product.title}
                                                </ProductInfoCell>

                                                <td>${cartProducts.filter(id => id === product._id).length * product.price}.00</td>
                                                <td>
                                                    <Button $primary $plusminus onClick={() => lessOfThisProduct(product._id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                    </svg>
                                                    </Button>
                                                </td>
                                            </tr>
                                                ))}

                                            <TotalRow>
                                                <td></td>
                                                <td>${total}.00</td>
                                                <td></td>
                                            </TotalRow>
                                        </tbody>
                                    </Table>
                                    </>
                                )}

                            </Box>

                            {!!cartProducts?.length && (
                            <Box>
                                <h2>Order information</h2>
                                <Input type="text" placeholder="Name" value={name} name="name" onChange={ev => setName(ev.target.value)}/>
                                <Input type="text" placeholder="Email" value={email} name="email" onChange={ev => setEmail(ev.target.value)}/>
                                <Input type="text" placeholder="Address" value={address} name="address" onChange={ev => setAddress(ev.target.value)}/>
                                <Input type="text" placeholder="Address 2" value={address2} name="address2" onChange={ev => setAddress2(ev.target.value)}/>
                                <CityHolder>
                                    <Input type="text" placeholder="City" value={city} name="city" onChange={ev => setCity(ev.target.value)}/>
                                    <Input type="text" placeholder="State" value={state} name="state" onChange={ev => setState(ev.target.value)}/>
                                    <Input type="text" placeholder="Postal Code" value={postal} name="postal" onChange={ev => setPostal(ev.target.value)}/>
                                </CityHolder>
                                <Input type="text" placeholder="Country" value={country} name="country" onChange={ev => setCountry(ev.target.value)}/>
                                <Button $block $primary onClick={goToPayment}>Continue to payment</Button>
                            </Box>
                            )}
                            

                        </ColumnsWrapper>
                    </Center>
                </Main>`
                
            <Footer />
            
        </Container>
    )
}

