import React from 'react'
import styled from 'styled-components'
function ListOfComponents({data}) {

  return (
    <ListContainer>
      {data&&data.items&&(
        <ul>
          {data.items.map((datum)=>{
            return (
              <>
              {datum&&(
    
    <li key={datum.id}>
      {datum.images&&(
         <img src={datum.images[0].url} alt="" />
      )}
      {!datum.images&&datum.album.images&&(
        <img src={datum.album.images[0].url} alt="" />
      )}
   
   
    <h3>{datum.name}</h3>
    
    {datum.artists&&datum.artists.length>=2 && (
                <span> {datum.artists.slice(0,2).map(datum=>datum.name).join('&') + ' ...'} </span>
            )}
            {datum.aritsts&&datum.artists.length==1 && (
                <span>{datum.artists[0].name}</span>
            )}
    {datum.authors&&datum.authors.length>=2 && (
                <span> {datum.authors.slice(0,2).map(datum=>datum.name).join('&') + ' ...'} </span>
            )}
            {datum.authors&&datum.authors.length==1 && (
                <span>{datum.authors[0].name}</span>
            )}
  </li>
  )}

 
              </>
              
              
            )
          })}
    </ul>
      )}
        
    </ListContainer>
  )
}

export default ListOfComponents

const ListContainer = styled.div`
        display: flex;
        overflow-y: auto;
        &::-webkit-scrollbar { 
              display: none;}
        ul {
          display: flex;
          justify-content: space-evenly;
          
          li {
            background-color: black;
            height: 350px;
            width: 250px;
            list-style: none;
            margin: 1rem;
            overflow: hidden;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-end;   
            padding-bottom: 2rem; 
            position: relative;     
            overflow: hidden;  
            h3 {
              color: white;
              font-size: 0.8em;
              align-self: flex-start;
              margin: 0.8rem;
            }
            span {
              color: grey;
              font-size: 0.7em;
              align-self: flex-start;
              margin-left: 0.8rem;
            }
            img {
              height: 70%;
              object-fit: cover;
              position: absolute;
              top: 0;
            }
          }
        }
`