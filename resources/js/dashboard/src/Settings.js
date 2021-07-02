import React from 'react'
import styled from "styled-components";
import ContentHeader from './components/ContentHeader';
import { useStateValue } from './StateProvider';

function Settings() {
    const [state, dispatch] = useStateValue()
    console.log(state);
    return (
        <Container>
            <ContentHeader title="Settings" subtitle="Account settings"/>
            Settings
        </Container>
    )
}

const Container = styled.div`
    
`
export default Settings
