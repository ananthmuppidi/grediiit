import React, { useState, useEffect } from 'react';
import NewSubgrediiitCard from './Newsubgrediitcard';
import SubgrediiitCard from './Subgrediiit';
import { Box, Button } from '@mui/material';
import axios from "axios"
import url from "../../url"
import { useAuthHeader } from 'react-auth-kit'

const MySubgrediiits = () => {
    const authHeader = useAuthHeader()
    const [showNewSubgrediiitCard, setShowNewSubgrediiitCard] = useState(false);
    const [subgrediiitsData, setSubgrediiitsData] = useState([]);

    const handleCreateNewSubgrediiit = () => {
        setShowNewSubgrediiitCard(true);
    };

    const handleGoBack = () => {
        setShowNewSubgrediiitCard(false);
    };

  

    useEffect(() => {
        const getSubgrediiitsData = async () => {
            try {
                const headers = {
                    Authorization: authHeader(),
                };
                const response = await axios.get("http://localhost:3500/mysubgrediiits", { headers });
                setSubgrediiitsData(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getSubgrediiitsData();
    }, [authHeader]);

    return (
        <div className='subgrediiits container'>
            <Box className="createsubbutton" display="flex" alignItems="center" justifyContent="flex-start" mb={2} px={2}>
                <Box mr={2} flex={1}>
                    <Button variant="outlined" color="primary" onClick={showNewSubgrediiitCard ? handleGoBack : handleCreateNewSubgrediiit} style={{ padding: '10px' }}>
                        {showNewSubgrediiitCard ? 'Go back' : 'Create new Subgrediiit'}
                    </Button>
                </Box>
            </Box>

            {showNewSubgrediiitCard ? (
                <NewSubgrediiitCard />
            ) : (
                <div className='subgrediiitcards'>
                    <>
                        {subgrediiitsData.map(subgrediiitData => (
                            <SubgrediiitCard
                                key={subgrediiitData.name}
                                name={subgrediiitData.name}
                                description={subgrediiitData.description}
                                bannedKeywords={subgrediiitData.banned  }
                                numPosts={subgrediiitData.numPosts}
                                numFollowers={subgrediiitData.numReaders}
                                tags={subgrediiitData.tags}
                                
                            />
                        ))}
                    </>
                </div>
            )}
        </div>
    );
};

export default MySubgrediiits;
