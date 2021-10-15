import React from 'react'
import axios from 'axios'
class Addgroupe extends React.Component{

  
  constructor(props) {
    super()
    this.state = {
        codeGroupe:  '' ,
        codePromotion: '',
        codeSection: '', 
        listeSection:[],
        listePromotions:[]
    }
    // Setting up functions
    this.onChangeCodeGroupe = this.onChangeCodeGroupe.bind(this);
    this.onChangeCodeSection = this.onChangeCodeSection.bind(this);
    this.onChangeCodePromotion = this.onChangeCodePromotion.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
    // Setting up state
   
  }
onSubmit(e) {
  e.preventDefault()
  const studentObject = {
    codeGroupe:this.state.codeGroupe,
    codePromotion:this.state.codePromotion,
    codeSection:this.state.codeSection,

  };
        axios.post('http://localhost/groupe',studentObject).then(res => console.log(res.data));
      console.log( studentObject)  
      }
 onChangeCodeSection(e){
      this.setState({ codeSection:e.target.value })
}
onChangeCodeGroupe(e){
  this.setState({ codeGroupe:e.target.value })
}

      onChangeCodePromotion(e){
        this.setState({codePromotion:e.target.value}) }
            onChangeCodeCompetence(e){
                this.setState({codeCompetence:e.target.value}) }


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
                     this.fetchPromotion();
                     this.fetchSection();
                  }



    render(){
    return(
      <div className="content">
   
        <div className="w-75 mx-auto shadow p-5">
        <h2>Creer un groupe</h2>

        <form onSubmit={this.onSubmit}>
  <div className="form-group">
  <input type="text" className="form-control form-control-lg" placeholder=" code groupe" 
  name="codeMatiere"
  value={this.state.codeGroupe}
  onChange={this.onChangeCodeGroupe}

  />
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


 
  <button className="btn btn-primary"  type="submit" name="action">Creer
   
  </button>

</form>
</div>
</div>
    )
}}
export default Addgroupe;