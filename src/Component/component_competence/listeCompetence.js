import React from 'react'
import axios from 'axios'
import { Link} from "react-router-dom"
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
} from "reactstrap";
import ModalHeader from 'react-bootstrap/esm/ModalHeader'
class ListeCompetence extends React.Component{
  constructor(props) {
    super()
    this.state = {
      codeCompetence:  '' ,
      codePromotion: '',
      codeSection: '', 
       codeSpecialite:  '', 
       codeMatiere:'' ,
       listcompetence:[],
        codeSection: '',
        idpromotion: '',
        listeSection:[],
        Listepromo:[],
        show:false
    }
    this.onChangeCodeSection = this.onChangeCodeSection.bind(this);
    this.onChangeIdpromotion = this.onChangeIdpromotion.bind(this);
  }
  
  handleClick() {
    const a = {
      x: this.state.codeSection,
    }
    axios.post(`http://localhost/filtre/filtrecompetence`, a)
      .then((res) => {
        this.setState({
          listcompetence: res.data,
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

  listepromo() {
    axios.get('http://localhost/prom')
      .then((res) => {
        this.setState({
          Listepromo: res.data,

        })

      })
  }





  componentDidMount(){
    this.listepromo();
    this.handleClick();
    this.findsectionClick() ;
    const token = localStorage.getItem("token");
    if (token){
    console.log('ok')
    }
    else{
      this.props.history.push('/');
    }
  }

  deleteNote(id) {
    axios.delete(`http://localhost/compt/${id}`)
        .then((res) => {
            console.log(' successfully deleted!')
        }).catch((error) => {
            console.log(error)
        })
      //  this.props.history.push('admin/')
}


onChangeCodeSection(e) {
  this.setState({ codeSection: e.target.value })
}

onChangeIdpromotion(e) {
  this.setState({ idpromotion: e.target.value })}

pdfGenerate = () => {

  //var iframe = document.createElement('iframe');
 // iframe.setAttribute('style', 'position:absolute;right:120px; top:0; bottom:0; height:100%; width:650px; padding:20px;');
 // document.body.appendChild(iframe);
  var img = new Image()
  var Values = this.state.listcompetence.map((element, index) => Object.values([index + 1, element.codeMatiere.libMatiere, element.codeMatiere.codeMatiere,element.codeMatiere.seuilMatiere,element.codeMatiere.niveauMatiere]));
  var pdf = new jsPDF('p', 'pt', 'a4');
  pdf.setFontSize(9);
  //pdf.addImage(logo, 'JPEG', 35, 10, 480, 60);
  pdf.setFontSize(22);
  pdf.text(110, 80,'Tableau synthèse du programme')
 // pdf.text(110, 100,this.state.listeSection.libSection)

  pdf.setFontSize(10);
  pdf.autoTable({ html: '#my-table', startY: 150, showHead: 'everyPage'})
  // Or use javascript directly:
  pdf.autoTable({
   
    head: [['N°', 'Titre du module', 'Code', 'Seuil de réussite en %','Niveau']],
    body: Values,


  })
  //var iframe = document.createElement('iframe');
 // iframe.setAttribute('style', 'position:absolute;right:120px; top:0; bottom:0; height:100%; width:650px; padding:20px;');
 // document.body.appendChild(iframe);
 // iframe.src = pdf.output('datauristring');
 window.open(pdf.output('bloburl'))
}

handelModal(){
  this.setState({show:!this.state.show})
}


  render(){
  return( 
    <div className="content">
      <Link className="btn btn-warning" to='/admin/addCompetence'><i class="fa fa-plus" aria-hidden="true"/> Ajoute Competence</Link>

      <form className="row g-3">


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
            >
              <option >Choisir une section</option>

              {
                this.state.listeSection.map(function (section) {
                  return <option value={section._id}  >{section.libSection}</option>;
                })
              }
            </select>
          </div>
          <Link className='btn btn-danger' onClick={() => this.handleClick()}> <i className="nc-icon nc-zoom-split" /> </Link>
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



<table className="table">
<thead class="thead-dark">
  <tr>
    <th scope="col">N°</th>
    
    <th scope="col">Code</th>
    <th scope="col">Competence</th>
    <th scope="col">Seuil</th>
    <th scope="col">Action</th>
  </tr>
</thead>
<tbody>
  
  {this.state.listcompetence.map((competence,index)=>(
          <tr key={competence._id}>
          <th scope="row">{index + 1}</th>
            <td>{competence.codeMatiere.codeMatiere}</td>
            <td>{competence.codeMatiere.libMatiere}</td>
            <td>{competence.codeMatiere.seuilMatiere}</td>

        
    <td>
  
    <Link className='btn btn-outline-primary mr-2' to={"/admin/editcompetence/"+competence._id}><i className="fa fa-random" aria-hidden="true"/></Link>
    <Link className='btn btn-danger' onClick={(e)=>this.deleteNote(competence._id)}><i className="fa fa-times" aria-hidden="true"/></Link>

    </td>
  </tr>
 
  ))}
</tbody>
</table>



<Button onClick={()=>{this.handelModal()}}>open modal</Button>

<Modal show={this.state.show}>

        <Modal.Header closeButton>

          <Modal.Title>Login Form</Modal.Title>

        </Modal.Header>

        <Modal.Body>

          <></>

        </Modal.Body>

        <Modal.Footer>

          <Button variant="secondary"  onClick={()=>{this.handelModal()}}>Close Modal</Button>

        </Modal.Footer>

      </Modal>




</div>
  )
}}
export default ListeCompetence;