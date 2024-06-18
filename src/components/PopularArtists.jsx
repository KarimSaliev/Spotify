import React, {useEffect, useState, useContext} from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import { accessContext } from '../pages/Home';
function PopularArtists() {
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
    const navigate = useNavigate();
    const handleClick = (artistId)=>{
        navigate(`/artist/${artistId}`)
    }
    const getPopular = async () => {
        try {
          const response = await fetch('https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF', options);
          if (!response.ok) {
            throw new Error(`Error fetching popular artists: ${response.statusText}`);
          }
          const data = await response.json();
          const tracks = data.tracks.items;
          const tracks_after = await Promise.all(tracks.map(async (track)=>{
            const artistId = track.track.artists[0].id;
            const imageUrl = await getImage(artistId);
            return {
                id: artistId,
                name: track.track.artists[0].name,
                image: imageUrl
            };

          }));
          const uniqueData = [];
            const artistIds = new Set();
            tracks_after.forEach(track=>{
                if (!artistIds.has(track.id)) {
                    artistIds.add(track.id);
                    uniqueData.push(track);
                }
            });

        setPopular(uniqueData);
        } catch (error) {
          console.error('Failed to fetch popular artists:', error);
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
    
  return (
    <PopularContainer>
       <ListContainer>
       {popular.map((item)=>{
            return (
                <ul>
                    <Block onClick = {()=>handleClick(item.id)} key={item.id}>
                        <img src={item.image} alt="" />
                    <li>
                        <SubBlock>
                        <h3>{item.name}</h3>
                        <h4>{}</h4>
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

export default PopularArtists

const PopularContainer = styled.div`
    height: auto;
    color: white;
    h2 {
        margin-left: 2rem;
        position: fixed;
    }
    
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