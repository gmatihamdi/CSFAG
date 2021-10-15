import React from 'react'
import axios from 'axios'
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
      diplomeSpecialite:''
      
    }
  }
  
  
  
  


onSubmit(e) {
  e.preventDefault()

  const studentObject = {
    codeSpecialite:this.state.codeSpecialite,
    libSpecialite:this.state.libSpecialite,
    libSpecialiteAr:this.state.libSpecialiteAr,
    typeSpecialite:this.state.typeSpecialite,
    dureeSpecialite:this.state.dureeSpecialite,
    diplomeSpecialite:this.state.diplomeSpecialite,

  };
        axios.post('http://localhost/spc',studentObject).then(res => console.log(res.data));

        this.setState({ codeSpecialite: '', libSpecialite: ''})
      
        //this.componentDidMount();
      //  console.log(" successfully insert")
      
         
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



      <div className="container">
      <h1>Specialités</h1>
        <div className="w-75 mx-auto shadow p-5">
        <h2>Ajoute une Nouvelle specialités</h2>

        <form onSubmit={this.onSubmit}>
  <div className="form-group">
  <input type="text" className="form-control form-control-lg" placeholder="enter specialité code" 
  name="codeSpecialite"
  value={this.state.codeSpecialite}
  onChange={this.onChangeCodeSpecialite}
  />
    </div>
    <div className="form-group">
  <input type="text" className="form-control form-control-lg" placeholder="enter lib specialité "
  name="libSpecialite"
  value={this.state.libSpecialite}
  onChange={this.onChangeLibSpecialite}
  />
    </div>
    <div className="form-group">
  <input type="text" className="form-control form-control-lg" placeholder="enter lib specialité Ar "
  name="libSpecialiteAr"
  value={this.state.libSpecialiteAr}
  onChange={this.onChangeLibSpecialiteAr}
  />
    </div>
    <div className="form-group"> 
   
   <select class="form-control"  name="niveauMatiere" value={this.state.typeSpecialite}
   onChange={this.onChangeTypeSpecialite}>
       <option >select Type</option>

       <option >بالتداول</option>
       <option > عن بعد</option>
   </select>
 
</div>
    <div className="form-group">
  <input type="text" className="form-control form-control-lg" placeholder="duree "
  name="dureeSpecialite"
  value={this.state.dureeSpecialite}
  onChange={this.onChangeDureeSpecialite}
  />
    </div>

    <div className="form-group"> 
   
   <select class="form-control"  name="niveauMatiere" value={this.state.diplomeSpecialite}
   onChange={this.onChangeDiplomeSpecialite}>
       <option >select DIPLOME</option>

       <option >مؤهل التقني المهني </option>
       <option > BTS</option>
   </select>
 
</div>

 
  <button className="btn btn-primary"  type="submit" name="action">Submit
   
  </button>

</form>
</div>
</div>
    )
}}
export default Ajoutspecialite;