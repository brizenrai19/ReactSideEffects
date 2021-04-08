import React, { useState, useEffect } from 'react'
// 👉 TASK 1 - import the axios lib from node_modules
import axios from 'axios';

// 👉 TASK 2 - import the contants from constants/index.js
import {BASE_URL, API_KEY} from '../constants/index.js';
import Details from './Details'

export default function App() {
  const [friends, setFriends] = useState([])
  const [currentFriendId, setCurrentFriendId] = useState(null)

  const openDetails = id => {
    setCurrentFriendId(id)
  }

  const closeDetails = () => {
    setCurrentFriendId(null)
  }

  useEffect(() => {
    axios.get(BASE_URL+"/friends", {
      params:{
        "api_key":API_KEY
      }
    })
    .then(response =>{
      setFriends(response.data);
    })
    .catch(error => {
      console.log(error);
    })
  },[])

  const Friend = props => (
    <div className='friend'>
      {props.info.name}
      <button onClick={() => openDetails(props.info.id)}>
        See details
      </button>
    </div>
  )

  return (
    <div className='container'>
      <h1>Some of my friends:</h1>
      {
        friends.map(fr => {
          return <Friend key={fr.id} info={fr} />
        })
      }
      {
        currentFriendId && <Details friendId={currentFriendId} close={closeDetails} />
      }
    </div>
  )
}
