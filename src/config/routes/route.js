import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom'
import pages from '../../components/screens';
import React from "react";
import './route.scss';
import AuthProvider, { useAuth } from '../utils/AuthProvider';
import Header from '../../components/shared/components/Header/Header';
import PageLayout from '../../components/shared/components/PageLayout/PageLayout';

const AUTH_ROUTES = [
    {
        path: '/splash',
        component: pages.Splash,
    },
    {
        path: '/home',
        component: pages.Home
    },
    {
        path: '/main',
        component: pages.Main,
    },
    {
        path: '/category',
        component: pages.Category,
    },
    {
        path: '/quotes',
        component: pages.Quotes,
    },
    {
        path: '/template-upload',
        component: pages.TemplateUpload,
    },
    {
        path: '/template-selection',
        component: pages.TemplateSelection,
    },
    {
        path: '/template-creation',
        component: pages.TemplateCreate,
    }
]

const WITHOUT_AUTH_ROUTES = [
    {
        path: '/fallback',
        component: pages.Fallback
    },
    {
        path: '/index.html',
        component: pages.Login
    },
    {
        path: '/login',
        component: pages.Login
    },
    {
        path: '/',
        component: pages.Splash
    },
]


const AppRoute = () => {

    const Layout = () => {
        return (
            <div className='router-outlet'>
                <div className='outlet' >
                    <Header></Header>
                    <Outlet />
                </div>
            </div>
        );
    };


    const PrivateRoute = () => {
        const user = useAuth();
        console.log("user", user)
        // if (!user.isAuth) return <Navigate to="/login" />;
        return <PageLayout />;
    };


    return (

        <BrowserRouter basename={process.env.REACT_APP_PUBLIC_URL} >
            <AuthProvider>
                <Routes>
                    <Route path='/'  >
                        {WITHOUT_AUTH_ROUTES.map((page) => {
                            return <Route key={page.path} path={page.path} element={<page.component />} />
                        })}
                    </Route>

                    <Route path='/' element={<PrivateRoute />}>
                        {AUTH_ROUTES.map((page) => (
                            <Route key={page.path} path={page.path} element={<page.component />} />
                        ))}
                    </Route>


                    <Route path="*" element={<pages.Login />} />

                </Routes>
            </AuthProvider>

        </BrowserRouter>

    );
}

export default AppRoute;