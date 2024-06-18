import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import styled from 'styled-components'
import Page from './pages/Page'
import LeftBar from './components/LeftBar'
function App() {
    return (
        <MainContainer>
          
        <BrowserRouter>
        <LeftBar/>
        <Page/>
        </BrowserRouter>
    </MainContainer>
    )
}
    
    


export default App

const MainContainer = styled.div`
    display: flex;
`