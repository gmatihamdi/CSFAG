import React from 'react'
import axios from 'axios'
class Addcompetence extends React.Component{

  
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

        listePromotions:[]
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
onSubmit(e) {
  e.preventDefault()
  const studentObject = {
    codeSection:this.state.codeSection,
    codePromotion:this.state.codePromotion,
    codeCompetence:this.state.codeCompetence,
    codeSpecialite:this.state.codeSpecialite,
    codeMatiere:this.state.codeMatiere,
   
  };
        axios.post('http://localhost/compet',studentObject).then(res => console.log(res.data));
        //this.setState({ codeMatiere: '', libMatiere: '',coifMatiere:'',seuilMatiere:'',niveauMatiere:'',libSpecialite:''})    
        //this.componentDidMount();
      console.log( studentObject)  
      }
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


           componentDidMount() {
                     this.fetchSpecialite();
                     this.fetchPromotion();
                     this.fetchModule();
                     this.fetchSection();

                  }



    render(){
    return(
      <div className="content">
      <h1>Ajoute une Nouvelle section</h1>
        <div className="w-75 mx-auto shadow p-5">
        <h2>Affecter une  Competence</h2>

        <form onSubmit={this.onSubmit}>
  <div className="form-group">
  <input type="text" className="form-control form-control-lg" placeholder="enter code competence" 
  name="codeMatiere"
  value={this.state.codeCompetence}
  onChange={this.onChangeCodeCompetence}

  />
    </div>
  
    <div className="form-group">
   
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

<div className="form-group">
   
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


<div className="form-group">
   
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

<div className="form-group">
   
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
 
</div>

 
  <button className="btn btn-primary"  type="submit" name="action">Submit
   
  </button>

</form>
</div>
</div>
    )
}}
export default Addcompetence;