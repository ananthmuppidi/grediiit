import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSetRecoilState } from 'recoil';
import { showUsersAtom, showJoiningRequestsAtom, showStatsAtom } from '../atoms';

const Navbar = () => {
  const { pathname } = useLocation();

  const setUsers = useSetRecoilState(showUsersAtom);
  const setJoiningRequests = useSetRecoilState(showJoiningRequestsAtom);
  const setStats = useSetRecoilState(showStatsAtom);
  
  const handleUsersClick = () => {
    setUsers(true);
    setJoiningRequests(false);
    setStats(false);
  };
  
  const handleJoiningRequestsClick = () => {
    setUsers(false);
    setJoiningRequests(true);
    setStats(false);
  };
  
  const handleStatsClick = () => {
    setUsers(false);
    setJoiningRequests(false);
    setStats(true);
  };
  
  const renderAdditionalLinks = () => {
    if (pathname.startsWith("/subgrediiits/")) {
      return (
        <>
          <Link to="#" className="navcontents-grediiit" onClick={handleUsersClick}>
            Users
          </Link>
          <Link to="#" className="navcontents-grediiit" onClick={handleJoiningRequestsClick}>
            Joining Requests
          </Link>
          <Link to="#" className="navcontents-grediiit" onClick={handleStatsClick}>
            Stats
          </Link>
        </>
      );
    }
  };

  return (
    <div
      style={{
        paddingTop: "5%",
        width: "18%",
        backgroundColor: "#0E8388",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "1%",
        transition: " 1s ease",
        flexShrink: 0,
        position: "fixed"
      }}
    >
      <Link to="/" className="navcontents">
        Dashboard
      </Link>
      <Link to="/profile" className="navcontents">
        My Profile
      </Link>
      <Link to="/mysubgrediiits" className="navcontents">
        MySubgrediiits
      </Link>
      <Link to="/subgrediiits" className="navcontents">
        Subgrediiits
      </Link>
      <Link to="/savedposts" className="navcontents">
        Saved Posts
      </Link>
      {renderAdditionalLinks()}
    </div>
  );
};

export default Navbar;
