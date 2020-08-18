import React from 'react';
import './App.css';
import Post from "./Post";

function App() {
  return (
    
    <div className="app">

      <div className="app_header">
        <img 
        className="app_headerImage" 
        src="https://cdn.worldvectorlogo.com/logos/instagram-2.svg" 
        alt="" />
      
      </div>
      <h1>Hello! Lets create an Instagram Clone</h1>

      <Post />
    </div>
  );
}

export default App;
