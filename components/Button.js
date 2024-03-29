import styled, {css} from "styled-components";

export const ButtonStyle = css`
    
    border: 0;
    padding: 5px 8px ;

    
    border-radius: 5px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    font-family: 'Roboto', sans-serif;
    

    svg{
        height: 16px;
    }

    ${props => props.$plusminus && css`
        width: 15px
        padding: auto;
    `}


    ${props => props.$block && css`
        display: block;
        width: 100%;
    `}

    ${props => props.$white && !props.$outline && css`
        background-color: #fff;
        color: #000;
    `}

    ${props => props.$white && props.$outline && css`
        background-color: transparent;
        color: #fff;
        border: 1px solid #fff;
    `}

    ${props => props.$primary && css`
        background-color: #5542F6;
        color: #fff;
    `}

    ${props => props.size === 'l' && css`
        font-size: 1.2rem;
        padding: 10px 20px;

        svg{
            height: 20px
        }
    `}
`;

const StyledButton = styled.button`
    ${ButtonStyle}
`;

export default function Button({children, ...rest}) {
    return(
        <StyledButton {...rest}>{children}</StyledButton>
    )
}