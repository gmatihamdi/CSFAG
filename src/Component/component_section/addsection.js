import React from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
class Addsection extends React.Component{

  
  constructor(props) {
    super()
    this.state = {
        codeSection: '' ,
        codePromotion:  '',
        libSection:  '',
        codeSpecialite: '', 
        codeDiplome:  '',
        groupeSection:  '',  
        listeSpecialites:[],
        listePromotions:[],
        ErrcodeSection: '' ,
        ErrlibSection:  '',
        ErrcodeSpecialite: '', 
    }
    // Setting up functions
    this.onChangeCodeSection = this.onChangeCodeSection.bind(this);
    this.onChangeLibSection = this.onChangeLibSection.bind(this);
    this.onChangeGroupeSection = this.onChangeGroupeSection.bind(this);
    this.onChangecodeSpecialite = this.onChangecodeSpecialite.bind(this);
    this.onChangeCodePromotion = this.onChangeCodePromotion.bind(this);
    this.onChangeCodeDiplome = this.onChangeCodeDiplome.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // Setting up state
   
  }
onSubmit(e) {

  e.preventDefault()
  if(this.state.codeSection===''){
    this.state.ErrcodeSection='Champs Obligatoire '
   }
   if(this.state.libSection===''){
    this.state.ErrlibSection='Champs Obligatoire '
   }
   if(this.state.codeSpecialite===''){
    this.state.ErrcodeSpecialite='Champs Obligatoire '
   }
   else{



  
  const studentObject = {
    codeSection:this.state.codeSection,
    codePromotion:this.state.codePromotion,
    libSection:this.state.libSection,
    codeSpecialite:this.state.codeSpecialite,
    codeDiplome:this.state.codeDiplome,
    groupeSection:this.state.groupeSection,
  };
        axios.post('http://localhost/sect',studentObject).then(res => 
        toast.success('insertion avec success')
      ).catch(err => {toast.error("Erreur d'insertion ")}) 
      
      }}
 onChangeCodeSection(e){
      this.setState({ codeSection:e.target.value })
}
onChangeLibSection(e){
      this.setState({libSection:e.target.value}) }
      onChangeCodePromotion(e){
        this.setState({codePromotion:e.target.value}) }
        onChangecodeSpecialite(e){
            this.setState({codeSpecialite:e.target.value}) }
            onChangeCodeDiplome(e){
                this.setState({codeDiplome:e.target.value}) }
                onChangeGroupeSection(e){
                    this.setState({groupeSection:e.target.value}) }


                    fetchSpecialite() {
                        fetch(`http://localhost/spc`)
                          // We get the API response and receive data in JSON format...
                          .then(response => response.json())
                          // ...then we update the users state
                          .then(data =>
                            this.setState({
                                listeSpecialites: data,
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


           componentDidMount() {
                     this.fetchSpecialite();
                     this.fetchPromotion();

                  }



    render(){
    return(
<div className="content">
      
        <div className>
        <h2>Ajoute une Nouvelle Section</h2>
        <ToastContainer/>
        <form onSubmit={this.onSubmit} class="row g-3">

  <div className="col-md-6">
  <label> Code Section </label>
  <input type="text" className="form-control " placeholder="enter code Section" 
  name="codeMatiere"
  value={this.state.codeSection}
  onChange={this.onChangeCodeSection}

  />
  <p class="text-danger">{this.state.ErrcodeSection}</p>
    </div>
    <div className="col-md-6">
    <label>  Section </label>
  <input type="text" className="form-control " placeholder="enter lib Section "
  name="libMatiere"
  value={this.state.libSection}
  onChange={this.onChangeLibSection}
  />
  <p class="text-danger">{this.state.ErrlibSection}</p>
    </div>
    <div className="col-md-6">
    <label>  Section gr </label>
  <input type="text" className="form-control " placeholder="enter groupe Section "
  name="coifMatiere"
  value={this.state.groupeSection}
  onChange={this.onChangeGroupeSection}
  />
    </div>
    
   

    <div className="col-md-6">
    <label>  Diplome </label>
   
   <select class="form-control"  name="codeDiplome" value={this.state.codeDiplome}
   onChange={this.onChangeCodeDiplome}>
       <option >select Diplome</option>

       <option >CAP</option>
       <option >BTP</option>
       <option >BTS</option>
     

   </select>
 
</div>




<div className="col-md-6">
<label>  Specialité </label>
   <select 
   className="form-control"  value={this.state.codeSpecialite}
   onChange={this.onChangecodeSpecialite}> 
<option >Choisir une spécialités</option>
 
{
                                this.state.listeSpecialites.map(function(specialite) {
                                    return <option value={specialite._id}  >{specialite.libSpecialite}</option>;
                                })
                            }
   </select>
   <p class="text-danger">{this.state.ErrcodeSpecialite}</p>
</div>

<div className="col-md-6">
<label>  Promotion </label>
   <select 
   className="form-control"  value={this.state.codePromotion}
   onChange={this.onChangeCodePromotion}> 
   
<option >choisir une Promotion</option>
 
{
                                this.state.listePromotions.map(function(promotion) {
                                    return <option value={promotion._id}  >{promotion.libPromotionFr}</option>;
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
export default Addsection;