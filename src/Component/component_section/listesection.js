import React from 'react'
import axios from 'axios'
import { Link} from "react-router-dom"
import { FcPrint } from "react-icons/fc";
import { base64Str } from 'base-64';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import fontarab from '../component_note/Amiri-Regular.ttf' 
import {
  PDFDocument,
  PDFText,
  PDFTable,
  PDFTableRow,
  PDFTableColumn,
  PDFColumn,
  PDFColumns,
  pdf,
} from 'react-pdfmake';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
} from "reactstrap";
class ListeSection extends React.Component{
  constructor(props) {
    super()
    this.state = {
        codeSection:  ' ',
        codePromotion:'',
        libSection:  '',
        codeSpecialite: '', 
        debutSection:  '', 
        finSection:  '',
        codeDiplome:  '',
        groupeSection: '', 
        idpromotion: '',
        listsections:[],
        Listepromo:[]
    }
    this.onChangeIdpromotion = this.onChangeIdpromotion.bind(this);
  }
  
  componentDidMount(){
    this.handleClick();
    this.listepromo();
  }

  deleteNote(id) {
    axios.delete(`http://localhost/sect/${id}`)
        .then((res) => {
            console.log(' successfully deleted!')
        }).catch((error) => {
            console.log(error)
        })
        this.props.history.push('/stagiare')
}

handleClick() {
  const a = {
    x: this.state.idpromotion,
  }
  axios.post(`http://localhost/filtre/filtresection`, a)
    .then((res) => {
      this.setState({
        listsections: res.data,
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

onChangeIdpromotion(e) {
  this.setState({ idpromotion: e.target.value })
}


pdfGenerate = () => {

  var iframe = document.createElement('iframe');
  iframe.setAttribute('style', 'position:absolute;right:120px; top:0; bottom:0; height:100%; width:650px; padding:20px;');
  document.body.appendChild(iframe);
  var img = new Image()
  var Values = this.state.listsections.map((element, index) => Object.values([index + 1, element.codeSection, element.libSection,element.codeDiplome]));
  var pdf = new jsPDF('p', 'pt', 'a4');
  pdf.setFontSize(9);
  //pdf.addImage(logo, 'JPEG', 35, 10, 480, 60);
  pdf.addFileToVFS(fontarab, base64Str);
  pdf.addFont(fontarab, 'Amiri', 'normal');
 pdf.setFont('Amiri'); 
  pdf.setFontSize(22);
  pdf.text(90, 80,this.state.idpromotion)
  pdf.setFontSize(10);
  pdf.autoTable({ html: '#my-table', startY: 150, showHead: 'everyPage'})
  // Or use javascript directly:
  pdf.autoTable({
   
    head: [['N°', 'Code section', 'Section','Diplome']],
    body: Values,
    headStyles: {font:'Amiri'},
    bodyStyles: {font:'Amiri'},

  })
  var iframe = document.createElement('iframe');
  iframe.setAttribute('style', 'position:absolute;right:120px; top:0; bottom:0; height:100%; width:650px; padding:20px;');
  document.body.appendChild(iframe);
  iframe.src = pdf.output('datauristring');
}








  render(){
  return( 
    <div className="content">
        <Link className="btn btn-warning" to='/admin/addSection'><i class="fa fa-plus" aria-hidden="true"/> Ajoute Section</Link>
        <Link className="btn btn-primary" to='/admin/listegroup'><i class="fa fa-users" aria-hidden="true"/> Groupe </Link>

        <form className="row g-3">
        <div class="col-auto">

<select class="form-control" name="grouprselect" value={this.state.idpromotion}
  onChange={this.onChangeIdpromotion}  >

  <option >Selectionner une Promotion</option>

  {
    this.state.Listepromo.map(function (promotion) {
      return <option value={promotion._id}  >{promotion.libPromotionFr}</option>;
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
    
    <th scope="col">Code section</th>
    <th scope="col">Section</th>

    <th scope="col">Action</th>
  </tr>
</thead>
<tbody>
  
  {this.state.listsections.map((section,index)=>(
          <tr key={section._id}>
          <th scope="row">{index + 1}</th>
            <td>{section.codeSection}</td>
            <td>{section.libSection}</td>

        
    <td>
   
    <Link className='btn btn-outline-primary mr-2' to={"/admin/editSection/"+section._id}><i className="fa fa-random" aria-hidden="true"/></Link>
    
    <Link className='btn btn-danger' onClick={(e)=>this.deleteNote(section._id)}><i className="fa fa-times" aria-hidden="true"/></Link>

    </td>
  </tr>
 
  ))}
</tbody>
</table>


</div>
  )  }}  

export default ListeSection;