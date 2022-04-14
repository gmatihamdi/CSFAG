import React from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

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
        seuilmatiere:'',
        cin:'',
        FormateurNote:'',
        Errnoteexam: '',
        listeFormateurs:[],
        listnote:[],
        noteresult: '',
        
      }
    this.onChangeFormateurNote = this.onChangeFormateurNote.bind(this);

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
              FormateurNote:res.data.FormateurNote,
              seuilmatiere:res.data.moduleNote.seuilMatiere,
      
          });
          console.log('seuilmatiere');
          console.log(this.state.seuilmatiere);
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


        
          fetch(`http://localhost/formateur`)
            // We get the API response and receive data in JSON format...
            .then(response => response.json())
            // ...then we update the users state
            .then(data =>
              this.setState({
                listeFormateurs: data,
                isLoading: false,
              })
            )
            // Catch any errors we hit and update the app
            .catch(error => this.setState({ error, isLoading: false }));
      

    }
    
    
    
  
  
  onSubmit(e) {

    if(this.state.noteexam===''){
      this.state.Errnoteexam='Champs Obligatoire '
     }
    
     else{
    e.preventDefault()


    let res='';
    if (parseFloat(this.state.noteexam) >= parseFloat(this.state.seuilmatiere)) {
      res='acquise'
              }else{
                res='non acquise'
      
              }
    
    const studentObject = {
        noteexam:this.state.noteexam,
        FormateurNote:this.state.FormateurNote,
        noteresult:res,
    };
    axios.put(`http://localhost/note/`+this.props.match.params.id, studentObject)
    .then((res) => {
      console.log(res.data)
      console.log(' successfully updated')
      toast.success('Modifier avec success')
    }).catch((error) => {
      console.log(error)
      toast.error("Erreur de Modification ")
    })
  
  // Redirect to Student List 
 // this.props.history.push('/note')
  }}
      
  
  onChangeNoteexam(e){
        this.setState({ noteexam:e.target.value })
       
      } onChangeFormateurNote(e) {
        this.setState({ FormateurNote: e.target.value })
      }
   
    
      render(){
        const { listnote } = this.state
      return(
  
  
        
        <div className="content">
       <ToastContainer/>
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
      <div class="col-auto">
      <label for="inputPassword2" class="visually-hidden">Formateur</label>
            <select 
  class="form-control"
 value={this.state.FormateurNote}
  onChange={this.onChangeFormateurNote}
  
  
  > 
<option >Formateur</option>

{
                               this.state.listeFormateurs.map(function(formateur) {
                                   return <option value={formateur._id}  >{formateur.nomFormateurFr}</option>;
                               })
                           }
</select>

            </div>
  
  
    <button className="btn btn-primary"  type="submit" name="action">Modifier
     
    </button>
  
  </form>
  </div>
  </div>
      )
  }}
 
export default EditNote;