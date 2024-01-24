import React, { useState } from 'react'

export default function Entry({ body, setEntryArray }) {
  const [showEditForm, setShowEditForm] = useState(false)
  const [title, setTitle] = useState(body.title)
  const [content, setContent] = useState(body.content)

  const handleTitle = (e) => {
    setTitle(e.target.value)
  }
  const handleContent = (e) => {
    setContent(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const currentDate = new Date().toJSON()
    const editEntry = async () => {
      try {
        const options = {
          method: "POST",
          body: JSON.stringify({
            id: body.id,
            title: title,
            content: content,
            dateTime: currentDate
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST'
          }
        }
        const response = await fetch("http://localhost:5147/api/Diary/CreateEdit", options)
        if (response.status == 200) {
          setEntryArray(prevState => prevState.map(el =>
            el.id == body.id ? { ...el, title: title, content: content, dateTime: currentDate } : el
          ))
        }
      } catch (err) {
        console.error({ error: err.message })
      }
    }

    editEntry()
    setShowEditForm(!showEditForm)
  }
  const toggleShowEditForm = (e) => {
    if ((!showEditForm && e.target.className !== "delete-button")) {
      setShowEditForm(!showEditForm)
    }
  }

  const handleDelete = () => {

    const deleteEntry = async () => {
      try {
        const options = {
          method: "DELETE",
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'DELETE'
          }
        }
        const response = await fetch(`http://localhost:5147/api/Diary/Delete?id=${body.id}`, options)
        if (response.status == 200) {
          setEntryArray(prevState => prevState.filter(el => el.id != body.id))
        }
      } catch (err) {
        console.error({ Error: err.message })
      }
    }
    deleteEntry()
  }

  return (
    <>
      {showEditForm ?
        <form onClick={toggleShowEditForm} onSubmit={handleSubmit} className='entry-form'>
          <input type="text" placeholder="Title" onChange={handleTitle} value={title} />
          <textarea onChange={handleContent} value={content} placeholder='Note'></textarea>
          <input type="submit" value="Save Changes" className='edit-submit-button' />
        </form>
        :
        <div className="entry" onClick={toggleShowEditForm}>
          <h2>{body.title}</h2>
          <p>{body.content}</p>
          <p>{body.dateTime.substring(0, 10)}</p>
          <button className="delete-button" onClick={handleDelete}>Delete</button>
        </div>
      }

    </>
  )
}
