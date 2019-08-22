import React, { Component } from 'react';
import axios from 'axios';
import { saveAs } from 'file-server';

import './App.css';

class App extends Component {
    state = {
        name: '',
        receiptId: 0,
        price1: 0,
        price2: 0,
    };
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    createAndDownloadPDF = () => {
        axios
            .post('/create-pdf', this.state)
            .then(() => axios.get('/fetch-pdf', { responseType: 'blob' }))
            .then(res => {
                const pdfBlob = new Blob([res.data], {
                    type: 'application/pdf',
                });
                saveAs(pdfBlob,'newPDF.pdf')
            });
    };
    render() {
        return (
            <div className="App">
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={this.handleChange}
                />
                <input
                    type="text"
                    placeholder="Receipt ID"
                    name="receiptId"
                    onChange={this.handleChange}
                />
                <input
                    type="text"
                    placeholder="Price 1"
                    name="price1"
                    onChange={this.handleChange}
                />
                <input
                    type="text"
                    placeholder="Price 2"
                    name="price2"
                    onChange="this.handleChange"
                />
                <button onClick={this.createAndDownloadPDF}>
                    Download PDF
                </button>
            </div>
        );
    }
}

export default App;
