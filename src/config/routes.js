// Layout
import LayoutAdmin from "../layouts/LayoutAdmin.tsx";
import LayoutBasic from "../layouts/LayoutBasic.tsx";

// Admin Pages
import AdminHome from "../pages/Admin";
import AdminSignIn from "../pages/Admin/SignIn";
import AdminUsers from "../pages/Admin/Users";
import AdminMenuWeb from "../pages/Admin/MenuWeb";
import AdminContactMessages from "../pages/Admin/ContactMessages";
import AdminEducation from "../pages/Admin/Education";
import AdminAboutMe from "../pages/Admin/AboutMeAdmin";

// Web Pages
import Home from "../pages/Web/Home";
import AboutMe from "../pages/Web/AboutMe";
import Education from "../pages/Web/Education";
import Curriculum from "../pages/Web/Curriculum";
import Projects from "../pages/Web/Projects";
import Contact from "../pages/Web/Contact";

// Other
import PrivacyPolicy from "../pages/PrivacyPolicy";
import Errors from "../pages/Errors";

const routes = [
  {
    path: "/ad1988",
    exact: false,
    component: LayoutAdmin,
    routes: [
      {
        path: "/ad1988",
        exact: true,
        component: AdminHome,
      },
      {
        path: "/ad1988/login",
        exact: true,
        component: AdminSignIn,
      },
      {
        path: "/ad1988/users",
        component: AdminUsers,
        exact: true
      },
      {
        path: "/ad1988/menu",
        exact: true,
        component: AdminMenuWeb
      },
      {
        path: "/ad1988/contact-messages",
        exact: true,
        component: AdminContactMessages
      },
      {
        path: "/ad1988/education",
        exact: true,
        component: AdminEducation
      },
      {
        path: "/ad1988/about-me",
        exact: true,
        component: AdminAboutMe
      },
      {
        component: Errors,
      },
    ],
  },
  {
    path: "/",
    exact: false,
    component: LayoutBasic,
    routes: [
      {
        path: "/",
        exact: true,
        component: Home,
      },
      {
        path: "/education",
        exact: true,
        component: Education
      },
      {
        path: "/education/:url",
        exact: true,
        component: Education
      },
      {
        path: "/curriculum",
        exact: true,
        component: Curriculum
      },
      {
        path: "/projects",
        exact: true,
        component: Projects
      },
      {
        path: "/about-me",
        exact: true,
        component: AboutMe,
      },
      {
        path: "/contact",
        exact: true,
        component: Contact
      },
      {
        path: "/privacy-policy",
        exact: true,
        component: PrivacyPolicy
      },
      {
        component: Errors,
      },
    ],
  },
];

export default routes;
