
//"start": "react-scripts --expose-gc --max-old-space-size=8192 start",
//"build": "react-scripts --expose-gc --max-old-space-size=8192 build",
//"start": "react-scripts start",
//"build": "react-scripts build && gulp licenses",



import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import { withRouter, Redirect } from "react-router-dom"; 
import Container from "react-bootstrap/Container";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

import Cookies from 'universal-cookie';

const cookies = new Cookies();



    class Authentification extends React.Component{
        constructor(props) {
          super(props)
          this.state = {
            name: '',
            password: '',
           Errlogin:'',         
         
          }
          this.onChangeName = this.onChangeName.bind(this);
            this.onChangePassword = this.onChangePassword.bind(this);
            this.onSubmit = this.onSubmit.bind(this);
        }

        onSubmit(e) {
           e.preventDefault();
                const user = {
                  name:this.state.name,
                  password:this.state.password,
                };

             const config={   
               headers: {
                  'Content-Type': 'application/json'
              },};
               // console.log(user) 
                axios.post(`http://localhost/api/login`,user,config)

                .then(res => {
                  if (res.status === 200) {
                   localStorage.setItem("user", JSON.stringify(user));
                   localStorage.setItem('token', res.data.token);
                          this.props.history.push('/admin/dashboard');
                            
                  } else {
                    
                      toast.error(res.data.message)

                  }
              })
              .catch(error => {
                  // return;
                  
                 toast.error('erreur')
              })
      }

                
                onChangeName(e){ this.setState({ name:e.target.value }) }
                onChangePassword(e){ this.setState({ password:e.target.value }) }

                



                  render(){
                    return(
            
              <div className="container center_div">
              <ToastContainer/>
                <Row>
                  <Col md="8">
                    <Card className="card-user">
                      <div className="image">
                        <img
                          alt="..."
                          src={require("assets/img/centreentre.jpg").default}
                        />
                        
                      </div>
                      <CardBody>
                        <div className="author">
                          
                            <img
                              alt="..."
                              className="avatar border-gray"
                              src={require("assets/img/log.jpg").default}
                            />
        
        <Form onSubmit={this.onSubmit} >
        
                          <Row>
                            <Col className="update ml-auto mr-auto" md="5">
                              <FormGroup>
                                <label>login</label>
                                <Input
                                  defaultValue="Creative Code Inc."
                                  
                                //  placeholder="Company"
                                  type="text"
                                  value={this.state.name}
          onChange={this.onChangeName}
                                />
                              </FormGroup>
                            </Col>
        </Row>
                            <Row>
                            <Col className="update ml-auto mr-auto" md="5">
                              <FormGroup>
                                <label>mot de passe</label>
                                <Input
                                  defaultValue="michael23"
                                  //placeholder="Username"
                                  type="password"
                                  value={this.state.password}
          onChange={this.onChangePassword}
                                />
                              </FormGroup>
                            </Col>
                         
                            </Row>
                           
                          <Row>
                            <div className="update ml-auto mr-auto">
                              <Button
                                className="btn-round"
                                color="primary"
                                type="submit"
                                 >
                               Se Connecter
                              </Button>
                            </div>
                          </Row>
        
                        </Form>

              


                   
                        </div>
                
                      </CardBody>
                      
                    </Card>
                  
                  </Col>
                  
                </Row>
              </div>
            
           )
        }}
        

export default Authentification;
