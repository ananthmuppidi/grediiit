import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import "./index.css";
import { RecoilRoot } from "recoil";
import { AuthProvider, RequireAuth } from "react-auth-kit"

import Error from "./Components/error";
import Profile from "./Components/Profile/Profile";
import Mysubgrediiits from "./Components/MySubgrediiits/Mysubgrediiits";
import SubgrediiitPage from "./Components/Subgrediiit/SubgrediiitPage";
import SavedPosts from "./Components/Saved/SavedPosts";
import Auth from "./Components/Auth"
import Dashboard from './Components/Dashboard';
import Subgrediiits from './Components/Subgrediiits/Subgrediiits';

const router = createBrowserRouter([
    {
        path: "/",
        element: <RequireAuth loginPath="/auth"><App /></RequireAuth>,
        errorElement: <Error />,
        children: [
            {
                path : "/",
                element :<Dashboard />
            },
            {
                path: "/profile",
                element: <Profile className="container" />,
            },
            {
                path: "/mysubgrediiits",
                element: <Mysubgrediiits className="container" />,
            },
            {
                path: "/subgrediiits/:name",
                element: <SubgrediiitPage className="container" />,
            },
            {
                path: "/subgrediiits",
                element: <Subgrediiits className="container" />,
            },
            {
                path: "/savedposts",
                element: <SavedPosts className="container" />,
            },
        ],
    },
    {
        path :  "/auth",
        element : <Auth />

    }

]);


ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RecoilRoot>
            <AuthProvider
                authType={'cookie'}
                authName={'_auth'}
                cookieDomain={window.location.hostname}
                cookieSecure={false}
            >
                <RouterProvider router={router} />   
            </AuthProvider>
        </RecoilRoot>
    </React.StrictMode>
);
