import React from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"

class CreatNote extends React.Component {


  constructor(props) {
    super()
    this.state = {
      noteexam: '',
      stagiaireNote: '',
      moduleNote: '',
      codeSection: '',
      groupeStagiaire: '',
      codeMatiere: '',
      users: [],
      matieres: [],
      stgsss: [],
      listeSection:[],
      stgs: [],
      listcompetence:[],
      listgroupsection:[]
    }
    // Setting up functions
    this.onChangeStagiaireNote = this.onChangeStagiaireNote.bind(this);
    this.onChangeNoteexam = this.onChangeNoteexam.bind(this);
    this.onChangeModuleNote = this.onChangeModuleNote.bind(this);
    this.onChangeCodeSection = this.onChangeCodeSection.bind(this);
    this.onChangeGroupeStagiaire = this.onChangeGroupeStagiaire.bind(this);
    this.onChangeCodeMatiere = this.onChangeCodeMatiere.bind(this);


    this.onSubmit = this.onSubmit.bind(this);
    // Setting up state
  }
  onSubmit(e) {
    e.preventDefault()
    let odj = {
      moduleNote: this.state.moduleNote,
      listenotestag: this.state.stgsss.map(x => {
        return {
          cin: x._id,
          note: x.note
        }
      })
    }
    console.log(odj);
   axios.post('http://localhost/note', odj).then(res => console.log(res.data)).catch(e => {
      console.log(e)
    }); 

  }


  onChangeCinStagiaire(e) {
    this.setState({ cinStagiaire: e.target.value })
  }
  onChangeStagiaireNote(e) {
    this.setState({ stagiaireNote: e.target.value })
  }
  onChangeNoteexam = (id, e) => {
    //this.setState({noteexam:e.target.value}) 
    //console.log(e.target.value);
    //console.log(id);
    var tmpListStgs = Object.assign([], this.state.stgsss);
    //console.log(tmpListStgs);
    let index = tmpListStgs.findIndex(el => el._id === id);
    tmpListStgs[index].note = e.target.value;
    this.setState({ stgsss: tmpListStgs })

  }

  onChangeModuleNote(e) {
    this.setState({ moduleNote: e.target.value })
  }
  onChangeCodeSection(e) {
    this.setState({ codeSection: e.target.value })
  }
  onChangeGroupeStagiaire(e) {
    this.setState({ groupeStagiaire: e.target.value })
  }
  onChangeCodeMatiere(e) {
    this.setState({ codeMatiere: e.target.value })
  }

  fetchSpecialite() {
    fetch(`http://localhost/spc`)
      // We get the API response and receive data in JSON format...
      .then(response => response.json())
      // ...then we update the users state
      .then(data =>
        this.setState({
          users: data,
          isLoading: false,
        })
      )
      // Catch any errors we hit and update the app
      .catch(error => this.setState({ error, isLoading: false }));
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
  handleClick() {

    const a = {
      x: this.state.codeSection,
      y: this.state.groupeStagiaire,

    }
    console.log(a);
    console.log("Getting data");
    axios.post(`http://localhost/methode`, a)

      // We get the API response and receive data in JSON format...
      //.then(response => response.json())
      // ...then we update the users state
      .then(res => {
        this.setState({
          stgsss: res.data,
          isLoading: false,

        }
        )
        console.log("Data getted");
        console.log(res.data)
      }
      )
      // Catch any errors we hit and update the app
      .catch(error => this.setState({ error, isLoading: false }));

  }
  findgroupClick(){
    const a={ x:this.state.codeSection}
    axios.post(`http://localhost/methode/getgroup`,a) 
    .then((res)=>{
      this.setState({
      listgroupsection:res.data,
    })
    console.log("resultat de recherche");
    console.log(res.data)
    })
// Catch any errors we hit and update the app
.catch(error => this.setState({ error, isLoading: false })); 

axios.post(`http://localhost/methode/getcompetence`,a) 
.then((res)=>{
  this.setState({
  listcompetence:res.data,
})
console.log("resultat de recherche matiere");
console.log(res.data)
console.log(this.state.listcompetence.codeMatiere.libMatiere)
})
// Catch any errors we hit and update the app
.catch(error => this.setState({ error, isLoading: false })); 



}


  fetchStag() {
    fetch(`http://localhost/stag`,)
      .then(response => response.json())
      // ...then we update the users state
      .then(data => {
        data.forEach(element => {
          element['note'] = 0;
        })
        this.setState({
          stgs: data,
        })
      }
      )
      // Catch any errors we hit and update the app
      .catch(error => this.setState({ error, isLoading: false }));
  }
  fetchMatiere() {
    fetch(`http://localhost/mat`)
      // We get the API response and receive data in JSON format...
      .then(response => response.json())
      // ...then we update the users state
      .then(data =>
        this.setState({
          matieres: data,
          isLoading: false,
        })
      )
      // Catch any errors we hit and update the app
      .catch(error => this.setState({ error, isLoading: false }));
  }
  componentDidMount() {
    this.fetchSpecialite();
    this.fetchStag();
    this.fetchMatiere();
    this.handleClick();
    this.fetchSection();
  }
  render() {

    return (
      <div className="content">





        <div >
          <h2>Notation des Compétences par groupe</h2>

          <form onSubmit={this.onSubmit}>
            <div className="form-group">
            <select 
  class="form-control"
 value={this.state.codeSection}
  onChange={this.onChangeCodeSection}
  
  onClick={() => this.findgroupClick()}
  > 
<option >select section</option>

{
                               this.state.listeSection.map(function(section) {
                                   return <option value={section._id}  >{section.libSection}</option>;
                               })
                           }
</select>

            </div>

            <select class="form-control"  name="grouprselect" value={this.state.groupeStagiaire}
   onChange={this.onChangeGroupeStagiaire}  >
  
  
  
<option >select groupe</option>

{
                               this.state.listgroupsection.map(function(groupe) {
                                   return <option value={groupe._id}  >{groupe.codeGroupe}</option>;
                               })
                           }
</select> 
            <div className="form-group">
              <select
                className="form-control" value={this.state.moduleNote}
                onChange={this.onChangeModuleNote}>
                <option >select matiere</option>
                {
                  this.state.listcompetence.map(function (competence) {
                    return <option value={competence.codeMatiere._id} >{competence.codeMatiere.libMatiere}</option>;
                  })
                }
              </select>
            </div>

            <Link className='btn btn-danger' onClick={() => this.handleClick()}>Charger la liste</Link>

            <th></th>
            <div>

            <table className="table">
                <thead class="thead-dark">
  <tr>
   
    <th scope="col">CIN</th>
    <th scope="col">Nom&Prénom</th>
    <th scope="col">Note</th>
 
  </tr>
</thead>
<tbody>

              {this.state.stgsss.map((stagiare, index) => (

            


                  <tr>
                    <td><label>{stagiare.cinStagiaire} </label></td>
                    <td><label>{stagiare.nomStagiaireFr} </label></td>
                    <td>

                      <input type="text" className="form-control " placeholder="enter note"
                        value={stagiare.note} onChange={this.onChangeNoteexam.bind(this, stagiare._id)}
                      />
                    </td>
                  </tr>
                  
              ))}
              </tbody>
                </table>
            </div>
            <button className="btn btn-primary" type="submit" name="action">Enregistrer
</button>
          </form>
        </div>


      </div>
    )
  }
}
export default CreatNote;