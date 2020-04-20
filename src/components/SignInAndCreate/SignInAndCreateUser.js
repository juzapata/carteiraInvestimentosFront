import React from 'react';
import axios from 'axios';
import './SignInAndCreateUser.css';
import Logo from '../../assets/imgs/logo-invest.png';

class SignInAndCreateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          name: "",
          email: "",
          password: "",
          errormsg: "",
        };
    }

    formChange = (event) => {
        event.preventDefault();        
        const formRegister = document.querySelector('.register-form');
        const formLogin = document.querySelector('.login-form');

        if (formLogin.style.display === "block") {
            formRegister.style.display = 'block';
            formLogin.style.display = 'none';
        } else {
            formRegister.style.display = 'none';
            formLogin.style.display = 'block';
        }        
    }

    handleChange = (event, element) => {
        const newState = this.state;
        newState[element] = event.target.value
        this.setState(newState);
    };

    signIn = async (event) => {
        try {
            event.preventDefault()
            const user = {
                email: this.state.email,
                password: this.state.password
            };
            let result = await axios.post('https://invest-wallet-backend.herokuapp.com/auth/authenticate', user);
            localStorage.setItem('TOKEN', result.data.token);
            this.props.history.push('/home');
        } catch (err){
            console.log('ERRO', err);
            let error = "Senha ou Email Inválido. Tente novamente!";
            this.setState({errormsg: error});
        }
    }

    createAccount = async (event) => {
        try {
            event.preventDefault()
            const user = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            };
            let result = await axios.post('https://invest-wallet-backend.herokuapp.com/auth/register', user);
            localStorage.setItem('TOKEN', result.data.token);
            this.props.history.push('/home');
        } catch (err){
            console.log('ERRO', err);
            let error = "Senha ou Email Inválido. Tente novamente!";
            this.setState({errormsg: error});
        }
    }

    render(props) {
        return (
            <div className="login-page">
                <div className="form"> 
                    <img className="logo" src={Logo} alt="Logo Invest Wallet"></img>
                    <span>{this.state.errormsg}</span>
                    <form className="register-form">
                        <input type="text" placeholder="Nome" value={this.state.name} onChange={(event) => this.handleChange(event, "name")}/>
                        <input type="text" placeholder="Email" value={this.state.email} onChange={(event) => this.handleChange(event, "email")}/>
                        <input type="password" placeholder="Senha" value={this.state.password} onChange={(event) => this.handleChange(event, "password")}/>
                        <button onClick={this.createAccount}>Criar Conta</button>
                        <p className="message">Já tem conta? <a href="#" onClick={this.formChange} >Login</a></p>
                    </form>
                    <form className="login-form">
                        <input type="text" placeholder="Email" value={this.state.email} onChange={(event) => this.handleChange(event, "email")}/>
                        <input type="password" placeholder="Senha" value={this.state.password} onChange={(event) => this.handleChange(event, "password")}/>
                        <button onClick={this.signIn}>Login</button>
                        <p className="message">Não Registrado? <a href="#" onClick={this.formChange}>Criar Conta</a></p>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignInAndCreateUser;