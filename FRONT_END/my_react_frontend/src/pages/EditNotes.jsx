import React, { useEffect, useState } from 'react'
import Base from '../components/Base'
import { useNavigate, useParams } from 'react-router-dom';

function EditNotes({userNotes, setUserNotes}) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const {id} = useParams();



  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login", { replace: true });
    }
    const data = userNotes.find((data) => data._id === id)
    if (data) {
      setTitle(data.title)
      setDescription(data.description)
    }

  }, [id,userNotes]);

  

  //api integration
  async function editNewContent() {
    const notes = {
      title,
      description,
    };
    const response = await fetch(`https://my-social-media-xosc.onrender.com/api/content/user/edit/${id}`, {
      method: "PUT",
      body: JSON.stringify(notes),
      headers: {
        "Content-type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });

    const data = await response.json();
    if(!data.data){
      setErr(data.error)
    }else {
      const editableIndex = userNotes?.findIndex((data) => data._id === id);
      userNotes[editableIndex] = data.data;
      await setUserNotes([...userNotes]);
      setMsg(data.message)
    }

  }

  return (
    <>
      <Base />
      <div className="container">
        <h1 className="text-center mt-2">Edit Notes</h1>
      </div>
      <form>
        <div className="container">
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          <button type="button" className="btn btn-primary mt-2 px-5" onClick={editNewContent}>
            Edit Posts
          </button>

          {err ? (
            <div id="errorblock" className="text-danger">
              {err}
            </div>
          ) : (
            ""
          )}

          {msg ? (
            <div id="eoorblock" className="text-danger">
              {msg}
            </div>
          ) : (
            ""
          )}
        </div>
      </form>
    </>
  );
}

export default EditNotes