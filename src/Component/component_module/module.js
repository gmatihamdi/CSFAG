import React from 'react'
import axios from 'axios'
import { Link} from "react-router-dom"
class Module extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      users:[],
      id:0,
      codeMatiere:  '' ,
        libMatiere:  '',
        coifMatiere: '',
        seuilMatiere:'',
        niveauMatiere: '' ,
        specialiteMatiere:'' 

     
    }}
  
  componentDidMount(){
    axios.get('http://localhost/mat')
    .then((res)=>{
      this.setState({
      users:res.data,
      id:0,
      codeMatiere:  '' ,
      libMatiere:  '',
      coifMatiere: '',
      seuilMatiere:'',
      niveauMatiere: '' ,
      specialiteMatiere:'' 
    })
   

    })
  }

  deleteSpc(id) {
    axios.delete(`http://localhost/mat/${id}`)
        .then((res) => {
            console.log(' successfully deleted!')
        }).catch((error) => {
            console.log(error)
        })
        this.props.history.push('/module')
}

  render(){
  return( 
    <div className="content">
     
  <Link className="btn btn-outline-primary" to='/admin/addMatiere'>Ajouter un Module</Link>



<table className="table">
<thead class="thead-dark">
  <tr>
    <th scope="col">#</th>
    <th scope="col">code specialité</th>
    <th scope="col">specialité</th>
    <th scope="col">specialiteMatiere</th>

    <th scope="col">parametres</th>
  </tr>
</thead>
<tbody>
  
  {this.state.users.map((matiere,index)=>(
          <tr key={matiere._id}>
          <th scope="row">{index + 1}</th>
            <td>{matiere.codeMatiere}</td>
            <td>{matiere.libMatiere}</td>
            <td>{matiere.specialiteMatiere}</td>

        
    <td>
    <Link className='btn btn-primary mr-2'>View</Link>
    <Link className='btn btn-outline-primary mr-2' to={"/admin/editMatiere/"+matiere._id}>Edit</Link>
    
    <Link className='btn btn-danger' onClick={(e)=>this.deleteSpc(matiere._id)}>Delete</Link>

    </td>
  </tr>
 
  ))}
</tbody>
</table>


</div>
  )
}}
export default Module;