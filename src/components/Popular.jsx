import React, {useEffect, useState, useContext} from 'react'
import { accessContext } from '../pages/Home';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
function Popular() {
    const navigate = useNavigate();
    const [popular, setPopular] = useState([]);
    const accessToken = useContext(accessContext);
    const options = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      };
    useEffect(()=>{
        if (accessToken) {
          getPopular();
        }
    }, [accessToken])
    const getPopular = async () => {
        try {
          const response = await fetch('https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF', options);
          if (!response.ok) {
            throw new Error(`Error fetching popular tracks: ${response.statusText}`);
          }
          const data = await response.json();
          const prev_data = data.tracks.items;
          const after_data = await Promise.all(prev_data.map(async (item)=> {
            const artistId = item.track.artists[0].id;
            const imageUrl = await getImage(artistId);
            return {...item, image:imageUrl};
        }));
        setPopular(after_data);
        } catch (error) {
          console.error('Failed to fetch popular tracks:', error);
        }
      };
      
      const getImage = async (id) => {
        try {
          const response = await fetch(`https://api.spotify.com/v1/artists/${id}`, options);
          if (!response.ok) {
            throw new Error(`Error fetching image for artist ${id}: ${response.statusText}`);
          }
          const data = await response.json();
          return data.images[0].url;
     
        } catch (error) {
          console.error(`Failed to fetch image for artist ${id}:`, error);
        }
      };
      const handleClick = (trackId)=>{
        navigate(`/track/${trackId}`);
      }

  return (
    <PopularContainer>
       <ListContainer>
       {popular.map((item, index)=>{
            return (
                <ul>
                    <Block key={index} onClick = {()=>handleClick(item.track.id)}>
                        <img src={item.image} alt="" />
                    <li>
                        <SubBlock>
                        <h3>{item.track.name}</h3>
                        <h4>{item.track.artists[0].name}</h4>
                        </SubBlock>
                       
                        </li>
                    </Block>
                    
                </ul>
            )
        })}
        <h2></h2>
       </ListContainer>
        
    
        
    </PopularContainer>
  )
}

export default Popular

const PopularContainer = styled.div`
    height: auto;
    color: white;
    
`
const ListContainer = styled.div`
    display: flex;
    overflow-x: auto;
    ul {
        list-style: none;
        padding-left: 0;      
    }`
const Block = styled.div`
        border-radius: 30px;
        overflow: hidden;
        height: 300px;
        width: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 1rem;
        justify-content: center;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        &:hover {
            cursor: pointer;
        }
        
`
const SubBlock = styled.div`
    background-color: #181818;
    height: 200px;
    width: 300px;
    padding: 1rem 0 0 1rem;
    `