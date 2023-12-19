import Link from "next/link"
import styled from "styled-components"
import Center from "./Center";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import Hamburger from "./icons/Hamburger";

const StyledHeader = styled.header`
    background-color: #222;
`;

const Logo = styled(Link)`
    color: #fff;
    text-decoration: none;

    display: flex;
    align-items: center;
    gap: 5px;

    position: relative;
    z-index: 3;
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0 0;
`;

const NavLink = styled(Link)`
    display: block;
    color: #aaa;
    text-decoration: none;
`;

const StyledNav = styled.nav`

    gap: 15px;
    position: static;
    display: flex;
    padding: 200;
    background-color: #222;

    @media screen and (min-width: 768px){
        display: flex;
        position: static;
        padding: 0;
    }
`;

const LogoSVG = styled.img`
    height: 60px;

`;

export default function Header() {

    const {cartProducts} = useContext(CartContext)
    const [mobileNavActive, setMobileNavActive] = useState(false);

    return(
        <StyledHeader>
            <Center>
                <Wrapper>
                    <Logo href={'/'}>
                        <LogoSVG src="../banana2.svg" alt="" />
                    </Logo>
                    <StyledNav $mobileNavActive={mobileNavActive}>
                        <NavLink href={'/'}>Home</NavLink>
                        <NavLink href={'/products'}>All products</NavLink>
                    {/*    <NavLink href={'/categories'}>Categories</NavLink> */}
                    {/*    <NavLink href={'/account'}>Account</NavLink> */}
                        <NavLink href={'/cart'}>Cart ({cartProducts.length})</NavLink>
                    </StyledNav>

                </Wrapper>
            </Center>
        </StyledHeader>
    )
}