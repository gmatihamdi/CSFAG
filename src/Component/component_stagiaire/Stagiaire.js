import React from 'react'
import axios from 'axios'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import logo from './entete.jpeg' // relative path to image 
import { Link} from "react-router-dom"
import { BsPersonPlusFill } from "react-icons/bs";
//import BsPersonPlusFill  from "@meronex/icons/bs/BsPersonPlusFill";
//import FcPrint  from "@meronex/icons/bs/FcPrint";
//import { FcPrint } from "react-icons/fc";
//import 'react-dropdown/style.css';
const options = [
  'one', 'two', 'three'
];
const defaultOption = options[0];


class Stagiaire extends React.Component{
  constructor(props) {
    super()
    this.state = {
        cinStagiaire:'',
        nomStagiaireFr: '',
        nomStagiaireAr: '',
        datenaissanceStag: '',
        adressStagiaire: '',
        codeSection: '',
        niveauScolaire: '',
        emailstagiaire: '',
        specialiteStagiaire: '',
        groupeStagiaire: '',
        listeSection:[],
        Groupe:[],
        liststag:[],
        listgroupsection:[],

    }
    this.onChangeCodeSection = this.onChangeCodeSection.bind(this);
    this.onChangeGroupeStagiaire = this.onChangeGroupeStagiaire.bind(this);}
  
    findgroupClick(){
      const a={ x:this.state.codeSection}
      axios.post(`http://localhost/methode/getgroup`,a) 
      .then((res)=>{
        this.setState({
        listgroupsection:res.data,
      })
      console.log("resultat de recherche");
      console.log(res.data)
      })
  // Catch any errors we hit and update the app
  .catch(error => this.setState({ error, isLoading: false })); 
}


    handleClick(){
      const a={
        x:this.state.codeSection,
        y:this.state.groupeStagiaire,
  
      }
      axios.post(`http://localhost/filtre/filtrestagiare`,a) 
      .then((res)=>{
             this.setState({
             liststag:res.data,
           })
           console.log("resultat de recherche");
           console.log(res.data)
           })
       // Catch any errors we hit and update the app
       .catch(error => this.setState({ error, isLoading: false }));
       console.log( this.state.liststag)
    }
  fetchSection() {
    fetch(`http://localhost/sect`)
      // We get the API response and receive data in JSON format...
      .then(response => response.json())
      // ...then we update the users state
      .then(data =>
        this.setState({
          listeSection: data,
          isLoading: false,
        })
      )
      // Catch any errors we hit and update the app
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount(){
    this.handleClick();    
    this.fetchSection();      
  }

  deleteSpc(id) {
    axios.delete(`http://localhost/stag/${id}`)
        .then((res) => {
            console.log(' successfully deleted!')
        }).catch((error) => {
            console.log(error)
        })
        this.props.history.push('/stagiare')
}

onChangeCodeSection(e) {
  this.setState({ codeSection: e.target.value })
}onChangeGroupeStagiaire(e) {
  this.setState({ groupeStagiaire: e.target.value })
}

pdfGenerate=()=>{
  console.log('Moyn')
  console.log(this.state.Moyn)
  var iframe = document.createElement('iframe');
  iframe.setAttribute('style','position:absolute;right:120px; top:0; bottom:0; height:100%; width:650px; padding:20px;');
 document.body.appendChild(iframe);
var img = new Image()
 var Values =  this.state.liststag.map( (element,index) => Object.values([index+1,element.cinStagiaire,element.nomStagiaireFr]));
   var pdf = new jsPDF('p', 'pt', 'a4');
 pdf.setFontSize(9);
 pdf.addImage(logo, 'JPEG', 35, 10, 480, 60);
 pdf.setFontSize(22);
   pdf.text(210, 80, 'Feuille de présence')
   pdf.setFontSize(10);
  
   pdf.line(150, 110, 300, 110);
   pdf.text(35, 130,'specialite')
   pdf.text(120, 130,'')

  pdf.setFontSize(9)
  pdf.text(35, 800,"(*) Il ne peut être délivré qu'une seule copie du présent relevé de notes")
   pdf.autoTable({ html: '#my-table' , startY: 150,showHead: 'everyPage'})
 // Or use javascript directly:
 pdf.autoTable({    
   head: [['N°', 'CIN', 'Nom&Prénom','Observation']],  
    body:Values

 }) 
   var iframe = document.createElement('iframe');
   iframe.setAttribute('style','position:absolute;right:120px; top:0; bottom:0; height:100%; width:650px; padding:20px;');
   document.body.appendChild(iframe);  
   iframe.src = pdf.output('datauristring');
 }

/*
<select class="form-control"  name="niveauMatiere" value={this.state.groupeStagiaire}
   onChange={this.onChangeGroupeStagiaire}>
       <option >select Groupe</option>

       <option >G1</option>
       <option >G2</option>
   </select>


*/




//<BsPersonPlusFill/>
  render(){
  return( 

    
    <div className="content">

<button onClick={this.pdfGenerate}>pdf FR</button>
     
      <h1> Liste de Stagiaires </h1>

  <Link className="btn btn-danger" to='/admin/addstagiaire'>Ajouter un Stagiaire</Link>
  <Link className="btn btn-warning" to='/admin/listegroup'>Groupe </Link>


    <form  className="row g-3">
     
     <div class="col-auto">
  <select 
  class="form-control"
 value={this.state.codeSection}
  onChange={this.onChangeCodeSection}
  
  onClick={() => this.findgroupClick()}
  > 
<option >select section</option>

{
                               this.state.listeSection.map(function(section) {
                                   return <option value={section._id}  >{section.libSection}</option>;
                               })
                           }
</select>
</div>
<div class="col-auto">   

<select class="form-control"  name="grouprselect" value={this.state.groupeStagiaire}
   onChange={this.onChangeGroupeStagiaire}  >
  
  
  
<option >select groupe</option>

{
                               this.state.listgroupsection.map(function(groupe) {
                                   return <option value={groupe._id}  >{groupe.codeGroupe}</option>;
                               })
                           }
</select>           
             </div>
             <Link className='btn btn-danger' onClick={() => this.handleClick()}>Charger la liste</Link>
             
         
           
     </form>


<table id="dtBasicExample" className="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
<thead class="thead-dark">
  <tr>
    <th scope="col">N°</th>
    <th scope="col">CIN</th>
    <th scope="col">Nom&Prénom</th>
    <th scope="col">specialite</th>
 
    <th scope="col">Action</th>
  </tr>
</thead>
<tbody>
  {this.state.liststag.map((stagiare,index)=>(
          <tr key={stagiare._id}>
          <th scope="row">{index + 1}</th>
            <td>{stagiare.cinStagiaire}</td>
            <td>{stagiare.nomStagiaireFr}</td>
            <td>{stagiare.specialiteStagiaire}</td>
          
    <td>
    <Link className='btn btn-primary mr-2'>View</Link>
    <Link className='btn btn-outline-primary mr-2' to={"/admin/editStagiaire/"+stagiare._id}>Edit</Link>
    <Link className='btn btn-danger' onClick={(e)=>this.deleteSpc(stagiare._id)}>Delete</Link>
    <Link className="btn btn-warning" to={"/admin/pdfRelevnote/"+stagiare._id}>Relevé de notes</Link>
    </td>
  </tr>
  ))}
</tbody>

</table>




</div>
  )
}}
export default Stagiaire;