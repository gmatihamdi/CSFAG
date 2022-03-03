import React from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { Formik, Field, Form, ErrorMessage} from 'formik';
import {  } from 'react-bootstrap';
import * as Yup from 'yup';


class Addcompetence extends React.Component{

  
  constructor(props) {
    super()
    this.state = {
        codeCompetence:  '' ,
        codePromotion: '',
        codeSection: '', 
         codeSpecialite:  '', 
         codeMatiere:'' ,
        listeSpecialites:[],
        listeModules:[],
        listeSection:[],
        listePromotions:[],

    }}
  validationSchema() {
    return Yup.object().shape({
      codeCompetence: Yup.string() .required('Champs obligatoire'),
      codePromotion:  Yup.string()
      .required('Champs obligatoire '),
      codeSection: Yup.string()
        .required('Champs obligatoire'),
        codeMatiere: Yup.string()
        .required('Champs obligatoire'),
     
      });
    }




onSubmit(values) {
 
  const studentObject = {
    codeSection:values.codeSection,
    codePromotion:values.codePromotion,
    codeCompetence:values.codeCompetence,
    codeSpecialite:values.codeSpecialite,
    codeMatiere:values.codeMatiere,
   
  };
        axios.post('http://localhost/compet',studentObject).then(res => 
        toast.success('insertion avec success')
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

                      fetchModule() {
                        fetch(`http://localhost/mat`)
                          // We get the API response and receive data in JSON format...
                          .then(response => response.json())
                          // ...then we update the users state
                          .then(data =>
                            this.setState({
                              listeModules: data,
                              isLoading: false,
                            })
                          )
                          // Catch any errors we hit and update the app
                          .catch(error => this.setState({ error, isLoading: false }));
                      }
                      findsectionClick() {
                        const a = { x: document.getElementById("codePromotion").value}
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


                      findmatieresClick() {
                        const a = { x: document.getElementById("codePromotion").value}
                        axios.post(`http://localhost/methode/getmatieres`, a)
                          .then((res) => {
                            this.setState({
                              listeModules: res.data,
                            })
                            console.log("resultat de recherche");
                            console.log(res.data)
                          })
                          // Catch any errors we hit and update the app
                          .catch(error => this.setState({ error, isLoading: false }));
                      }

                      
                     
                      


           componentDidMount() {
                     this.fetchSpecialite();
                     this.fetchPromotion();
                     this.fetchModule();
                     this.findsectionClick();

                     const token = localStorage.getItem("token");
    if (token){
    console.log('ok')
    }
    else{
      this.props.history.push('/');
    }



                  }

                  showmodel(){


                    var myModal = document.getElementById('myModal')
                    var myInput = document.getElementById('myInput')
                    
                    myModal.addEventListener('shown.bs.modal', function () {
                      myInput.focus()
                    })


                  }
                  
               
                  



    render(){
      const initialValues = {
        codeCompetence:  '' ,
        codePromotion: '',
        codeSection: '', 
         codeSpecialite:  '', 
         codeMatiere:'' ,
        };
    return(
      <div className="content">
     
        <div >
        <h2>Affecter une  Competence</h2>
        <ToastContainer/>
        <Formik
          initialValues={initialValues}
          validationSchema={this.validationSchema} onSubmit={this.onSubmit} >

{({ resetForm,values}) => (
            <Form class="row g-3" noValidate>
<div className="col-md-6">
<label> Code Competence </label>

  <Field type="text" className="form-control " placeholder="enter code competence" 
  name="codeCompetence"/>
    <ErrorMessage name="codeCompetence" component="div"  className="text-danger" />
    </div>
  
    <div className="col-md-6">
<label>  Specialité </label>
   
   <Field 
   className="form-control"  name="codeSpecialite"  as="select"> 
<option >select specialite</option>
 
{
                                this.state.listeSpecialites.map(function(specialite) {
                                    return <option value={specialite._id}  >{specialite.libSpecialite}</option>;
                                })
                            }
   </Field>
 
</div>
<div className="col-md-6">
<label> Promotion </label>
   <Field 
   className="form-control" id='codePromotion' name='codePromotion' as="select" onClick={() => this.findsectionClick()}> 
  
<option >select Promotion</option>
 
{
                                this.state.listePromotions.map(function(promotion) {
                                    return <option value={promotion._id}  >{promotion.libPromotionFr}</option>;
                                })
                            }
   </Field>
   <ErrorMessage name="codePromotion" component="div"  className="text-danger" />
</div>

<div className="col-md-6">
<label> Section </label>
   
   <Field 
   className="form-control"  name="codeSection" as="select"> 
<option >select section</option>
 
{
                                this.state.listeSection.map(function(section) {
                                    return <option value={section._id}  >{section.libSection}</option>;
                                })
                            }
   </Field>
   <ErrorMessage name="codeSection" component="div"  className="text-danger" />
</div>

<div className="col-md-6">
<label> module </label>
   
   <Field className="form-control"  name="codeMatiere" as="select"> 
   
<option >select module</option>
 
{
                                this.state.listeModules.map(function(matiere) {
                                    return <option value={matiere._id}  >{matiere.libMatiere}</option>;
                                })
                            }
   </Field>
   <ErrorMessage name="codeMatiere" component="div"  className="text-danger" />
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
export default Addcompetence;