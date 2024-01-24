import { useState } from 'react'
import { Entries, EntryForm } from './components'

import './App.css'


function App() {
  const [entryArray,setEntryArray] = useState([])

  return (
    <>
    <h1 className='header'>notes</h1>
    <EntryForm setEntryArray={setEntryArray}/>
    <Entries entryArray={entryArray} setEntryArray={setEntryArray}/>
    </>
  )
}

export default App
