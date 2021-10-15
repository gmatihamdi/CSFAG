import React from 'react'
import axios from 'axios'
class Ajoutmatiere extends React.Component{

  
  constructor(props) {
    super()
    this.state = {
        codeMatiere:  '' ,
        libMatiere:  '',
        coifMatiere: '',
        seuilMatiere:'',
        niveauMatiere: '' ,
        specialiteMatiere: " " ,
        users:[]
    }
    // Setting up functions
    this.onChangeCodeMatiere = this.onChangeCodeMatiere.bind(this);
    this.onChangeLibMatiere = this.onChangeLibMatiere.bind(this);
    this.onChangeCoifMatiere = this.onChangeCoifMatiere.bind(this);
    this.onChangeSeuilMatiere = this.onChangeSeuilMatiere.bind(this);
    this.onChangeNiveauMatiere = this.onChangeNiveauMatiere.bind(this);
    this.onChangeSpecialiteMatiere = this.onChangeSpecialiteMatiere.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
    // Setting up state
   
  }
onSubmit(e) {
  e.preventDefault()
  const studentObject = {
    codeMatiere:this.state.codeMatiere,
    libMatiere:this.state.libMatiere,
    coifMatiere:this.state.coifMatiere,
    seuilMatiere:this.state.seuilMatiere,
    niveauMatiere:this.state.niveauMatiere,
    specialiteMatiere:this.state.specialiteMatiere,

  };
        axios.post('http://localhost/mat',studentObject).then(res => console.log(res.data));

        //this.setState({ codeMatiere: '', libMatiere: '',coifMatiere:'',seuilMatiere:'',niveauMatiere:'',libSpecialite:''})    
        //this.componentDidMount();
      console.log( studentObject)
       
      }
 onChangeCodeMatiere(e){
      this.setState({ codeMatiere:e.target.value })
}
onChangeLibMatiere(e){
      this.setState({libMatiere:e.target.value}) }
      onChangeCoifMatiere(e){
        this.setState({coifMatiere:e.target.value}) }
        onChangeSeuilMatiere(e){
            this.setState({seuilMatiere:e.target.value}) }
            onChangeNiveauMatiere(e){
                this.setState({niveauMatiere:e.target.value}) }
                onChangeSpecialiteMatiere(e){
                    this.setState({specialiteMatiere:e.target.value}) }

           componentDidMount() {
                      axios.get(`http://localhost/spc`)
                          .then(response => {
                              if(response.data.length > 0) {
                                  this.setState({ 
                                    users: response.data.map(specialite => specialite.libSpecialite),
                                    libSpecialite: response.data[0].libSpecialite
                                  });
                              }
                          })
                  }



    render(){
    return(
      <div className="content">
      <h1>Ajoute une Nouvelle module</h1>
        <div className="w-75 mx-auto shadow p-5">
        <h2>Ajoute une Nouvelle matiere</h2>

        <form onSubmit={this.onSubmit}>
  <div className="form-group">
  <input type="text" className="form-control form-control-lg" placeholder="enter matiere code" 
  name="codeMatiere"
  value={this.state.codeMatiere}
  onChange={this.onChangeCodeMatiere}

  />
    </div>
    <div className="form-group">
  <input type="text" className="form-control form-control-lg" placeholder="enter lib matiere "
  name="libMatiere"
  value={this.state.libMatiere}
  onChange={this.onChangeLibMatiere}
  />
    </div>
    <div className="form-group">
  <input type="text" className="form-control form-control-lg" placeholder="enter coif matiere "
  name="coifMatiere"
  value={this.state.coifMatiere}
  onChange={this.onChangeCoifMatiere}
  />
    </div>
    <div className="form-group">
  <input type="text" className="form-control form-control-lg" placeholder="enter seuil matiere "
  name="seuilMatiere"
  value={this.state.seuilMatiere}
  onChange={this.onChangeSeuilMatiere}
  />
    </div>
   

    <div className="form-group">
   
   <select class="form-control"  name="niveauMatiere" value={this.state.niveauMatiere}
   onChange={this.onChangeNiveauMatiere}>
       <option >select niveau</option>

       <option >1er année</option>
       <option >2eme année</option>
   </select>
 
</div>




    <div className="form-group">
   
   <select 
   className="form-control"  value={this.state.specialiteMatiere}
   onChange={this.onChangeSpecialiteMatiere}> 
<option >select specialite</option>
 
{
                                this.state.users.map(function(specialite) {
                                    return <option key={specialite}  >{specialite}</option>;
                                })
                            }
   </select>
 
</div>



 
  <button className="btn btn-primary"  type="submit" name="action">Submit
   
  </button>

</form>
</div>
</div>
    )
}}
export default Ajoutmatiere;