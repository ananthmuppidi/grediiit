import React, {useState, useEffect} from 'react';
import {TextField, Button, IconButton, Stack} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import axios from "axios"
import {useAuthHeader} from 'react-auth-kit'


import UserItem from './UserItem';

const ProfileDetails = () => {
    const authHeader = useAuthHeader()


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [password, setPassword] = useState('');


    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const [editMode, setEditMode] = useState(false);
    const handleEditMode = () => setEditMode(!editMode);

    const handleBackToProfile = () => {
        setShowFollowers(false)
        setShowFollowing(false)
    }

    const [showFollowing, setShowFollowing] = useState(false);
    const [showFollowers, setShowFollowers] = useState(false);

    const [following, setFollowing] = useState([])
    const [followers, setFollowers] = useState([])

   


    useEffect(() => {
        const headers = {
            Authorization: authHeader(),
        };
        axios.get('http://localhost:3500/profile', {headers} )
        .then(res => {

            const data = res.data;
            setFirstName(data.firstname);
            setLastName(data.lastname);
            setUserName(data.username);
            setEmail(data.email);
            setAge(data.age);
            setContactNumber(data.contact);
            setPassword(data.password);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);


    useEffect(() => {
        const headers = {
            Authorization: authHeader(),
        };
      axios
        .get("http://localhost:3500/follower", {headers})
        .then((response) => {
          const followerEmails = response.data.map((followerObj) => followerObj.follower);
          console.log(followerEmails)
          setFollowers(followerEmails);
        })
        .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        const headers = {
            Authorization: authHeader(),
        };
      axios
        .delete("http://localhost:3500/follower", {headers})
        .then((response) => {
            console.log(response)
          const following = response.data.map((followerObj) => followerObj.followed);
          console.log(following)
          setFollowing
          (following);
        })
        .catch((error) => console.log(error));
    }, []);


    const saveDetails = () => {
        const headers = {
          Authorization: authHeader(),
        };
        const updatedUserDetails = {
          firstname: firstName,
          lastname: lastName,
          username: userName,
          email: email,
          age: age,
          contact: contactNumber,
          password: password,
        };
        axios.put('http://localhost:3500/profile', updatedUserDetails, { headers })
          .then(res => {
            console.log(res.data);
            window.location.reload(); // Reload the page after saving the details
          })
          .catch(err => {
            console.log(err);
          });
      };

      



    const handleRemoveFollower = (user) => {
        
        const headers = {
            Authorization: authHeader(),
          };

          axios.post('http://localhost:3500/follower/delete/removefollower', {"email" : user }, { headers })
          .then(res => {
            console.log(res.data);
            window.location.reload(); // Reload the page after saving the details
          })
          .catch(err => {
            console.log(err);
          });

        
    };

    const handleRemoveFollowing = (user) => {
        // send request to backend to remove the user here
        const headers = {
            Authorization: authHeader(),
          };

          console.log(user)

          
          axios.post('http://localhost:3500/follower/delete', {"email" : user}, { headers })
          .then(res => {
            console.log(res.data);
            window.location.reload(); // Reload the page after saving the details
          })
          .catch(err => {
            console.log(err);
          });
        
    };

    return (
        <div className="profile container">
            {(!showFollowing && !showFollowers) && (
                <div className="profileForm">
                    <TextField
                        label="First Name"
                        fullWidth
                        size="small"
                        value={firstName}
                        disabled={!editMode}
                        onChange={(event) => setFirstName(event.target.value)}
                        style={{marginBottom: '1rem'}
                    }
                    />
                    <TextField
                        label="Last Name"
                        fullWidth
                        size="small"
                        value={lastName}
                        disabled={!editMode}
                        onChange={(event) => setLastName(event.target.value)}
                        style={{marginBottom: '1rem'}}
                    />
                    <TextField
                        label="User Name"
                        fullWidth
                        size="small"
                        value={userName}
                        onChange={(event) => setUserName(event.target.value)}
                        disabled={!editMode}
                        style={{marginBottom: '1rem'}}
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        size="small"
                        value={email}
                        disabled={!editMode}
                        onChange={(event) => setPassword(event.target.value)}
                        style={{marginBottom: '1rem'}}
                    />
                    <TextField
                        label="Age"
                        fullWidth
                        size="small"
                        value={age}
                        disabled={!editMode}
                        onChange={(event) => setAge(event.target.value)}
                        style={{marginBottom: '1rem'}}
                    />
                    <TextField
                        label="Contact Number"
                        fullWidth
                        size="small"
                        value={contactNumber}
                        disabled={!editMode}
                        onChange={(event) => setContactNumber(event.target.value)}
                        style={{marginBottom: '1rem'}}
                    />
                    <TextField
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        size="small"
                        value={password}
                        disabled={!editMode}
                        onChange={(event) => setPassword(event.target.value)}
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={handleClickShowPassword} disabled={!editMode}>
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            ),
                        }}
                        style={{marginBottom: '1rem'}}
                    />
                    <Stack direction="row" spacing={2} mt={2}>
                        <Button variant="outlined" color="primary" onClick={handleEditMode} disabled={editMode}>
                            Edit
                        </Button>
                        <Button variant="outlined" color="primary" disabled={!editMode} onClick={saveDetails}>
                            Save
                        </Button>
                        <Button variant="outlined" color="primary" onClick={() => setShowFollowing(!showFollowing)}>
                            Following
                        </Button>
                        <Button variant="outlined" color="primary" onClick={() => setShowFollowers(!showFollowers)}>
                            Followers
                        </Button>
                    </Stack>
                </div>
            )}
            <div className="follower_following">
                {(showFollowing || showFollowers) && (
                    <div className="back_to_profile">
                        <Button variant="outlined" color="primary" onClick={() => handleBackToProfile()}>
                            Back to Profile Page
                        </Button>

                    </div>
                )}

                <div className="following_follower_list">
                    {showFollowing &&
                        following.map((user, email) => (
                            <UserItem key={email} username={user} onClick={() => handleRemoveFollowing(user)} buttonText={"Unfollow"} />
                        ))}
                </div>

                <div className="following_follower_list">
                    {showFollowers &&
                        followers.map((user, email) => (
                            <UserItem key={email} username={user} onClick={() => handleRemoveFollower(user)} buttonText={"Remove"}/>
                        ))}
                </div>
            </div>

        </div>

    );
};

export default ProfileDetails;
