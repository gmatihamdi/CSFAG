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
      specialiteStagiaire: '',
      groupeStagiaire: '',
      codeMatiere: '',
      users: [],
      matieres: [],
      stgsss: [],
      stgs: []
    }
    // Setting up functions
    this.onChangeStagiaireNote = this.onChangeStagiaireNote.bind(this);
    this.onChangeNoteexam = this.onChangeNoteexam.bind(this);
    this.onChangeModuleNote = this.onChangeModuleNote.bind(this);
    this.onChangeSpecialiteStagiaire = this.onChangeSpecialiteStagiaire.bind(this);
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
  onChangeSpecialiteStagiaire(e) {
    this.setState({ specialiteStagiaire: e.target.value })
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

  handleClick() {

    const a = {
      x: this.state.specialiteStagiaire,
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
  }
  render() {

    return (
      <div className="content">

        <div className="w-75 mx-auto shadow p-5">
          <h2>Notation des Compétences par groupe</h2>

          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <select

                className="form-control" value={this.state.specialiteStagiaire}
                onChange={this.onChangeSpecialiteStagiaire}>
                <option >select specialite</option>
                {
                  this.state.users.map(function (specialite) {
                    return <option  >{specialite.libSpecialite}</option>;
                  })
                }
              </select>

            </div>

            <select class="form-control" name="niveauMatiere" value={this.state.groupeStagiaire}
              onChange={this.onChangeGroupeStagiaire}>
              <option >select Groupe</option>
              <option >G1</option>
              <option >G2</option>
            </select>
            <div className="form-group">
              <select
                className="form-control" value={this.state.moduleNote}
                onChange={this.onChangeModuleNote}>
                <option >select matiere</option>
                {
                  this.state.matieres.map(function (matiere) {
                    return <option value={matiere._id} >{matiere.libMatiere}</option>;
                  })
                }
              </select>
            </div>

            <Link className='btn btn-danger' onClick={() => this.handleClick()}>loading</Link>

            <th></th>
            <div>
              {this.state.stgsss.map((stagiare, index) => (

                <table className="table">
                  <tr>
                    <td><label>{stagiare.cinStagiaire} </label></td>
                    <td><label>{stagiare.nomStagiaireFr} </label></td>
                    <td>

                      <input type="text" className="form-control " placeholder="enter note"
                        value={stagiare.note} onChange={this.onChangeNoteexam.bind(this, stagiare._id)}
                      />
                    </td>
                  </tr>
                </table>
              ))}
            </div>
            <button className="btn btn-primary" type="submit" name="action">Submit
</button>
          </form>
        </div>
      </div>
    )
  }
}
export default CreatNote;