import React from 'react';
import axios from 'axios'
class User extends React.Component {
  constructor(props){
  super(props);
  this.state ={
    users:[],
    id:0,
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
  this.props.history.push('/admin');
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
  submit(event,id){
    event.preventDefault()

   
    const utilisateur = {
    
      name:this.state.name,
      email:this.state.email,
      password:this.state.password,
      role:this.state.role
    };

    console.log(utilisateur)


    if(id===0){
      
      axios.post('http://localhost/api',utilisateur)
      this.componentDidMount()
    }else{
     
      axios.put(`http://localhost/api/${id}`,utilisateur)
      this.componentDidMount()
    }
   
  }
  delete(id){
    axios.delete(`http://localhost/api/${id}`).then(()=>{
      this.componentDidMount()
    })
  }
  edit(id){
    axios.get(`http://localhost/api/edit/${id}`)
    .then((res)=>{
      console.log(res.data) 
      console.log(id) 

    this.setState({
        name:res.data.name,
        email:res.data.email,
        password:res.data.password,
        role:res.data.role


      })
    }) .catch(function (error){
      console.log(error);
      
  })
  }
  render(){
  return (
    <div className="content">
    
    <div className="w-45 mx-auto shadow p-2">
    <div className="form-group">
    
<form onSubmit={(e)=>this.submit(e,this.state.id)}>
<div className="col-md-6"> 
 <label for="inputEmail4" class="form-label"> login </label>
          
          <input value={this.state.name} 
          placeholder="name"
          onChange={(e)=>this.namechange(e)} type="text" id="autocomplete-input" className="form-control form-control-lg" /> 
        </div>
        <div className="col-md-6"> 
 <label for="inputEmail4" class="form-label"> Nom et prénom </label>
 <input value={this.state.email} 
          placeholder="email"
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
  <td> <button onClick={(e)=>this.delete(client._id)} className="btn btn-danger" type="submit" name="action">
    <i className="edit-link">supprimer</i>
  </button></td>
          </tr>
         
          )}
        </tbody>
      </table>


     </div>
    </div>
  );
}}

export default User;
