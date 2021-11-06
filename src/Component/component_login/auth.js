/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';

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



    class User extends React.Component{
        constructor(props) {
          super(props)
          this.state = {
            authent: '',
            pwd: '',
           Err:'',
           users:[]
          }
          this.onChangeAuthent = this.onChangeAuthent.bind(this);
            this.onChangePwd = this.onChangePwd.bind(this);
        }

        onSubmit(e) {
           // e.preventDefault();
       //    if(this.state.authent=="admin"){
       //         this.state.Err='tres bien'
              //  this.props.history.push('/admin')
                console.log('ok')
         //     }
          //     else{
           //    this.state.Err=' login ou mot de passe incorrectes !  ' 
           //    toast.error("Erreur de Modification ")
           //    console.log('nok')
              // this.props.history.push('/admin')
              // }
 
                }

                onChangeAuthent(e){ this.setState({ authent:e.target.value }) }
                onChangePwd(e){ this.setState({ pwd:e.target.value }) }



        render(){
            return(
    <>
      <div className="content">
      <ToastContainer/>
        <Row>
          <Col md="8">
            <Card className="card-user">
              <div className="image">
                <img
                  alt="..."
                  src={require("assets/img/damir-bosnjak.jpg").default}
                />
              </div>
              <CardBody>
                <div className="author">
                  
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/log.jpg").default}
                    />

<Form >
                  <Row>
                    <Col className="pr-1" md="5">
                      <FormGroup>
                        <label>login</label>
                        <Input
                          defaultValue="Creative Code Inc."
                          
                          placeholder="Company"
                          type="text"
                          value={this.state.authent}
  onChange={this.onChangeAuthent}
                        />
                      </FormGroup>
                    </Col>
</Row>
                    <Row>
                    <Col className="pr-1" md="5">
                      <FormGroup>
                        <label>mot de passe</label>
                        <Input
                          defaultValue="michael23"
                          placeholder="Username"
                          type="password"
                          value={this.state.pwd}
  onChange={this.onChangePwd}
                        />
                      </FormGroup>
                    </Col>
                 
                    </Row>
                   
                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        
                         >
                       Se Connecter
                      </Button>
                    </div>
                  </Row>

                </Form>

            
                <p class="text-danger">{this.state.Err}</p>
                  
              
                </div>
        
              </CardBody>
              
            </Card>
          
          </Col>
          
        </Row>















      </div>
    </>
   )
}}

export default User;
