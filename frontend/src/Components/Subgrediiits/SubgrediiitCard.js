import React from 'react';
import { Card, CardHeader, CardContent, Typography, Box, Button } from '@mui/material';
import { ClassNames } from '@emotion/react';
import axios from "axios"
import url from "../../url"
import { useAuthHeader } from 'react-auth-kit'
import { useNavigate } from 'react-router';


const SubgrediiitCard = ({ name, description, bannedKeywords, tags, numPosts, numFollowers, status }) => {

  const authHeader = useAuthHeader()
  const navigate = useNavigate()




  const handleOpen = () => {
    console.log(name);
    navigate(`/subgrediiits/${name}`);
  };

  const handleDelete = async () => {

    try {
      const headers = {
        Authorization: authHeader(),
      }
      const details = {
        name_subgrediiit: name
      };
      axios.put('http://localhost:3500/mysubgrediiits', details, { headers })
        .then(res => {
          console.log(res.data);
          window.location.reload(); // Reload the page after saving the details
        })

    } catch (error) {
      console.log(error);
    }

  };

  const handleAction = () => {
    if (status === "follow") {
      try {
        const headers = {
          Authorization: authHeader(),
        }
        
        axios.get(`http://localhost:3500/subgrediiit/${name}/request`, { headers })
          .then(res => {
            window.location.reload(); // Reload the page after saving the details
          })

      } catch (error) {
        console.log(error);
      }
    }

    if (status === "leave") {
      try {
        const headers = {
          Authorization: authHeader(),
        }
        
        axios.get(`http://localhost:3500/subgrediiit/${name}/leave`, { headers })
          .then(res => {
            window.location.reload(); // Reload the page after saving the details
          })

      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Card sx={{ minWidth: 700, opacity: 0.8, marginBottom: 2, margin: 2, marginLeft: 40 }}>
      <CardHeader title={name} />
      <CardContent>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Banned keywords: {bannedKeywords}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Tags: {tags}
        </Typography>
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography variant="body2" color="text.secondary">
            {numPosts} posts
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {numFollowers} followers
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button variant="outlined" onClick={handleOpen}>Open</Button>
          <Button variant="outlined" color="error" onClick={handleAction} disabled={status === "left" || status === "disabled"}>{status}</Button>

        </Box>
      </CardContent>
    </Card>
  );
};

export default SubgrediiitCard;
