import Link from "next/link";
import styled from "styled-components";
import { ButtonStyle } from "./Button";

const StyledLink = styled(Link)`
    ${ButtonStyle};
    text-decoration: none;
    font-size: 1rem;
`;

export default function ButtonLink(props) {

    return (
        <StyledLink {...props} />
    );
}