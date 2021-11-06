import React from 'react'
import axios from 'axios'
import { Link} from "react-router-dom"
import fontarab from './Amiri-Regular.ttf' 
import { base64Str } from 'base-64';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
} from "reactstrap";
class Specialite extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      users:[],
      id:0,
      codeSpecialite:'',
      libSpecialite:'',
      libSpecialiteAr:  '',
      typeSpecialite:  '',
      dureeSpecialite: '',
      diplomeSpecialite:''
     
    }}
  
  componentDidMount(){
    axios.get('http://localhost/spc')
    .then((res)=>{
      this.setState({
      users:res.data,
      id:0,
      codeSpecialite:'',
      libSpecialite:'',
      libSpecialiteAr:  '',
      typeSpecialite:  '',
      dureeSpecialite: '',
      diplomeSpecialite:''
    })
   

    })
  }

  deleteSpc(id) {
    axios.delete(`http://localhost/spc/${id}`)
        .then((res) => {
            console.log(' successfully deleted!')
        }).catch((error) => {
            console.log(error)
        })
        this.props.history.push('/specialite')
}


pdfGenerate = () => {

  var iframe = document.createElement('iframe');
  iframe.setAttribute('style', 'position:absolute;right:120px; top:0; bottom:0; height:100%; width:650px; padding:20px;');
  document.body.appendChild(iframe);
  var img = new Image()
  var Values = this.state.users.map((element, index) => Object.values([index + 1, element.codeSpecialite, element.libSpecialite,element.typeSpecialite,element.dureeSpecialite]));
  var pdf = new jsPDF('p', 'pt', 'a4');
  pdf.setFontSize(9);
  //pdf.addImage(logo, 'JPEG', 35, 10, 480, 60);
  pdf.addFileToVFS(fontarab, base64Str);
  pdf.addFont(fontarab, 'Amiri', 'normal');
 pdf.setFont('Amiri'); 
  pdf.setFontSize(22);
  pdf.text(90, 80, 'إختصاصات المركز القطاعي للتكوين في فنون الطباعة بأريانة')
  pdf.setFontSize(10);
  pdf.autoTable({ html: '#my-table', startY: 150, showHead: 'everyPage'})
  // Or use javascript directly:
  pdf.autoTable({
   
    head: [['N°', 'code specialité', 'specialité', 'نمط التكوين','مدة التكوين']],
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
    <Link className="btn btn-info" to='/admin/addSpecialite'><i class="fa fa-plus" aria-hidden="true"></i>
Ajouter une spécialité</Link>


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





<table className="table">
<thead class="thead-dark">
  <tr>
    <th scope="col">#</th>
    <th scope="col">code specialité</th>
    <th scope="col">specialité</th>
    <th scope="col">نمط التكوين</th>
    <th scope="col">مدة التكوين</th>
    <th scope="col">Action</th>
  </tr>
</thead>
<tbody>
  
  {this.state.users.map((specialite,index)=>(
          <tr key={specialite._id}>
          <th scope="row">{index + 1}</th>
            <td>{specialite.codeSpecialite}</td>
            <td>{specialite.libSpecialite}</td>
            <td>{specialite.typeSpecialite}</td>
            <td>{specialite.dureeSpecialite}</td>

        
    <td>
    
    <Link className='btn btn-warning' to={"/admin/editSpecialite/"+specialite._id}>

    <i className="fa fa-random" aria-hidden="true"/>
</Link>
    
    <Link className='btn btn-danger' onClick={(e)=>this.deleteSpc(specialite._id)}><i className="fa fa-times" aria-hidden="true"/>
</Link>

    </td>
  </tr>
 
  ))}
</tbody>
</table>


</div>
  )
}}
export default Specialite;