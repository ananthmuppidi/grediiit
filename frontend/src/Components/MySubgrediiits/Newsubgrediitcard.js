import React, { useState } from 'react';
import { Card, CardContent, CardHeader, TextField, Button, Box } from '@mui/material';
import axios from 'axios';
import { useAuthHeader } from 'react-auth-kit'

const NewSubgrediiitCard = () => {
  const authHeader = useAuthHeader()
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [bannedKeywords, setBannedKeywords] = useState([]);
  const [tags, setTags] = useState([]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleBannedKeywordsChange = (event) => {
    setBannedKeywords(event.target.value.split(','));
  };

  const handleTagsChange = (event) => {
    setTags(event.target.value.split(','));
  };



  // ...
  
  const handleSubmit = async (event) => {


    event.preventDefault();
  
    const data = {
      name,
      description,
      tags: tags.join(','),
      banned: bannedKeywords.join(',')
    };
  
    const headers = {
      Authorization: authHeader()
  };
  console.log(data)
  console.log(headers)
  
    try {
      await axios.post('http://localhost:3500/mysubgrediiits', data, {headers});
      window.location.reload();
    } catch (error) {
      console.log('Error:', error);
    }
  };
  

  return (
    <Card className='subgrediiitcard'  sx={{ bgcolor: 'rgba(255, 255, 255, 0.13)' }}>
      <CardHeader title="Create New Subgrediiit" sx={{textAlign: 'center'}} />
      <CardContent>
        <Box display="flex" flexDirection="column" gap={2} alignItems="flex-start" pl={4} pr={2}>
          <TextField
            label="Name"
            value={name}
            onChange={handleNameChange}
            fullWidth
            required
            sx={{ bgcolor: 'rgba(255, 255, 255, 0.5)' }}
          />
          <TextField
            label="Description"
            value={description}
            onChange={handleDescriptionChange}
            fullWidth
            required
            sx={{ bgcolor: 'rgba(255, 255, 255, 0.5)' }}
          />
          <TextField
            label="Banned Keywords"
            value={bannedKeywords.join(',')}
            onChange={handleBannedKeywordsChange}
            fullWidth
            sx={{ bgcolor: 'rgba(255, 255, 255, 0.5)' }}
          />
          <TextField
            label="Tags"
            value={tags.join(',')}
            onChange={handleTagsChange}
            fullWidth
            sx={{ bgcolor: 'rgba(255, 255, 255, 0.5)' }}
          />
          <Box alignSelf="center" mt={4} display="flex" justifyContent="space-between" width="100%">

            <Button variant="outlined" onClick={handleSubmit}>
              Create
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
  
}

export default NewSubgrediiitCard;
