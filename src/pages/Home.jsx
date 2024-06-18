import React, {useContext, createContext} from 'react'
import styled  from 'styled-components'
import Popular from '../components/Popular'
import PopularArtists from '../components/PopularArtists'
import { AccessContext } from './Page'
export const accessContext = createContext();
function Home() {
  const accessToken = useContext(AccessContext);
  return (
    <HomeContainer>
        <HomeContent>
          <accessContext.Provider value={accessToken}>
          <h2>Popular Hits</h2>
      <Popular value={accessToken}/>
    <h2>Popular Artists</h2>
    <PopularArtists value={accessToken}/>
          </accessContext.Provider>
      
        </HomeContent>
    </HomeContainer>
  )
}

export default Home

const HomeContainer = styled.div`
        width: 70%;
        height: auto;
        padding: 0.5rem;
    
`
const HomeContent = styled.div`
        display: flex;
        flex-direction: column;
        h2 {
          color: white;
          padding: 2rem 0 0 2rem;

        }
        width: 100%;
        height: 100%;
        background-color: #201f1f;
        border-radius: 30px;
`