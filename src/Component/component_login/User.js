import React from 'react';
import axios from 'axios';
import { Link} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
class User extends React.Component {
  constructor(props){
  super(props);
  this.state ={
    users:[],
    iduser:'',
    name:'',
    email:'',
    password:'',
    role:''
  }}


  componentDidMount(){

    const token = localStorage.getItem("token");
    const roleuse = localStorage.getItem("roleuser");

    
    if (token){
if(roleuse==='Admin'){
  console.log('ok')

}
else{
  this.props.history.push('/admin/erreur');
}
    
    }
    else{
      this.props.history.push('/');
    }





    axios.get('http://localhost/api/')
    .then((res)=>{
      this.setState({
      users:res.data,
    
    })
   

    })
  }
  
  namechange= event =>{
    this.setState({
      name:event.target.value
    })
   
  }
  emailchange= event =>{
    this.setState({
      email:event.target.value
    })
   
  }
  passwordchange= event =>{
    this.setState({
      password:event.target.value
    })
   
  }
  rolechange= event =>{
    this.setState({
      role:event.target.value
    })
   
  }



  submit(event){
    event.preventDefault()

   
    const utilisateur = {
    
      name:this.state.name,
      email:this.state.email,
      password:this.state.password,
      role:this.state.role
    };

    console.log(utilisateur)
    console.log('id user')
    console.log(this.props.match.params.id)
    console.log(this.state.iduser) 
    if(this.state.iduser===''){
      
      axios.post('http://localhost/api',utilisateur).then(res => 
      toast.success('insertion avec success')
    ).catch(err => {toast.error("Erreur d'insertion ")}) 
    
    }else{
     
      axios.put(`http://localhost/api/${this.state.iduser}`,utilisateur).then(res => 
      toast.success('Modification avec success')
    ).catch(err => {toast.error("Erreur de modification ")}) 
     
    }
   
  }
  delete(id){
    axios.delete(`http://localhost/api/${id}`).then(res => 
    toast.success('suppression avec success')
  ).catch(err => {toast.error("Erreur de suppression ")}) 
  }
  edit(id){


    axios.get(`http://localhost/api/edit/${id}`)
    .then((res)=>{
      console.log(res.data) 
      console.log(id) 

    this.setState({
      iduser:res.data._id,
        name:res.data.name,
        email:res.data.email,
        password:res.data.password,
        role:res.data.role


      })
    }) .catch(function (error){
      console.log(error);
      
  })

  this.componentDidMount();
}
  


 
  render(){
  return (
    <div className="content">
    <ToastContainer/>
    <div className="w-45 mx-auto shadow p-2">
    <div className="form-group">
    
<form onSubmit={(e)=>this.submit(e)}>
<div className="col-md-6"> 
 <label for="inputEmail4" class="form-label"> login </label>
          
          <input value={this.state.name} 
          placeholder="name"
          onChange={(e)=>this.namechange(e)} type="text" id="autocomplete-input" className="form-control form-control-lg" /> 
        </div>
        <div className="col-md-6"> 
 <label for="inputEmail4" class="form-label"> Nom et prénom </label>
 <input value={this.state.email} 
          placeholder="Nom et prénom"
          onChange={(e)=>this.emailchange(e)} type="text" id="autocomplete-input" className="form-control form-control-lg" />
</div>
       <div className="col-md-6"> 
 <label for="inputEmail4" class="form-label"> Password </label>
  <input value={this.state.password} 
          placeholder="pwd"
          onChange={(e)=>this.passwordchange(e)} type="password" id="autocomplete-input" className="form-control form-control-lg" />
          
        </div>


        <div className="col-md-6"> 
 <label for="inputEmail4" class="form-label"> Rôle </label>
   
   <select class="form-control"  name="role" value={this.state.role}
   onChange={(e)=>this.rolechange(e)} >
   <option >Rôle</option>
       <option >Admin</option>
       <option >gestionnaire</option>
       
   </select>
 
</div>







        <button className="btn btn-primary" type="submit" name="action">Enregistrer
  
  </button>

</form>

     
     </div></div>


     <div className="col s6">

     <table className="table">
<thead class="thead-dark">
          <tr>
              
              <th>Utilisateurs</th>
              <th>Role</th>
              <th>Modifier</th>
              <th>supprimer</th>

          </tr>
        </thead>

        <tbody>
        {this.state.users.map(client=>
          <tr key={client._id}>
            <td>{client.email}</td>
            <td>{client.role}</td>
            <td> <button onClick={(e)=>this.edit(client._id)}  className="btn btn-outline-primary mr-2 " type="submit" name="action">
    <i className="edit-link">Modifier</i>
  </button></td>
  <td> 

  <Link className='btn btn-danger' onClick={(e) => { if (window.confirm('Etes vous sur de vouloir supprimer cet element?')) this.delete(client._id) }}><i className="fa fa-times" aria-hidden="true"/>
</Link>
</td>


          </tr>
         
          )}
        </tbody>
      </table>


     </div>
    </div>
  );
}}

export default User;
