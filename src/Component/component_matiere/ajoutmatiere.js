import React from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
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
        users:[],
        ErrcodeMatiere:  '' ,
        ErrlibMatiere:  '',
        ErrseuilMatiere:'',
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

  if(this.state.codeMatiere===''){
    this.state.ErrcodeMatiere='Champs Obligatoire '
   }
   if(this.state.libMatiere===''){
    this.state.ErrlibMatiere='Champs Obligatoire '
   }
   if(this.state.seuilMatiere===''){
    this.state.ErrseuilMatiere='Champs Obligatoire '
   }
   else{
  const studentObject = {
    codeMatiere:this.state.codeMatiere,
    libMatiere:this.state.libMatiere,
    coifMatiere:this.state.coifMatiere,
    seuilMatiere:this.state.seuilMatiere,
    niveauMatiere:this.state.niveauMatiere,
    specialiteMatiere:this.state.specialiteMatiere,

  };
        axios.post('http://localhost/mat',studentObject).then(res => 
        toast.success('insertion avec success')
      ).catch(err => {toast.error("Erreur d'insertion ")}) 
       
      }}
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
    
        <div >
        <h2>Ajoute une Nouvelle Module</h2>
        <ToastContainer/>
        <form onSubmit={this.onSubmit} class="row g-3">

<div className="col-md-6">
<label> Code Module </label>
  <input type="text" className="form-control " placeholder="enter matiere code" 
  name="codeMatiere"
  value={this.state.codeMatiere}
  onChange={this.onChangeCodeMatiere}

  />
  <p class="text-danger">{this.state.ErrcodeMatiere}</p>
    </div>
    <div className="col-md-6">
    <label> Titre du module </label>
  <input type="text" className="form-control " placeholder="enter lib matiere "
  name="libMatiere"
  value={this.state.libMatiere}
  onChange={this.onChangeLibMatiere}
  />
  <p class="text-danger">{this.state.ErrlibMatiere}</p>
    </div>
    <div className="col-md-6">
    <label> coief du module </label>
  <input type="text" className="form-control" placeholder="enter coif matiere "
  name="coifMatiere"
  value={this.state.coifMatiere}
  onChange={this.onChangeCoifMatiere}
  />
    </div>
    <div className="col-md-6">
    <label> Seuil de réussite en %</label>
  <input type="text" className="form-control " placeholder="enter seuil matiere "
  name="seuilMatiere"
  value={this.state.seuilMatiere}
  onChange={this.onChangeSeuilMatiere}
  />
  <p class="text-danger">{this.state.ErrseuilMatiere}</p>
    </div>
   

    <div className="col-md-6">
    <label> Niveau du module</label>
   
   <select class="form-control"  name="niveauMatiere" value={this.state.niveauMatiere}
   onChange={this.onChangeNiveauMatiere}>
       <option >select niveau</option>

       <option >1er année</option>
       <option >2eme année</option>
   </select>
 
</div>




<div className="col-md-6">
    <label> Specialité du module</label>
   
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



 
  <button className="btn btn-primary"  type="submit" name="action">Enregistrer
   
  </button>

</form>
</div>
</div>
    )
}}
export default Ajoutmatiere;