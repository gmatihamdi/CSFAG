import React from 'react'
import axios from 'axios'
import { Link} from "react-router-dom"
import { Alert ,Button} from 'react-bootstrap';

class ListeFormateur extends React.Component{
 
  constructor(props){
    super(props);
    this.state ={
        ListeFormateurs:[],
        
    }}
  
  componentDidMount(){
    axios.get('http://localhost/formateur')
    .then((res)=>{
      this.setState({
        ListeFormateurs:res.data,
 
    })
   

    })
  }

  deleteFormat(id) {
    axios.delete(`http://localhost/formateur/${id}`)
        .then((res) => {
            console.log(' successfully deleted!')
        }).catch((error) => {
            console.log(error)
        })
      //  this.props.history.push('/module')
}
  render(){
  return( 
    <div className="content">
     
  <Link className="btn btn-primary" to='/admin/addFormateur'><i class="fa fa-plus" aria-hidden="true"/> Ajouter un Formateur</Link>



<table className="table">
<thead class="thead-dark">
  <tr>
    <th scope="col">#</th>
    <th scope="col">Nom Formateur</th>
    <th scope="col">Module</th>
    <th scope="col">Tél</th>

    <th scope="col"></th>
  </tr>
</thead>
<tbody>
  
  {this.state.ListeFormateurs.map((formateur,index)=>(
          <tr key={formateur._id}>
          <th scope="row">{index + 1}</th>
            <td>{formateur.nomFormateurFr}</td>
            <td>{formateur.nomFormateurAr}</td>
            <td>{formateur.telFormateur}</td>

        
    <td>
  
    <Link className='btn btn-outline-primary mr-2' to={"/admin/editFormateur/"+formateur._id}><i className="fa fa-random" aria-hidden="true"/></Link>
    
    <Link className='btn btn-danger' onClick={(e)=>this.deleteFormat(formateur._id)}><i className="fa fa-times" aria-hidden="true"/></Link>

    </td>
  </tr>
 
  ))}
</tbody>
</table>


</div>

  )
}}
export default ListeFormateur;