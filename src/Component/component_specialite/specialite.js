import React from 'react'
import axios from 'axios'
import { Link} from "react-router-dom"
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

  render(){
  return( 
    <div className="content">
     <table><tr>
     <td><h1>  Les spécialités</h1></td> <td> ....    </td><td> ...    </td><td><Link className="btn btn-outline-primary" to='/admin/addSpecialite'>Ajouter une spécialité</Link>
</td>

 <td>
      <Link className="btn btn-warning" to='/admin/pdfSpecialite'> Liste des spécialités</Link>
      </td>  </tr>
</table>
<table className="table">
<thead class="thead-dark">
  <tr>
    <th scope="col">#</th>
    <th scope="col">code specialité</th>
    <th scope="col">specialité</th>
    <th scope="col">نمط التكوين</th>
    <th scope="col">مدة التكوين</th>
    <th scope="col">parametres</th>
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
    <Link className='btn btn-primary mr-2'>View</Link>
    <Link className='btn btn-outline-primary mr-2' to={"/admin/editSpecialite/"+specialite._id}>Edit</Link>
    
    <Link className='btn btn-danger' onClick={(e)=>this.deleteSpc(specialite._id)}>Delete</Link>

    </td>
  </tr>
 
  ))}
</tbody>
</table>


</div>
  )
}}
export default Specialite;