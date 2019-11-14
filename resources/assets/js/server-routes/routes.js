import HomeServer from '../pages/home/server'
import LoginServer from '../pages/login'
import RegisterServer from '../pages/register'
import ForgotPasswordServer from '../pages/forgotPassword'
import ResetPasswordServer from '../pages/resetPassword'
import NoMatch from '../pages/noMatch'
import ServiceWebServer from '../pages/services/web/server'
import ServiceMobileServer from '../pages/services/mobile/server'
import ServiceUIServer from '../pages/services/ui/server'
import ServiceBrandingServer from '../pages/services/branding/server'
import ServiceIllustrationServer from '../pages/services/illustration/server'
import ServiceMarketingServer from '../pages/services/marketing/server'
import PortfolioServer from '../pages/portfolio/server'
import SinglePortfolioServer from '../pages/singlePortfolio/server'
import FeaturesServer from '../pages/features/server'
import AboutServer from '../pages/about/server'
import BlogServer from '../pages/blog/server'
import ContactServer from '../pages/contact/server'
import PrivacyServer from '../pages/privacy/server'
import AdminPages from '../pages/admin/adminPages/server'
import AdminHome from '../pages/admin/single-pages/home/server'
import AdminPortfolio from '../pages/admin/single-pages/portfolio/server'
import AdminAbout from '../pages/admin/single-pages/about/server'
import AdminContact from '../pages/admin/single-pages/contact/server'
import AdminServicePage from '../pages/admin/single-pages/servicePage/server'
import AdminBlog from '../pages/admin/adminBlog/server'
import AdminPrivacy from '../pages/admin/single-pages/privacy/server'
import AdminPortfolios from '../pages/admin/adminPortfolios/server'
import AdminReviews from '../pages/admin/adminReviews/server'
import AdminSinglePortfolio from '../pages/admin/single-pages/singlePortfolio/server'
import AdminFeature from '../pages/admin/single-pages/feature/server'

const routes = [
    {
        path: '/',
        exact: true,
        auth: false,
        component: HomeServer
    },
    {
        path: '/no',
        exact: true,
        auth: false,
        component: HomeServer
    },
    {
        path: '/login',
        exact: true,
        auth: false,
        component: LoginServer
    },
    {
        path: '/no/login',
        exact: true,
        auth: false,
        component: LoginServer
    },
    {
        path: '/register',
        exact: true,
        auth: false,
        component: RegisterServer
    },
    {
        path: '/no/register',
        exact: true,
        auth: false,
        component: RegisterServer
    },
    {
        path: '/forgot-password',
        exact: true,
        auth: false,
        component: ForgotPasswordServer
    },
    {
        path: '/reset-password/:token/:email',
        exact: true,
        auth: false,
        component: ResetPasswordServer
    },
    {
        path: '/web-development',
        exact: true,
        auth: false,
        component: ServiceWebServer
    },
    {
        path: '/no/web-development',
        exact: true,
        auth: false,
        component: ServiceWebServer
    },
    {
        path: '/mobile-development',
        exact: true,
        auth: false,
        component: ServiceMobileServer
    },
    {
        path: '/no/mobile-development',
        exact: true,
        auth: false,
        component: ServiceMobileServer
    },
    {
        path: '/ui-ux-design',
        exact: true,
        auth: false,
        component: ServiceUIServer
    },
    {
        path: '/no/ui-ux-design',
        exact: true,
        auth: false,
        component: ServiceUIServer
    },
    {
        path: '/branding',
        exact: true,
        auth: false,
        component: ServiceBrandingServer
    },
    {
        path: '/no/branding',
        exact: true,
        auth: false,
        component: ServiceBrandingServer
    },
    {
        path: '/illustration',
        exact: true,
        auth: false,
        component: ServiceIllustrationServer
    },
    {
        path: '/no/illustration',
        exact: true,
        auth: false,
        component: ServiceIllustrationServer
    },
    {
        path: '/marketing-material',
        exact: true,
        auth: false,
        component: ServiceMarketingServer
    },
    {
        path: '/no/marketing-material',
        exact: true,
        auth: false,
        component: ServiceMarketingServer
    },
    {
        path: '/portfolio',
        exact: true,
        auth: false,
        component: PortfolioServer
    },
    {
        path: '/no/portfolio',
        exact: true,
        auth: false,
        component: PortfolioServer
    },
    {
        path: '/features',
        exact: true,
        auth: false,
        component: FeaturesServer
    },
    {
        path: '/no/features',
        exact: true,
        auth: false,
        component: FeaturesServer
    },
    {
        path: '/about',
        exact: true,
        auth: false,
        component: AboutServer
    },
    {
        path: '/no/about',
        exact: true,
        auth: false,
        component: AboutServer
    },
    {
        path: '/blog',
        exact: true,
        auth: false,
        component: BlogServer
    },
    {
        path: '/no/blog',
        exact: true,
        auth: false,
        component: BlogServer
    },
    {
        path: '/contact',
        exact: true,
        auth: false,
        component: ContactServer
    },
    {
        path: '/no/contact',
        exact: true,
        auth: false,
        component: ContactServer
    },
    {
        path: '/privacy',
        exact: true,
        auth: false,
        component: PrivacyServer
    },
    {
        path: '/no/privacy',
        exact: true,
        auth: false,
        component: PrivacyServer
    },
    {
        path: '/security',
        exact: true,
        auth: false,
        component: PrivacyServer
    },
    {
        path: '/no/security',
        exact: true,
        auth: false,
        component: PrivacyServer
    },
    {
        path: '/terms',
        exact: true,
        auth: false,
        component: PrivacyServer
    },
    {
        path: '/no/terms',
        exact: true,
        auth: false,
        component: PrivacyServer
    },
    {
        path: '/confidentiality',
        exact: true,
        auth: false,
        component: PrivacyServer
    },
    {
        path: '/no/confidentiality',
        exact: true,
        auth: false,
        component: PrivacyServer
    },
    {
        path: '/admin/pages',
        exact: true,
        admin: true,
        component: AdminPages
    },
    {
        path: '/admin/blog',
        exact: true,
        admin: true,
        component: AdminBlog
    },
    {
        path: '/admin/portfolio',
        exact: true,
        admin: true,
        component: AdminPortfolios
    },
    {
        path: '/admin/reviews',
        exact: true,
        admin: true,
        component: AdminReviews
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
        path: '/admin/single-page/single_portfolio',
        exact: true,
        admin: true,
        component: AdminSinglePortfolio
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
        path: '/admin/single-page/features',
        exact: true,
        admin: true,
        component: AdminFeature
    },
    {
        path: '/admin/single-page/service-web',
        exact: true,
        admin: true,
        component: AdminServicePage
    },
    {
        path: '/admin/single-page/service-mobile',
        exact: true,
        admin: true,
        component: AdminServicePage
    },
    {
        path: '/admin/single-page/service-ui',
        exact: true,
        admin: true,
        component: AdminServicePage
    },
    {
        path: '/admin/single-page/service-branding',
        exact: true,
        admin: true,
        component: AdminServicePage
    },
    {
        path: '/admin/single-page/service-illustration',
        exact: true,
        admin: true,
        component: AdminServicePage
    },
    {
        path: '/admin/single-page/service-market',
        exact: true,
        admin: true,
        component: AdminServicePage
    },
    {
        path: '/admin/legal',
        exact: true,
        admin: true,
        component: AdminPrivacy
    },
    {
        path: '/portfolio/:type',
        exact: true,
        auth: false,
        component: SinglePortfolioServer
    },
    {
        path: '/no/portfolio/:type',
        exact: true,
        auth: false,
        component: SinglePortfolioServer
    },
    {
        path: '',
        exact: true,
        auth: false,
        component: NoMatch
    }
];

export default routes;