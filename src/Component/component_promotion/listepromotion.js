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
     <Link className="btn btn-danger" to='/admin/addpromotion'><i class="fa fa-plus" aria-hidden="true"/> creer une Promotion</Link>


<table className="table">
<thead class="thead-dark">
  <tr>
    <th scope="col">N°</th>
    <th scope="col">code Promotion</th>
    <th scope="col">Promotion</th>
    
    <th scope="col">Action</th>
  </tr>
</thead>
<tbody>
  
  {this.state.users.map((promotion,index)=>(
          <tr key={promotion._id}>
          <th scope="row">{index + 1}</th>
            <td>{promotion.codePromotion}</td>
            <td>{promotion.libPromotionFr}</td>
        

        
    <td>

    <Link className='btn btn-outline-primary mr-2' to={"/admin/editpromotion/"+promotion._id}><i className="fa fa-random" aria-hidden="true"/></Link>
    
    <Link className='btn btn-danger' onClick={(e)=>this.deleteProm(promotion._id)}><i className="fa fa-times" aria-hidden="true"/></Link>

    </td>
  </tr>
 
  ))}
</tbody>
</table>


</div>
  )
}}
export default Listepromotion;