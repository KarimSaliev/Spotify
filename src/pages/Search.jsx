import React, {useContext, useState}from 'react'
import styled from 'styled-components'
import { AccessContext } from './Page';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch, faArrowCircleDown, faBell} from '@fortawesome/free-solid-svg-icons';
import SearchComponent from '../components/SearchComponent';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import ListOfComponents from '../components/ListOfComponents';
import Category from '../components/Category';
function Search() {
    const [value, setValue] = useState('')
    const [loadingScreen, setLoadingScreen] = useState(false);
    const [queryData, setQueryData] = useState(null);
    const [selected, setSelected] = useState('all')
    const accessToken = useContext(AccessContext);
    const options = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      };
    const handleChange =(e)=>{
        if (e.target.value!=='') {
            fetchSearch(e.target.value)
        }
        setValue(e.target.value);
        
    }
    const handleClick = (button)=>{
        setSelected(button);
    }
    const fetchSearch = async(query)=>{
        try {
            const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist,playlist,album,track,show,episode,audiobook`, options)
            if (!response.ok) {
                throw new Error(response);
            }
            else {
                setLoadingScreen(true);
                const data = await response.json();
                console.log(data);
                setQueryData(data);
                setTimeout(()=>{
                    setLoadingScreen(false);
                },2000)
            }
        }
        catch(e) {
            throw new Error(e);
        }
    }
  return (
   <SearchContainer>
    <SearchNavbar>
    <div style={{position:'relative'}}>
        <input type="text" placeholder='What do you want to play?' value={value} onChange={(e)=>handleChange(e)}/>
        <i><FontAwesomeIcon icon={faSearch}/></i>
        </div>
     
    
     <UpperRightSection>
         <button>
             <FontAwesomeIcon icon={faArrowCircleDown}/>
             Install App
         </button>
         <button>
        
             <FontAwesomeIcon icon={faBell}/>
          
         </button>
         <button>
             K
         </button>
     </UpperRightSection>
    </SearchNavbar>
       

   <h2>Browse all</h2>
   {!loadingScreen&&!queryData&&(
    <Grid>
    <SearchComponent picture={'https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb'} title={'Music'} color={'pink'}/>
    <SearchComponent picture={'https://i.scdn.co/image/ab6765630000ba8a81f07e1ead0317ee3c285bfa'} title={'Podcasts'} color='darkgreen'/>
    <SearchComponent picture={'https://concerts.spotifycdn.com/images/live-events_category-image.jpg'} title={'Live Events'} color={'violet'}/>
    <SearchComponent picture={'https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe'} title={'Made For You'} color={'navy'}/>
    <SearchComponent picture={'https://i.scdn.co/image/ab67706f000000027ea4d505212b9de1f72c5112'} title={'New Releases'} color={'darkred'}/>
    <SearchComponent picture={'https://i.scdn.co/image/ab67fb8200005caf9e3dea60be755ccd97b7351f'} title={'Hip-Hop'} color={'darkviolet'}/>
    <SearchComponent/>
    <SearchComponent/>
    <SearchComponent/>
    <SearchComponent/>
    <SearchComponent/>
    <SearchComponent/>
</Grid>
   )}
   {loadingScreen&&(
    <div className="loading" style={{width:'100%', color: 'white',display:'flex', justifyContent:'center', alignItems:'center', height:'70%',fontSize:'10em'}}>
         <i>
        <FontAwesomeIcon icon={faSpotify} spin/>
    </i>
    </div>
   
   )}
        {queryData&&!loadingScreen&&(
             <>
             <ButtonContainer>
                 <button onClick={()=>handleClick('all')} className={selected==='all'?'active':''}>All</button>
                 <button onClick={()=>handleClick('playlist')} className={selected==='playlist'?'active':''}>Playlist</button>
                 <button onClick={()=>handleClick('albums')} className={selected==='albums'?'active':''}>Albums</button>
                 <button onClick={()=>handleClick('songs')} className={selected==='songs'?'active':''}>Songs</button>
                 <button onClick={()=>handleClick('artists')} className={selected==='artists'?'active':''}>Artists</button>
             </ButtonContainer>
             {selected==='all'&&(
                <>
                 <h2>Albums</h2>
             <ListOfComponents data={queryData.albums}/>
             <h2>Tracks</h2>
             <ListOfComponents data={queryData.tracks}/>
             <h2>Playlists</h2>
             <ListOfComponents data={queryData.playlists}/>
             </>
             
             )}
             </>
     
        )}
       
   
   </SearchContainer>
  )
}

export default Search

const SearchContainer = styled.div`
    width: 70%;
    height: auto;
    background-color:  #201f1f;
    border-radius: 30px;
    margin: 0.5rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    h2 {
        color: white;
        margin-top: 7rem;
        margin-left: 1rem;
    }
    i {
        &:nth-child(2){
            position: absolute;
            color: white;
            left: 0;
            margin-top: 0.8rem;
            margin-left: 0.7rem;
        }
       
    }
    input {
        width: 300px;
        padding: 1rem 2rem 1rem 2rem;
        font-size: 1em;
        border-radius: 20px;
        background-color: #4c4949;
        border: none;
        position: relative;
        color: white;
        &:focus {
            outline: 1px solid white;
            
        }

    }
`
const SearchNavbar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem 0 1rem;
    width: 100%;`
const UpperRightSection = styled.div`
    display: flex;
    width: 20%;
    align-items: center;
    justify-content: space-evenly;
    overflow-y: auto;
    position: absolute;
    right: 0;
    button {
        &:first-child {
            color: white;
            background-color: black;
            border: none;
            border-radius: 30px;
            width: 98px;
            padding: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8em;
            :first-child {
                margin: 0 0.3rem 0 0;
            }
            &:hover {
                cursor: pointer;
                transform: scale(1.1);
                transition: transform 0.2s ease-in-out;
            }

        }
        &:nth-child(2) {
            height: 30px;
            width: 30px;
            border-radius: 100%;
            border: none;
            color: white;
            background-color: black;
            font-size: 0.9em;
           
        }
        &:last-child {
            border-radius: 100%;
            border: none;
            height: 30px;
            width: 30px;
            font-size: 1em;
            background-color: #c12222;
        }

    }`


const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    padding: 1rem;

    `
const ButtonContainer = styled.div`
    display: flex;
    width: 550px;
    justify-content: space-evenly;
    padding: 1rem;
    button {
        background-color: #3c3b3b;
        border: none;
        color: white;
        border-radius: 30px;
        transition: 0.2s ease-in-out;
        padding: 0.5rem;
        font-size: 0.8em;
        width: 80px;
        &.active {
            background-color: white;
            color: black;
            &:hover {
                background-color: white;
            }
        }
        &:hover {
            background-color: #5b5858;
            cursor: pointer;
        }
        &:first-child {
            width: 50px;
        }
    }
    
`
