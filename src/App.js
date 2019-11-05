import React from 'react';
import Search from './components/Search';
import ViewBuilding from './components/ViewBuilding';
import BuildingList from './components/BuildingList';
import Credit from './components/Credit';
import AddBuilding from './components/AddBuilding';
import RemoveBuilding from './components/RemoveBuilding';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
//import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
//import Button from 'react-bootstrap/Button';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      selectedBuilding: 0,
      data: props.data
    };
  }

  filterUpdate(value) {
    this.setState({
      filterText: value
    })
  }

  selectedUpdate(id) {
    //Here you will need to update the selectedBuilding property of state to the id passed into this function
    this.setState({
      selectedBuilding: id
    })
  }

  dataUpdate(updatedData) {
    this.setState({
      data: updatedData
    })
  }

  render() {
    return (
      <div className="bg">
        <div className="row">
          <h1>UF Directory App</h1>
        </div>
        <header>
          <Search
            filterText = {this.state.filterText}
            filterUpdate = {this.filterUpdate.bind(this)}
          />
        </header>
        <main>
          <div className="row">
            <div className="column1">
              <div className="tableWrapper">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Building</th>
                    </tr>
                  </thead>
                  <tbody>
                    <BuildingList
                      data={this.state.data}
                      filterText={this.state.filterText}
                      selectedUpdate={this.selectedUpdate.bind(this)}
                    />
                  </tbody>
                </Table>
              </div>
            </div>
            <div className="column2">
              <div className="card">
                <ViewBuilding
                data={this.state.data}
                buildingID={this.state.selectedBuilding}
                />
                {this.state.selectedBuilding !== 0 && <RemoveBuilding
                  data={this.state.data}
                  buildingID={this.state.selectedBuilding}
                  dataUpdate={this.dataUpdate.bind(this)}
                />}
              </div>
              <div className="card">
                <AddBuilding
                  data={this.state.data}
                  dataUpdate={this.dataUpdate.bind(this)}
                />
              </div>
            </div>
          </div>
          <Credit />
        </main>
      </div>
    );
  }
}

export default App;
