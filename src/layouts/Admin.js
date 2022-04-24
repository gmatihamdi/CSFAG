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
import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch, useLocation } from "react-router-dom";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import AddStagiaire from '../Component/component_stagiaire/creatStagiaire';
import AddSpecialite from '../Component/component_specialite/ajoutSpecialite'
import AddMatiere from '../Component/component_matiere/ajoutmatiere'
import EditSpecialite from '../Component/component_specialite/editSpecialite'
import PDFSpecialite from '../Component/component_specialite/pdfspec'
import PDFRelevnote from '../Component/component_note/relevnote'
import EditMatiere from '../Component/component_matiere/EditMatiere'
import EditStagiaire from '../Component/component_stagiaire/editStagiaire'  
import Listeselection from '../Component/component_stagiaire/selectstag'
import ReglageListe from '../Component/component_stagiaire/reglageadmin'

import AddModule from '../Component/component_module/addModule'
import Addnote from '../Component/component_note/creatNote'
import Addpromotion from '../Component/component_promotion/addpromotion'
import Editpromotion from '../Component/component_promotion/editpromotion'
import AddSection from '../Component/component_section/addsection'
import EditSection from '../Component/component_section/editsection'
import AddCompetence from '../Component/component_competence/addCompetence'
import AddGroupe from '../Component/component_groupe/addGroupe'
import EditNote from '../Component/component_note/editNote'
import Editcompetence from "Component/component_competence/editCompetence";
import Addgroupe from '../Component/component_groupe/addGroupe';
import Editgroupe from '../Component/component_groupe/editGroupe';
import ListeGroupe from '../Component/component_groupe/listegroup';
import Listediplomes from '../Component/component_stagiaire/diplomes';
import Login from '../Component/component_login/auth';
import AddFormateur from '../Component/component_formateur/addFormateur';
import EditFormateur from '../Component/component_formateur/editFormateur';
import Authent from '../layouts/Auth';
import routes from "routes.js";

var ps;

function Dashboard(props) {
  const [backgroundColor, setBackgroundColor] = React.useState("black");
  const [activeColor, setActiveColor] = React.useState("info");
  const mainPanel = React.useRef();
  const location = useLocation();
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.body.classList.toggle("perfect-scrollbar-on");
      }
    };
  });
  React.useEffect(() => {
    mainPanel.current.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);
  const handleActiveClick = (color) => {
    setActiveColor(color);
  };
  const handleBgClick = (color) => {
    setBackgroundColor(color);
  };

  /*   <FixedPlugin
        bgColor={backgroundColor}
        activeColor={activeColor}
        handleActiveClick={handleActiveClick}
        handleBgClick={handleBgClick}
      /> */
  return (
    <div className="wrapper">
      <Sidebar
        {...props}
        routes={routes}
        bgColor={backgroundColor}
        activeColor={activeColor}
      />
      <div className="main-panel" ref={mainPanel}>
        <DemoNavbar {...props} />


      
        <Switch>
          {routes.map((prop, key) => {
            return (
              <Route
                path={prop.layout + prop.path}
                component={prop.component}
                key={key}
              />


             
            );
          })}

          <Route  path="/admin/addstagiaire" component={AddStagiaire}/>
          <Route  path="/admin/addSpecialite" component={AddSpecialite}/>
  <Route  path="/admin/addMatiere" component={AddMatiere}/>
  <Route  path="/admin/addStagiaire" component={AddStagiaire}/>
  <Route  path="/admin/pdfSpecialite" component={PDFSpecialite}/>
  <Route  path="/admin/pdfRelevnote/:id" component={PDFRelevnote}/>
  <Route  path="/admin/addnote" component={Addnote}/>
  <Route  path="/admin/editStagiaire/:id" component={EditStagiaire}/>
  <Route  path="/admin/editSpecialite/:id" component={EditSpecialite}/>
  <Route  path="/admin/editMatiere/:id" component={EditMatiere}/>
  <Route  path="/admin/editGroup/:id" component={Editgroupe}/>
  <Route  path="/admin/addmodule" component={AddModule}/>
  <Route  path="/admin/addpromotion" component={Addpromotion}/>
  <Route  path="/admin/editpromotion/:id" component={Editpromotion}/>
  <Route  path="/admin/addSection" component={AddSection}/>
  <Route  path="/admin/editSection/:id" component={EditSection}/>
  <Route  path="/admin/addCompetence" component={AddCompetence}/>
  <Route  path="/admin/editNote/:id" component={EditNote}/>
  <Route  path="/admin/addgroupe" component={Addgroupe}/>
  <Route  path="/admin/listegroup" component={ListeGroupe}/>
  <Route  path="/admin/listediplom" component={Listediplomes}/>
  <Route  path="/admin/login" component={Login}/>
  <Route  path="/admin/auth" component={Authent}/>
  <Route  path="/admin/addFormateur" component={AddFormateur}/>
  <Route  path="/admin/reglageListe" component={ReglageListe}/>

  <Route  path="/admin/editFormateur/:id" component={EditFormateur}/>
 


  <Route  path="/admin/editcompetence/:id" component={Editcompetence}/>






        </Switch>
        
        <Footer fluid />
      </div>
   
    </div>
  );
}

export default Dashboard;
