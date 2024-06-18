import React, {useState, useEffect, useContext} from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faAnglesRight, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { AccessContext } from './Page';
import { useNavigate } from 'react-router-dom';
function Artist() {
    const navigate = useNavigate()
    const accessToken = useContext(AccessContext);
    const options = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      };
    const data = useParams();
    const [name, setName] = useState('');
    const [popularTracks, setPopularTracks]=useState([]);
    const [img, setImg] = useState('');
    const [genres, setGenres] = useState([]);
    const [artistAlbums, setAlbums] = useState([]);
    const [related, setRelated] = useState([]);
    const [activeTab, setActiveTab] = useState('releases')
    useEffect(()=>{
        if (accessToken && data.id) {
            getArtist();
            getArtistPopular();
            getArtistAlbums();
            getRelatedArtists();
        }
        
    },[accessToken, data.id]);
    const getArtistPopular = async()=>{
        try {
            const response = await fetch(`https://api.spotify.com/v1/artists/${data.id}/top-tracks`, options)
            if (!response.ok) {
                console.log('Trouble authorizing')
            }
            else {
                const data = await response.json();
                setPopularTracks(data.tracks);
            }
        }
        catch(e) {
            return new Error(e);
        }
    }
    const getArtistAlbums = async()=>{
        try {
            const response = await fetch(`https://api.spotify.com/v1/artists/${data.id}/albums`,options)
            if (!response.ok) {
                console.log('Error authorizing')
            }
            else {
                const data = await response.json();
                setAlbums(data.items);
            }
        }
        catch(e) {
            console.log('Error')
            throw new Error(e);
        }
    }
    const getArtist = async()=>{
        try {
            const response = await fetch(`https://api.spotify.com/v1/artists/${data.id}`,options);
            if (!response.ok) {
                console.log('Unauthorized')
            }
            else {
                const data = await response.json();
                setName(data.name);
                setImg(data.images[0].url)
                setGenres(data.genres)
            
            }
            
        }
        catch(e) {
            console.log('Trouble with finding an artist')
            throw new Error(e);
            
        }
    }
    const getRelatedArtists =  async()=>{
        try {
            const response = await fetch(`https://api.spotify.com/v1/artists/${data.id}/related-artists`, options)
            if (!response.ok) {
                console.log('Could not fetch')
                throw new Error(response);
            }
            else {
                const data = await response.json();
                setRelated(data.artists)

            }
        }
        catch(e) {
            throw new Error(e);
        }
    }
    const handleClickArtist = (artistId)=>{
        window.scrollTo({top:0, behavior: 'smooth'});
        navigate(`/artist/${artistId}`)
    }
    const handleClickTrack = (trackId)=>{
        window.scrollTo({top:0, behavior: 'smooth'});
        navigate(`/track/${trackId}`)
    }
  return (
    <ArtistContainer>
        <Brief>
        <img src={img} alt="" />
        <TextBox>
        <h3>{name}</h3>
        <p>{genres.join(', ')}</p>
        </TextBox>
        <PlayContainer>
            <FontAwesomeIcon icon={faCirclePlay}/>
            <h3>Follow</h3>
            <FontAwesomeIcon icon={faAnglesRight}/>
        </PlayContainer>
        </Brief>
        <h2>Popular tracks</h2>
        <PopularTracksContainer>
            
            {popularTracks.map((track,index)=>{
                return (
                    <ul>
                        <li key={index}>
                      
                            <TrackBox>
                            <FontAwesomeIcon icon={faPlayCircle}/>
                            <img src={track.album.images[0].url} alt="" />
                         
                            
                            
                           
                            <h4>
                             {track.name}
                            </h4>
                            <p>
                                Album: {track.album.name}
                            </p>
                           
                            </TrackBox>
                        </li>
                    </ul>
                )
            })}
        </PopularTracksContainer>     
        <h2>Discography</h2>
        <Discography>
        <OptionsContainer>
            <button className = {activeTab === 'releases'? 'active': ''} onClick = {()=>setActiveTab('releases')}>Popular releases</button>
            <button className = {activeTab === 'albums'? 'active': ''} onClick ={()=>setActiveTab('albums')}>Albums</button>
        </OptionsContainer>
        {activeTab==='releases' && (
             <PopularReleasesContainer>
             {popularTracks.map((track, index)=>{
                 return(
                     <ul>
                         <li key={index} onClick = {()=>handleClickTrack(track.id)}> 
                         <TrackBox>
                         <FontAwesomeIcon icon={faPlayCircle}/>
                         <img src={track.album.images[0].url} alt="" />
                             <h4>{track.name}</h4>
                             <p>Release date: {track.album.release_date}</p>
                             
                         </TrackBox>
                         </li>
                             
                     </ul>
                 )
             })}
         </PopularReleasesContainer>
        )}
        {activeTab==='albums' &&(
             <PopularAlbumsContainer>
            
             {artistAlbums.map((album,index)=>{
                 return(
                     <ul>
                         
                         <li key={index}>
                         <AlbumBox>
                         <img src={album.images[0].url} alt="" />
                         <h4>
                         {album.name}
                         </h4>
                             <p>
                                 Release: {album.release_date}
                             </p>
                           
                         </AlbumBox>
                         </li>
                     </ul>
                 )
             })}
         </PopularAlbumsContainer>
        )}
       
     </Discography>
        <h2>See Also</h2>
        <SeeAlsoContainer>
        {related.map((artist, index)=>{
                return(
                    <ul>
                        <li key={index} onClick = {()=>handleClickArtist(artist.id)}>
                            <RelatedArtistBox>
                            <img src={artist.images[0].url} alt="" />
                            <h4>{artist.name}</h4>
                            </RelatedArtistBox>
                            
                        </li>
                    </ul>
                )
            })}
        </SeeAlsoContainer>

    </ArtistContainer>
  )
}


const ArtistContainer = styled.div`
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
        margin: 2rem;
        
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
        height: 30px;
        width: 200px;
        position: absolute;
        color: white;
        bottom: 9%;
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

`
const TextBox = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    * {
        margin-left: 2rem;
    }
    h3{
        color: white;
    
        font-size: 4em;
    }
    p {
        color: white;
        padding: 0.5rem;
    }`

const PopularTracksContainer = styled.div`
    overflow-y: auto;
    width: 100%;
    height: 400px;`

const TrackBox = styled.div`
    height: 100px;
    width: 100%;
    display: flex;
    color: white;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    overflow: hidden;
    &:hover {
        background-color: #2c2c2c;
        transition: 0.5s all ease;
        cursor: pointer;
        :first-child {
            transform: translateY(0);
            transition: transform 0.3s ease-in-out;
        }

    }
    img {
            width: 100px;
            object-fit: cover;
            margin-left: 2rem;
        }
    p {
        align-self: flex-end;
        font-size: 0.5em;
        color: grey;
        font-family: 'Montserrat';
        position: absolute;
        right: 2%;

    }
    h4 {
        padding: 1rem;
    }
    :first-child {
        color: green;
        font-size: 2.5em;
        margin-left: 0.5rem;
        transform: translateY(100%);
    }

    `
const PopularAlbumsContainer = styled.div`
    overflow-y: auto;
    width: 100%;
    height: 400px;
`

const AlbumBox = styled.div`
    height: 100px;
    width: 100%;
    display: flex;
    color: white;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    &:hover {
        background-color: #2c2c2c;
        transition: 0.5s all ease;
        cursor: pointer;

    }
    img {
            width: 100px;
            object-fit: cover;
            margin-left: 2rem;
        }
    p {
        align-self: flex-end;
        font-size: 0.5em;
        color: grey;
        font-family: 'Montserrat';
        position: absolute;
        right: 2%;

    }
    h4 {
        padding: 1rem;
    }`

const SeeAlsoContainer = styled.div`
    width: 100%;
    height: 400px;
    display: flex;
    overflow-x: auto;

    ul {
        list-style: none;
        padding-left: 0;
    }`
const RelatedArtistBox = styled.div`
    height: 200px;
    width: 200px;
    border-radius: 30px;
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &:hover {
        background-color: #2c2c2c;
    }
    margin: 0 0.5rem 0 2rem;
    img {
        width: 80%;
        object-fit: cover;
    }
    h4 {
        margin: 0.2rem;
        color: white;
    }
    `
const Discography = styled.div`
height: 400px;
width: 100%;
display: flex;
flex-direction: column;


`
const OptionsContainer = styled.div`
width: 100%;
height: 30px;
display: flex;
margin: 0 0 2rem 1rem;
button {
    display: flex;
    margin: 1rem;
    font-size: 1em;
    padding: 1rem;
    align-items: center;
    border: none;
    border-radius: 30px;
    background-color: #524f4f;
    color: white;
    &:hover {
        cursor: pointer;
    }
    &.active {
        background-color: white;
        color: black;
        transition: 0.3s all ease;
    }

}
`
const PopularReleasesContainer = styled.div`
height: 100%;
width: 100%;
color: white;
overflow-y: auto;

`
export default Artist
