import React, {useState} from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHouse, faSearch, faBook} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
function LeftBar() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState('1')
    const handleClick = (id)=> {
        setSelected(id);
        if (id==='2') {
            navigate('/search')
        }
        if (id==='1') {
            navigate('/')
        }
    }
  return (
    <LeftBarContainer>
        <LeftBarContentUpper>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Spotify_logo_with_text.svg/1118px-Spotify_logo_with_text.svg.png?20160123211747" alt="" />
            <h3 id='1' onClick = {(e)=>handleClick(e.target.id)} className={selected==='1'? 'active': ''}><FontAwesomeIcon icon={faHouse}/>Home</h3>
            <h3 id='2' onClick = {(e)=>handleClick(e.target.id)} className={selected==='2'? 'active': ''}><FontAwesomeIcon icon={faSearch}/>Search</h3>
        </LeftBarContentUpper>
        <LeftBarContentLower>
            <h3> <FontAwesomeIcon icon={faBook}/>Your library</h3>
        <LeftBarContentLowerInner>
            <h4>Create your first playlist</h4>
            <p>It's easy, we'll help you</p>
            <button>Create playlist</button>
        </LeftBarContentLowerInner>
        <LeftBarContentLowerInner>
        <h4>Let's find some podcasts to follow</h4>
            <p>We'll keep you updated on new episodes</p>
            <button>Browse podcasts</button>
        </LeftBarContentLowerInner>
        </LeftBarContentLower>
    </LeftBarContainer>
  )
}

export default LeftBar

const LeftBarContainer = styled.div`
        width: 30%;
        height: auto;
        padding: 0.5rem 0 0.5rem 0.5rem;
        display: flex;
        flex-direction: column;
`
const LeftBarContentUpper = styled.div`
    width: 100%;
    height: 300px;
    border-radius: 30px;
    background-color:  #201f1f;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin-bottom: 0.5rem;
    h3 {
        color: grey;
        margin: 0 0 1rem 2rem;
        :first-child {
            margin-right: 0.7rem;
        }
        &.active {
            color: white;
        }
        &:hover {
            color: white;
            transition: 0.3s all ease;
            cursor: pointer;
        }
    }
 
    img {
        width: 120px;
        margin: 1rem 0 1.5rem 1.5rem;
    }`
const LeftBarContentLower = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 30px;
    background-color:  #201f1f;
    display: flex;
    flex-direction: column;
    h3 {
        color: white;
        align-self: flex-start;
        margin-left: 1rem;
        :first-child {
            margin-right: 0.7rem;
        }
    }
    align-items: center;
    padding-top: 1rem;
    `

const LeftBarContentLowerInner = styled.div`
        width: 100%;
        height: 150px;
        border-radius: 30px;
        background-color: #413f3f;
        margin: 0.5rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-evenly;
        * {
            margin-left: 1rem;
        }
        h4,p {
            color: white
        }
        button {
            border: none;
            height: 30px;
            width: 170px;
            border-radius: 30px;
            font-size: 0.8em;
            background-color: white;
            &:hover {
                transform: scale(1.05);
                transition: transform 0.3s all ease;
                cursor: pointer;
            }
        }

`