import React from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
class Ajoutspecialite extends React.Component{

 
  constructor(props) {
    super(props)
    // Setting up functions
    this.onChangeCodeSpecialite = this.onChangeCodeSpecialite.bind(this);
    this.onChangeLibSpecialite = this.onChangeLibSpecialite.bind(this);
    this.onChangeLibSpecialiteAr = this.onChangeLibSpecialiteAr.bind(this);
    this.onChangeTypeSpecialite = this.onChangeTypeSpecialite.bind(this);
    this.onChangeDureeSpecialite = this.onChangeDureeSpecialite.bind(this);
    this.onChangeDiplomeSpecialite = this.onChangeDiplomeSpecialite.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      codeSpecialite: '',
      libSpecialite: '',
      libSpecialiteAr:  '',
      typeSpecialite:  '',
      dureeSpecialite: '',
      diplomeSpecialite:'',
      Errcodespc:'',
      Errlibspcfr:'',
      ErrlibspcAr:'', 
    }
  }
  
  
onSubmit(e) {
  e.preventDefault()

  if(this.state.codeSpecialite===''){
    this.state.Errcodespc='Champs Obligatoire '
   }
   if(this.state.libSpecialite===''){
    this.state.Errlibspcfr='Champs Obligatoire '
   }
   if(this.state.libSpecialiteAr===''){
    this.state.ErrlibspcAr='Champs Obligatoire '
   }
   else{

  const studentObject = {
    codeSpecialite:this.state.codeSpecialite,
    libSpecialite:this.state.libSpecialite,
    libSpecialiteAr:this.state.libSpecialiteAr,
    typeSpecialite:this.state.typeSpecialite,
    dureeSpecialite:this.state.dureeSpecialite,
    diplomeSpecialite:this.state.diplomeSpecialite,

  };
        axios.post('http://localhost/spc',studentObject).then(res => 
        toast.success('insertion avec success')
      ).catch(err => {toast.error("Erreur d'insertion ")}) 

      //  this.setState({ codeSpecialite: '', libSpecialite: ''})
      
        //this.componentDidMount();
      //  console.log(" successfully insert")
      
}
      }
    

      onChangeCodeSpecialite(e){
      this.setState({ codeSpecialite:e.target.value })
     
    }
    onChangeLibSpecialite(e){
      this.setState({libSpecialite:e.target.value})
     
    }
    onChangeLibSpecialiteAr(e){
      this.setState({libSpecialiteAr:e.target.value})
     
    } onChangeTypeSpecialite(e){
      this.setState({typeSpecialite:e.target.value})
     
    } onChangeDureeSpecialite(e){
      this.setState({dureeSpecialite:e.target.value})
     
    }
    onChangeDiplomeSpecialite(e){
      this.setState({diplomeSpecialite:e.target.value})
     
    }

    render(){
    return(
      <div className="content" >
        <div>
        <h2>Ajoute une Nouvelle specialités</h2>
        <ToastContainer/>
  <form onSubmit={this.onSubmit} class="row g-3">
  <div className="col-md-6">
  <label for="inputEmail4" class="form-label">Code Specialité</label>
  <input type="text" className="form-control " placeholder="enter specialité code" 
  name="codeSpecialite"
  value={this.state.codeSpecialite}
  onChange={this.onChangeCodeSpecialite}
  />
   <p class="text-danger">{this.state.Errcodespc}</p>
    </div>
    <div className="col-md-6">
    <label for="inputEmail4" class="form-label"> Specialité Fr</label>
  <input type="text" className="form-control " placeholder="enter lib specialité "
  name="libSpecialite"
  value={this.state.libSpecialite}
  onChange={this.onChangeLibSpecialite}
  />
   <p class="text-danger">{this.state.Errlibspcfr}</p>
    </div>
    <div className="col-md-6">
    <label for="inputEmail4" class="form-label"> Specialité Ar</label>
  <input type="text" className="form-control " placeholder="enter lib specialité Ar "
  name="libSpecialiteAr"
  value={this.state.libSpecialiteAr}
  onChange={this.onChangeLibSpecialiteAr}
  />
   <p class="text-danger">{this.state.ErrlibspcAr}</p>
    </div>
    <div className="col-md-6"> 
    <label for="inputEmail4" class="form-label"> Nature de Formation </label>
   <select class="form-control"  name="niveauMatiere" value={this.state.typeSpecialite}
   onChange={this.onChangeTypeSpecialite}>
       <option >Choix </option>
       
       <option >بالتداول</option>
       <option > عن بعد</option>
       <option >  دروس مسائية</option>

   </select>
 
</div>
    <div className="col-md-6">
    <label for="inputEmail4" class="form-label"> Duree de Formation </label>
  <input type="text" className="form-control " placeholder="duree "
  name="dureeSpecialite" 
  value={this.state.dureeSpecialite}
  onChange={this.onChangeDureeSpecialite}
  />
    </div>

    <div className="col-md-6"> 
    <label for="inputEmail4" class="form-label"> Diplome de Formation </label>
   <select class="form-control"  name="niveauMatiere" value={this.state.diplomeSpecialite}
   onChange={this.onChangeDiplomeSpecialite}>
       <option >Choix</option>

       <option >مؤهل التقني السامي</option>
       <option > مؤهل التقني المهني  منظرة في المستوى</option>
   </select>
 
</div>

 
  <button className="btn btn-primary"  type="submit" name="action">Enregistrer
   
  </button>

</form>
</div>
</div>
    )
}}
export default Ajoutspecialite;