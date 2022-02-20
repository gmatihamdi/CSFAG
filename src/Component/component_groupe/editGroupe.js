import React from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
class EditGroupe extends React.Component{

  
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
  axios.put('http://localhost/groupe/'+this.props.match.params.id, studentObject)
  .then((res) => {
    console.log(res.data)
    console.log(' successfully updated')
    toast.success('Modifier avec success')
  }).catch((error) => {
    console.log(error)
    toast.error("Erreur de Modification ")
  }) 
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
                    

                      findsectionClick() {
                        const a = { x: this.state.codePromotion }
                        axios.post(`http://localhost/methode/getsection`, a)
                          .then((res) => {
                            this.setState({
                              listeSection: res.data,
                            })
                            console.log("resultat de recherche");
                            console.log(res.data)
                          })
                          // Catch any errors we hit and update the app
                          .catch(error => this.setState({ error, isLoading: false }));
                      }

           componentDidMount() {

            axios.get(`http://localhost/groupe/edit/`+this.props.match.params.id)
            .then(res => {
              this.setState({
                codeGroupe: res.data.codeGroupe,
                codePromotion: res.data.codePromotion,
                codeSection:res.data.codeSection,
          
              });
            })
            .catch((error) => {
              console.log(error);
            })






                     this.fetchPromotion();
                     this.findsectionClick();

                     const token = localStorage.getItem("token");
                     if (token){
                     console.log('ok')
                     }
                     else{
                       this.props.history.push('/');
                     }

                  }






    render(){
    return(
      <div className="content">
     <ToastContainer />
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
   className="form-control"  value={this.state.codePromotion}
   onChange={this.onChangeCodePromotion}
   onClick={() => this.findsectionClick()}> 
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




 
  <button className="btn btn-primary"  type="submit" name="action">Modifier
   
  </button>

</form>
</div>
</div>
    )
}}
export default EditGroupe;