import React, { useState } from "react";
import "./App.css";
import axios from "axios";
export default function App() {
  const [username,setUserName]=useState("");
  const [userInfo,setUserInfo]=useState("");
  const [error,setError]=useState("");

  function handleFormSubmit(e){
    e.preventDefault();
    axios.get(`https://api.github.com/users/${username}`)
    .then((res)=>{
      console.log(res.data);
      setUserInfo(res.data)
      setError("");
    }).catch(err=>{
      console.log(err);
      setError(err);
      setUserInfo("")
    });
    setUserName("")
  }
  return (
    <div>
      <div className="container">
        <h1 className="heading">Github Wrapper</h1>
        <form className="formCard " onSubmit={handleFormSubmit}>
          <input type="text" onChange={e=>setUserName(e.target.value)} value={username}/>
          <button>Search</button>
        </form>
        {userInfo && <div className="userDetaisCard">
          <div className="userDetailBody">
            <p className="name">{userInfo.name}</p>
            <em className="username">{userInfo.login}</em>
            <div className="follow">
              <p>Followers: {userInfo.followers}</p>
              <p> Following: {userInfo.following}</p>
            </div>
            <div className="prof">
              <p>🏢 {userInfo.company}</p>
              <p>✍️ Software Engineer at {userInfo.company}</p>
            </div>
          </div>
          <div>
            <div className="userImage">
              <img src={userInfo.avatar_url} />
            </div>
          </div>
        </div>}
        {error && <h1>Please Write Valid UserName</h1>}
      </div>
    </div>
  );
}
