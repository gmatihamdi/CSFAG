import React from 'react'
import axios from 'axios'
class AddModule extends React.Component{
  constructor(props) {
    super(props)
  // Setting up functions
    this.onChangeCodeModule = this.onChangeCodeModule.bind(this);
    this.onChangeLibModule = this.onChangeLibModule.bind(this);
    this.onChangeCoifModule = this.onChangeCoifModule.bind(this);
    this.onChangeSeuilModule = this.onChangeLibModule.bind(this);
    this.onChangeNiveauModule = this.onChangeNiveauModule.bind(this);
  this.onSubmit = this.onSubmit.bind(this);
    // Setting up state
    this.state = {
      codeModule: '',
      libModule: '',
      coifModule:'',
    seuilModule:'',
    niveauModule:''
    }
  }
onSubmit(e) {
  e.preventDefault()
 const studentObject = {
    codeModule:this.state.codeModule,
    libModule:this.state.libModule,
    coifModule:this.state.coifModule,
    seuilModule:this.state.seuilModule,
    niveauModule:this.state.niveauModule
  };
        axios.post('http://localhost/md',studentObject).then(res => console.log(res.data));

        this.setState({     codeModule: '',
        libModule: '',
        coifModule:'',
      seuilModule:'',
      niveauModule:''})    
        //this.componentDidMount();
       console.log(studentObject)
       
      }
 onChangeCodeModule(e){ this.setState({ codeModule:e.target.value }) }
    onChangeLibModule(e){ this.setState({libModule:e.target.value}) }
    onChangeCoifModule(e){ this.setState({coifModule:e.target.value}) }
    onChangeSeuilModule(e){ this.setState({seuilModule:e.target.value}) }
    onChangeNiveauModule(e){ this.setState({niveauModule:e.target.value}) }
   render(){
    return(



      <div className="container">
      <h1>Specialités</h1>
        <div className="w-75 mx-auto shadow p-5">
        <h2>Ajoute une Nouvelle module</h2>

        <form onSubmit={this.onSubmit}>
  <div className="form-group">
  <input type="text" className="form-control form-control-lg" placeholder="enter module code" 
  name="codeModule"
  value={this.state.codeModule}
  onChange={this.onChangeCodeModule}
  />
    </div>
    <div className="form-group">
  <input type="text" className="form-control form-control-lg" placeholder="enter lib module "
  name="libSpecialite"
  value={this.state.libModule}
  onChange={this.onChangeLibModule}
  />
    </div>

 
  <button className="btn btn-primary"  type="submit" name="action">creer
   
  </button>

</form>
</div>
</div>
    )
}}
export default AddModule;