import React from 'react';
import "./Post.css";

function Post() {
    return (
        <div className="post">
            <h3>Username</h3>
            {/* header -> avater + username */}

            <img className="post_image" src="https://images.unsplash.com/photo-1597680460531-60a68dfbf6cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" />
            {/* image */}

            <h4 className="post_text"><strong>felipe_aalejandro</strong> miss these views</h4>
            {/* username + caption */}
        </div>
    )
}

export default Post;
