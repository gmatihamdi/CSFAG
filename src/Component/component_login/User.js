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
    password:''
  }}
  componentDidMount(){
    axios.get('http://localhost/api/')
    .then((res)=>{
      this.setState({
      users:res.data,
      id:0,
      name:'',
      email:'',
      password:''
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
  submit(event,id){
    event.preventDefault()
    if(id===0){
      
      axios.post('http://localhost/api',{name:this.state.name,email:this.state.email,password:this.state.password})
      this.componentDidMount()
    }else{
     
      axios.put(`http://localhost/api/${id}`,{name:this.state.name,email:this.state.email,password:this.state.password})
      this.componentDidMount()
    }
   
  }
  delete(id){
    axios.delete(`http://localhost/api/${id}`).then(()=>{
      this.componentDidMount()
    })
  }
  edit(id){
    axios.get(`http://localhost/api/${id}`)
    .then((res)=>{
      console.log(res.data) 
    this.setState({
        name:res.data.name,
        email:res.data.eamil,
        password:res.data.password


      })
    })
  }
  render(){
  return (
    <div className="content">
    
    <div className="w-45 mx-auto shadow p-2">
    <div className="form-group">
    
<form onSubmit={(e)=>this.submit(e,this.state.id)}>
<div className="form-group">
          
          <input value={this.state.name} 
          placeholder="name"
          onChange={(e)=>this.namechange(e)} type="text" id="autocomplete-input" className="form-control form-control-lg" /> 
        </div>
        <div className="form-group">
 <input value={this.state.email} 
          placeholder="email"
          onChange={(e)=>this.emailchange(e)} type="email" id="autocomplete-input" className="form-control form-control-lg" />
</div>
        <div className="form-group">
  <input value={this.state.password} 
          placeholder="pwd"
          onChange={(e)=>this.passwordchange(e)} type="password" id="autocomplete-input" className="form-control form-control-lg" />
          
        </div>
        <button className="btn btn-primary" type="submit" name="action">Enregistrer
  
  </button>

</form>
     
     </div></div>
     <div className="col s6">

     <table className="table">
<thead class="thead-dark">
          <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Modifier</th>
              <th>supprimer</th>

          </tr>
        </thead>

        <tbody>
        {this.state.users.map(client=>
          <tr key={client._id}>
            <td>{client.name}</td>
            <td>{client.email}</td>
            <td>{client.password}</td>
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
