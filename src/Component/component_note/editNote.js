import React from 'react'
import axios from 'axios'


class EditNote extends React.Component{

 
    constructor(props) {
      super(props)
     
      // Setting up functions
      this.onChangeNoteexam = this.onChangeNoteexam.bind(this);
    
      this.onSubmit = this.onSubmit.bind(this);
  
      // Setting up state
      this.state = {
        noteexam:'',
        stagiaireNote: '',
        moduleNote: '',
        nomStagiaire:'',
        libmatiere:'',
        cin:'',
        Errnoteexam: '',

        listnote:[],
        
      }
    }
  
    componentDidMount() {
      const  nomStagiaireFr='';
      const msg =this.props.match.params.id;
      axios.get(`http://localhost/note/edit/`+this.props.match.params.id)
        .then(res => {
          this.setState({
            noteexam: res.data.noteexam,
              listnote:res.data ,
              nomStagiaire:res.data.stagiaireNote.nomStagiaireFr,
              libmatiere:res.data.moduleNote.libMatiere,
              cin:res.data.stagiaireNote.cinStagiaire,

      
          });console.log(this.state.nomStagiaire);
          console.log(this.state.listnote.moduleNote.libMatiere);
            nomStagiaireFr=this.state.listnote.stagiaireNote.nomStagiaireFr;
        //  console.log(nomStagiaireFr);
          console.log("message de this nom Fr");
          //console.log(this.state.listnote.stagiaireNote.nomStagiaireFr)
        })
        .catch((error) => {
          console.log(error);
          console.log(msg);
        })
    }
    
    
    
  
  
  onSubmit(e) {

    if(this.state.noteexam===''){
      this.state.Errnoteexam='Champs Obligatoire '
     }
    
     else{
    e.preventDefault()
    
    const studentObject = {
        noteexam:this.state.noteexam,
    
    };
    axios.put(`http://localhost/note/`+this.props.match.params.id, studentObject)
    .then((res) => {
      console.log(res.data)
      console.log(' successfully updated')
    }).catch((error) => {
      console.log(error)
    })
  
  // Redirect to Student List 
 // this.props.history.push('/note')
  }}
      
  
  onChangeNoteexam(e){
        this.setState({ noteexam:e.target.value })
       
      }
   
    
      render(){
        const { listnote } = this.state
      return(
  
  
  
        <div className="content">
        <h1>Modifier Note competence</h1>
          <div className="w-75 mx-auto shadow p-5">
          <h2>Modifier note Module :  {this.state.libmatiere}</h2>
  
          <form onSubmit={this.onSubmit} className="row g-3">

          <div class="col-auto">
    <label for="inputPassword2" class="visually-hidden">CIN Stagiaire</label>
    <input class="form-control" type="text" value= {this.state.cin} aria-label="Disabled input example" disabled readonly></input>
  
  </div>

          <div class="col-auto">
    <label for="inputPassword2" class="visually-hidden">Nom & prénom</label>
    <input class="form-control" type="text" value= {this.state.nomStagiaire} aria-label="Disabled input example" disabled readonly></input>
  
  </div>





  <div class="col-auto">
  <label for="inputPassword2" class="visually-hidden">Note</label>
    <input type="text" className="form-control "  
    name="notexam"
    value={this.state.noteexam}
    onChange={this.onChangeNoteexam}
    />
    <p class="text-danger">{this.state.Errnoteexam}</p>
      </div>
      
  
  
    <button className="btn btn-primary"  type="submit" name="action">Modifier
     
    </button>
  
  </form>
  </div>
  </div>
      )
  }}
 
export default EditNote;