 // eslint-disable-next-line
import React, {useState, useEffect} from 'react'
import './Post.css'
import firebase from './firebase'
import firebaseRoot from 'firebase'
import Avatar from '@material-ui/core/Avatar'

function Post({postId, user, username, caption, imageUrl }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');


  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = firebase.db
        .collection('posts')
        .doc(postId)
        .collection('comments')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map(doc => doc.data()));
        });

    }

    return () => {
      unsubscribe();
    };
  }, [postId])

  const postComment = (event) => {
    event.preventDefault();

    firebase.db.collection('posts').doc(postId).collection('comments').add({
      content: comment,
      username: user.displayName,
      timestamp: firebaseRoot.firestore.FieldValue.serverTimestamp()
    });
    setComment('');
  }

  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt="avatar"
          src="/static/images/avatar/1.jpg"
        />
        <h3>{username}</h3>
      </div>
      <img
        className="post__image"
        alt="post image"
        src={imageUrl}
      />

      <h4 className="post__test"><strong>{username}</strong> {caption}</h4>

      <div className="post__comments">
        {
          comments.map((comment => (
            <p>
              <b>{comment.username}</b> {comment.content}
            </p>
          )))
        }
      </div>

      {user && (
        <form className="post__commentBox">
          <input
            className="post__input"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="post__button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Post
          </button>

        </form>
      )}

    </div>
  )
}

export default Post
