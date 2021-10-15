import React from 'react'
import axios from 'axios'
import DatePicker from "react-date-picker";
import { Link,useParams} from "react-router-dom"

class Editpromotion extends React.Component{

  
  constructor(props) {
    super(props)
   
    // Setting up functions
    this.onChangeCodePromotion = this.onChangeCodePromotion.bind(this);
    this.onChangeLibPromotionFr = this.onChangeLibPromotionFr.bind(this);
    this.onChangeLibPromotionAr = this.onChangeLibPromotionAr.bind(this);
    this.onChangeDebutPromotion = this.onChangeDebutPromotion.bind(this);
    this.onChangeFinPromotion = this.onChangeFinPromotion.bind(this);
    this.onChangeCapacitePromotion = this.onChangeCapacitePromotion.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
        codePromotion:  '',
        libPromotionFr:  '',
        libPromotionAr:  '',
        debutPromotion: new Date(),
        finPromotion:  new Date(),
        capacitePromotion:  '',   
    }
  }
  componentDidMount() { 
    axios.get(`http://localhost/prom/edit/`+this.props.match.params.id)
      .then(res => {
        this.setState({
            codePromotion: res.data.codePromotion,
            libPromotionFr: res.data.libPromotionFr,
            libPromotionAr:res.data.libPromotionAr,
            debutPromotion:res.data.debutPromotion,
            finPromotion:res.data.finPromotion,
            capacitePromotion:res.data.capacitePromotion,
    
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }
  
  
  


onSubmit(e) {
  e.preventDefault()
  
  const studentObject = {
    codePromotion:this.state.codePromotion,
    libPromotionFr:this.state.libPromotionFr,
    libPromotionAr:this.state.libPromotionAr,
    debutPromotion:this.state.debutPromotion,
    finPromotion:this.state.finPromotion,
    capacitePromotion:this.state.capacitePromotion,
  };
  axios.put(`http://localhost/prom/`+this.props.match.params.id, studentObject)
  .then((res) => {
    console.log(res.data)
    console.log(' successfully updated')
  }).catch((error) => {
    console.log(error)
  })

// Redirect to Student List 
this.props.history.push('/admin/specialite')
}
    

onChangeCodePromotion(e){
    this.setState({ codePromotion:e.target.value })
   
  }
  onChangeLibPromotionFr(e){
    this.setState({libPromotionFr:e.target.value})
   
  }
  onChangeLibPromotionAr(e){
    this.setState({libPromotionAr:e.target.value})
   
  } onChangeDebutPromotion(debutPromotion){
    this.setState({debutPromotion:debutPromotion})
   
  } onChangeFinPromotion(finPromotion){
    this.setState({finPromotion:finPromotion})
   
  }
  onChangeCapacitePromotion(e){
    this.setState({capacitePromotion:e.target.value})
  }
    render(){
    return(
      <div className="content">
        <h1>Edit Promotion</h1>
          <div className="w-75 mx-auto shadow p-5">
          <h2>Edit Promotion</h2>
  
          <form onSubmit={this.onSubmit}>
    <div className="form-group">
    <input type="text" className="form-control form-control-lg" placeholder="enter code promotion " 
    name="codeSpecialite"
    value={this.state.codePromotion}
    onChange={this.onChangeCodePromotion}
    />
      </div>
      <div className="form-group">
    <input type="text" className="form-control form-control-lg" placeholder="enter lib promotion "
    name="libSpecialite"
    value={this.state.libPromotionFr}
    onChange={this.onChangeLibPromotionFr}
    />
      </div>
      <div className="form-group">
    <input type="text" className="form-control form-control-lg" placeholder="enter lib promotion Ar "
    name="libSpecialiteAr"
    value={this.state.libPromotionAr}
    onChange={this.onChangeLibPromotionAr}
    />
      </div>
      <div className="form-group">
                          <label>Date debut de formation: </label>
                          <div>
                              <DatePicker className="form-control "
                                  value={this.state.debutPromotion}
                                  onChange={this.onChangeDebutPromotion}
                              />
                          </div>
                      </div>
                      <div className="form-group">
                          <label>Date fin de formation: </label>
                          <div>
                              <DatePicker className="form-control "
                                  value={this.state.finPromotion}
                                  onChange={this.onChangeFinPromotion}
                              />
                          </div>
                      </div>
      <div className="form-group">
    <input type="text" className="form-control form-control-lg" placeholder="capacité "
    name="dureeSpecialite"
    value={this.state.capacitePromotion}
    onChange={this.onChangeCapacitePromotion}
    />
      </div>
  
     
  
   
    <button className="btn btn-primary"  type="submit" name="action">Submit
     
    </button>
  
  </form>
  </div>
  </div>
    )
}}
export default Editpromotion;