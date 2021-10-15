import React from 'react'
//import { Link } from 'react-router-dom'
import { FcHome } from "react-icons/fc";
import { FcGraduationCap } from "react-icons/fc";
import { FcBriefcase } from "react-icons/fc";
import { FcInspection } from "react-icons/fc";
import { FcLock } from "react-icons/fc";
import { BsFillPeopleFill } from "react-icons/bs";
import { FcPositiveDynamic } from "react-icons/fc";
import { FcReading } from "react-icons/fc";
import { BsReverseLayoutTextWindowReverse } from "react-icons/bs";



function Navbar() {
    return (


<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <a class="navbar-brand" href="/">CSFAG-APP</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="/"><FcHome/>   Home <span class="sr-only">(current)</span></a>

      </li>
      <li class="nav-item active">
        <a class="nav-link" href="/stagiaire"><BsFillPeopleFill/>  Stagiaires <span class="sr-only">(current)</span></a>
        
      </li>

      
      <li class="nav-item active">
        <a class="nav-link" href="/specialite"> <FcGraduationCap/> Spécialité <span class="sr-only">(current)</span></a>
        
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="/listpromotion"> <FcPositiveDynamic/> Promotions <span class="sr-only">(current)</span></a>
        
      </li>

      <li class="nav-item active">
        <a class="nav-link" href="/listeSection"> <FcReading/> Sections <span class="sr-only">(current)</span></a>
        
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="/module"><FcBriefcase/>Modules <span class="sr-only">(current)</span></a>
        
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="/listeCompetence"><BsReverseLayoutTextWindowReverse/>Compétences <span class="sr-only">(current)</span></a>
        
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="/note"><FcInspection/>Notes <span class="sr-only">(current)</span></a>
        
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="/user"><FcLock/>Gestion users <span class="sr-only">(current)</span></a> 
      </li>
            
    </ul>
    
  </div>
</nav>




    )
}
export default Navbar;