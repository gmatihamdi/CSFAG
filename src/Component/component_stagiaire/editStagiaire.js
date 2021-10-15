import React, { Component } from 'react';
import axios from "axios";
import DatePicker from "react-date-picker";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


class EditStagiaire extends Component {

    constructor(props){
        super();
        this.state = {
           
                cinStagiaire:'',
                nomStagiaireFr: '',
                nomStagiaireAr: '',
                etatdossier: '',
                datenaissanceStag: new Date(),
                adressStagiaire: '',
                telStagiaire: '',
                niveauScolaire: '',
                emailstagiaire: '',
                specialiteStagiaire: '',
                groupeStagiaire: '',
                codePromotion: '',
                codeSection: '', 
                listeSpecialites:[],
                listeSection:[],
                listePromotions:[],
               
            
                users:[]
            }
            // Setting up functions
            this.onChangeCinStagiaire = this.onChangeCinStagiaire.bind(this);
            this.onChangeNomStagiaireFr = this.onChangeNomStagiaireFr.bind(this);
            this.onChangeEtatdossier = this.onChangeEtatdossier.bind(this);
            this.onChangeNomStagiaireAr = this.onChangeNomStagiaireAr.bind(this);
            this.onChangeDatenaissanceStag = this.onChangeDatenaissanceStag.bind(this);
            this.onChangeAdressStagiaire = this.onChangeAdressStagiaire.bind(this);
            this.onChangeTelStagiaire = this.onChangeTelStagiaire.bind(this);
            this.onChangeNiveauScolaire = this.onChangeNiveauScolaire.bind(this);
            this.onChangeEmailstagiaire = this.onChangeEmailstagiaire.bind(this);
            this.onChangeSpecialiteStagiaire = this.onChangeSpecialiteStagiaire.bind(this);
            this.onChangeGroupeStagiaire = this.onChangeGroupeStagiaire.bind(this);
            this.onChangeCodePromotion = this.onChangeCodePromotion.bind(this);
            this.onChangeCodeSection = this.onChangeCodeSection.bind(this);
        
        
            this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
         
        axios.get(`http://localhost/stag/edit/`+this.props.match.params.id)
            .then(res => {
                this.setState({
                    cinStagiaire: res.data.cinStagiaire,
                    nomStagiaireFr: res.data.nomStagiaireFr,
                    nomStagiaireAr: res.data.nomStagiaireAr,
                    datenaissanceStag: res.data.datenaissanceStag,
                    adressStagiaire: res.data.adressStagiaire,
                    telStagiaire: res.data.telStagiaire,
                    niveauScolaire: res.data.niveauScolaire,
                    emailstagiaire: res.data.emailstagiaire,
                    specialiteStagiaire: res.data.specialiteStagiaire,
                    groupeStagiaire: res.data.groupeStagiaire,
                    codeSection: res.data.codeSection,
                    codePromotion: res.data.codePromotion,
              
                })
              
            })
            .catch(function (error){
                console.log(error);
                
            })

        axios.get(`http://localhost/spc`)
            .then(response => {
                if(response.data.length > 0) {
                    this.setState({ 
                        listeSpecialites: response.data.map(specialite => specialite.libSpecialite),
                    });
                }
            })
            this.fetchPromotion();
            this.fetchSection();
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
              fetchPromotion() {
                fetch(`http://localhost/prom`)
                  // We get the API response and receive data in JSON format...
                  .then(response => response.json())
                  // ...then we update the users state
                  .then(data =>
                    this.setState({
                      listePromotions: data,
                      isLoading: false,
                    })
                  )
                  // Catch any errors we hit and update the app
                  .catch(error => this.setState({ error, isLoading: false }));
              }


    

    onChangeCinStagiaire(e){
        this.setState({ cinStagiaire:e.target.value })
  }
  onChangeNomStagiaireFr(e){
        this.setState({nomStagiaireFr:e.target.value}) }
        onChangeNomStagiaireAr(e){
          this.setState({nomStagiaireAr:e.target.value}) }
          onChangeEtatdossier(e){
            this.setState({etatdossier:e.target.value}) }
          onChangeDatenaissanceStag(datenaissanceStag){
              this.setState({datenaissanceStag:datenaissanceStag}) }
              onChangeAdressStagiaire(e){
                  this.setState({adressStagiaire:e.target.value}) }
                  onChangeTelStagiaire(e){
                      this.setState({telStagiaire:e.target.value}) }
                      onChangeNiveauScolaire(e){
                          this.setState({niveauScolaire:e.target.value}) }
                          onChangeEmailstagiaire(e){
                              this.setState({emailstagiaire:e.target.value}) }
                              onChangeSpecialiteStagiaire(e){
                                  this.setState({specialiteStagiaire:e.target.value}) }
                                  onChangeGroupeStagiaire(e){
                                    this.setState({groupeStagiaire:e.target.value}) }
                                    onChangeCodePromotion(e){
                                        this.setState({codePromotion:e.target.value}) }   
                                        onChangeCodeSection(e){
                                            this.setState({ codeSection:e.target.value })  }
   
   
                      onSubmit(e) {
        e.preventDefault();
        const stagiaire = {
            
            cinStagiaire: this.state.cinStagiaire,
            nomStagiaireFr: this.state.nomStagiaireFr,
            nomStagiaireAr: this.state.nomStagiaireAr,
            datenaissanceStag: this.state.datenaissanceStag,
            adressStagiaire: this.state.adressStagiaire,
            telStagiaire: this.state.telStagiaire,
            niveauScolaire: this.state.niveauScolaire,
            emailstagiaire: this.state.emailstagiaire,
            specialiteStagiaire: this.state.specialiteStagiaire,
            groupeStagiaire: this.state.groupeStagiaire,
            codeSection:this.state.codeSection,
            codePromotion:this.state.codePromotion,
        
        }

        console.log(stagiaire);

        axios.put(`http://localhost/stag/`+this.props.match.params.id, stagiaire )
        .then((res) => {
            console.log(res.data)
            console.log(' successfully updated')
            toast.success('update avec success')
          }).catch((error) => {
            console.log(error)
            toast.error("Erreur d'insertion ")
          })
        
        // Redirect to Student List 
        //this.props.history.push('/module')

       // window.location = "/";
    }
    
    render() { 
        return ( 
          <div className="content">
      
        <div className="w-75 mx-auto shadow p-5">
        <h2>Modifier Stagiaire</h2>
        <ToastContainer />

        <form onSubmit={this.onSubmit} class="row g-3">
  <div className="col-md-6">
  <label for="inputEmail4" class="form-label">CIN Stagiaire</label>
  <input type="text" className="form-control " placeholder=" CIN" 
  name="cinStagiaire"
  value={this.state.cinStagiaire}
  onChange={this.onChangeCinStagiaire}

  />
  <p class="text-danger">{this.state.ErreurcinStagiaire}</p>


     </div>
    <div className="col-md-6">
    <label for="inputEmail4" class="form-label">Nom Stagiaire</label>
  <input type="text" className="form-control " placeholder=" NOM FR "
  name="libMatiere"
  value={this.state.nomStagiaireFr}
  onChange={this.onChangeNomStagiaireFr}
  />
   <p class="text-danger">{this.state.ErrnomStagiaireFr}</p>
    </div>
    <div className="col-md-6">
    <label for="inputEmail4" class="form-label">الاسم و اللقب </label>
  <input type="text" className="form-control " placeholder=" Nom Arabe "
  name="coifMatiere"
  value={this.state.nomStagiaireAr}
  onChange={this.onChangeNomStagiaireAr}
  />
   <p class="text-danger">{this.state.ErrnomStagiaireAr}</p>
 </div>
 <div className="col-md-6">
 <label for="inputEmail4" class="form-label"> Date de naissance </label>
                        <div>
                            <DatePicker className="form-control "
                                value={this.state.datenaissanceStag}
                                onChange={this.onChangeDatenaissanceStag}
                            />
                        </div>
                    </div>

                    <div className="col-md-6"> 
 <label for="inputEmail4" class="form-label"> Adresse </label>           
  <input type="text" className="form-control " placeholder=" adresse "
  name="seuilMatiere"
  value={this.state.adressStagiaire}
  onChange={this.onChangeAdressStagiaire}
  />
     </div>



<div className="col-md-6"> 
 <label for="inputEmail4" class="form-label"> Niveau d'etude </label>
   
   <select class="form-control"  name="niveauMatiere" value={this.state.niveauScolaire}
   onChange={this.onChangeNiveauScolaire}>
       <option >select niveau</option>
       <option >2 eme annee secondaire NV avec succes</option>
       <option >3 eme annee secondaire NV avec succes</option>
       <option >6 éme année secondaire</option>
       <option >7 éme Année Secondaire</option>
       <option >BAC+1</option>
       <option >BAC+2</option>
       <option >BAC+3</option>
       <option >BAC+4</option>
       <option >baccalauréat</option>
       <option >Brevet de Technicien Supérieur (BTS)</option>
       <option >BTP</option>
       <option >CAP</option>
       <option >Certficat de formation professionnelle (cfp)</option>
       <option >DEA</option>
       <option >Diplôme des Etudes Approfondies</option>
       <option >Diplomede techncien supérieur( ISET)</option>
       <option >Ecolde de metier</option>
       <option >Ingénieur Principal</option>
       <option >Ingénieur Travaux</option>
       <option >Maîtrise</option>
       <option >Maitrise et plus</option>
       
   </select>
 
</div>




<div className="col-md-6"> 
 <label for="inputEmail4" class="form-label"> Section </label>
   
   <select 
   className="form-control"  value={this.state.specialiteStagiaire}
   onChange={this.onChangeSpecialiteStagiaire}> 
<option >select specialite</option>
 
{
                                this.state.listeSpecialites.map(function(specialite) {
                                    return <option >{specialite.libSpecialite}</option>;
                                })
                            }
   </select>
 
</div>

<div className="col-md-6"> 
 <label for="inputEmail4" class="form-label"> Affectation par groupe </label>
   
   <select class="form-control"  name="niveauMatiere" value={this.state.groupeStagiaire}
   onChange={this.onChangeGroupeStagiaire}>
       <option >select Groupe</option>

       <option >G1</option>
       <option >G2</option>
   </select>
 
</div>
<div className="col-md-6"> 
 <label for="inputEmail4" class="form-label"> Section </label>
   <select 
   className="form-control"  value={this.state.codeSection}
   onChange={this.onChangeCodeSection}> 
<option >select section</option>
 
{
                                this.state.listeSection.map(function(section) {
                                    return <option value={section._id}  >{section.libSection}</option>;
                                })
                            }
</select>
</div>
<div className="col-md-6"> 
 <label for="inputEmail4" class="form-label"> Promotion </label>
<select 
   className="form-control"  value={this.state.codePromotion}
   onChange={this.onChangeCodePromotion}> 
<option >select Promotion</option> 
{
                                this.state.listePromotions.map(function(promotion) {
                                return <option value={promotion._id}  >{promotion.libPromotionFr}</option>;
                                })
                            }
</select>
</div>


  <div className="col-md-6"> 
 <label for="inputEmail4" class="form-label"> Etat du dossier </label>
   
   <select class="form-control"  name="niveauMatiere" value={this.state.etatdossier}
   onChange={this.onChangeEtatdossier}>
       <option >Accepter</option>
       <option >Refuser</option>
       <option >En attente</option>
       </select>
 
 </div>


  <div className="col-md-6"> 
  </div>
  <div className="col-md-6"> 
  </div>




  <div className="col-md-6"> 
<button className="btn btn-primary"  type="submit" name="action">Enregistrer
</button>
</div>
</form>
</div>
</div>
         );
    }
}
 
export default EditStagiaire;