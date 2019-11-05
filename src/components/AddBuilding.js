import React from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert';

class AddBuilding extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            codeInput: '',
            nameInput: '',
            latInput: '',
            longInput: '',
            addrInput: '',
            duplicateCodeError: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.dataUpdate1 = this.dataUpdate1.bind(this);
        this.showHideDuplicateError = this.showHideDuplicateError.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.id;
        const value = target.value;

        this.setState({
            [name]: value
        });

        if(name === 'codeInput'){
            this.setState({
                duplicateCodeError: false
            });
        }
    }

    showHideDuplicateError(){
        this.setState({
            duplicateCodeError: !this.state.duplicateCodeError
        });
    }

    dataUpdate1() {
        let currentData = this.props.data;
        if(currentData.filter((directory) => {
            return directory.code === this.state.codeInput;
        }).length === 0){
            let newEntry = {};
            newEntry.code = this.state.codeInput;
            newEntry.name = this.state.nameInput;
            newEntry.id = currentData[currentData.length-1].id + 1;
            if(this.state.latInput.length > 0 && this.state.longInput.length > 0){
                let coord = {};
                coord.latitude = parseInt(this.state.latInput);
                coord.longitude = parseInt(this.state.longInput);
                if(!isNaN(coord.latitude) && !isNaN(coord.longitude)){
                    newEntry.coordinates = coord;
                }
            }
            if(this.state.addrInput.length > 0) newEntry.address = this.state.addrInput;
            console.log(newEntry);
            currentData.push(newEntry);
            currentData.sort((a, b) => (a.code > b.code) ? 1 : -1);
            this.props.dataUpdate(currentData);
        }
        else{
           this.showHideDuplicateError(); 
        };
    }

    handleSubmit(event) {
        const form = event.currentTarget;
        event.preventDefault();
        if (!form.checkValidity()){
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        //this.setState({ setValidated: true });
        this.dataUpdate1();
    }

    render() {
        return (
            <div className = "mb-0">
                <Form noValidate onSubmit={this.handleSubmit}>
                    <Form.Group controlId="codeInput">
                        <Form.Label><b>Building Code</b></Form.Label>
                        <Form.Control required placeholder="Enter building code" value={this.state.codeInput} onChange={this.handleInputChange}/>
                        <Form.Control.Feedback>Valid code.</Form.Control.Feedback>
                        <Form.Text className="text-muted">
                            <i>Ex. FLG</i>
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="nameInput">
                        <Form.Label><b>Building Name</b></Form.Label>
                        <Form.Control required placeholder="Enter building name" value={this.state.nameInput} onChange={this.handleInputChange}/>
                        <Form.Control.Feedback>Valid name.</Form.Control.Feedback>
                        <Form.Text className="text-muted">
                            <i>Ex. Florida Gym</i>
                        </Form.Text>
                    </Form.Group>

                    <Form.Row>
                        <Col>
                            <Form.Group controlId="latInput">
                                <Form.Label><b>Latitude</b></Form.Label>
                                <Form.Control placeholder="Enter latitude (optional)" value={this.state.latInput} onChange={this.handleInputChange}/>
                                <Form.Text className="text-muted">
                                    <i>Ex. 29.64951450000001</i>
                                </Form.Text>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="longInput">
                                <Form.Label><b>Longitude</b></Form.Label>
                                <Form.Control placeholder="Enter longitude (optional)" value={this.state.longInput} onChange={this.handleInputChange}/>
                                <Form.Text className="text-muted">
                                    <i>Ex. -82.34724109999999</i>
                                </Form.Text>
                            </Form.Group>
                        </Col>
                    </Form.Row>

                    <Form.Group controlId="addrInput">
                        <Form.Label><b>Address</b></Form.Label>
                        <Form.Control placeholder="Enter address (optional)" value={this.state.addrInput} onChange={this.handleInputChange}/>
                        <Form.Text className="text-muted">
                            <i>Ex. Florida Gymnasium, Gainesville, FL 32608, USA</i>
                        </Form.Text>
                    </Form.Group>
                    <Button 
                        variant="primary"
                        type="submit"
                    >Add Building</Button>
                </Form>
                {this.state.duplicateCodeError && <Alert className="duplicateAlert" variant="danger">
                    <p className="mb-0">A building with this code already exists, please try again.</p>
                </Alert>}
            </div>
        );
    }
}

export default AddBuilding;