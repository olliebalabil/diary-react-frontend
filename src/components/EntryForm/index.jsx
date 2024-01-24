import React, { useState } from 'react'

export default function EntryForm({setEntryArray}) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const handleTitle = (e) => {
    setTitle(e.target.value)
  }
  const handleContent = (e) => {
    setContent(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const currentDate = new Date()

    const postEntry = async () => {
      try {
        const options = {
          method: "POST",
          body: JSON.stringify({
            id: 0,
            title: title,
            content: content,
            dateTime: currentDate
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          }
        }
        const response = await fetch("http://localhost:5147/api/Diary/CreateEdit", options)
        const data = await response.json()
        if (response.status == 200) {
          setEntryArray(prevState => [...prevState, data.value])
          setTitle("")
          setContent("")
        }
      } catch (err) {
        console.error({error: err.message})
      }
    }

    if (title || content) {

      postEntry()
    }
  }

 
  return (
    <form onSubmit={handleSubmit} className='entry-form'>
      <input type='text' placeholder='Title' value={title} onChange={handleTitle}></input>
      <textarea name="content" value={content} onChange={handleContent} placeholder='Note'></textarea>
      <input type="submit" value="Save" />
    </form>
  )
}
