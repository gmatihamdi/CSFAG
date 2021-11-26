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
import React from "react";
import axios from 'axios'
import { Link } from "react-router-dom"
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart,
} from "variables/charts.js";

class Statistique extends React.Component {

  constructor(props) {
    super()
    this.state = {
      codeSection: '',
      listeSection: [],
      encours:'',
      diplomé:'',
      hommepourcent:'',
      femmepourcent:'',

    }
    this.onChangeCodeSection = this.onChangeCodeSection.bind(this);
  }

  handleClick() {
    const a = {
      x: this.state.codeSection,

    }
    axios.post(`http://localhost/filtre/filtrestatistique`, a)
      .then((res) => {
        this.setState({
         // liststag: res.data,
          encours:res.data.data,
          diplomé:res.data.data1,
          hommepourcent:res.data.data2,
          femmepourcent:res.data.data3,
        })
        console.log("resultat de recherche");
        console.log(res.data.data)
      })
      // Catch any errors we hit and update the app
      .catch(error => this.setState({ error, isLoading: false }));
    console.log(this.state.diplomé)
  }
  fetchSection() {
    fetch(`http://localhost/sect`)
      // We get the API response and receive data in JSON format...
      .then(response => response.json())
      // ...then we update the users state
      .then(data =>
        this.setState({
          listeSection: data,
          isLoading: false,
        })
      )
      // Catch any errors we hit and update the app
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.handleClick();
    this.fetchSection();
  }



  onChangeCodeSection(e) {
    this.setState({ codeSection: e.target.value })
  } 

/*
  PieChart = (diplomé,encours) => {
    let depl = diplomé  ;
    let enco = encours ;
    let data = [depl,enco]
    let Pie = {
            labels: ['diplomé', 'encours'],   
            datasets: [{
                data: data,
                backgroundColor: [
                    '#1ca5b6',
                    '#89ba2b',
                ],

            }]

        }}
*/


  render() {
    return (
    <>
      <div className="content">

      <form className="row g-3">
          <div class="col-auto">
            <select
              class="form-control"
              value={this.state.codeSection}
              onChange={this.onChangeCodeSection}

            >
              <option >Choisir une section</option>

              {
                this.state.listeSection.map(function (section) {
                  return <option value={section._id}  >{section.libSection}</option>;
                })
              }
            </select>
          </div>
      
          <Link className='btn btn-danger' onClick={() => this.handleClick()}> <i className="nc-icon nc-zoom-split" /> </Link>
        

        </form>











        <Row>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="fas fa-book-reader" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">En cours</p>
                      <CardTitle tag="p">{this.state.encours}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fas fa-sync-alt" /> 
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-hat-3 text-success" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Les Diplômés</p>
                      <CardTitle tag="p">{this.state.diplomé}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="far fa-calendar" /> 
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="fas fa-female" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Femmes</p>
                      <CardTitle tag="p">{this.state.femmepourcent} %</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="far fa-clock" /> 
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="fas fa-male" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Hommes</p>
                      <CardTitle tag="p">{this.state.hommepourcent} %</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fas fa-sync-alt" /> 
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
       
        <Row>
          <Col md="4">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Stagiaires</CardTitle>
                <p className="card-category">nombres</p>
              </CardHeader>
              <CardBody style={{ height: "266px" }}>
                <Pie
                //  data={dashboardEmailStatisticsChart.data}
                 // options={dashboardEmailStatisticsChart.options}
               //  data={this.PieCharte}
                />


              </CardBody>
              <CardFooter>
                <div className="legend">
                  <i className="fa fa-circle text-primary" /> Opened{" "}
                  <i className="fa fa-circle text-warning" /> Read{" "}
                  <i className="fa fa-circle text-danger" /> Deleted{" "}
                  <i className="fa fa-circle text-gray" /> Unopened
                </div>
                <hr />
                <div className="stats">
                  <i className="fa fa-calendar" /> Number of emails sent
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col md="8">
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">les competences</CardTitle>
                <p className="card-category">Line </p>
              </CardHeader>
              <CardBody>
                <Line
                  data={dashboardNASDAQChart.data}
                  options={dashboardNASDAQChart.options}
                  width={400}
                  height={100}
                />
              </CardBody>
              <CardFooter>
                <div className="chart-legend">
                  <i className="fa fa-circle text-info" /> Tesla Model S{" "}
                  <i className="fa fa-circle text-warning" /> BMW 5 Series
                </div>
                <hr />
                <div className="card-stats">
                  <i className="fa fa-check" /> Data information certified
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )};
}

export default Statistique;
