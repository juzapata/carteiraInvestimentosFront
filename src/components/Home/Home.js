import React from 'react';
import './Home.css';
import Logo from '../../assets/imgs/logo-invest.png';
import Button from '../fragments/Button/Button';
import axios from 'axios';
import Chart from '../fragments/Chart/Chart';
import Investment from '../fragments/Investments/Investments';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            investmentValue: "",
            typeInvestment: "RENDA_VARIAVEL",
            createdInvestment: "",
            data: {
                variableInvestment: [],
                fixedInvestment: [],
                _id: "",
                name: "",
                email: "",
                createdAt: "",
                __v: 0
            },
            value: false,
            variable: 0,
            fix: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.createInvestment = this.createInvestment.bind(this);
    }
    async componentDidMount() {
        const token = localStorage.getItem('TOKEN');
        const options = { headers: { Authorization: 'Bearer '.concat(token) } }
        const url = 'https://invest-wallet-backend.herokuapp.com/investments';
        let result = await axios.get(url, options);
         let variable = result.data.user.variableInvestment.map((el) => {
             return  parseFloat(el.value);
        });
        let fixed = result.data.user.fixedInvestment.map((el) => {
            return parseFloat(el.value);
        });
        this.setState({
            data: result.data.user,
            variable: variable.reduce((a, b) => a + b, 0),
            fix: fixed.reduce((a, b) => a + b ,0)

        });
    }

    handleChange = async (event, element) => {
        const newState = this.state;
        newState[element] = event.target.value
        this.setState(newState);
    };

    createInvestment = async (event) => {
        event.preventDefault();
        let amount = this.state.investmentValue;
        let typeOfInvestment = this.state.typeInvestment;
        let counter = 0;
        const token = localStorage.getItem('TOKEN');
        let data = {
            type: typeOfInvestment,
            value: amount
        }
        let options = {
            headers: {
                Authorization: 'Bearer '.concat(token)
            }
        }
        const url = 'https://invest-wallet-backend.herokuapp.com/investments';
        let result = await axios.post(url, data, options);
        if (typeOfInvestment === 'RENDA_VARIAVEL') {
            counter = this.state.variable + parseFloat(amount);
            this.setState({
                data: result.data.user,
                variable: counter
            });
        } else if (typeOfInvestment === 'RENDA_FIXA') {
            counter = this.state.fix + parseFloat(amount);
            this.setState({
                data: result.data.user,
                fix: counter
            });
        }
    }

    deleteInvestment = async (investiment) => {
        console.log('investiment', investiment);
        const token = localStorage.getItem('TOKEN');
        let options = {
            headers: {
                Authorization: 'Bearer '.concat(token)
            }
        }
        const url = `https://invest-wallet-backend.herokuapp.com/investments/${investiment}`;
        let result = await axios.delete(url, options);
        let counter = 0;
        if (result.data.deleted.type === 'RENDA_VARIAVEL') {
            counter = this.state.variable - parseFloat(result.data.deleted.value);
            this.setState({
                data: result.data.user,
                variable: counter
            });

        } else if (result.data.deleted.type === 'RENDA_FIXA') {
            counter = this.state.fix - parseFloat(result.data.deleted.value);
            this.setState({
                data: result.data.user,
                fix: counter
            });
        }
    }

    logoutHandler = () => {
        localStorage.removeItem('TOKEN');
        this.props.history.push('/');
    }
    render(props) {
        let fixPercent;
        let variablePercent;
        let total = this.state.fix + this.state.variable
        fixPercent = this.state.fix*100/total
        variablePercent = this.state.variable*100/total;
        let variableInvestments = (
            <div>
                {
                    this.state.data.variableInvestment.map((invesment) => {
                        let newDate = new Date(invesment.createdAt)
                        return <Investment
                            delete={() => this.deleteInvestment(invesment._id)}
                            tipo={invesment.type}
                            valor={invesment.value}
                            data={new Intl.DateTimeFormat('pt-BR', {
                                month: 'long',
                                day: '2-digit',
                                year: 'numeric'
                            }).format(newDate)}
                            key={invesment._id}
                        />
                    })
                }
            </div>
        )
        let fixedInvestments = (
            <div>
                {this.state.data.fixedInvestment.map((invesment) => {
                    let newDate = new Date(invesment.createdAt)
                    return <Investment
                        delete={() => this.deleteInvestment(invesment._id)}
                        tipo={invesment.type}
                        valor={invesment.value}
                        data={new Intl.DateTimeFormat('pt-BR', {
                            month: 'long',
                            day: '2-digit',
                            year: 'numeric'
                        }).format(newDate)}
                        key={invesment._id}
                    />
                })}
            </div>
        )
        return (
            <div>
                <header>
                    <nav className="topnav">
                        <img src={Logo} alt="Logo Invest Wallet"></img>
                        <h1>Invest Wallet</h1>
                        <div className="info-user">  
                            <p><FontAwesomeIcon icon={faUser} /> Olá {this.state.data.name}!</p>
                            <button className="btn-logout" text="" onClick={this.logoutHandler}>Sair</button>
                        </div>
                    </nav>
                </header>

                <div className="containerCard">
                    <div className="card">
                        <h2>Investimentos Variáveis</h2>
                        {variableInvestments}
                    </div>
                    <div className="card">
                        <h2>Investimentos Fixos</h2>
                        {fixedInvestments}
                    </div>
                </div >
                <div className="chart-container">
                    <div className="container-text">
                        <h2>Resumo dos Investimentos</h2>
                        <p>{isNaN(Math.floor(variablePercent)) === false ? Math.floor(variablePercent) : 0}% Invetimento Variável</p>
                        <p>{isNaN(Math.floor(fixPercent)) === false ? Math.floor(fixPercent) : 0}% Investimento Fixo</p>
                    </div>
                    
                    <Chart 
                    variable={this.state.variable !== 0 ? this.state.variable : 10} 
                    fix={this.state.fix !== 0 ? this.state.fix : 10} 
                    valor={this.state.value} 
                    // mouseOver={v => this.setState({value: this.state.variable})}
                    // mouseOut={v => this.setState({value: false})}
                    />
                    

                </div>
                <div className="home">
                    <form className="form">
                        <h2>Adicionar Novo Investimento</h2>
                        <input type="number" placeholder="Valor do Investimento" value={this.state.investmentValue} onChange={(event) => this.handleChange(event, "investmentValue")} />
                        <select className="select" value={this.state.typeInvestment} onChange={(event) => this.handleChange(event, 'typeInvestment')}>
                            <option value="RENDA_VARIAVEL">Investimento Variável</option>
                            <option value="RENDA_FIXA">Investimento Fixo</option>
                        </select>
                        <Button text="Criar Investimento" onClick={this.createInvestment} />
                    </form>
                </div>
            </div>
        );
    }
}

export default Home;
