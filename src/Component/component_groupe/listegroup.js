import React from 'react'
import axios from 'axios'
import { Link} from "react-router-dom"
import { FcPrint } from "react-icons/fc";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
} from "reactstrap";
class ListeGroupe extends React.Component{
  constructor(props) {
    super()
    this.state = {
      codeCompetence:  '' ,
      codePromotion: '',
      codeSection: '', 
users:[],
idpromotion: '',
Listepromo:[],

    }
    this.onChangeIdpromotion = this.onChangeIdpromotion.bind(this);}
  
    handleClick() {
      const a = {
        x: this.state.idpromotion,
      }
      axios.post('http://localhost/filtre/filtregroup', a)
      .then((res) => {
        this.setState({
          users: res.data,
        })
        console.log("resultat de recherche");
        console.log(res.data)
      })
      // Catch any errors we hit and update the app
      .catch(error => this.setState({ error, isLoading: false }));


    }


  componentDidMount(){
    

    const token = localStorage.getItem("token");
    if (token){
    console.log('ok')
    }
    else{
   
    }
this. handleClick();
    this.listepromo();
  }

  listepromo(){
    axios.get('http://localhost/prom')
    .then((res)=>{
      this.setState({
      Listepromo:res.data,
     
    })
   
  
    })
  }



  deleteGroup(id) {
    axios.delete(`http://localhost/groupe/${id}`)
        .then((res) => {
            console.log(' successfully deleted!')
        }).catch((error) => {
            console.log(error)
        })
        this.props.history.push('/groupe')
}

onChangeIdpromotion(e) {
  this.setState({ idpromotion: e.target.value })
}

  render(){
  return( 
    <div className="content">
      
      <Link className="btn btn-warning" to='/admin/Addgroupe'>creer un groupe</Link>

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

</form>



<table className="table">
<thead class="thead-dark">
  <tr>
    <th scope="col">N°</th>
    
    <th scope="col">Groupe</th>
    <th scope="col">code Section</th>
    <th scope="col">Section</th>

    <th scope="col"></th>
  </tr>
</thead>
<tbody>
  
  {this.state.users.map((groupe,index)=>(
          <tr key={groupe._id}>
          <th scope="row">{index + 1}</th>
            <td>{groupe.codeGroupe}</td>
            <td>{groupe.codeSection.codeSection}</td>
            <td>{groupe.codeSection.libSection}</td>

        
    <td>

    <Link className='btn btn-outline-primary mr-2' to={"/admin/editGroup/"+groupe._id}>Modifier</Link>
    <Link className='btn btn-danger' onClick={(e) => { if (window.confirm('Etes vous sur de vouloir supprimer cet element?')) this.deleteGroup(groupe._id) }}>supprimer</Link>
  
  

    </td>
  </tr>
 
  ))}
</tbody>
</table>


</div>
  )
}}
export default ListeGroupe;