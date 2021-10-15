import React from 'react'
import axios from 'axios'
import { Link} from "react-router-dom"
class ListeCompetence extends React.Component{
  constructor(props) {
    super()
    this.state = {
      codeCompetence:  '' ,
      codePromotion: '',
      codeSection: '', 
       codeSpecialite:  '', 
       codeMatiere:'' ,
        users:[]
    }}
  
  componentDidMount(){
    axios.get('http://localhost/compet')
    .then((res)=>{
      this.setState({
      users:res.data
    })
   console.log(res.data)

    })
    
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

  render(){
  return( 
    <div className="content">
      <Link className="btn btn-warning" to='/admin/addCompetence'>Ajoute Competence</Link>
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
  
  {this.state.users.map((competence,index)=>(
          <tr key={competence._id}>
          <th scope="row">{index + 1}</th>
            <td>{competence.codeCompetence}</td>
            <td>{competence.codeCompetence}</td>
            <td>{competence.codeCompetence}</td>

        
    <td>
    <Link className='btn btn-primary mr-2'>View</Link>
    <Link className='btn btn-outline-primary mr-2' to={"/admin/editSection/"+competence._id}>Edit</Link>
    
    <Link className='btn btn-danger' onClick={(e)=>this.deleteNote(competence._id)}>Delete</Link>

    </td>
  </tr>
 
  ))}
</tbody>
</table>


</div>
  )
}}
export default ListeCompetence;