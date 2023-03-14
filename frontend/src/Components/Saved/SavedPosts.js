import React, { useState, useEffect } from 'react';

import Post from './Post';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { useRecoilValue } from 'recoil';
import { showJoiningRequestsAtom, showStatsAtom, showUsersAtom } from '../../atoms';

import { useSetRecoilState } from 'recoil';
import axios from "axios"
import { useAuthHeader } from 'react-auth-kit'
import { Route, Link, Routes, useLocation } from 'react-router-dom';







const SavedPosts = () => {
    let authHeader = useAuthHeader()
    const [postsData, setPostsData] = useState([]);

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




    useEffect(() => {
        const pathname = window.location.pathname
        const last = pathname.substring(pathname.lastIndexOf('/') + 1)

        const getPostsData = async () => {
            try {
                const headers = {
                    Authorization: authHeader(),
                };
                const response = await axios.get(`http://localhost:3500/subgrediiit/asdf/save`, { headers });
                console.log(response.data)
                setPostsData(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getPostsData()
    }, []);




    return (
        <div className='container'>

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
        </div>
    );

};

export default SavedPosts;




