import styled from "styled-components"

const StyledDiv = styled.div`
    max-width: 800px;
    margin: 0 auto;
    margin-bottom: 40px;
    
    padding: 0 20px;
    flex: 1;
`;

export default function Center({children}) {

    return (
        <StyledDiv>{children}</StyledDiv>
    )
} 