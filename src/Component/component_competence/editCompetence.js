import React from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
class Editcompetence extends React.Component{

  
  constructor(props) {
    super()
    this.state = {
        codeCompetence:  '' ,
        codePromotion: '',
        codeSection: '', 
         codeSpecialite:  '', 
         codeMatiere:'' ,
        listeSpecialites:[],
        listeModules:[],
        listeSection:[],
        listePromotions:[],
        ErrcodeCompetence:  '' ,
        ErrcodePromotion: '',
        ErrcodeSection: '',
        ErrcodeMatiere:'' ,
    }
    // Setting up functions
    this.onChangeCodeCompetence = this.onChangeCodeCompetence.bind(this);
    this.onChangeCodeSection = this.onChangeCodeSection.bind(this);
    this.onChangeCodeMatiere = this.onChangeCodeMatiere.bind(this);
    this.onChangecodeSpecialite = this.onChangecodeSpecialite.bind(this);
    this.onChangeCodePromotion = this.onChangeCodePromotion.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
    // Setting up state
   
  }

  componentDidMount() { 
    axios.get(`http://localhost/compet/edit/`+this.props.match.params.id)
      .then(res => {
        this.setState({
          codeSection: res.data.codeSection,
          codePromotion: res.data.codePromotion,
          codeSpecialite:res.data.codeSpecialite,
          codeCompetence:res.data.codeCompetence,
          codeMatiere:res.data.codeMatiere,
        });
      })
      .catch((error) => {
        console.log(error);
      })

      this.fetchSpecialite();
      this.fetchPromotion();
      this.fetchModule();
      this.fetchSection();


  }
  






onSubmit(e) {
  e.preventDefault()

  if(this.state.codeCompetence===''){
    this.state.ErrcodeCompetence='Champs Obligatoire '
   }
   if(this.state.codePromotion===''){
    this.state.ErrcodePromotion='Champs Obligatoire '
   }
   if(this.state.codeSection===''){
    this.state.ErrcodeSection='Champs Obligatoire '
   }
   if(this.state.codeMatiere===''){
    this.state.ErrcodeMatiere='Champs Obligatoire '
   }
   else{
  const studentObject = {
    codeSection:this.state.codeSection,
    codePromotion:this.state.codePromotion,
    codeCompetence:this.state.codeCompetence,
    codeSpecialite:this.state.codeSpecialite,
    codeMatiere:this.state.codeMatiere,
   
  };

  axios.put(`http://localhost/compet/`+this.props.match.params.id, studentObject )
  .then((res) => {
    console.log(res.data)
    console.log(' successfully updated')
    toast.success('Modifier avec success')
  }).catch((error) => {
    console.log(error)
    toast.error("Erreur de Modification ")
  })
  
  // Redirect to Student List 
 // this.props.history.push('/module')

 // window.location = "/";
  }}
  onChangeCodeSection(e){
    this.setState({ codeSection:e.target.value })
}
onChangeCodeMatiere(e){
    this.setState({codeMatiere:e.target.value}) }
    onChangeCodePromotion(e){
      this.setState({codePromotion:e.target.value}) }
      onChangecodeSpecialite(e){
          this.setState({codeSpecialite:e.target.value}) }
          onChangeCodeCompetence(e){
              this.setState({codeCompetence:e.target.value}) }


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

              fetchModule() {
                fetch(`http://localhost/mat`)
                  // We get the API response and receive data in JSON format...
                  .then(response => response.json())
                  // ...then we update the users state
                  .then(data =>
                    this.setState({
                      listeModules: data,
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


  


    render(){
    return(
      <div className="content">
    
        <div className="w-75 mx-auto shadow p-5">
        <h2>Modifier une  Competence</h2>
        <ToastContainer/>
        <form onSubmit={this.onSubmit} class="row g-3">

<div className="col-md-6">
<label> Code Competence </label>

  <input type="text" className="form-control " placeholder="enter code competence" 
  name="codeMatiere"
  value={this.state.codeCompetence}
  onChange={this.onChangeCodeCompetence}

  />
    <p class="text-danger">{this.state.ErrcodeCompetence}</p>
    </div>
  
    <div className="col-md-6">
<label>  Specialité </label>
   
   <select 
   className="form-control"  value={this.state.codeSpecialite}
   onChange={this.onChangecodeSpecialite}> 
<option >select specialite</option>
 
{
                                this.state.listeSpecialites.map(function(specialite) {
                                    return <option value={specialite._id}  >{specialite.libSpecialite}</option>;
                                })
                            }
   </select>
 
</div>

<div className="col-md-6">
<label> Section </label>
   
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
   <p class="text-danger">{this.state.ErrcodeSection}</p>
</div>


<div className="col-md-6">
<label> Promotion </label>
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
   <p class="text-danger">{this.state.ErrcodePromotion}</p>
</div>

<div className="col-md-6">
<label> module </label>
   
   <select 
   className="form-control"  value={this.state.codeMatiere}
   onChange={this.onChangeCodeMatiere}> 
<option >select module</option>
 
{
                                this.state.listeModules.map(function(matiere) {
                                    return <option value={matiere._id}  >{matiere.libMatiere}</option>;
                                })
                            }
   </select>
   <p class="text-danger">{this.state.ErrcodeMatiere}</p>
</div>

 
  <button className="btn btn-primary"  type="submit" name="action"> Modifier
   
  </button>

</form>
</div>
</div>
    )
}}
export default Editcompetence;