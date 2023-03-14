import React, { useState, useEffect } from 'react';
import { Box, TextField, ToggleButtonGroup, ToggleButton, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import EventIcon from '@mui/icons-material/Event';
import SubgrediiitCard from './SubgrediiitCard';
import axios from "axios"
import { useAuthHeader } from 'react-auth-kit';



const subgrediiits = [
  {
    name: "subgrediit1",
    description: "This is subgrediit1",
    bannedKeywords: "spam",
    tags: "tech, programming",
    numPosts: 10,
    numFollowers: 100,
    status: "join"
  },
  {
    name: "subgrediit2",
    description: "This is subgrediit2",
    bannedKeywords: "hate speech",
    tags: "politics, animals",
    numPosts: 20,
    numFollowers: 200,
    status: "left"
  },
  {
    name: "subgrediit3",
    description: "This is subgrediit3",
    bannedKeywords: "",
    tags: "animals",
    numPosts: 5,
    numFollowers: 50,
    status: "disabled"
  }
];




const SubgrediiitList = () => {

  const authHeader = useAuthHeader()

  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [subgrediiits, setSubgrediiits ] = useState([])

  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTags, setSearchTags] = useState([])
  const handleSearchTermChange = (event) => {
    const newSearchTags = event.target.value.split(',').map(tag => tag.trim());
    setSearchTags(newSearchTags);
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const pathname = window.location.pathname
    const last = pathname.substring(pathname.lastIndexOf('/') + 1)
  
    const getSubgrediiits = async () => {
        const pathname = window.location.pathname;
        const last = pathname.substring(pathname.lastIndexOf('/') + 1);
        try {
            const headers = {
                Authorization: authHeader(),
            };
            const response_following = await axios.get(`http://localhost:3500/subgrediiits/`, { headers });
            console.log(response_following)
            setSubgrediiits(response_following.data)
            
  
        } catch (error) {
            console.log(error);
        }
    };
    getSubgrediiits()
  }, []);


  const handleSortTypeChange = (event, newSortType) => {
    if (newSortType) {
      setSortType(newSortType);
    }
  };

  const handleFollowerClick = () => {
    setSortColumn('numFollowers');
    setSortDirection(sortColumn === 'numFollowers' ? (sortDirection === 'asc' ? 'desc' : 'asc') : 'asc');
  };

  const handleNameClick = () => {
    setSortColumn('name');
    setSortDirection(sortColumn === 'name' ? (sortDirection === 'asc' ? 'desc' : 'asc') : 'asc');
  };

  const handleSortOrderChange = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
  };

  const filteredSubgrediiits = sortType === "name"
    ? subgrediiits.filter(
      (subgrediiit) =>
        subgrediiit[sortType].toLowerCase().includes(searchTerm.toLowerCase())
    )
    : subgrediiits.filter(
      (subgrediiit) =>
        searchTags.some((tag) => subgrediiit.tags.includes(tag))
    );
  const sortedSubgrediiits = filteredSubgrediiits.sort((a, b) => {

    const order = sortOrder === 'asc' ? 1 : -1;
    return order * a[sortType].localeCompare(b[sortType]);
  });

  return (
    <div className='container'>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        <SearchIcon sx={{ color: 'text.secondary', marginRight: 1 }} />
        <TextField
          placeholder='Search'
          variant='outlined'
          size='small'
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
        <ToggleButtonGroup
          value={sortType}
          exclusive
          onChange={handleSortTypeChange}
          aria-label='sort type'
          size='small'
          sx={{ marginLeft: 2 }}
        >
          <ToggleButton value='name' aria-label='sort by name'>
            Name
          </ToggleButton>
          <ToggleButton value='tags' aria-label='sort by tags'>
            Tags
          </ToggleButton>
        </ToggleButtonGroup>
        <Button
          variant='outlined'
          onClick={handleSortOrderChange}
          startIcon={
            sortOrder === 'asc' ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />
          }
          size='small'
          sx={{ marginLeft: 2 }}
        >
          {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        </Button>
        <Button
          variant='outlined'
          startIcon={<PersonIcon />}
          size='small'
          sx={{ marginLeft: 2 }}
          onClick={() => handleNameClick()}
        >
          Name
        </Button>
        <Button
          onClick={() => handleFollowerClick()}
          variant='outlined'
          startIcon={<GroupIcon />}
          size='small'
          sx={{ marginLeft: 1 }}
        >
          Followers
        </Button>
        <Button
          variant='outlined'
          startIcon={<EventIcon />}
          size='small'
          sx={{ marginLeft: 1 }

          }
        >
          Creation Date
        </Button>
      </Box>
      <div className='subgrediiit-list'>
        {sortedSubgrediiits.map((subgrediiit) => (
          <SubgrediiitCard
            key={subgrediiit.name}
            name={subgrediiit.name}
            description={subgrediiit.description}
            bannedKeywords={subgrediiit.bannedKeywords}
            tags={subgrediiit.tags}
            numPosts={subgrediiit.numPosts}
            numFollowers={subgrediiit.numReaders}
            status={subgrediiit.status}
          />
        ))}
      </div>
    </div>
  );




}


export default SubgrediiitList;





