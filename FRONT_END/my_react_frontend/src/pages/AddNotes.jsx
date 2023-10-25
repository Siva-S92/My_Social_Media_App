import React, { useEffect, useState } from "react";
import Base from "../components/Base";
import { useNavigate } from "react-router-dom";


function AddNotes({userNotes, setUserNotes}) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login", { replace: true });
    }
  }, []);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  //api integration
  async function postnewContent() {
    const notes = {
      title,
      description,
    };
    const response = await fetch(`https://my-social-media-xosc.onrender.com/api/content/user/add`, {
      method: "Post",
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
      setUserNotes([...userNotes, data.data]);
      setMsg(data.msg);
    }

  }

  return (
    <>
      <Base />
      <div className="container">
        <h1 className="text-center mt-2">Add Notes</h1>
      </div>
      <form>
        <div className="container">
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              className="form-control"
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              className="form-control"
              id="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>

          <button type="submit" className="btn btn-primary mt-2 px-5" onClick={postnewContent}>
            Add Notes
          </button>

          {err ? (
            <div id="eoorblock" className="text-danger">
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

export default AddNotes;
