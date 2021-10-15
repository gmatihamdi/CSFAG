import React from 'react'
import axios from 'axios'
import { Link} from "react-router-dom"
import { FcPrint } from "react-icons/fc";
class Note extends React.Component{
  constructor(props) {
    super()
    this.state = {
      noteexam:'',
      stagiaireNote: '',
      moduleNote: '',
      nomstagiaire: '',

        users:[],
        codeSection:'',
        codeMatiere:'',
        listnote:[],
        listeSection:[],
        Groupe:[],
        Matiere:[]
    }
    this.onChangeCodeSection = this.onChangeCodeSection.bind(this);
    this.onChangeCodeMatiere = this.onChangeCodeMatiere.bind(this);}
  
    handleClick(){
    const a={
      x:this.state.codeSection,
      y:this.state.codeMatiere,

    }
    axios.post(`http://localhost/filtre/filtrenote`,a) 
    .then((res)=>{
           this.setState({
           listnote:res.data.data ,
         })
         })
     // Catch any errors we hit and update the app
     .catch(error => this.setState({ error, isLoading: false }));
     console.log( this.state.listnote)
     //console.log( this.state.stagiaireNote.nomStagiaireFr)
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
  fetchMatiere() {
    fetch('http://localhost/mat')
    .then(response => response.json())
      // ...then we update the users state
      .then(data =>
        this.setState({
          Matiere: data,
          isLoading: false,
        })
      )
      // Catch any errors we hit and update the app
      .catch(error => this.setState({ error, isLoading: false }));
  }
  componentDidMount(){
    this.handleClick();    
    this.fetchMatiere();
    this.fetchSection();      
  }


  deleteNote(id) {
    axios.delete(`http://localhost/note/${id}`)
        .then((res) => {
            console.log(' successfully deleted!')
        }).catch((error) => {
            console.log(error)
        })
        this.props.history.push('/stagiare')
}

onChangeCodeSection(e) {
  this.setState({ codeSection: e.target.value })
}onChangeCodeMatiere(e) {
  this.setState({ codeMatiere: e.target.value })
}

  render(){
  return( 
    <div className="content">
     
        <Link className="btn btn-warning" to='/admin/Addnote'>saisi des notes</Link>
    

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
              <select
class="form-control"
                 value={this.state.codeMatiere}
                onChange={this.onChangeCodeMatiere}>
                <option >select Matiere</option> 
                {
                  this.state.Matiere.map(function (matiere) {
                    return <option  value={matiere._id}>{matiere.libMatiere}</option>;
                  })
                }
              </select>
              
              </div>
              <Link className='btn btn-danger' onClick={() => this.handleClick()}>Charger la liste</Link>
              

            
      </form>
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
  
  {this.state.listnote.map((note,index)=>(
          <tr key={note._id}>
          <th scope="row">{index + 1}</th>
            <td>{note.stagiaireNote?.nomStagiaireFr}</td>
            <td>{note.moduleNote?.codeMatiere}</td>
            <td>{note.noteexam}</td>   
    <td>
    <Link className='btn btn-primary mr-2'>View</Link>
    <Link className='btn btn-outline-primary mr-2' to={"/admin/editNote/"+note._id}>Edit</Link>
    <Link className='btn btn-danger' onClick={(e)=>this.deleteNote(note._id)}>Delete</Link>

    </td>
  </tr>
  ))}
</tbody>
</table>
</div>
  )
}}
export default Note;