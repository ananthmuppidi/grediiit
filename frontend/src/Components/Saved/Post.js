import {React, useState} from 'react';
import { Card, CardContent, Typography, Box, Button, TextField} from '@mui/material';
import axios from "axios"
import { useAuthHeader } from 'react-auth-kit';

const Post = ({ id, text, postedBy, postedIn, numUpvotes, numDownvotes, comments, onUpvote, onDownvote, onReport, postComment}) => {
  const authHeader = useAuthHeader()

  const [newComment, setNewComment] = useState('');


  const handleComment = async () => {
    setNewComment('')


    const pathname = window.location.pathname
    const last = pathname.substring(pathname.lastIndexOf('/') + 1)
    try {
        const headers = {
            Authorization: authHeader(),
        };
        const data = {
            postid : id,
            text : newComment
        }
        const response = await axios.post(`http://localhost:3500/subgrediiit/${last}/comment`, data, { headers });
        
    } catch (error) {
        console.log(error);
    }
}

const deleteSave = async () => {
    console.log("here")
        try {
        const headers = {
            Authorization: authHeader(),
        };
        const data = {
            postid : id,
        }
        const response = await axios.post(`http://localhost:3500/subgrediiit/asd/unsave`, data, { headers });
        
    } catch (error) {
        console.log(error);
    }
}



  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  }
  return (

    
    <Card sx={{ minWidth: 700, opacity: 0.8, marginBottom: 2 }}>
      <CardContent>
        <Typography variant="body1" gutterBottom>
          {text}
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <Typography variant="body2" color="text.secondary">
            Posted by: {postedBy}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Posted in: {postedIn}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <Box>
            <Button variant="outlined" color="primary" size="small" sx={{ fontSize: '0.8rem', padding: '0.2rem 0.5rem' }} onClick={onUpvote}>
              Upvote ({numUpvotes})
            </Button>
            <Box mx={2}>
              <Typography variant="body2" color="text.secondary">
                /
              </Typography>
            </Box>
            <Button variant="outlined" color="secondary" size="small" sx={{ fontSize: '0.8rem', padding: '0.2rem 0.5rem' }} onClick={onDownvote}>
              Downvote ({numDownvotes})
            </Button>
          </Box>
          <Box display="flex" justifyContent="flex-end">
            <Button variant="outlined" color="secondary" size="small" sx={{ fontSize: '0.8rem', padding: '0.2rem 0.5rem' }}>
              Follow
            </Button>
          </Box>
        </Box>
        <Box display="flex" justifyContent="flex-start" alignItems="center" mt={2}>
          <Button variant="outlined" color="secondary" size="small" sx={{ fontSize: '0.8rem', padding: '0.2rem 0.5rem' }} onClick={onReport}>
            Report
          </Button>
        </Box>
        {comments && (
          <Box display="flex" flexDirection="column" justifyContent="flex-start" alignItems="flex-start" mt={2}>
          <Typography variant="body2" color="text.secondary">
            Comments:
          </Typography>
          <Typography variant="body2">
            {comments.map((comment, index) => {
              if (index === comments.length - 1) {
                return comment;
              } else {
                return comment + ', ';
              }
            })}
          </Typography>
          <Box display="flex" flexDirection="column" alignItems="flex-start" mt={2}>
            <TextField label="Add a comment" size="small" variant="outlined" fullWidth onChange={handleCommentChange} value={newComment} />
            <Button variant="outlined" color="primary" size="small" sx={{ fontSize: '0.8rem', padding: '0.2rem 0.5rem', mt: '0.5rem' }} onClick={handleComment}>
              Comment
            </Button>
            <Button variant="outlined" color="primary" size="small" sx={{ fontSize: '0.8rem', padding: '0.2rem 0.5rem', mt: '0.5rem' }} onClick={deleteSave}>
              Unsave
            </Button>
          </Box>
        </Box>
        
        )}
      </CardContent>
    </Card>
  );
};

export default Post;
