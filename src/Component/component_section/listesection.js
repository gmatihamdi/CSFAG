import React from 'react'
import axios from 'axios'
import { Link} from "react-router-dom"
import { FcPrint } from "react-icons/fc";
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
        users:[]
    }}
  
  componentDidMount(){
    axios.get('http://localhost/sect')
    .then((res)=>{
      this.setState({
      users:res.data
    })
   console.log(res.data)

    })
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

  render(){
  return( 
    <div className="content">
        <Link className="btn btn-warning" to='/admin/addSection'>Ajoute Section</Link>
        <Link className="btn btn-warning" to='/admin/listegroup'>Groupe </Link>
<table className="table">
<thead class="thead-dark">
  <tr>
    <th scope="col">#</th>
    
    <th scope="col">Nom&Prénom</th>
    <th scope="col">matiere</th>
    <th scope="col">Note</th>

    <th scope="col">parametres</th>
  </tr>
</thead>
<tbody>
  
  {this.state.users.map((section,index)=>(
          <tr key={section._id}>
          <th scope="row">{index + 1}</th>
            <td>{section.codeSection}</td>
            <td>{section.libSection}</td>
            <td>{section.groupeSection}</td>

        
    <td>
    <Link className='btn btn-primary mr-2'>View</Link>
    <Link className='btn btn-outline-primary mr-2' to={"/admin/editSection/"+section._id}>Edit</Link>
    
    <Link className='btn btn-danger' onClick={(e)=>this.deleteNote(section._id)}>Delete</Link>

    </td>
  </tr>
 
  ))}
</tbody>
</table>


</div>
  )  }}  

export default ListeSection;