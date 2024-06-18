import React from 'react'
import styled from 'styled-components'
function SearchComponent({picture, title, color}) {
  return (
    <SearchOption style={{backgroundColor: color}}>
        <img src={picture} alt="" />
        <h3>{title}</h3>
    </SearchOption>
  )
}

export default SearchComponent

const SearchOption = styled.div`
    height: 160px;
    width: 260px;
    border-radius: 20px;
    margin-bottom: 1rem;
    position: relative;
    overflow: hidden;
    &:hover {
        cursor: pointer;
    }
    img {
        position: absolute;
        height: 80%;
        right: -5%;
        bottom: -10%;
        transform: rotate(40deg)
    }
    h3 {
        color: white;
        font-size: 1.3em;
        margin: 1.8rem 0 0 0.8rem;
    }
    `