import React from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
class AddFormateur extends React.Component{

  
  constructor(props) {
    super()
    this.state = {
        cinFormateur:'',
        nomFormateurFr: '',
        nomFormateurAr: '',
        sexe: String,
        Lieunaissance: '',
        etatFormateur: '',
        datenaiFormateur:Date,
        adressFormateur: '',
        telFormateur:'',
        emailFormateur: '',
        ErrnomFormateurFr:'',
        ErrtelFormateur:'',
        ErrnomFormateurAr:''
    }
    // Setting up functions
    this.onChangeCinFormateur = this.onChangeCinFormateur.bind(this);
    this.onChangeNomFormateurFr = this.onChangeNomFormateurFr.bind(this);
    this.onChangeNomFormateurAr = this.onChangeNomFormateurAr.bind(this);
    this.onChangeSexe = this.onChangeSexe.bind(this);
    this.onChangeTelFormateur = this.onChangeTelFormateur.bind(this);
    this.onChangeEmailFormateur = this.onChangeEmailFormateur.bind(this);
    this.onChangeAdressFormateur = this.onChangeAdressFormateur.bind(this);
    this.onChangeEtatFormateur = this.onChangeEtatFormateur.bind(this);



    this.onSubmit = this.onSubmit.bind(this);
    // Setting up state
   
  }
onSubmit(e) {
  e.preventDefault()

  if(this.state.nomFormateurFr===''){
    this.state.ErrnomFormateurFr='Champs Obligatoire '
   }
   if(this.state.telFormateur===''){
    this.state.ErrtelFormateur='Champs Obligatoire '
   }
   if(this.state.nomFormateurAr===''){
    this.state.ErrnomFormateurAr='Champs Obligatoire '
   }
   else{
  const studentObject = {
    cinFormateur:this.state.cinFormateur,
    nomFormateurFr:this.state.nomFormateurFr,
    nomFormateurAr:this.state.nomFormateurAr,
    sexe:this.state.sexe,
    etatFormateur:this.state.etatFormateur,
    adressFormateur:this.state.adressFormateur,
    telFormateur:this.state.telFormateur,
    emailFormateur:this.state.emailFormateur,


  };
        axios.post('http://localhost/formateur',studentObject).then(res => 
        toast.success('insertion avec success')
      ).catch(err => {toast.error("Erreur d'insertion ")}) 
       
      }}
 onChangeCinFormateur(e){
      this.setState({ cinFormateur:e.target.value })
}
onChangeNomFormateurFr(e){
      this.setState({nomFormateurFr:e.target.value}) }
      onChangeNomFormateurAr(e){
        this.setState({nomFormateurAr:e.target.value}) }
        onChangeSexe(e){
            this.setState({sexe:e.target.value}) }
            onChangeEtatFormateur(e){
                this.setState({etatFormateur:e.target.value}) }
                onChangeAdressFormateur(e){
                    this.setState({adressFormateur:e.target.value}) }
                    onChangeTelFormateur(e){
                        this.setState({telFormateur:e.target.value}) }
                        onChangeEmailFormateur(e){
                            this.setState({emailFormateur:e.target.value}) }
         



    render(){
    return(
      <div className="content">
    
        <div >
        <h2>Ajoute Formateur</h2>
        <ToastContainer/>
        <form onSubmit={this.onSubmit} class="row g-3">

<div className="col-md-6">
<label> CIN </label>
  <input type="text" className="form-control " placeholder="enter CIN" 
  name="codeMatiere"
  value={this.state.cinFormateur}
  onChange={this.onChangeCinFormateur}

  />
    </div>
    <div className="col-md-6">
    <label> Nom&Prénom </label>
  <input type="text" className="form-control " placeholder=" Nom&Prénom "
  name="libMatiere"
  value={this.state.nomFormateurFr}
  onChange={this.onChangeNomFormateurFr}
  />
  <p class="text-danger">{this.state.ErrnomFormateurFr}</p>
    </div>
    <div className="col-md-6">
    <label> Nom&Prénom arabe </label>
  <input type="text" className="form-control" placeholder="Nom&Prénom arabe "
  name="coifMatiere"
  value={this.state.nomFormateurAr}
  onChange={this.onChangeNomFormateurAr}
  />
   <p class="text-danger">{this.state.ErrnomFormateurAr}</p>
    </div>
    <div className="col-md-6">
    <label> Addresse</label>
  <input type="text" className="form-control " placeholder="Addresse "
  name="seuilMatiere"
  value={this.state.adressFormateur}
  onChange={this.onChangeAdressFormateur}
  />
  
    </div>
    <div className="col-md-6">
    <label> Email</label>
  <input type="text" className="form-control " placeholder="emai "
  name="seuilMatiere"
  value={this.state.emailFormateur}
  onChange={this.onChangeEmailFormateur}
  />
  </div>
   <div className="col-md-6">
    <label> Télephone</label>
  <input type="text" className="form-control " placeholder="Télephone "
  name="seuilMatiere"
  value={this.state.telFormateur}
  onChange={this.onChangeTelFormateur}
  />
  <p class="text-danger">{this.state.ErrtelFormateur}</p>
    </div>
    

    <div className="col-md-6">
    <label>Etat</label>
   
   <select class="form-control"  name="niveauMatiere" value={this.state.etatFormateur}
   onChange={this.onChangeEtatFormateur}>
       <option >select Etat</option>

       <option >actif</option>
       <option >inactif</option>

       <option >retraite</option>
   </select>
 
</div>




 
  <button className="btn btn-primary"  type="submit" name="action">Enregistrer
   
  </button>

</form>
</div>
</div>
    )
}}
export default AddFormateur;