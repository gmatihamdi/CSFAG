/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { BrowserRouter , Route } from "react-router-dom";
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import Maps from "views/Map.js";
import UserPage from "views/User.js";

import  Specialite from "./Component/component_specialite/specialite";
import  Stagiaires from './Component/component_stagiaire/Stagiaire'
import SelectStagiaire from './Component/component_stagiaire/selectstag'
import Promotion from './Component/component_promotion/listepromotion'
import Section from './Component/component_section/listesection'
import Modules from './Component/component_module/module'
import Competences from './Component/component_competence/listeCompetence'
import Note from './Component/component_note/note'
import diplomes from './Component/component_stagiaire/diplomes'
import users from './Component/component_login/User'
import formateurs from './Component/component_formateur/listeFormateur'

import login from './Component/component_login/auth'
import statistique from './Component/component_statistique/statistique'


var routes = [

  {
    path: "/dashboard",
    name: "Statistique",
    icon: "nc-icon nc-bank",
    component: statistique,
    layout: "/admin",
  },

  {
    path: "/stagiaires",
    name: "Stagiaires",
    icon: "nc-icon nc-single-02",
    component: Stagiaires,
    layout: "/admin",
  },
  {
    path: "/SelectStagiaire",
    name: "Candidature",
    icon: "nc-icon nc-tap-01",
    component: SelectStagiaire,
    layout: "/admin",
  },
  {
    path: "/Specialite",
    name: "Spécialité",
    icon: "nc-icon nc-book-bookmark",
    component: Specialite,
    layout: "/admin",
  },

  {
    path: "/Promotion",
    name: "Promotions",
    icon: "nc-icon nc-hat-3",
    component: Promotion,
    layout: "/admin",
  },
  {
    path: "/Section",
    name: "Sections",
    icon: "nc-icon nc-bookmark-2",
    component: Section,
    layout: "/admin",
  },

  {
    path: "/Modules",
    name: "Modules",
    icon: "nc-icon nc-briefcase-24",
    component: Modules,
    layout: "/admin",
  },

  {
    path: "/Competences",
    name: "Compétences",
    icon: "nc-icon nc-paper",
    component: Competences,
    layout: "/admin",
  },
  {
    path: "/formateurs",
    name: "Formateurs",
    icon: "nc-icon nc-key-25",
    component: formateurs,
    layout: "/admin",
  },




  {
    path: "/Note",
    name: "Evaluation",
    icon: "nc-icon nc-check-2",
    component: Note,
    layout: "/admin",
  },

  {
    path: "/listediplom",
    name: "Diplomés",
    icon: "nc-icon nc-single-02",
    component: diplomes,
    layout: "/admin",
  },




  {
    path: "/users",
    name: "User Profile",
    icon: "nc-icon nc-key-25",
    component: users,
    layout: "/admin",
  },
 
  {
    path: "/login",
    name: "User login",
    icon: "nc-icon nc-single-02",
    component: login,
    layout: "/admin",
  },
 
 /*

   {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin",
  },
  
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: Icons,
    layout: "/admin",
  },  
  {
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin",
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Table List",
    icon: "nc-icon nc-tile-56",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-caps-small",
    component: Typography,
    layout: "/admin",
  },*/

];




export default routes;
