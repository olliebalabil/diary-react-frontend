import React, {useState, useEffect} from 'react'
import Entry from '../Entry'

export default function Entries({entryArray,setEntryArray}) {
  useEffect(()=>{
    const getEntries = async () => {
      const options = {
        headers: {
          'Access-Control-Allow-Origin':'*',
          'Access-Control-Allow-Methods':'GET'
        }
      }
      const response = await fetch("http://localhost:5147/api/Diary/GetAll", options)
      const data = await response.json()
      if (response.status == 200) {
        setEntryArray(data.value)
      }
    }
    getEntries()
  },[])
  return (
    <div>{entryArray.map((el)=><Entry key={el.id} body={el} setEntryArray={setEntryArray}/>)}</div>
  )
}
