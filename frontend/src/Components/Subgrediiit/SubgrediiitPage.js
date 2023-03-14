import React, { useState, useEffect } from 'react';
import NewPostForm from './NewPost';
import Post from './Post';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import UserItem from './Useritem';
import { useRecoilValue } from 'recoil';
import { showJoiningRequestsAtom, showStatsAtom, showUsersAtom } from '../../atoms';
import JoinReq from './JoiningRequests';
import { useSetRecoilState } from 'recoil';
import axios from "axios"
import { useAuthHeader } from 'react-auth-kit'
import { Route, Link, Routes, useLocation } from 'react-router-dom';



// const users = {
//     nonBlockedUsers: [
//         { id: 1, username: 'John' },
//         { id: 2, username: 'Mary' },
//         { id: 3, username: 'Bob' },
//     ],
//     blockedUsers: [
//         { id: 4, username: 'Jane' },
//         { id: 5, username: 'Steve' },
//     ],
// };



// const joinRequests = [
//     { id: 1, username: "John Doe" },
//     { id: 2, username: "Jane Smith" },
//     { id: 3, username: "Bob Johnson" },
// ];


const handlePostComment = (id, comment) => {
    console.log(id)
    console.log(comment)

}



const Subgrediiit = () => {
    let authHeader = useAuthHeader()


    const [blocked, setBlocked] = useState([])
    const [followers, setFollowers] = useState([])
    const [joinRequests, setJoinRequests] = useState([])



    useEffect(() => {
        const pathname = window.location.pathname
        const last = pathname.substring(pathname.lastIndexOf('/') + 1)

        const getUsers = async () => {
            const pathname = window.location.pathname;
            const last = pathname.substring(pathname.lastIndexOf('/') + 1);
            try {
                const headers = {
                    Authorization: authHeader(),
                };
                const response_following = await axios.get(`http://localhost:3500/subgrediiit/${last}/followers`, { headers });
                const response_blocked = await axios.get(`http://localhost:3500/subgrediiit/${last}/blocked`, { headers });
                
                setBlocked(response_blocked.data)
                setFollowers(response_following.data)
                
            } catch (error) {
                console.log(error);
            }
        };
        getUsers()
    }, []);

    useEffect(() => {
        const pathname = window.location.pathname
        const last = pathname.substring(pathname.lastIndexOf('/') + 1)

        const getRequests = async () => {
            const pathname = window.location.pathname;
            const last = pathname.substring(pathname.lastIndexOf('/') + 1);
            try {
                const headers = {
                    Authorization: authHeader(),
                };
                const response_following = await axios.get(`http://localhost:3500/subgrediiit/${last}/requests`, { headers });
                console.log(response_following.data)
                setJoinRequests(response_following.data)

            } catch (error) {
                console.log(error);
            }
        };
        getRequests()
    }, []);


  



    const showJoiningRequests = useRecoilValue(showJoiningRequestsAtom);
    const showStats = useRecoilValue(showStatsAtom);
    const showUsers = useRecoilValue(showUsersAtom);

    const setUsers = useSetRecoilState(showUsersAtom);
    const setJoiningRequests = useSetRecoilState(showJoiningRequestsAtom);
    const setStats = useSetRecoilState(showStatsAtom);




    const [showNewPostForm, setShowNewPostForm] = useState(false);
    const [postsData, setPostsData] = useState([]);



    const handleAccept =  async (follower) => {
        const pathname = window.location.pathname
        const last = pathname.substring(pathname.lastIndexOf('/') + 1)

        try {
            const headers = {
                Authorization: authHeader(),
            };
            const response = await axios.post(`http://localhost:3500/subgrediiit/${last}/accept`, {follower : follower},{ headers });
            setPostsData(response.data);
        } catch (error) {
            console.log(error);
        }

    }

    const handleReject =  async (follower) => {
        const pathname = window.location.pathname
        const last = pathname.substring(pathname.lastIndexOf('/') + 1)
        try {
            const headers = {
                Authorization: authHeader(),
            };
            const response = await axios.post(`http://localhost:3500/subgrediiit/${last}}/reject`, {follower : follower},{ headers });
            setPostsData(response.data);
        } catch (error) {
            console.log(error);
        }

    }




    useEffect(() => {
        const pathname = window.location.pathname
        const last = pathname.substring(pathname.lastIndexOf('/') + 1)

        const getPostsData = async () => {
            try {
                const headers = {
                    Authorization: authHeader(),
                };
                const response = await axios.get(`http://localhost:3500/subgrediiit/${last}`, { headers });
                console.log(response.data)
                setPostsData(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getPostsData()
    },[] );



    const handleUpvote = async (postId) => {

        const pathname = window.location.pathname
        const last = pathname.substring(pathname.lastIndexOf('/') + 1)
        try {
            const headers = {
                Authorization: authHeader(),
            };
            const data = {
                postid: postId
            }
            const response = await axios.post(`http://localhost:3500/subgrediiit/${last}/upvote`, data, { headers });
        } catch (error) {
            console.log(error);
        }

    };
    const handleDownvote = async (postId) => {

        const pathname = window.location.pathname
        const last = pathname.substring(pathname.lastIndexOf('/') + 1)
        try {
            const headers = {
                Authorization: authHeader(),
            };
            const data = {
                postid: postId
            }
            const response = await axios.post(`http://localhost:3500/subgrediiit/${last}/comment`, data, { headers });
        } catch (error) {
            console.log(error);
        }

    };


    const handleReport = (postId) => {

    };

    const handleButtonClick = () => {
        setShowNewPostForm((prevState) => !prevState);
    };




    return (
        <div className='container'>
            {showNewPostForm ? (
                <div>
                    <Box className="newPostButton" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Button variant="outlined" size="small" onClick={handleButtonClick}>
                            {showNewPostForm ? 'Go Back' : 'Make New Post'}
                        </Button>

                    </Box>
                    <NewPostForm />
                </div>
            ) : (
                <>
                    {showJoiningRequests ? (
                        <>
                            <div className='newPostButton'>
                                <Button variant="outlined" onClick={() => setJoiningRequests(false)}>Go Back</Button>
                            </div>
                            <div className='postlist'>
                                {joinRequests.map((user) => (
                                    <JoinReq username={user.follower} onAcceptClick={() => handleAccept(user.follower) } onRejectClick={() =>  handleReject(user.follower)} />
                                ))}
                            </div>
                        </>
                    ) : showUsers ? (
                        <>
                            <div className='newPostButton'>
                                <Button variant="outlined" onClick={() => setUsers(false)}>Go Back</Button>
                            </div>
                            <div className='postlist'>
                                <h2>Non-Blocked Users:</h2>
                                {followers.map((user) => (
                                    <UserItem username={user.follower} />
                                ))}
                                <h2>Blocked Users:</h2>
                                {blocked.map((user) => (
                                    <UserItem key={user._id} username={user.follower} buttonText="Blocked" />
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            <Box className="newPostButton" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Button variant="outlined" size="small" onClick={handleButtonClick}>
                                    {showNewPostForm ? 'Go Back' : 'Make New Post'}
                                </Button>

                            </Box>
                            <div className="postlist">
                                {postsData.map((post) => (
                                    <Post
                                        id={post._id}
                                        text={post.text}
                                        postedBy={post.postedby}
                                        postedIn={post.postedin}
                                        numUpvotes={(post.upvote.length)}
                                        numDownvotes={(post.downvote.length)}
                                        onUpvote={() => handleUpvote(post._id)}
                                        onDownvote={() => handleDownvote(post._id)}
                                        onReport={() => handleReport(post._id)}
                                        comments={post.comments}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );

};

export default Subgrediiit;




