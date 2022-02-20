import React from 'react'
import axios from 'axios'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import logo from './entete.jpeg' // relative path to image 
import { Link,withRouter } from "react-router-dom"
import { Dropdown } from 'react-bootstrap';
import { base64Str } from 'base-64';
import UserContext from "../../contexts/UserContext";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
} from "reactstrap";
import fontarab from './Amiri-Regular.ttf' 

import Cookies from 'universal-cookie';

const cookies = new Cookies();
//import BsPersonPlusFill  from "@meronex/icons/bs/BsPersonPlusFill";
//import FcPrint  from "@meronex/icons/bs/FcPrint";
//import { FcPrint } from "react-icons/fc";
//import 'react-dropdown/style.css';
const options = [
  'one', 'two', 'three'
];
const defaultOption = options[0];
class Stagiaire extends React.Component {

  constructor(props) {
    super()
    this.state = {
      cinStagiaire: '',
      nomStagiaireFr: '',
      nomStagiaireAr: '',
      datenaissanceStag: '',
      adressStagiaire: '',
      codeSection: '',
      niveauScolaire: '',
      emailstagiaire: '',
      specialiteStagiaire: '',
      groupeStagiaire: '',
      listeSection: [],
      Groupe: [],
      liststag: [],
      listgroupsection: [],
      atpsence: [],  
      idpromotion: '',
      Listepromo:[]
    }
    this.onChangeCodeSection = this.onChangeCodeSection.bind(this);
    this.onChangeGroupeStagiaire = this.onChangeGroupeStagiaire.bind(this);
    this.onChangeIdpromotion = this.onChangeIdpromotion.bind(this);}

  findgroupClick() {
    const a = { x: this.state.codeSection }
    axios.post(`http://localhost/methode/getgroup`, a)
      .then((res) => {
        this.setState({
          listgroupsection: res.data,
        })
        console.log("resultat de recherche");
        console.log(res.data)
      })
      // Catch any errors we hit and update the app
      .catch(error => this.setState({ error, isLoading: false }));
  }
  findsectionClick() {
    const a = { x: this.state.idpromotion }
    axios.post(`http://localhost/methode/getsection`, a)
      .then((res) => {
        this.setState({
          listeSection: res.data,
        })
        console.log("resultat de recherche");
        console.log(res.data)
      })
      // Catch any errors we hit and update the app
      .catch(error => this.setState({ error, isLoading: false }));
  }


  handleClick() {
    const a = {
      x: this.state.codeSection,
      y: this.state.groupeStagiaire,

    }
    axios.post(`http://localhost/filtre/filtrestagiare`, a)
      .then((res) => {
        this.setState({
          liststag: res.data,
        })
        console.log("resultat de recherche");
        console.log(res.data)
      })
      // Catch any errors we hit and update the app
      .catch(error => this.setState({ error, isLoading: false }));
    console.log(this.state.liststag)
  }
 

  componentDidMount() {

const token = localStorage.getItem("token");
if (token){
console.log('ok')
}
else{
  this.props.history.push('/');
}

/** */
    console.log('tokennnnnn')
   console.log( cookies.get('token'));
    this.handleClick();
    this.findsectionClick();
    this.listepromo();
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

  listepromo(){
    axios.get('http://localhost/prom')
    .then((res)=>{
      this.setState({
      Listepromo:res.data,
     
    })
  
    })
  }
  onChangeIdpromotion(e) {
    this.setState({ idpromotion: e.target.value })
  }

  printattpres(id) {
    axios.post(`http://localhost/methode/printstag/${id}`)
      .then((res) => {
        this.setState({
          atpsence: res.data,
        })
        console.log("resultat de recherche print stag");
        // console.log(res.data)
        this.pdfAttestation();
        console.log(this.state.atpsence.nomStagiaireAr)
      })
      // Catch any errors we hit and update the app
      .catch(error => this.setState({ error, isLoading: false }));
    console.log(this.state.atpsence.nomStagiaireAr)
  }


  printattinscri(id) {
    axios.post(`http://localhost/methode/printstag/${id}`)
      .then((res) => {
        this.setState({
          atpsence: res.data,
        })
        console.log("resultat de recherche print stag");
        // console.log(res.data)
        this.pdfAttestInscri();
        console.log(this.state.atpsence.nomStagiaireAr)
      })
      // Catch any errors we hit and update the app
      .catch(error => this.setState({ error, isLoading: false }));
    console.log(this.state.atpsence.nomStagiaireAr)
  }


  pdfAttestation = () => {

   // var iframe = document.createElement('iframe');
  //  iframe.setAttribute('style', 'position:absolute;right:120px; top:0; bottom:0; height:100%; width:650px; padding:20px;');
   // document.body.appendChild(iframe);
    var img = new Image()
    var pdf = new jsPDF('p', 'pt', 'a4');
    pdf.setFontSize(9);
    pdf.addImage(logo, 'JPEG', 35, 10, 480, 60);
    pdf.setFontSize(22);
    pdf.addFileToVFS(fontarab, base64Str);
    pdf.addFont(fontarab, 'Amiri', 'normal');
   pdf.setFont('Amiri'); 
    pdf.text(210, 100, 'شهادة حضور ')
    pdf.setFontSize(16);
    //pdf.line(150, 110, 300, 110);
    pdf.text(220, 200,'يشهد مدير المركز القطاعي للتكوين في فنون الطباعة بأريانة أنّ ؛')
    pdf.text(480, 250, ' المتكون (ة) ')
    pdf.text(400, 250,this.state.atpsence.nomStagiaireAr)
    pdf.text(410, 300, 'صاحب بطاقة تعريف وطنية رقم ')
    pdf.text(310, 300,this.state.atpsence.cinStagiaire)
    pdf.text(470, 350, 'المولود بتاريخ ')
    pdf.text(250, 350,this.state.atpsence.datenaissanceStag)
    pdf.text(470, 400, 'مرسم بالمركز ')
    pdf.text(250, 400,this.state.atpsence.codePromotion.libPromotionAr)
    pdf.text(220, 450, 'سلمت هذه الشهادة للمعني للإستظهار بها لدى من يهمه الأمر ')
    pdf.text(80, 500, 'مدير المركز ')
    pdf.setFontSize(9)
   // var iframe = document.createElement('iframe');
   // iframe.setAttribute('style', 'position:absolute;right:120px; top:0; bottom:0; height:100%; width:650px; padding:20px;');
   // document.body.appendChild(iframe);
   // iframe.src = pdf.output('datauristring');

   window.open(pdf.output('bloburl'))


  }


  pdfAttestInscri = () => {

   // var iframe = document.createElement('iframe');
  //  iframe.setAttribute('style', 'position:absolute;right:120px; top:0; bottom:0; height:100%; width:650px; padding:20px;');
   // document.body.appendChild(iframe);
    var img = new Image()
    var pdf = new jsPDF('p', 'pt', 'a4');
    pdf.setFontSize(9);
    pdf.addImage(logo, 'JPEG', 35, 10, 480, 60);
    pdf.setFontSize(22);
    pdf.addFileToVFS(fontarab, base64Str);
    pdf.addFont(fontarab, 'Amiri', 'normal');
   pdf.setFont('Amiri'); 
    pdf.text(210, 100, 'شهادة ترسيم ')
    pdf.setFontSize(16);
    //pdf.line(150, 110, 300, 110);
    pdf.text(220, 200,'يشهد مدير المركز القطاعي للتكوين في فنون الطباعة بأريانة أنّ ؛')
    pdf.text(480, 250, ' المتكون (ة) ')
    pdf.text(400, 250,this.state.atpsence.nomStagiaireAr)
    pdf.text(410, 300, 'صاحب بطاقة تعريف وطنية رقم ')
    pdf.text(310, 300,this.state.atpsence.cinStagiaire)
    pdf.text(470, 350, 'المولود بتاريخ ')
    pdf.text(250, 350,this.state.atpsence.datenaissanceStag)
    pdf.text(470, 400, 'مرسم بالمركز ')
    pdf.text(250, 400,this.state.atpsence.codePromotion.libPromotionAr)
    pdf.text(220, 450, 'سلمت هذه الشهادة للمعني للإستظهار بها لدى من يهمه الأمر ')
    pdf.text(80, 500, 'مدير المركز ')
    pdf.setFontSize(9)
   // var iframe = document.createElement('iframe');
   // iframe.setAttribute('style', 'position:absolute;right:120px; top:0; bottom:0; height:100%; width:650px; padding:20px;');
   // document.body.appendChild(iframe);
   // iframe.src = pdf.output('datauristring');
   window.open(pdf.output('bloburl'))
  }






  onChangeCodeSection(e) {
    this.setState({ codeSection: e.target.value })
  } onChangeGroupeStagiaire(e) {
    this.setState({ groupeStagiaire: e.target.value })
  }

  pdfGenerate = () => {

  //  var iframe = document.createElement('iframe');
   // iframe.setAttribute('style', 'position:absolute;right:120px; top:0; bottom:0; height:100%; width:650px; padding:20px;');
   // document.body.appendChild(iframe);
    var img = new Image()
    var Values = this.state.liststag.map((element, index) => Object.values([index + 1, element.cinStagiaire, element.nomStagiaireFr]));
    var pdf = new jsPDF('p', 'pt', 'a4');
    pdf.setFontSize(9);
    pdf.addImage(logo, 'JPEG', 35, 10, 480, 60);
    pdf.setFontSize(22);
    pdf.text(210, 80, 'Feuille de présence')
    pdf.setFontSize(10);

    pdf.line(150, 110, 300, 110);
    {this.state.liststag.map((stagiare, index) => (
    pdf.text(35, 130, 'Promotion'),
    pdf.text(100, 130,stagiare.codePromotion.libPromotionFr),
    pdf.text(120, 130, '')
    ))}
    pdf.setFontSize(9)
    pdf.text(35, 800, "(*) ")
    pdf.autoTable({ html: '#my-table', startY: 150, showHead: 'everyPage' })
    // Or use javascript directly:
    pdf.autoTable({
      head: [['N°', 'CIN', 'Nom&Prénom', 'Observation']],
      body: Values

    })
  //  var iframe = document.createElement('iframe');
  //  iframe.setAttribute('style', 'position:absolute;right:120px; top:0; bottom:0; height:100%; width:650px; padding:20px;');
  //  document.body.appendChild(iframe);
   // iframe.src = pdf.output('datauristring');

   window.open(pdf.output('bloburl'))


   
  }

  render() {
    return (

    
      <div className="content" >
       
        <form className="row g-4">

        <div class="col-auto">

<select class="form-control" name="grouprselect" value={this.state.idpromotion}
  onChange={this.onChangeIdpromotion} 
  onClick={() => this.findsectionClick()} >

  <option >Selectionner une Promotion</option>

  {
    this.state.Listepromo.map(function (promotion) {
      return <option value={promotion._id}  >{promotion.libPromotionFr}</option>;
    })
  }
</select>
</div>


          <div class="col-auto">
            <select
              class="form-control"
              value={this.state.codeSection}
              onChange={this.onChangeCodeSection}

              onClick={() => this.findgroupClick()}
            >
              <option >Choisir une section</option>

              {
                this.state.listeSection.map(function (section) {
                  return <option value={section._id}  >{section.libSection}</option>;
                })
              }
            </select>
          </div>
          <div class="col-auto">

            <select class="form-control" name="grouprselect" value={this.state.groupeStagiaire}
              onChange={this.onChangeGroupeStagiaire}  >



              <option >Selectionner un groupe</option>

              {
                this.state.listgroupsection.map(function (groupe) {
                  return <option value={groupe._id}  >{groupe.codeGroupe}</option>;
                })
              }
            </select>
          </div>
          <div class="col-auto">
          <Link className='btn btn-danger' onClick={() => this.handleClick()}> <i className="nc-icon nc-zoom-split" /> </Link>
          </div>
          <div class="col-auto">
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
</div>
        </form>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>

              </CardHeader>
              <CardBody>

                <table id="dtBasicExample" className="table table-striped table-bordered table-sm" cellspacing="0" width="100%" responsive>
                  <thead class="thead-dark">
                    <tr>
                      <th scope="col">N°</th>
                      <th scope="col">CIN</th>
                      <th scope="col">Nom&Prénom</th>
                      <th scope="col"> الاسم و اللقب </th>

                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.liststag.map((stagiare, index) => (
                      <tr key={stagiare._id}>
                        <th scope="row">{index + 1}</th>
                        <td>{stagiare.cinStagiaire}</td>
                        <td>{stagiare.nomStagiaireFr}</td>
                        <td>{stagiare.nomStagiaireAr}</td>

                        <td>

                          <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                              Action
                            </Dropdown.Toggle>

                            <Dropdown.Menu>                           
                              <Dropdown.Item ><Link to={"/admin/editStagiaire/" + stagiare._id}>Modifier</Link></Dropdown.Item>
                              
                              <Dropdown.Item href="#/action-3"><Link to={"/admin/pdfRelevnote/" + stagiare._id}>Relevé de notes</Link></Dropdown.Item>
                              <Dropdown.Item ><Link onClick={(e) => this.printattpres(stagiare._id)}>Attestation de présence</Link></Dropdown.Item>
                              <Dropdown.Item ><Link onClick={(e) => this.printattinscri(stagiare._id)}>Attestation d'inscription</Link></Dropdown.Item>

                            </Dropdown.Menu>
                          </Dropdown>

                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>

              </CardBody>
            </Card>
          </Col>
        </Row>


      </div>
     
    )
  }
}
export default Stagiaire;