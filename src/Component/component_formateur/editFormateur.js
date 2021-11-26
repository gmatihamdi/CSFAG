import React, { Component } from 'react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

class EditFormateur extends Component {

    constructor(props){
        super();
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
        this.onChangeCinFormateur = this.onChangeCinFormateur.bind(this);
        this.onChangeNomFormateurFr = this.onChangeNomFormateurFr.bind(this);
        this.onChangeNomFormateurAr = this.onChangeNomFormateurAr.bind(this);
        this.onChangeSexe = this.onChangeSexe.bind(this);
        this.onChangeTelFormateur = this.onChangeTelFormateur.bind(this);
        this.onChangeEmailFormateur = this.onChangeEmailFormateur.bind(this);
        this.onChangeAdressFormateur = this.onChangeAdressFormateur.bind(this);
        this.onChangeEtatFormateur = this.onChangeEtatFormateur.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        axios.get(`http://localhost/formateur/edit/`+this.props.match.params.id)
            .then(res => {
                this.setState({
                    cinFormateur: res.data.cinFormateur,
                    nomFormateurFr: res.data.nomFormateurFr,
                    nomFormateurAr: res.data.nomFormateurAr,
                    etatFormateur: res.data.etatFormateur,
                    adressFormateur: res.data.adressFormateur,
                    telFormateur: res.data.telFormateur,
                    emailFormateur: res.data.emailFormateur,
                    sexe: res.data.sexe,

                    
                })
            })
            .catch(function (error){
                console.log(error);
            })

    
    }

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
   
   
   
                      onSubmit(e) {
                      
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
                            e.preventDefault();
        const format = {
            cinFormateur:this.state.cinFormateur,
            nomFormateurFr:this.state.nomFormateurFr,
            nomFormateurAr:this.state.nomFormateurAr,
            sexe:this.state.sexe,
            etatFormateur:this.state.etatFormateur,
            adressFormateur:this.state.adressFormateur,
            telFormateur:this.state.telFormateur,
            emailFormateur:this.state.emailFormateur,
        
        }
        console.log(format);
        axios.put(`http://localhost/formateur/`+this.props.match.params.id,format )
        .then((res) => {
            console.log(res.data)
            console.log(' successfully updated')
            toast.success('Modifier avec success')
          }).catch((error) => {
            console.log(error)
            toast.error("Erreur de Modification ")
          })
        
        // Redirect to Student List 
      ///  this.props.history.push('/module')

       // window.location = "/";
    }}
    
    render() { 
        return ( 
            <div className="content">
                <h3>Modifier Formateur</h3>
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
  
  value={this.state.nomFormateurFr}
  onChange={this.onChangeNomFormateurFr}
  />
  <p class="text-danger">{this.state.ErrnomFormateurFr}</p>
    </div>
    <div className="col-md-6">
    <label> Nom&Prénom arabe </label>
  <input type="text" className="form-control" placeholder="Nom&Prénom arabe "
 
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




 
<button className="btn btn-primary"  type="submit" name="action">Modifier
   
  </button>

</form>
            </div>
         );
    }
}
 
export default EditFormateur;