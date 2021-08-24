import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ERC20Token from "./contracts/ERC20Mintable.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { loaded: false };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      this.networkId = await this.web3.eth.net.getId();
      console.log(ERC20Token.networks[this.networkId].address);
      this.instance = new this.web3.eth.Contract(
        ERC20Token.abi,
        ERC20Token.networks[this.networkId] && ERC20Token.networks[this.networkId].address,
      );

      this.uuid = require("uuid");
      console.log(this.accounts[0]);
      let balance = await this.instance.methods.balanceOf(this.web3.currentProvider.selectedAddress).call({ from: this.web3.currentProvider.selectedAddress });
      console.log(balance);

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ loaded: true, erc20_address: ERC20Token.networks[this.networkId].address, balance: balance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  handleInputTokens = (e) => {
    this.setState({send_token_amount: e.target.value});
  };

  handleAddressChange = (e) => {
    this.setState({send_address: e.target.value});
  };

  tokenTransfer = async (e) => {
    e.preventDefault();

    await this.instance.methods.transfer(this.state.send_address, this.state.send_token_amount).send({ from: this.accounts[0] });
    let balance = await this.instance.methods.balanceOf(this.web3.currentProvider.selectedAddress).call({ from: this.web3.currentProvider.selectedAddress });
    this.setState({ balance: balance });
  };

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <Container className="App">

        <h1>This is your LOTTO Token v0.1 home!</h1>
        <h2>The LOTTO Token Address is: {this.state.erc20_address}</h2>
        <h3>Balance: {this.state.balance} (wei)</h3>

        {this.state.balance > 0 &&
          <Form>
            <h4>Transfer your LOTTO Tokens</h4>
          <Row>
            <Col>
              <Form.Control placeholder="To Address" value={this.state.send_address} onChange={this.handleAddressChange} />
            </Col>
            <Col>
              <Form.Control placeholder="LOTTO Tokens" value={this.state.send_token_amount} onChange={this.handleInputTokens} />
            </Col>
            <Col>
              <Button variant="primary" type="submit" onClick={this.tokenTransfer}>Transfer</Button>
            </Col>
          </Row>
        </Form>
        }

        <Jumbotron>

        

        </Jumbotron>

      </Container>

    );
  }
}

export default App;
