import React from 'react'
import axios from 'axios'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import logo from './entete.jpeg' // relative path to image 
import { Link,useLocation} from "react-router-dom"
import { BsPersonPlusFill } from "react-icons/bs";
import routes from "routes.js";
import { Dropdown } from 'react-bootstrap';
import fontarab from './Amiri-Regular.ttf' 
import { base64Str } from 'base-64';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
} from "reactstrap";

//import BsPersonPlusFill  from "@meronex/icons/bs/BsPersonPlusFill";
//import FcPrint  from "@meronex/icons/bs/FcPrint";
//import { FcPrint } from "react-icons/fc";
//import 'react-dropdown/style.css';
const options = [
  'one', 'two', 'three'
];
const defaultOption = options[0];


class Diplomes extends React.Component{








  
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
        attreus:[]
    }
    this.onChangeCodeSection = this.onChangeCodeSection.bind(this);
    this.onChangeGroupeStagiaire = this.onChangeGroupeStagiaire.bind(this);
  







    
  }
  
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
      axios.post(`http://localhost/filtre/filtrestagiaredip`,a) 
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
   pdf.text(210, 80, 'Liste de Stagiaires Diplômés')
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

 printattreus(id) {
  axios.post(`http://localhost/methode/printstag/${id}`)
    .then((res) => {
      this.setState({
        attreus: res.data,
      })
      console.log("resultat de recherche print stag");
      // console.log(res.data)
      this.pdfAttestreus();
      console.log(this.state.attreus.nomStagiaireAr)
    })
    // Catch any errors we hit and update the app
    .catch(error => this.setState({ error, isLoading: false }));
  console.log(this.state.attreus.nomStagiaireAr)
}

pdfAttestreus = () => {

  var iframe = document.createElement('iframe');
  iframe.setAttribute('style', 'position:absolute;right:120px; top:0; bottom:0; height:100%; width:650px; padding:20px;');
  document.body.appendChild(iframe);
  var img = new Image()
  var pdf = new jsPDF('l', 'pt', 'a4');
  pdf.setFontSize(9);
  pdf.addImage(logo, 'JPEG', 35, 10, 480, 60);
  pdf.setFontSize(22);
  pdf.addFileToVFS(fontarab, base64Str);
  pdf.addFont(fontarab, 'Amiri', 'normal');
 pdf.setFont('Amiri'); 
  pdf.text(210, 100, 'شهادة نجاح ')
  pdf.setFontSize(16);
  //pdf.line(150, 110, 300, 110);
  pdf.text(220, 200,'يشهد مدير المركز القطاعي للتكوين في فنون الطباعة بأريانة أنّ ؛')
  pdf.text(480, 250, ' المتكون (ة) ')
  pdf.text(400, 250,this.state.attreus.nomStagiaireAr)
  pdf.text(410, 300, 'صاحب بطاقة تعريف وطنية رقم ')
  pdf.text(310, 300,this.state.attreus.cinStagiaire)
  pdf.text(470, 350, 'المولود بتاريخ ')
  pdf.text(250, 350,this.state.attreus.datenaissanceStag)
  pdf.text(470, 400, 'مرسم بالمركز ')
  pdf.text(250, 400,this.state.attreus.codePromotion.libPromotionAr)
  pdf.text(220, 450, 'سلمت هذه الشهادة للمعني للإستظهار بها لدى من يهمه الأمر ')
  pdf.text(80, 500, 'مدير المركز ')
  pdf.setFontSize(9)
  var iframe = document.createElement('iframe');
  iframe.setAttribute('style', 'position:absolute;right:120px; top:0; bottom:0; height:100%; width:650px; padding:20px;');
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

    
    <div className="content" >


     

    <form  className="row g-3">
     
     <div class="col-auto">
  <select 
  class="form-control"
 value={this.state.codeSection}
  onChange={this.onChangeCodeSection}
  
  onClick={() => this.findgroupClick()}
  > 
<option >Choisir une section</option>

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
  
  
  
<option >Selectionner un groupe</option>

{
                               this.state.listgroupsection.map(function(groupe) {
                                   return <option value={groupe._id}  >{groupe.codeGroupe}</option>;
                               })
                           }
</select>           
             </div>
             <Link className='btn btn-danger' onClick={() => this.handleClick()}><i className="nc-icon nc-zoom-split" /></Link>
             
             <Col className="text-right" md="3" xs="3">
            <Button
              className="btn-round btn-icon"
              color="success"
              onClick={this.pdfGenerate}
              size="sm"
            >
              <i className="fa fa-print" />
            </Button>
          </Col>
           
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

    <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
  Action
</Dropdown.Toggle>

<Dropdown.Menu>
    
    <Dropdown.Item href="#/action-3"><Link  to={"/admin/pdfRelevnote/"+stagiare._id}>Relevé de notes</Link></Dropdown.Item>
    <Dropdown.Item ><Link onClick={(e) => this.printattreus(stagiare._id)}>Attestation de réussite </Link></Dropdown.Item>
    <Dropdown.Item href="#/action-3"><Link  to={"/admin/pdfRelevnote/"+stagiare._id}>Diplôme</Link></Dropdown.Item>

  </Dropdown.Menu>
</Dropdown>


   


    </td>
  </tr>
  ))}
</tbody>

</table>


           



</div>
  )
}}
export default Diplomes;