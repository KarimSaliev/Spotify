import React, {useEffect, createContext, useState} from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './Home'
import Artist from './Artist'
import Track from './Track';
import Search from './Search';
export const AccessContext = createContext();
function Page() {
  const [access, setAccess] = useState('');
  const makeRequest = async()=>{
    const url = 'https://accounts.spotify.com/api/token';
    const clientId = '4cb7abbbd2654f198cc2b9f90f495815';
    const clientSecret = '13c9732bbeb3467f9dac30dcfe93ef22';
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });
      if (!response.ok) {
        throw new Error('Network was not ok' + response)
      }
      const data = await response.json();
      const access_token = data.access_token;
      setAccess(access_token);
    } catch(e) {
      throw new Error(e);
    }
  }
  useEffect(()=>{
    makeRequest();
    const interval = setInterval(makeRequest, 3600000);
    return ()=> clearInterval(interval);
  },[])
  return (
    <AccessContext.Provider value ={access}>
       <Routes>
        <Route index element={<Home value={access}/>}/>
        <Route path='/artist/:id' element={<Artist value={access}/>}/>
        <Route path='/track/:id' element={<Track value={access}/>}/>
        <Route path='/search' element={<Search value={access}/>}/>
    </Routes>
    </AccessContext.Provider>
   
  )
}

export default Page
