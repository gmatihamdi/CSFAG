import React from 'react'
import axios from 'axios'
import DatePicker from "react-date-picker";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';

class CreatStagiaire extends React.Component{

  
  constructor(props) {
    super()
    this.state = {
        cinStagiaire:'',
        nomStagiaireFr: '',
        nomStagiaireAr: '',
        etatdossier: '',
        sexe: '',
        Lieunaissance: '',
        datenaissanceStag: '',
        adressStagiaire: '',
        telStagiaire: '',
        niveauScolaire: '',
        emailstagiaire: '',
        specialiteStagiaire: '',
        groupeStagiaire: '',
        codePromotion: '',
        codeSection: '', 
        listeSpecialites:[],
        listeSection:[],
        listePromotions:[]
    }
    // Setting up functions
  
    // Setting up state
    this.onChangeCodePromotion = this.onChangeCodePromotion.bind(this);
 
  };
  //const {values}=useForm(validate);


  validationSchema() {
    return Yup.object().shape({
      cinStagiaire: Yup.string() .required('cin obligatoire')
      .min(8, '8 characters')
      .max(8, '8 characters'),
      nomStagiaireAr:  Yup.string()
      .required('Nom en arabe obligatoire'),
       
      nomStagiaireFr: Yup.string()
        .required('Nom obligatoire'),
      
       

        telStagiaire: Yup.string()
        .required('Numéro Mobile obligatoire')
        .min(8, 'tel à 8 characters min'),

        adressStagiaire: Yup.string()
        .required('@ obligatoire'),
    
        codePromotion: Yup.string()
        .required('Promotion obligatoire'),
        
      
        sexe: Yup.string()
        .required('Champs obligatoire'),

        codeSection: Yup.string()
        .required('Champs obligatoire'),
        datenaissanceStag: Yup.string()
        .required('Champs obligatoire'),
      
       
    });
  }



  onSubmit(values) {
  

 console.log('hello formik')

  const studentObject = {
    cinStagiaire:values.cinStagiaire,
    nomStagiaireFr:values.nomStagiaireFr,
    nomStagiaireAr:values.nomStagiaireAr,
    etatdossier:'En attente',
    datenaissanceStag:values.datenaissanceStag,
    adressStagiaire:values.adressStagiaire,
    telStagiaire:values.telStagiaire,
    niveauScolaire:values.niveauScolaire,
    emailstagiaire:values.emailstagiaire,
    specialiteStagiaire:values.specialiteStagiaire,
    codeSection:values.codeSection,
    codePromotion:values.codePromotion,
    sexe:values.sexe,
    Lieunaissance:values.Lieunaissance,

  };

  console.log(studentObject)


        axios.post('http://localhost/stag',studentObject).then(res => 
          toast.success('insertion avec success'),
         
        ).catch(err => {toast.error("Erreur d'insertion ")})   




      }
     
      
     
                                  fetchSpecialite() {
                                    fetch(`http://localhost/spc`)
                                      // We get the API response and receive data in JSON format...
                                      .then(response => response.json())
                                      // ...then we update the users state
                                      .then(data =>
                                        this.setState({
                                          listeSpecialites: data,
                                          isLoading: false,
                                        })
                                      )
                                      // Catch any errors we hit and update the app
                                      .catch(error => this.setState({ error, isLoading: false }));
                                  }

               
                  fetchPromotion() {
                    fetch(`http://localhost/prom`)
                      // We get the API response and receive data in JSON format...
                      .then(response => response.json())
                      // ...then we update the users state
                      .then(data =>
                        this.setState({
                          listePromotions: data,
                          isLoading: false,
                        })
                      )
                      // Catch any errors we hit and update the app
                      .catch(error => this.setState({ error, isLoading: false }));
                  }

                  componentDidMount() {

                    const token = localStorage.getItem("token");
                    if (token){
                    console.log('ok token')
                    }
                    else{
                      this.props.history.push('/');
                    }


                    this.fetchSpecialite();
                    this.fetchPromotion();
                 

                 }
                 findsectionClick() {
                  console.log('codePromotion')
                  
                  const a = { x:document.getElementById("codePromotion").value}
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
                onChangeCodePromotion(e){ this.setState({ codePromotion:e.target.value }) }
           


    render(){

      const initialValues = {
        cinStagiaire:'',
        nomStagiaireFr: '',
        nomStagiaireAr: '',
        datenaissanceStag: '',
        sexe: '',
        Lieunaissance: '',
        adressStagiaire: '',
        telStagiaire: '',
        niveauScolaire: '',
        emailstagiaire: '',
        specialiteStagiaire: '',
        groupeStagiaire: '',
        codePromotion: '',
        codeSection: '', 
      };




    return(
      <div className="content">
      
        <div >
        <h2>Nouveau stagiaire</h2>

        <ul class="nav nav-tabs">
  <li class="nav-item">
    <a class="nav-link active" aria-current="page" href="#">Identité</a>

    
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Niveau specialité</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Dépot condidature</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Concours</a>
  </li>
</ul>



  <ToastContainer/>


  <Formik
          initialValues={initialValues}
          validationSchema={this.validationSchema} onSubmit={this.onSubmit} >

{({ resetForm,values}) => (
            <Form class="row g-3" noValidate>


  <div className="col-md-6">
  <label >CIN Stagiaire</label>
  <Field type="text" className="form-control " placeholder=" CIN" 
  name="cinStagiaire"
 
  />
  <ErrorMessage   name="cinStagiaire" component="div" className="text-danger" />
  </div>
    <div className="col-md-6">
    <label >Nom Stagiaire</label>
    <Field type="text" className="form-control " placeholder=" NOM FR "
  name="nomStagiaireFr"
 
  />
   <ErrorMessage   name="nomStagiaireFr" component="div" className="text-danger" />
    </div>
    <div className="col-md-6">
    <label >الاسم و اللقب </label>
    <Field  type="text" className="form-control " placeholder=" Nom Arabe "
  name="nomStagiaireAr"/>
     <ErrorMessage   name="nomStagiaireAr" component="div" className="text-danger" />
 </div>
 <div className="col-md-6">
 <label > Date de naissance </label>
                        <div>
                        <Field  type="date"  className="form-control "
                              
                                name="datenaissanceStag"
                            />
                            <ErrorMessage   name="datenaissanceStag" component="div" className="text-danger" />
                        </div>
                    </div>
                    <div className="col-md-6">
    <label >Lieu de naissance </label>
    <Field type="text" className="form-control " placeholder=" Lieu de naissance "
  name="Lieunaissance"/>

 </div>                   

     <div className="col-md-6"> 
 <label > Adresse </label>           
 <Field type="textera" className="form-control " 
  name="adressStagiaire"/>
   <ErrorMessage   name="adressStagiaire" component="div" className="text-danger" />
     </div>

     <div className="col-md-6"> 
 <label >Sexe </label>
   
 <Field class="form-control" as="select"  name="sexe">
       <option >selectionner sexe</option>
       <option >Homme</option>
       <option >Femme</option>
       </Field>
       <ErrorMessage   name="sexe" component="div" className="text-danger" />
 </div>





<div className="col-md-6"> 
 <label > Niveau d'etude </label>
   
   <Field class="form-control"  name="niveauScolaire" as="select" >
       <option >select niveau</option>
       <option >2 eme annee secondaire NV avec succes</option>
       <option >3 eme annee secondaire NV avec succes</option>
       <option >6 éme année secondaire</option>
       <option >7 éme Année Secondaire</option>
       <option >BAC+1</option>
       <option >BAC+2</option>
       <option >BAC+3</option>
       <option >BAC+4</option>
       <option >baccalauréat</option>
       <option >Brevet de Technicien Supérieur (BTS)</option>
       <option >BTP</option>
       <option >CAP</option>
       <option >Certficat de formation professionnelle (cfp)</option>
       <option >DEA</option>
       <option >Diplôme des Etudes Approfondies</option>
       <option >Diplomede techncien supérieur( ISET)</option>
       <option >Ecolde de metier</option>
       <option >Ingénieur Principal</option>
       <option >Ingénieur Travaux</option>
       <option >Maîtrise</option>
       <option >Maitrise et plus</option>
       
   </Field>
 
</div>




<div className="col-md-6"> 
 <label > Télephone portable </label>
   
 <Field  type="text" className="form-control " placeholder=" Nom Arabe "
  name="telStagiaire" />
   <ErrorMessage   name="telStagiaire" component="div" className="text-danger" />
</div>

<div className="col-md-6"> 
 <label > E-mail </label>
   
 <Field type="text" className="form-control " placeholder=" Nom Arabe "
  name="emailstagiaire" />
 
</div>




<div className="col-md-6"> 
 <label > Promotion </label>
<Field 
   className="form-control"  
   name="codePromotion" as="select" 
  
  id='codePromotion'

   onClick={() => this.findsectionClick()} 
   >
<option >select Promotion</option> 
{
                                this.state.listePromotions.map(function(promotion) {
                                return <option value={promotion._id}  >{promotion.libPromotionFr}</option>;
                                })
                            }
</Field>
 <ErrorMessage   name="codePromotion" component="div" className="text-danger" />
</div>
<div className="col-md-6"> 
 <label > Section </label>
   <Field 
   className="form-control"  name="codeSection" as="select" > 
<option >select section</option>
 
{
                                this.state.listeSection.map(function(section) {
                                    return <option value={section._id}  >{section.libSection}</option>;
                                })
                            }
</Field>
<ErrorMessage   name="codeSection" component="div" className="text-danger" />
</div>


<div className="form-group">
                <button type="submit" className="btn btn-primary">
                  Enregistrer
                </button>
                <button
                  type="button"
                  onClick={() => resetForm(initialValues)}
                  className="btn btn-secondary "
                >
                  Reset
                </button>
              </div>
</Form>
          )}
        </Formik>
</div>
</div>
    )
}}
export default CreatStagiaire;