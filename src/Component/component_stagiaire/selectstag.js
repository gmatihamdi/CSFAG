import React from 'react'
import axios from 'axios'
import { Link} from "react-router-dom"
import { BsPersonPlusFill } from "react-icons/bs";
import { FcPrint } from "react-icons/fc";


class SelectStag extends React.Component{
  constructor(props) {
    super()
    this.state = {
        cinStagiaire:'',
        nomStagiaireFr: '',
        nomStagiaireAr: '',
        datenaissanceStag: '',
        adressStagiaire: '',
        codeSection: '',
        etatdossier: '',
        niveauScolaire: '',
        emailstagiaire: '',
        specialiteStagiaire: '',
        groupeStagiaire: '',
        listeSection:[],
        Groupe:[],
        liststag:[]
    }
    this.onChangeCodeSection = this.onChangeCodeSection.bind(this);
    this.onChangeEtatdossier = this.onChangeEtatdossier.bind(this);}
  
    handleClick(){
      const a={
        x:this.state.codeSection,
        y:this.state.etatdossier,
  
      }
      axios.post(`http://localhost/filtre/filtrestagiaretat`,a) 
      .then((res)=>{
             this.setState({
             liststag:res.data,
           })
           console.log("resultat de recherche");
           console.log(res.data)
           })
       // Catch any errors we hit and update the app
       .catch(error => this.setState({ error, isLoading: false }));
       console.log( this.state.liststag)
    }
  fetchSection() {
    fetch(`http://localhost/sect`)
      // We get the API response and receive data in JSON format...
      .then(response => response.json())
      // ...then we update the users state
      .then(data =>
        this.setState({
          listeSection: data,
          isLoading: false,
        })
      )
      // Catch any errors we hit and update the app
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount(){
    this.handleClick();    
    this.fetchSection();      
  }

  deleteSpc(id) {
    axios.delete(`http://localhost/stag/${id}`)
        .then((res) => {
            console.log(' successfully deleted!')
        }).catch((error) => {
            console.log(error)
        })
        this.props.history.push('/stagiare')
}

onChangeCodeSection(e) {
  this.setState({ codeSection: e.target.value })
}onChangeEtatdossier(e) {
  this.setState({ etatdossier: e.target.value })
}


  render(){
  return( 

    
    <div className="content">
     
      <h1> Liste de Stagiaires non selectionné</h1>




      <form  className="row g-3">
     
     <div class="col-auto">
  <select 
  class="form-control"
 value={this.state.codeSection}
  onChange={this.onChangeCodeSection}> 
<option >select section</option>

{
                               this.state.listeSection.map(function(section) {
                                   return <option value={section._id}  >{section.libSection}</option>;
                               })
                           }
</select>
</div>
<div class="col-auto">   
<select class="form-control"  name="niveauMatiere" value={this.state.etatdossier}
   onChange={this.onChangeEtatdossier}>
       <option >select Etat</option>

       <option >Accepter</option>
       <option >Refuser</option>
       <option >En attente</option>
     
   </select>
             
             </div>
             <Link className='btn btn-danger' onClick={() => this.handleClick()}>Charger la liste</Link>
             

           
     </form>


<table id="dtBasicExample" className="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
<thead class="thead-dark">
  <tr>
    <th scope="col">#</th>
    <th scope="col">CIN</th>
    <th scope="col">Nom&Prénom</th>
    <th scope="col">specialite</th>
    <th scope="col">Groupe</th>
    <th scope="col">parametres</th>
  </tr>
</thead>
<tbody>
  {this.state.liststag.map((stagiare,index)=>(
          <tr key={stagiare._id}>
          <th scope="row">{index + 1}</th>
            <td>{stagiare.cinStagiaire}</td>
            <td>{stagiare.nomStagiaireFr}</td>
            <td>{stagiare.specialiteStagiaire}</td>
            <td>{stagiare.groupeStagiaire}</td>   
    <td>
    
    <Link className='btn btn-outline-primary mr-2' to={"/admin/editStagiaire/"+stagiare._id}>Edit</Link>
    <Link className='btn btn-danger' onClick={(e)=>this.deleteSpc(stagiare._id)}>Delete</Link>
    
    </td>
  </tr>
  ))}
</tbody>

</table>


</div>
  )
}}
export default SelectStag;