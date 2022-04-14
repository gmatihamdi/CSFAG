import React from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import logo from './entete.jpeg'
import { BsPersonPlusFill } from "react-icons/bs";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FcPrint } from "react-icons/fc";
import { Dropdown } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { ReactDialogBox } from 'react-js-dialog-box'
import 'react-js-dialog-box/dist/index.css'
const If = (props) => {
  const condition = props.condition || false;
  const positive = props.then || null;
  const negative = props.else || null;
  
  return condition ? positive : negative;
};
class Resultat extends React.Component {
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
      etatvalid:'Réussite',
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
      stgs:[],
      Result:''
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
    //  y: this.state.etatdossier,

    }
    axios.post(`http://localhost/methode/getresultat`, a)
      .then((res) => {
        this.setState({
            listnote:res.data.data ,
           // ... res.data.data1,
           stgs:res.data.data1,
         //  Moyn:res.data.data2,
           Result:res.data.data3,
        })
        console.log("resultat Result");
        console.log(this.state.stgs)
      })
      // Catch any errors we hit and update the app
      .catch(error => this.setState({ error, isLoading: false }));
    console.log(this.state.liststag)


  }


  componentDidMount() {
    this.handleClick();
    this.findsectionClick();
    this.listepromo();
    this.findgroupClick();

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


      etatdossier: 'Diplômé',

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


      etatdossier: 'Diplômé',
      

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


  pdfGenerate = () => {
      var iframe = document.createElement('iframe');
    //  iframe.setAttribute('style', 'position:absolute;right:120px; top:0; bottom:0; height:100%; width:650px; padding:20px;');
      document.body.appendChild(iframe);
      var img = new Image()
      var Values = this.state.stgs.map((element, index) => Object.values([index + 1, element.cinStagiaire, element.nomStagiaireFr,element.res]));
      var pdf = new jsPDF('p', 'pt', 'a4');
      pdf.setFontSize(9);
      pdf.addImage(logo, 'JPEG', 35, 10, 480, 60);
      pdf.setFontSize(22);
      pdf.text(250, 80, 'Résultat')
      pdf.setFontSize(10);   
    
    
      pdf.text(35, 130, '')

      
      pdf.setFontSize(9)
     
      pdf.autoTable({ html: '#my-table', startY: 150, showHead: 'everyPage' })
      // Or use javascript directly:
      pdf.autoTable({
        head: [['N°', 'CIN', 'Nom&Prénom', 'Résultat']],
        body: Values
    
      })
      var iframe = document.createElement('iframe');
    /*  iframe.setAttribute('style', 'position:absolute;right:120px; top:0; bottom:0; height:100%; width:650px; padding:20px;');
      document.body.appendChild(iframe);
      iframe.src = pdf.output('datauristring');*/
      window.open(pdf.output('bloburl'))
    }









  render() {
    return (


      <div className="content">
        <ToastContainer />
        
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


        
          <Link className='btn btn-danger' onClick={() => this.handleClick()}><i className="nc-icon nc-zoom-split" /></Link>

          <Link className='btn btn-success'  onClick={this.pdfGenerate} ><i className="fa fa-print" /></Link>


        </form>


        <table id="dtBasicExample" className="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
          <thead class="thead-dark">
            <tr>
              <th scope="col">N°</th>
              <th scope="col">CIN</th>
              <th scope="col">Nom&Prénom</th>
              <th scope="col"> الاسم و اللقب </th>
              <th scope="col">Resultat</th>

              <th scope="col">      </th>
            </tr>
          </thead>
          <tbody>
            {this.state.stgs.map((stagiare, index) => (
              <tr key={stagiare._id}>
                <th scope="row">{index + 1}</th>
                <td>{stagiare.cinStagiaire}</td>
                <td>{stagiare.nomStagiaireFr}</td>
                <td>{stagiare.nomStagiaireAr}</td>
                <td>{stagiare.res}</td>


                      <If condition={(stagiare.res)===(this.state.etatvalid)} then={
    
    <td>
   <Link className='btn btn-success' onClick={(e) => { if (window.confirm(
                      "Veuillez confirmer que le stagiaire à compléter leur (1) dossier (2)paiement des frais d'inscription (3)formation?" )) this.AcceptStag(stagiare._id) }}>
                        Clôture 
                      </Link>
    
    </td>
  }
            else={
              <td><font  color="red">Echec</font>
              
              </td>
      }
            />







               
              </tr>
           

      ))}
          </tbody>

        </table>

      </div>
    )
  }
}
export default Resultat;