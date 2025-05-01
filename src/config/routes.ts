// Layout
import LayoutAdmin from '../views/layouts/LayoutAdmin';
import LayoutBasic from '../views/layouts/LayoutBasic';

// Admin Pages
import AdminHome from '../views/pages/Admin';
import AdminSignIn from '../views/pages/Admin/SignIn';
import AdminUsers from '../views/pages/Admin/Users';
import AdminMenuWeb from '../views/pages/Admin/MenuWeb';
import AdminContactMessages from '../views/pages/Admin/ContactMessages';
import AdminEducation from '../views/pages/Admin/Education';
import AdminAboutMe from '../views/pages/Admin/AboutMeAdmin';

// Web Pages
import Home from '../views/pages/Web/Home';
import Education from '../views/pages/Web/Education';
import Curriculum from '../views/pages/Web/Curriculum';
import Contact from '../views/pages/Web/Contact';

// Other
import PrivacyPolicy from '../views/pages/PrivacyPolicy';
import Errors from '../views/pages/Errors';

const routes = [
  {
    path: '/ad1988',
    exact: false,
    component: LayoutAdmin,
    routes: [
      {
        path: '/ad1988',
        exact: true,
        component: AdminHome,
      },
      {
        path: '/ad1988/login',
        exact: true,
        component: AdminSignIn,
      },
      {
        path: '/ad1988/users',
        component: AdminUsers,
        exact: true,
      },
      {
        path: '/ad1988/menu',
        exact: true,
        component: AdminMenuWeb,
      },
      {
        path: '/ad1988/contact-messages',
        exact: true,
        component: AdminContactMessages,
      },
      {
        path: '/ad1988/education',
        exact: true,
        component: AdminEducation,
      },
      {
        path: '/ad1988/about-me',
        exact: true,
        component: AdminAboutMe,
      },
      {
        component: Errors,
      },
    ],
  },
  {
    path: '/',
    exact: false,
    component: LayoutBasic,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home,
      },
      {
        path: '/education',
        exact: true,
        component: Education,
      },
      {
        path: '/education/:url',
        exact: true,
        component: Education,
      },
      {
        path: '/curriculum',
        exact: true,
        component: Curriculum,
      },
      {
        path: '/contact',
        exact: true,
        component: Contact,
      },
      {
        path: '/privacy-policy',
        exact: true,
        component: PrivacyPolicy,
      },
      {
        component: Errors,
      },
    ],
  },
];

export default routes;
