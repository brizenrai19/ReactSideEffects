import React, { useState, useEffect } from 'react'
import { BASE_URL, API_KEY } from '../constants'
import axios from 'axios'

export default function Details(props) {
  const { friendId, close } = props
  const [details, setDetails] = useState(null)

  useEffect(() =>{
    console.log("Side Effect Only Runs Once After Component Renders First Time");
    return() => console.log("Side Effect Running");
  },[])

  useEffect(() => {
    console.log("Click Listener Event");
    const customEventListener = (event) =>{
      console.log(event);
    }
    document.addEventListener("click",customEventListener);
    return () =>{
      console.log("Performing CleanUp");
      document.removeEventListener("click",customEventListener);
    }
  },[])

  useEffect(() => {
    console.log("Runs on every render");
    return() =>{
      console.log("Cleanup");
    }
  })

  useEffect(() => {
    axios.get(BASE_URL+`/friends/${friendId}`,{
      params:{
        "api_key":API_KEY
      }
    })
    .then((response) =>{
      setDetails(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  },[])

  return (
    <div className='container'>
      <h2>Details (of friend with id {friendId}):</h2>
      {
        details &&
        <>
          <p>{details.name} is {details.age}</p>
          <p>email is {details.email}</p>
          {name} likes:
          <ul>
            {details.hobbies.map((hobby) => <li key={hobby}>{hobby}</li>)}
          </ul>
        </>
      }
      <button onClick={close}>Close</button>
    </div>
  )
}
