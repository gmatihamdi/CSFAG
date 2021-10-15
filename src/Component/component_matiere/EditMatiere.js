import React, { Component } from 'react';
import axios from "axios";


class EditMatiere extends Component {

    constructor(props){
        super();
        this.state = {
            codeMatiere:  '' ,
            libMatiere:  '',
            coifMatiere: '',
            seuilMatiere:'',
            niveauMatiere: '' ,
            specialiteMatiere: " " ,
            users:[]
        }
        this.onChangeCodeMatiere = this.onChangeCodeMatiere.bind(this);
    this.onChangeLibMatiere = this.onChangeLibMatiere.bind(this);
    this.onChangeCoifMatiere = this.onChangeCoifMatiere.bind(this);
    this.onChangeSeuilMatiere = this.onChangeSeuilMatiere.bind(this);
    this.onChangeNiveauMatiere = this.onChangeNiveauMatiere.bind(this);
    this.onChangeSpecialiteMatiere = this.onChangeSpecialiteMatiere.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        axios.get(`http://localhost/mat/edit/`+this.props.match.params.id)
            .then(res => {
                this.setState({
                    codeMatiere: res.data.codeMatiere,
                    libMatiere: res.data.libMatiere,
                    coifMatiere: res.data.coifMatiere,
                    seuilMatiere: res.data.seuilMatiere,
                    niveauMatiere: res.data.niveauMatiere,
                    specialiteMatiere: res.data.specialiteMatiere,

                    
                })
            })
            .catch(function (error){
                console.log(error);
            })

        axios.get(`http://localhost/spc`)
            .then(response => {
                if(response.data.length > 0) {
                    this.setState({ 
                        users: response.data.map(specialite => specialite.libSpecialite),
                    });
                }
            })
    }

    onChangeCodeMatiere(e){
        this.setState({ codeMatiere:e.target.value })
  }
  onChangeLibMatiere(e){
        this.setState({libMatiere:e.target.value}) }
        onChangeCoifMatiere(e){
          this.setState({coifMatiere:e.target.value}) }
          onChangeSeuilMatiere(e){
              this.setState({seuilMatiere:e.target.value}) }
              onChangeNiveauMatiere(e){
                  this.setState({niveauMatiere:e.target.value}) }
                  onChangeSpecialiteMatiere(e){
                      this.setState({specialiteMatiere:e.target.value}) }
   
   
   
                      onSubmit(e) {
        e.preventDefault();
        const matiere = {
            codeMatiere:this.state.codeMatiere,
            libMatiere:this.state.libMatiere,
            coifMatiere:this.state.coifMatiere,
            seuilMatiere:this.state.seuilMatiere,
            niveauMatiere:this.state.niveauMatiere,
            specialiteMatiere:this.state.specialiteMatiere,
        
        }

        console.log(matiere);

        axios.put(`http://localhost/mat/`+this.props.match.params.id, matiere )
        .then((res) => {
            console.log(res.data)
            console.log(' successfully updated')
          }).catch((error) => {
            console.log(error)
          })
        
        // Redirect to Student List 
        this.props.history.push('/module')

       // window.location = "/";
    }
    
    render() { 
        return ( 
            <div className="content">
                <h3>Edit Exercise Log</h3>
                <form onSubmit={this.onSubmit}>

                <div className="form-group">
  <input type="text" className="form-control form-control-lg" 
  name="codeMatiere"
  value={this.state.codeMatiere}
  onChange={this.onChangeCodeMatiere}

  />
    </div>
    <div className="form-group">
  <input type="text" className="form-control form-control-lg"
  name="libMatiere"
  value={this.state.libMatiere}
  onChange={this.onChangeLibMatiere}
  />
    </div>
    <div className="form-group">
  <input type="text" className="form-control form-control-lg" 
  name="coifMatiere"
  value={this.state.coifMatiere}
  onChange={this.onChangeCoifMatiere}
  />
    </div>
    <div className="form-group">
  <input type="text" className="form-control form-control-lg" 
  name="seuilMatiere"
  value={this.state.seuilMatiere}
  onChange={this.onChangeSeuilMatiere}
  />
    </div>
   

    <div className="form-group">
   
   <select class="form-control"  name="niveauMatiere" value={this.state.niveauMatiere}
   onChange={this.onChangeNiveauMatiere}>
       <option >select niveau</option>

       <option >1er année</option>
       <option >2eme année</option>
   </select>
 
</div>




    <div className="form-group">
   
   <select 
   className="form-control"  value={this.state.specialiteMatiere}
   onChange={this.onChangeSpecialiteMatiere}> 
<option >select specialite</option>
 
{
                                this.state.users.map(function(specialite) {
                                    return <option key={specialite} value={specialite}  >{specialite}</option>;
                                })
                            }
   </select>
 
</div>
       <div className="form-group">
                        <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
         );
    }
}
 
export default EditMatiere;