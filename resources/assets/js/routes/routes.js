import Home from '../pages/home'
import Login from '../pages/login'
import Register from '../pages/register'
import ForgotPassword from '../pages/forgotPassword'
import ResetPassword from '../pages/resetPassword'
import Dashboard from '../pages/dashboard'
import NoMatch from '../pages/noMatch'
import ServiceWeb from '../pages/services/web'
import ServiceMobile from '../pages/services/mobile'
import ServiceUI from '../pages/services/ui'
import ServiceBranding from '../pages/services/branding'
import ServiceIllustration from '../pages/services/illustration'
import ServiceMarketing from '../pages/services/marketing'
import Portfolio from '../pages/portfolio'
import Features from '../pages/features'
import About from '../pages/about'
import Blog from '../pages/blog'
import Contact from '../pages/contact'
import AdminPages from '../pages/admin/adminPages'
import AdminHome from '../pages/admin/single-pages/home'
import AdminPortfolio from '../pages/admin/single-pages/portfolio'
import AdminAbout from '../pages/admin/single-pages/about'
import AdminContact from '../pages/admin/single-pages/contact'
import AdminServiceWeb from '../pages/admin/single-pages/serviceWeb'
import AdminServiceMobile from '../pages/admin/single-pages/serviceMobile'
import AdminServiceUI from '../pages/admin/single-pages/serviceUI'
import AdminServiceBranding from '../pages/admin/single-pages/serviceBranding'
import AdminServiceIllustration from '../pages/admin/single-pages/serviceIllustration'
import AdminServiceMarket from '../pages/admin/single-pages/serviceMarket'
import Terms from '../pages/terms'
import Privacy from '../pages/privacy'
const routes = [
    {
        path: '/',
        exact: true,
        auth: false,
        component: Home
    },
    {
        path: '/login/:social',
        exact: false,
        auth: false,
        component: Home
    },
    {
        path: '/login',
        exact: true,
        auth: false,
        component: Login
    },
    {
        path: '/register',
        exact: true,
        auth: false,
        component: Register
    },
    {
        path: '/forgot-password',
        exact: true,
        auth: false,
        component: ForgotPassword
    },
    {
        path: '/reset-password/:token/:email',
        exact: true,
        auth: false,
        component: ResetPassword
    },
    {
        path: '/service-web',
        exact: true,
        auth: false,
        component: ServiceWeb
    },
    {
        path: '/service-mobile',
        exact: true,
        auth: false,
        component: ServiceMobile
    },
    {
        path: '/service-ui',
        exact: true,
        auth: false,
        component: ServiceUI
    },
    {
        path: '/service-branding',
        exact: true,
        auth: false,
        component: ServiceBranding
    },
    {
        path: '/service-illustration',
        exact: true,
        auth: false,
        component: ServiceIllustration
    },
    {
        path: '/service-marketing',
        exact: true,
        auth: false,
        component: ServiceMarketing
    },
    {
        path: '/portfolio',
        exact: true,
        auth: false,
        component: Portfolio
    },
    {
        path: '/features',
        exact: true,
        auth: false,
        component: Features
    },
    {
        path: '/about',
        exact: true,
        auth: false,
        component: About
    },
    {
        path: '/blog',
        exact: true,
        auth: false,
        component: Blog
    },
    {
        path: '/contact',
        exact: true,
        auth: false,
        component: Contact
    },
    {
        path: '/privacy',
        exact: true,
        auth: false,
        component: Privacy
    },
    {
        path: '/terms',
        exact: true,
        auth: false,
        component: Terms
    },
    {
        path: '/admin/dashboard',
        exact: true,
        admin: true,
        component: Dashboard
    },
    {
        path: '/admin/pages',
        exact: true,
        admin: true,
        component: AdminPages
    },
    {
        path: '/admin/services',
        exact: true,
        admin: true,
        component: Dashboard
    },
    {
        path: '/admin/clients',
        exact: true,
        admin: true,
        component: Dashboard
    },
    {
        path: '/admin/projects',
        exact: true,
        admin: true,
        component: Dashboard
    },
    {
        path: '/admin/teams',
        exact: true,
        admin: true,
        component: Dashboard
    },
    {
        path: '/admin/invoices',
        exact: true,
        admin: true,
        component: Dashboard
    },
    {
        path: '/admin/settings',
        exact: true,
        admin: true,
        component: Dashboard
    },
    {
        path: '/admin/single-page/home',
        exact: true,
        admin: true,
        component: AdminHome
    },
    {
        path: '/admin/single-page/portfolio',
        exact: true,
        admin: true,
        component: AdminPortfolio
    },
    {
        path: '/admin/single-page/about',
        exact: true,
        admin: true,
        component: AdminAbout
    },
    {
        path: '/admin/single-page/contact',
        exact: true,
        admin: true,
        component: AdminContact
    },
    {
        path: '/admin/single-page/serviceWeb',
        exact: true,
        admin: true,
        component: AdminServiceWeb
    },
    {
        path: '/admin/single-page/serviceMobile',
        exact: true,
        admin: true,
        component: AdminServiceMobile
    },
    {
        path: '/admin/single-page/serviceUI',
        exact: true,
        admin: true,
        component: AdminServiceUI
    },
    {
        path: '/admin/single-page/serviceBranding',
        exact: true,
        admin: true,
        component: AdminServiceBranding
    },
    {
        path: '/admin/single-page/serviceIllustration',
        exact: true,
        admin: true,
        component: AdminServiceIllustration
    },
    {
        path: '/admin/single-page/serviceMarket',
        exact: true,
        admin: true,
        component: AdminServiceMarket
    },
    {
        path: '',
        exact: true,
        auth: false,
        component: NoMatch
    }
];

export default routes;