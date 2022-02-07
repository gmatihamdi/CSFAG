import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';


const cookies = new Cookies();
cookies.set({secure: true, sameSite: 'none'});
cookies.set( {secure: true, sameSite: 'none'});

export default function ProtectedRoute(ComponentToProtect) {
    return class extends Component {
        constructor() {
            super();
            this.state = {
                loading: true,
                redirect: false,
            };
        }
        
        componentDidMount() {

            const token = localStorage.getItem("token");
            console.log('token');
            console.log(token);
            const config={   
                headers: {
                    "X-ACCESS-TOKEN": cookies.get(token)
               },};

if (token){

    this.setState({ loading: false }, () => {
    });
}
else{

    cookies.remove('token');
    this.setState({ loading: false, redirect: true });

}




          /*     axios.get(`http://localhost/api/verify`,config)
            axios({
                method: "GET",
                url: 'http://localhost/api/user/verify',
                headers: {
                    "X-ACCESS-TOKEN": cookies.get('token')
                }    
            })
                .then(res => {
                    if (res.status === 200) {
                        this.setState({ loading: false }, () => {
                        });
                    } else {
                        const error = new Error(res.error);
                        throw error;
                    }
                })
                .catch(err => {
                    cookies.remove('token');
                    this.setState({ loading: false, redirect: true });
                });*/
        }

           render() {
            const { loading, redirect } = this.state;
            if (loading) {
                return null;
            }
            if (redirect) {
                return <Redirect to="/" />;
            }
            return (
                <React.Fragment>
                    <ComponentToProtect {...this.props} />
                </React.Fragment>
            );
        }
    }
}