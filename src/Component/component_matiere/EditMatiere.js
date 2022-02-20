import React, { Component } from 'react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

class EditMatiere extends Component {

    constructor(props){
        super();
        this.state = {
            codeMatiere:  '' ,
            libMatiere:  '',
            Nbreheures: '',
            seuilMatiere:'',
            niveauMatiere: '' ,
            specialiteMatiere: " " ,
            users:[],
            ErrcodeMatiere:  '' ,
            ErrlibMatiere:  '',
            ErrseuilMatiere:'',
        }
        this.onChangeCodeMatiere = this.onChangeCodeMatiere.bind(this);
    this.onChangeLibMatiere = this.onChangeLibMatiere.bind(this);
    this.onChangeHeursMatiere = this.onChangeHeursMatiere.bind(this);
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
                    Nbreheures: res.data.Nbreheures,
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


            const token = localStorage.getItem("token");
            if (token){
            console.log('ok')
            }
            else{
              this.props.history.push('/');
            }


    }

    onChangeCodeMatiere(e){
        this.setState({ codeMatiere:e.target.value })
  }
  onChangeLibMatiere(e){
        this.setState({libMatiere:e.target.value}) }
        onChangeHeursMatiere(e){
          this.setState({Nbreheures:e.target.value}) }
          onChangeSeuilMatiere(e){
              this.setState({seuilMatiere:e.target.value}) }
              onChangeNiveauMatiere(e){
                  this.setState({niveauMatiere:e.target.value}) }
                  onChangeSpecialiteMatiere(e){
                      this.setState({specialiteMatiere:e.target.value}) }
   
   
   
                      onSubmit(e) {
       
        if(this.state.codeMatiere===''){
            this.state.ErrcodeMatiere='Champs Obligatoire '
           }
           if(this.state.libMatiere===''){
            this.state.ErrlibMatiere='Champs Obligatoire '
           }
           if(this.state.seuilMatiere===''){
            this.state.ErrseuilMatiere='Champs Obligatoire '
           }
           else{
            e.preventDefault();
        const matiere = {
            codeMatiere:this.state.codeMatiere,
            libMatiere:this.state.libMatiere,
            Nbreheures:this.state.Nbreheures,
            seuilMatiere:this.state.seuilMatiere,
            niveauMatiere:this.state.niveauMatiere,
            specialiteMatiere:this.state.specialiteMatiere,
        
        }

        console.log(matiere);

        axios.put(`http://localhost/mat/`+this.props.match.params.id, matiere )
        .then((res) => {
            console.log(res.data)
            console.log(' successfully updated')
            toast.success('Modifier avec success')
          }).catch((error) => {
            console.log(error)
            toast.error("Erreur de Modification ")
          })
        
        // Redirect to Student List 
      ///  this.props.history.push('/module')

       // window.location = "/";
    }}
    
    render() { 
        return ( 
            <div className="content">
                <h3>Modifier Module</h3>
                <ToastContainer/>
        <form onSubmit={this.onSubmit} class="row g-3">

<div className="col-md-6">
<label> Code Module </label>
  <input type="text" className="form-control " placeholder="enter matiere code" 
  name="codeMatiere"
  value={this.state.codeMatiere}
  onChange={this.onChangeCodeMatiere}

  />
  <p class="text-danger">{this.state.ErrcodeMatiere}</p>
    </div>
    <div className="col-md-6">
    <label> Titre du module </label>
  <input type="text" className="form-control " placeholder="enter lib matiere "
  name="libMatiere"
  value={this.state.libMatiere}
  onChange={this.onChangeLibMatiere}
  />
  <p class="text-danger">{this.state.ErrlibMatiere}</p>
    </div>
    <div className="col-md-6">
    <label> Nombre d'heurs du module </label>
  <input type="text" className="form-control" placeholder="enter coif matiere "
  name="coifMatiere"
  value={this.state.Nbreheures}
  onChange={this.onChangeHeursMatiere}
  />
    </div>
    <div className="col-md-6">
    <label> Seuil de réussite en %</label>
  <input type="text" className="form-control " placeholder="enter seuil matiere "
  name="seuilMatiere"
  value={this.state.seuilMatiere}
  onChange={this.onChangeSeuilMatiere}
  />
  <p class="text-danger">{this.state.ErrseuilMatiere}</p>
    </div>
   

    <div className="col-md-6">
    <label> Niveau du module</label>
   
   <select class="form-control"  name="niveauMatiere" value={this.state.niveauMatiere}
   onChange={this.onChangeNiveauMatiere}>
       <option >select niveau</option>

       <option >1er année</option>
       <option >2eme année</option>
   </select>
 
</div>




<div className="col-md-6">
    <label> Specialité du module</label>
   
   <select 
   className="form-control"  value={this.state.specialiteMatiere}
   onChange={this.onChangeSpecialiteMatiere}> 
<option >select specialite</option>
 
{
                                this.state.users.map(function(specialite) {
                                    return <option key={specialite}  >{specialite}</option>;
                                })
                            }
   </select>
 
</div>



 
  <button className="btn btn-primary"  type="submit" name="action">Modifier
   
  </button>

</form>
            </div>
         );
    }
}
 
export default EditMatiere;