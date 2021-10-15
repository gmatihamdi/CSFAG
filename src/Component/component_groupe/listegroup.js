import React from 'react'
import axios from 'axios'
import { Link} from "react-router-dom"
import { FcPrint } from "react-icons/fc";
class ListeGroupe extends React.Component{
  constructor(props) {
    super()
    this.state = {
      codeCompetence:  '' ,
      codePromotion: '',
      codeSection: '', 
users:[]
    }}
  
  componentDidMount(){
    axios.get('http://localhost/groupe')
    .then((res)=>{
      this.setState({
      users:res.data
    })
   console.log(res.data)

    })
  }

  deleteNote(id) {
    axios.delete(`http://localhost/groupe/${id}`)
        .then((res) => {
            console.log(' successfully deleted!')
        }).catch((error) => {
            console.log(error)
        })
        this.props.history.push('/groupe')
}

  render(){
  return( 
    <div className="content">
      <h1> Gestion des groupes </h1> <Link className="btn btn-warning" to='/admin/Addgroupe'>creer un groupe</Link>
<table className="table">
<thead class="thead-dark">
  <tr>
    <th scope="col">N°</th>
    
    <th scope="col">Nom&Prénom</th>
    <th scope="col">matiere</th>
    <th scope="col">Note</th>

    <th scope="col">parametres</th>
  </tr>
</thead>
<tbody>
  
  {this.state.users.map((groupe,index)=>(
          <tr key={groupe._id}>
          <th scope="row">{index + 1}</th>
            <td>{groupe.codeGroupe}</td>
            <td>{groupe.codeGroupe}</td>
            <td>{groupe.codeGroupe}</td>

        
    <td>
    <Link className='btn btn-primary mr-2'>View</Link>
    <Link className='btn btn-outline-primary mr-2' to={"/editGroupe/"+groupe._id}>Edit</Link>
    
    <Link className='btn btn-danger' onClick={(e)=>this.deleteNote(groupe._id)}>Delete</Link>

    </td>
  </tr>
 
  ))}
</tbody>
</table>


</div>
  )
}}
export default ListeGroupe;