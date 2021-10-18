import React from 'react'
import axios from 'axios'
class Editsection extends React.Component{

  
  constructor(props) {
    super()
    this.state = {
        codeSection: '' ,
        codePromotion:  '',
        libSection:  '',
        codeSpecialite: '', 
       // debutSection:  Date, 
       // finSection:  Date,
        codeDiplome:  '',
        groupeSection:  '',  
        listeSpecialites:[],
        listePromotions:[]
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

  componentDidMount() { 
    axios.get(`http://localhost/sect/edit/`+this.props.match.params.id)
      .then(res => {
        this.setState({
          codeSection: res.data.codeSection,
          codePromotion: res.data.codePromotion,
          libSection:res.data.libSection,
          codeSpecialite:res.data.codeSpecialite,
          codeDiplome:res.data.codeDiplome,
          groupeSection:res.data.groupeSection,
    
        });
      })
      .catch((error) => {
        console.log(error);
      })

      this.fetchSpecialite();
      this.fetchPromotion();

  }
  






onSubmit(e) {
  e.preventDefault()
  const studentObject = {
    codeSection:this.state.codeSection,
    codePromotion:this.state.codePromotion,
    libSection:this.state.libSection,
    libSection:this.state.libSection,
    codeDiplome:this.state.codeDiplome,
    groupeSection:this.state.groupeSection,
  };

  axios.put(`http://localhost/sect/`+this.props.match.params.id, studentObject )
  .then((res) => {
      console.log(res.data)
      console.log(' successfully updated')
    }).catch((error) => {
      console.log(error)
    })
  
  // Redirect to Student List 
  this.props.history.push('/module')

 // window.location = "/";
  }
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


          



    render(){
    return(
      <div className="content">
      <h1>Ajoute une Nouvelle section</h1>
        <div className="w-75 mx-auto shadow p-5">
        <h2>Ajoute une Nouvelle Section</h2>

        <form onSubmit={this.onSubmit}>
  <div className="form-group">
  <input type="text" className="form-control form-control-lg" placeholder="enter code Section" 
  name="codeMatiere"
  value={this.state.codeSection}
  onChange={this.onChangeCodeSection}

  />
    </div>
    <div className="form-group">
  <input type="text" className="form-control form-control-lg" placeholder="enter lib Section "
  name="libMatiere"
  value={this.state.libSection}
  onChange={this.onChangeLibSection}
  />
    </div>
    <div className="form-group">
  <input type="text" className="form-control form-control-lg" placeholder="enter groupe Section "
  name="coifMatiere"
  value={this.state.groupeSection}
  onChange={this.onChangeGroupeSection}
  />
    </div>
    
   

    <div className="form-group">
   
   <select class="form-control"  name="codeDiplome" value={this.state.codeDiplome}
   onChange={this.onChangeCodeDiplome}>
       <option >select Diplome</option>

       <option >CAP</option>
       <option >BTP</option>
       <option >BTS</option>
     

   </select>
 
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



 
  <button className="btn btn-primary"  type="submit" name="action">Submit
   
  </button>

</form>
</div>
</div>
    )
}}
export default Editsection;