import React, {useState, useEffect, useContext} from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faPlusCircle, faAnglesRight} from '@fortawesome/free-solid-svg-icons';
import { AccessContext } from './Page';
import { useNavigate } from 'react-router-dom';
function Track() {
    const accessToken = useContext(AccessContext);
    const options = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      };
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [album, setAlbum] = useState('');
    const [artists, setArtists] = useState([]);
    const [duration, setDuration] = useState('');
    const [ids, setIds] = useState('');
    const [recTracks, setRecTracks] = useState([]);
    const dataId = useParams();  
    useEffect(()=>{
        if (accessToken && dataId.id) {   
            getTrack();
            
        }
        
    },[accessToken, dataId.id]);
    useEffect(()=>{
        if (ids) {
            getRecommendations();
        }
    }, [ids])
   const getTrack = async()=> {
    try {
        const response = await fetch(`https://api.spotify.com/v1/tracks/${dataId.id}`, options)
        if (!response.ok) {
            console.log('Trouble finding track info')
            throw new Error(response)
        }
        else {
            const data = await response.json();
            setIds(data.artists.map(artist=>artist.id).join(','))
            setImage(data.album.images[0].url);
            setName(data.name);
            setAlbum(data.album.name);
            const artistNames = data.artists.map(artist=>artist.name)
            setArtists(artistNames);
            const duration = convertToMinutes(data.duration_ms)
            setDuration(duration);

        }
    }
    catch(e) {
        throw new Error(e);
    }
   }
   const convertToMinutes = (ms) => {
    const mins = Math.floor(ms / 60000);
    const remainder = ms % 60000;
    const secs = Math.floor(remainder / 1000);
    const formattedSecs = secs < 10 ? `0${secs}` : secs;
    const duration = `${mins}:${formattedSecs}`;
    return duration;
};
    const getRecommendations = async()=>{
        const check = localStorage.getItem('recommended');
        if (check) {
            setRecTracks(JSON.parse(check))
        }
        else {
            try {
                const response = await fetch(`https://api.spotify.com/v1/recommendations?seed_artists=${ids}`, options)
                if (!response.ok) {
                    console.log('Trouble fetching')
                    throw new Error(response);
                }
                else {
                    const data = await response.json();
                    setRecTracks(data.tracks)
                    localStorage.setItem('recommended', JSON.stringify(data.tracks))
                }
            }
            catch(e) {
                throw new Error(e);
            }
        }
       
    }
  
  return (
    <TrackContainer>
        <Brief>
        <img src={image} alt="" />
        <TextBox>
        <h3>{name}</h3>
            <ul>

                <li> {artists.join(', ')}</li>
                <li> {duration}</li>
                <li>{album}</li>
            </ul>
        </TextBox>
        <PlayContainer>
            <FontAwesomeIcon icon={faCirclePlay}/>
            <FontAwesomeIcon icon={faPlusCircle}/>
            <FontAwesomeIcon icon={faAnglesRight}/>
            
            
        </PlayContainer>
        </Brief>
        <h2>Recommended</h2>
        <p>Based on this artist</p>
        <RecommendedContainer>
        <ListContainer>
       {recTracks.map((track, index)=>{
            return (
                <ul>
                    <Block key={index} onClick={()=>handleClick(track.id)}>
                        <img src={track.album.images[0].url} alt="" />
                    <li>
                        <SubBlock>
                        <h3>{track.name}</h3>
                        <ArtistBox>
                        
                        {track.artists.length>=2 && (
                            <span> {track.artists.slice(0,2).map(artist=>artist.name).join('&') + ' ...'} </span>
                        )}
                        {track.artists.length==1 && (
                            <span>{track.artists[0].name}</span>
                        )}
                        </ArtistBox>
                        
                      
                      
                       
                        </SubBlock>
                       
                        </li>
                    </Block>
                    
                </ul>
            )
        })}
        <h2></h2>
       </ListContainer>
        
        
    
        
    </RecommendedContainer>
      
    </TrackContainer>
  )
}


const TrackContainer = styled.div`
        width: 70%;
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-radius: 30px;
        overflow: hidden;
        margin: 0.5rem 0 0.5rem 0.5rem;
        h2 {
        color: white;
        margin: 2rem 0 1rem 2rem;       
    }
    p {
        color: grey;
        margin-left: 2rem;
    };
`
const Brief = styled.div`
    width: 100%;
    height: 400px;
    position: relative;
    display: flex;
    align-items: center;
    img {
        position: absolute;
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

    `
const PlayContainer = styled.div`
        display: flex;
        height: 70px;
        width: 200px;
        position: absolute;
        color: white;
        bottom: 5%;
        left: 3%;
        align-items: center;
        justify-content: space-evenly;
        transform: translate3d(0,0,0);
        * {
            filter: drop-shadow(1px 1px 5px black);
        }
        :first-child {
            font-size: 4em;
            color: green;
            &:hover {
                cursor: pointer;
            }
        }
        :nth-child(2) {
            font-size: 1.5em;
        }

`
const TextBox = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    * {
        margin-left: 2rem;
    }
    ul {
        display: flex;

        li {
            color: white;
            text-shadow: 1px 1px 5px black;
        }
    }
    h3{
        color: white;
        font-size: 3em;
        text-shadow: 1px 1px 20px black;
    }`

const RecommendedContainer = styled.div`
    overflow-y: auto;
    width: 100%;
    height: 400px;`


const ListContainer = styled.div`
    display: flex;
    overflow-x: auto;
    color: white;
    ul {
        list-style: none;
        padding-left: 0;      
    }`
const Block = styled.div`
position: relative;
border-radius: 30px;
height: 300px;
width: 300px;
display: flex;
flex-direction: column;
align-items: center;
margin: 1rem;
justify-content: center;
overflow: hidden;
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
    display: flex;
    flex-direction: column;

`
const ArtistBox = styled.div`
    display: flex;
    span {
        font-size: 0.8em;
        color: grey;
        
    }`
    


export default Track
