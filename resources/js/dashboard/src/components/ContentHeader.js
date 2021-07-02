import React from 'react'
import styled from "styled-components";

function ContentHeader(props) {
    return (
        <Container>
            <h2>
                {props.title}
            </h2>
            <p>
                {props.subtitle}
            </p>
        </Container>
    )
}

const Container = styled.div`
    h2{
        font-weight: bold;
        font-size: 24px;
    }
    p{
        color: #666;
    }
`;
export default ContentHeader
