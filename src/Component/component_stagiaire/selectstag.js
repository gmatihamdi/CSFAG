import React from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import { BsPersonPlusFill } from "react-icons/bs";
import { FcPrint } from "react-icons/fc";
import { Dropdown } from 'react-bootstrap';
import { Modal, Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import { ReactDialogBox } from 'react-js-dialog-box'
import 'react-js-dialog-box/dist/index.css'
class SelectStag extends React.Component {
  constructor(props) {
    super()
    this.state = {
      isOpen: false,
      cinStagiaire: '',
      nomStagiaireFr: '',
      nomStagiaireAr: '',
      datenaissanceStag: '',
      adressStagiaire: '',
      codeSection: '',
      etatdossier: '',
      niveauScolaire: '',
      emailstagiaire: '',
      specialiteStagiaire: '',
      groupeStagiaire: '',
      listeSection: [],
      Groupe: [],
      liststag: [],
      idpromotion: '',
      Listepromo: [],
      listgroupsection: [],
      groupeStagiaire: '',
      idstagiaire:'',
      show:false
    }
    this.onChangeCodeSection = this.onChangeCodeSection.bind(this);
    this.onChangeEtatdossier = this.onChangeEtatdossier.bind(this);
    this.onChangeIdpromotion = this.onChangeIdpromotion.bind(this);
    this.onChangeGroupeStagiaire = this.onChangeGroupeStagiaire.bind(this);
   

  }

  openBox = () => {
    this.setState({
      isOpen: true
    })
  }

  closeBox = () => {
    this.setState({
      isOpen: false
    })
  }


  handleClick() {
    const a = {
      x: this.state.codeSection,
      y: this.state.etatdossier,

    }
    axios.post(`http://localhost/filtre/filtrestagiaretat`, a)
      .then((res) => {
        this.setState({
          liststag: res.data,
        })
        console.log("resultat de recherche");
        console.log(res.data)
      })
      // Catch any errors we hit and update the app
      .catch(error => this.setState({ error, isLoading: false }));
    console.log(this.state.liststag)


  }

  handelModal(){
    this.setState({show:!this.state.show})
  }


  componentDidMount() {
    this.handleClick();
    this.findsectionClick();
    this.listepromo();
    this.findgroupClick();
    const token = localStorage.getItem("token");
if (token){
console.log('ok')
}
else{
  this.props.history.push('/');
}

  }

  deleteSpc(id) {
    axios.delete(`http://localhost/stag/${id}`)
      .then((res) => {
        console.log(' successfully deleted!')
      }).catch((error) => {
        console.log(error)
      })
    //  this.props.history.push('/stagiare')
  }
  EditetatStag(id) {

    const stagiaire = {


      etatdossier: 'Refuser',

    }

    axios.put(`http://localhost/stag/${id}`, stagiaire)
      .then((res) => {
        console.log(' successfully update!')
        toast.success('update avec success')
      }).catch((error) => {
        console.log(error)
        toast.error("Erreur  ")
      })
    //  this.props.history.push('/stagiare')
  }

  AcceptStag(id) {

    const stagiaire = {


      etatdossier: 'Accepter',
      groupeStagiaire: this.state.groupeStagiaire,

    }

    axios.put(`http://localhost/stag/${id}`, stagiaire)
      .then((res) => {
        console.log(' successfully update!')
        toast.success('update avec success')
      }).catch((error) => {
        console.log(error)
        toast.error("Erreur  ")
      })
    //  this.props.history.push('/stagiare')
  }



  findsectionClick() {
    const a = { x: this.state.idpromotion }
    axios.post(`http://localhost/methode/getsection`, a)
      .then((res) => {
        this.setState({
          listeSection: res.data,
        })
        console.log("resultat de recherche");
        console.log(res.data)
      })
      // Catch any errors we hit and update the app
      .catch(error => this.setState({ error, isLoading: false }));
  }



  listepromo() {
    axios.get('http://localhost/prom')
      .then((res) => {
        this.setState({
          Listepromo: res.data,

        })

      })
  }

  findgroupClick() {
    const a = { x: this.state.codeSection }
    axios.post(`http://localhost/methode/getgroup`, a)
      .then((res) => {
        this.setState({
          listgroupsection: res.data,
        })
        console.log("resultat de recherche");
        console.log(res.data)
      })
      // Catch any errors we hit and update the app
      .catch(error => this.setState({ error, isLoading: false }));
  }



  onChangeCodeSection(e) {
    this.setState({ codeSection: e.target.value })
  } onChangeEtatdossier(e) {
    this.setState({ etatdossier: e.target.value })
  }
  onChangeIdpromotion(e) {
    this.setState({ idpromotion: e.target.value })
  }
  onChangeGroupeStagiaire(e) {
    this.setState({ groupeStagiaire: e.target.value })
  }


  showbox(id){
this.state.idstagiaire=id;
return this.state.idstagiaire
//console.log(this.state.idstagiaire)
  }

  updateAccept(){

//this.showbox()
this.AcceptStag(this.state.idstagiaire);
console.log(this.state.idstagiaire)
  }





  render() {
    return (


      <div className="content">
        <ToastContainer />
        <Link className="btn btn-danger" to='/admin/addstagiaire'>  <i class="fa fa-user-plus" aria-hidden="true">
          Ajouter Candidat  </i></Link>
        <form className="row g-3">
          <div class="col-auto">

            <select class="form-control" name="grouprselect" value={this.state.idpromotion}
              onChange={this.onChangeIdpromotion}
              onClick={() => this.findsectionClick()} >

              <option >Selectionner une Promotion</option>

              {
                this.state.Listepromo.map(function (promotion) {
                  return <option value={promotion._id}  >{promotion.libPromotionFr}</option>;
                })
              }
            </select>
          </div>




          <div class="col-auto">
            <select
              class="form-control"
              value={this.state.codeSection}
              onChange={this.onChangeCodeSection}
              onClick={() => this.findgroupClick()}>
              <option >Choisir une section</option>

              {
                this.state.listeSection.map(function (section) {
                  return <option value={section._id}  >{section.libSection}</option>;
                })
              }
            </select>
          </div>
          <div class="col-auto">
            <select class="form-control" name="niveauMatiere" value={this.state.etatdossier}
              onChange={this.onChangeEtatdossier}>
              <option >Etat</option>

              <option >Accepter</option>
              <option >Refuser</option>
              <option >En attente</option>
              <option >Diplômé</option>
              <option ></option>


            </select>

          </div>
          <Link className='btn btn-danger' onClick={() => this.handleClick()}><i className="nc-icon nc-zoom-split" /></Link>



        </form>


        <table id="dtBasicExample" className="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">CIN</th>
              <th scope="col">Nom&Prénom</th>
              <th scope="col"> الاسم و اللقب </th>

              <th scope="col">      </th>
            </tr>
          </thead>
          <tbody>
            {this.state.liststag.map((stagiare, index) => (
              <tr key={stagiare._id}>
                <th scope="row">{index + 1}</th>
                <td>{stagiare.cinStagiaire}</td>
                <td>{stagiare.nomStagiaireFr}</td>
                <td>{stagiare.nomStagiaireAr}</td>

                <td>

                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      Etat
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item >  <Link to={"/admin/editStagiaire/" + stagiare._id}>Editer</Link></Dropdown.Item>
                      <Dropdown.Item > <Link  onClick={this.showbox(stagiare._id) ,this.openBox}> Accepter
                      </Link></Dropdown.Item>

                      <Dropdown.Item > <Link onClick={(e) => { if (window.confirm(
                      "Etes vous sur de refuser cet candidature?" )) this.EditetatStag(stagiare._id) }}>
                        Refuser
                      </Link> </Dropdown.Item>
                      <Dropdown.Item >
                      <Link onClick={()=>{this.handelModal()}}
                     //  onClick={(e) => { if (window.confirm('Etes vous sur de vouloir supprimer cet element?')) this.deleteSpc(stagiare._id) }}
                       
                       >
                   Supprimer
                  </Link>

                  <Modal show={this.state.show}>

<Modal.Header >

  <Modal.Title>Alert</Modal.Title>

</Modal.Header>

<Modal.Body>

Etes vous sur de vouloir supprimer cet element?

</Modal.Body>

<Modal.Footer>
<Button variant="danger"  onClick={()=>{this.deleteSpc(stagiare._id)}}>OUI</Button>
  <Button variant="secondary"  onClick={()=>{this.handelModal()}}>fermer</Button>

</Modal.Footer>

</Modal>



                      </Dropdown.Item>

                   


                    </Dropdown.Menu>
                  </Dropdown>
                 
                </td>
              </tr>
      ))}
          </tbody>

        </table>

        {this.state.isOpen && (
          <>
            <ReactDialogBox
              closeBox={this.closeBox}
              modalWidth='60%'
              headerBackgroundColor='red'
              headerTextColor='white'
              headerHeight='65'
              closeButtonColor='white'
              bodyBackgroundColor='white'
              bodyTextColor='black'
              bodyHeight='200px'
              headerText="Etes vous sur d'accepter cet candidature?"
            >
            <form>
              <div>
              <select class="form-control" name="grouprselect" value={this.state.groupeStagiaire}
              onChange={this.onChangeGroupeStagiaire}  >
              <option >Selectionner un groupe</option>

              {
                this.state.listgroupsection.map(function (groupe) {
                  return <option value={groupe._id}  >{groupe.codeGroupe}</option>;
                })
              }
            </select>
              </div>
              <div>
              <Link className='btn btn-success'onClick={this.updateAccept()} >Accepter</Link>
              </div>
              </form>
            </ReactDialogBox>
          </>
        )}


    







      </div>
    )
  }
}
export default SelectStag;