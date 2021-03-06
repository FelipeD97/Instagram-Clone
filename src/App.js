import React, {useState, useEffect} from 'react';
import './App.css';
import Post from "./Post";
import { db, auth } from "./firebase";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import ImageUpload from "./ImageUpload";
import InstagramEmbed from "react-instagram-embed";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  // UseEffect: Runs a piece of code based on a specific condition
 
  // Anytime a user is created, this useEffect runs
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in...
        console.log(authUser);
        setUser(authUser);
      }
      else {
        // user has logged out...
        setUser(null);
      }
    })

    return () => {
      //perform some clean up actions
      unsubscribe();
    }
  }, [user, username]);
  
  useEffect(() => {
    db.collection('posts').orderBy("timestamp", "desc").onSnapshot(snapshot => {
      // every time a new post is made, this code runs
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, []);

  const signUp = (e) => {
    e.preventDefault();
    // passing email and password from state into user authentication
    
    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      authUser.user.updateProfile({
        displayName : username
      })
    })
    .catch((error) => alert(error.message))
    
    setOpen(false);
  }

  const signIn = (e) => {
    e.preventDefault();

    auth
    .signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message));

    setOpenSignIn(false);
  }

  return (
    <div className="app">
      
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app_signup">
            <center>
              <img 
                className="app_headerImage" 
                src="https://cdn.worldvectorlogo.com/logos/instagram-2.svg" 
                alt="" 
              />
            </center>
            <Input 
              placeholder="username" 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
            />
            <Input 
              placeholder="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <Input 
              placeholder="password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <Button type="submit" onClick={signUp}>Sign Up</Button>
          </form>
        </div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app_signup">
            <center>
              <img 
                className="app_headerImage" 
                src="https://cdn.worldvectorlogo.com/logos/instagram-2.svg" 
                alt="" 
              />
            </center>
            <Input 
              placeholder="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <Input 
              placeholder="password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <Button type="submit" onClick={signIn}>Sign In</Button>
          </form>
        </div>
      </Modal>

      <div className="app_header">
        <img 
        className="app_headerImage" 
        src="https://cdn.worldvectorlogo.com/logos/instagram-2.svg" 
        alt="" 
        />
        {user ? (
        <Button onClick={() => auth.signOut()}>Log Out</Button>
      ) : (
        <div className="app_loginContainer">
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
        <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
      )}
      </div>
      <div className="app_posts">
        <div className="app_postsLeft">
          {
            posts.map(({id, post}) => (
              <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
            ))
          }
        </div>
        <div className="app_postsRight">
          <InstagramEmbed
                  url='https://www.instagram.com/p/B0Je5BAhK_9/'
                  maxWidth={320}
                  hideCaption={false}
                  containerTagName='div'
                  protocol=''
                  injectScript
                  onLoading={() => {}}
                  onSuccess={() => {}}
                  onAfterRender={() => {}}
                  onFailure={() => {}}
          />
        </div>
      </div>

      {user?.displayName ? (
              <ImageUpload username={user.displayName} />
            ) : (
              <h3>Sorry you need to login to upload</h3>
            )}
    </div>
  );
}

export default App;
