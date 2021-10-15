import React from 'react'
import axios from 'axios'
import { Link,useParams} from "react-router-dom"

class Editspecialite extends React.Component{

  
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
  
  componentDidMount() {
    
    axios.get(`http://localhost/spc/edit/`+this.props.match.params.id)
      .then(res => {
        this.setState({
            codeSpecialite: res.data.codeSpecialite,
            libSpecialite: res.data.libSpecialite,
            libSpecialiteAr:res.data.libSpecialiteAr,
            typeSpecialite:res.data.typeSpecialite,
            dureeSpecialite:res.data.dureeSpecialite,
            diplomeSpecialite:res.data.diplomeSpecialite,
    
        });
      })
      .catch((error) => {
        console.log(error);
      })
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
  axios.put(`http://localhost/spc/`+this.props.match.params.id, studentObject)
  .then((res) => {
    console.log(res.data)
    console.log(' successfully updated')
  }).catch((error) => {
    console.log(error)
  })

// Redirect to Student List 
this.props.history.push('/specialite')
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
        <h2>Modifier une  specialités</h2>

        <form onSubmit={this.onSubmit}>
  <div className="form-group">
  <input type="text" className="form-control form-control-lg"  
  name="codeSpecialite"
  value={this.state.codeSpecialite}
  onChange={this.onChangeCodeSpecialite}
  />
    </div>
    <div className="form-group">
  <input type="text" className="form-control form-control-lg" 
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
export default Editspecialite;