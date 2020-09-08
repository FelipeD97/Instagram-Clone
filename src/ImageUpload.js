import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { db, storage } from "./firebase";

function ImageUpload() {
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState('');
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = (e) => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // progress function ...
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                // Error function
                console.log(error);
                alert(error.message);
            },
            () => {
                // complete function ...
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    // post image inside db
                    db.collection("posts").add({
                        // timestamp puts newest images at the top
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        imageUrl: url,
                        username: username

                    })
                })
            }
        )
    }

    return (
        <div>
            {/* I want to have... */}
            {/* Caption Input */}
            {/* File picker */}
            {/* Post button */}

            <input type="text" placeholder="Enter a caption" onChange={e => setCaption(e.target.value)}/>
            <input type="file" onChange={handleChange} />
            <Button onClick={handleUpload}>
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload;