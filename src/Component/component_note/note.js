import React from 'react'
import axios from 'axios'
import { Link} from "react-router-dom"
import { FcPrint } from "react-icons/fc";
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import logo from './entete.jpeg'
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
} from "reactstrap";
class Note extends React.Component{
  constructor(props) {
    super()
    this.state = {
      noteexam:'',
      stagiaireNote: '',
      moduleNote: '',
      nomstagiaire: '',

        users:[],
        codeSection:'',
        codeMatiere:'',
        listnote:[],
        listeSection:[],
        Groupe:[],
        listcompetence:[],
        Listepromo:[],
        idpromotion: '',
    }
    this.onChangeCodeSection = this.onChangeCodeSection.bind(this);
    this.onChangeCodeMatiere = this.onChangeCodeMatiere.bind(this);
    this.onChangeIdpromotion = this.onChangeIdpromotion.bind(this);}
  
    handleClick(){
    const a={
      x:this.state.codeSection,
      y:this.state.codeMatiere,

    }
    axios.post(`http://localhost/filtre/filtrenote`,a) 
    .then((res)=>{
           this.setState({
           listnote:res.data.data ,
         })
         })
     // Catch any errors we hit and update the app
     .catch(error => this.setState({ error, isLoading: false }));
     console.log( this.state.listnote)
     //console.log( this.state.stagiaireNote.nomStagiaireFr)
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

listepromo(){
  axios.get('http://localhost/prom')
  .then((res)=>{
    this.setState({
    Listepromo:res.data,
   
  })

  })
}

fetchMatiere() {

  const a={ x:this.state.codeSection}
  axios.post(`http://localhost/methode/getcompetence`,a) 
.then((res)=>{
  this.setState({
  listcompetence:res.data,
})
console.log("resultat de recherche matiere");
console.log(res.data)
console.log(this.state.listcompetence.codeMatiere.libMatiere)

})
// Catch any errors we hit and update the app
.catch(error => this.setState({ error, isLoading: false })); 
}
  componentDidMount(){
    this.handleClick();    
   this.listepromo();
    this.findsectionClick();      
  }


  deleteNote(id) {
    axios.delete(`http://localhost/note/${id}`)
        .then((res) => {
            console.log(' successfully deleted!')
        }).catch((error) => {
            console.log(error)
        })
        this.props.history.push('/stagiare')
}

onChangeCodeSection(e) {
  this.setState({ codeSection: e.target.value })
}onChangeCodeMatiere(e) {
  this.setState({ codeMatiere: e.target.value })
} onChangeIdpromotion(e) {
  this.setState({ idpromotion: e.target.value })
}


pdfGenerate = () => {
this.fetchMatiere();
  var iframe = document.createElement('iframe');
  iframe.setAttribute('style', 'position:absolute;right:120px; top:0; bottom:0; height:100%; width:650px; padding:20px;');
  document.body.appendChild(iframe);
  var img = new Image()
  var Values = this.state.listnote.map((element, index) => Object.values([index + 1, element.stagiaireNote?.cinStagiaire, element.stagiaireNote?.nomStagiaireFr,element.noteexam]));
  var pdf = new jsPDF('p', 'pt', 'a4');
  pdf.setFontSize(9);
  pdf.addImage(logo, 'JPEG', 35, 10, 480, 60);
  pdf.setFontSize(22);
  pdf.text(210, 80, 'Evaluation')
  pdf.setFontSize(10);

  pdf.line(150, 110, 300, 110);
  pdf.text(35, 130, 'this.state.listcompetence.codeMatiere.libMatiere')
  pdf.text(120, 130, '')

  pdf.setFontSize(9)
  pdf.text(35, 800, "(*) Il ne peut être délivré qu'une seule copie du présent relevé de notes")
  pdf.autoTable({ html: '#my-table', startY: 150, showHead: 'everyPage' })
  // Or use javascript directly:
  pdf.autoTable({
    head: [['N°', 'CIN', 'Nom&Prénom', 'Note']],
    body: Values

  })
  var iframe = document.createElement('iframe');
  iframe.setAttribute('style', 'position:absolute;right:120px; top:0; bottom:0; height:100%; width:650px; padding:20px;');
  document.body.appendChild(iframe);
  iframe.src = pdf.output('datauristring');




 
}








  render(){
  return( 
    <div className="content">
     
        <Link className="btn btn-warning" to='/admin/Addnote'>saisi des notes</Link>
    

      <form  className="row g-3">


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
   onClick={() => this.fetchMatiere()}
   
   > 
<option >select section</option>
 
{
                                this.state.listeSection.map(function(section) {
                                    return <option value={section._id}  >{section.libSection}</option>;
                                })
                            }
</select>
</div>
  <div className="form-group">
              <select
                className="form-control" value={this.state.codeMatiere}
                onChange={this.onChangeCodeMatiere}>
                <option >select matiere</option>
                {
                  this.state.listcompetence.map(function (competence) {
                    return <option value={competence.codeMatiere._id} >{competence.codeMatiere.libMatiere}</option>;
                  })
                }
              </select>
            </div>
              <Link className='btn btn-danger' onClick={() => this.handleClick()}>Charger la liste</Link>
              <div className="form-group">
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
<table className="table">
<thead class="thead-dark">
  <tr>
    <th scope="col">#</th>
    
    <th scope="col">Nom&Prénom</th>
   
    <th scope="col">Note</th>

    <th scope="col"></th>
  </tr>
</thead>
<tbody>
  
  {this.state.listnote.map((note,index)=>(
          <tr key={note._id}>
          <th scope="row">{index + 1}</th>
            <td>{note.stagiaireNote?.nomStagiaireFr}</td>
           
            <td>{note.noteexam}</td>   
    <td>
   
    <Link className='btn btn-outline-primary mr-2' to={"/admin/editNote/"+note._id}>Editer</Link>
    <Link className='btn btn-danger' onClick={(e)=>this.deleteNote(note._id)}>Supprimer</Link>

    </td>
  </tr>
  ))}
</tbody>
</table>
</div>
  )
}}
export default Note;