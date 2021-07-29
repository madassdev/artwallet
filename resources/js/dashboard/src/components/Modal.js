import React, { useState, useRef } from "react";
import styled from "styled-components";

function Modal(props) {
    return (
        <>
            {props.show && (
                <Container>
                    <Content>
                        <Header>
                            <div>{props.header}</div>
                            {props.noClose || (
                                <span onClick={() => props.closeModal()}>
                                    <em className="icon ni ni-cross"></em>
                                </span>
                            )}
                        </Header>
                        <Body>{props.children}</Body>
                    </Content>
                </Container>
            )}
        </>
    );
}

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10000;
    background: rgba(0, 0, 0, 0.8);
    animation: fadeIn 0.3s;
`;

const Content = styled.div`
    width: 100%;
    max-width: 852px;
    background: white;
    max-height: 90%;
    overflow: initial;
    border-radius: 5px;
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 100px auto;
    top: 32px;
`;
const Header = styled.div`
    padding: 16px 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    font-size: 16px;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.6);
    font-weight: 400;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h2 {
        font-weight: 700;
    }
    span {
        height: 40px;
        width: 40px;
        min-width: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 3px;
        color: rgba(0, 0, 0, 0.5);
        cursor: pointer;
        em {
            pointer-events: none;
        }
    }
`;

const Body = styled.div`
    padding: 20px;
    display: inline-flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 30px;
`;

export default Modal;
