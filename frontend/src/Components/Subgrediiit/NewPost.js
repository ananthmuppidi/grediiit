import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import axios from "axios"
import { useAuthHeader } from 'react-auth-kit';

const NewPostForm = ({ onSubmit }) => {
  const authHeader = useAuthHeader()
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(text);
    setText('');
  };

    const makePost = (event) => {
      const pathname = window.location.pathname
    const last = pathname.substring(pathname.lastIndexOf('/') + 1)
    const headers = {
      Authorization: authHeader(),
  };
    axios.post(`http://localhost:3500/subgrediiit/${last}`, { text }, {headers})
      .then(response => {
        
        window.location.reload();
      
      })
      .catch(error => {
        console.error('Error creating post:', error);
      });
  };

  return (
    <Box sx={{ minWidth: 700, opacity: 0.8, marginBottom: 2,marginLeft: 20 ,p: 2 }}>
      <form onSubmit={handleSubmit}>
        <TextField
          id="post-text"
          label="Post text"
          fullWidth
          multiline
          rows={3}
          value={text}
          onChange={(event) => setText(event.target.value)}
          margin="normal"
          variant="outlined"
          required
        />
        <Box display="flex" justifyContent="flex-end" alignItems="center" mt={1}>
          <Button type="submit" variant="contained" size="small" onClick={makePost}>
            Post
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default NewPostForm;
