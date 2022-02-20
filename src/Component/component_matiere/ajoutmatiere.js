import React from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
class Ajoutmatiere extends React.Component{

  
  constructor(props) {
    super()
    this.state = {
        codeMatiere:  '' ,
        libMatiere:  '',
        Nbreheures: '',
        seuilMatiere:'',
        niveauMatiere: '' ,
        specialiteMatiere: " " ,
        users:[],
    }
    // Setting up functions
    // Setting up state
   
  }
  validationSchema() {
    return Yup.object().shape({
      codeMatiere: Yup.string() .required('Champs obligatoire'),
    
      libMatiere:  Yup.string()
      .required('Champs obligatoire '),
      Nbreheures: Yup.string()
        .required('Champs obligatoire'),
        seuilMatiere: Yup.string()
        .required('Champs obligatoire'),
        niveauMatiere: Yup.string()
        .required('Champs obligatoire'),
        specialiteMatiere: Yup.string()
        .required('Champs obligatoire'),
      });
    }


onSubmit(values) {

  const studentObject = {
    codeMatiere:values.codeMatiere,
    libMatiere:values.libMatiere,
    Nbreheures:values.Nbreheures,
    seuilMatiere:values.seuilMatiere,
    niveauMatiere:values.niveauMatiere,
    specialiteMatiere:values.specialiteMatiere,

  };
        axios.post('http://localhost/mat',studentObject).then(res => 
        toast.success('insertion avec success')
      ).catch(err => {toast.error("Erreur d'insertion ")}) 
       
      }


           componentDidMount() {
                      axios.get(`http://localhost/spc`)
                          .then(response => {
                              if(response.data.length > 0) {
                                  this.setState({ 
                                    users: response.data.map(specialite => specialite.libSpecialite),
                                    libSpecialite: response.data[0].libSpecialite
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



    render(){
      const initialValues = {
        codeMatiere:  '' ,
        libMatiere:  '',
        Nbreheures: '',
        seuilMatiere:'',
        niveauMatiere: '' ,
        specialiteMatiere: " " ,
        };
    return(
      <div className="content">
    
        <div >
        <h2>Ajoute une Nouvelle Module</h2>
        <ToastContainer/>
        <Formik
          initialValues={initialValues}
          validationSchema={this.validationSchema} onSubmit={this.onSubmit} >

{({ resetForm,values}) => (
            <Form class="row g-3" noValidate>

<div className="col-md-6">
<label> Code Module </label>
  <Field type="text" className="form-control " placeholder="enter matiere code" 
  name="codeMatiere"/>
 <ErrorMessage name="codeMatiere" component="div"  className="text-danger" />
    </div>
    <div className="col-md-6">
    <label> Titre du module </label>
  <Field type="text" className="form-control " placeholder="enter lib matiere"  name="libMatiere"/>
  <ErrorMessage name="libMatiere" component="div"  className="text-danger" />
    </div>
    <div className="col-md-6">
    <label> Nombre d'heurs</label>
  <Field type="text" className="form-control" placeholder="enter coif matiere "
  name="Nbreheures"/>
  <ErrorMessage name="Nbreheures" component="div"  className="text-danger" />
    </div>
    <div className="col-md-6">
    <label> Seuil de réussite en %</label>
  <Field type="text" className="form-control " placeholder="enter seuil matiere "
  name="seuilMatiere"/>
  <ErrorMessage name="seuilMatiere" component="div"  className="text-danger" />
    </div>
    <div className="col-md-6">
    <label> Niveau du module</label>
   
   <Field class="form-control"  name="niveauMatiere"  as="select">
       <option >select niveau</option>
       <option >1er année</option>
       <option >2eme année</option>
   </Field>
   <ErrorMessage name="niveauMatiere" component="div"  className="text-danger" />
</div>




<div className="col-md-6">
    <label> Specialité du module</label>
   
   <Field name="specialiteMatiere"
   className="form-control"  as="select"> 
<option >select specialite</option>
 
{
                                this.state.users.map(function(specialite) {
                                    return <option key={specialite}  >{specialite}</option>;
                                })
                            }
   </Field>
   <ErrorMessage name="specialiteMatiere" component="div"  className="text-danger" />
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
export default Ajoutmatiere;