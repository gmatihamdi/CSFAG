import React from 'react'
import axios from 'axios'
import { Link} from "react-router-dom"
import DatePicker from "react-date-picker";
class Listepromotion extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      users:[],
      id:0,
      codePromotion:  '',
       libPromotionFr:  '',
       libPromotionAr:  '',
       debutPromotion: new Date(),
       finPromotion:  new Date(),
       capacitePromotion:  '', 
     
    }}
  
  componentDidMount(){
    axios.get('http://localhost/prom')
    .then((res)=>{
      this.setState({
      users:res.data,
     
    })
   

    })
  }

  deleteProm(id) {
    axios.delete(`http://localhost/prom/${id}`)
        .then((res) => {
            console.log(' successfully deleted!')
        }).catch((error) => {
            console.log(error)
        })
        this.props.history.push('/specialite')
}

  render(){
  return( 
    <div className="content">
     <table><tr>
     <td></td> <td>    </td><td>     </td><td><Link className="btn btn-danger" to='/admin/addpromotion'>Ajouter une Promotion</Link>
</td>

   </tr>
</table>
<table className="table">
<thead class="thead-dark">
  <tr>
    <th scope="col">#</th>
    <th scope="col">code specialité</th>
    <th scope="col">specialité</th>
    <th scope="col">نمط التكوين</th>
    <th scope="col">مدة التكوين</th>
    <th scope="col">parametres</th>
  </tr>
</thead>
<tbody>
  
  {this.state.users.map((promotion,index)=>(
          <tr key={promotion._id}>
          <th scope="row">{index + 1}</th>
            <td>{promotion.codePromotion}</td>
            <td>{promotion.libPromotionFr}</td>
            <td>{promotion.debutPromotion}</td>
            <td>{promotion.finPromotion}</td>

        
    <td>
    <Link className='btn btn-primary mr-2'>View</Link>
    <Link className='btn btn-outline-primary mr-2' to={"/admin/editpromotion/"+promotion._id}>Edit</Link>
    
    <Link className='btn btn-danger' onClick={(e)=>this.deleteProm(promotion._id)}>Delete</Link>

    </td>
  </tr>
 
  ))}
</tbody>
</table>


</div>
  )
}}
export default Listepromotion;