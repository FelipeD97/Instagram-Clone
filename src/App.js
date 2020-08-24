import React from 'react';
import './App.css';
import Post from "./Post";

function App() {
  const [posts, setPosts] = useState([
    {
      username: "felipe_aalejandro",
      caption: "WOW it works",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQqLeHpuAUmTKMdcTWLevz1elcwImSMZKn8Ww&usqp=CAU"
    },
    {
      username: "felipe_aalejandro",
      caption: "WOW it works",
      imageUrl: "https://images.unsplash.com/photo-1597680460531-60a68dfbf6cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
    }
  ]);

  return (
    <div className="app">

      <div className="app_header">
        <img 
        className="app_headerImage" 
        src="https://cdn.worldvectorlogo.com/logos/instagram-2.svg" 
        alt="" />
      
      </div>
      <h1>Hello! Lets create an Instagram Clone</h1>

      {
        posts.map(post => (
          <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
        ))
      }

      <Post username="felipe_aalejandro" caption="WOW it works" imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQqLeHpuAUmTKMdcTWLevz1elcwImSMZKn8Ww&usqp=CAU"/>
      <Post username="theycallme_lipe" caption="I love this place" imageUrl="https://images.unsplash.com/photo-1597764279120-f1e53073301d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
      <Post username="yvng_lipe" caption="Love my dog" imageUrl="https://images.unsplash.com/photo-1597784156691-8388123e5d84?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
    </div>
  );
}

export default App;
