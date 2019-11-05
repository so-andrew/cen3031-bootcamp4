import React from 'react';
import Button from 'react-bootstrap/Button';

class RemoveBuilding extends React.Component {

    dataUpdate(){
        let currentData = this.props.data;
        console.log(this.props.buildingID);
        currentData = currentData.filter((directory) => {
            console.log(directory.id !== this.props.buildingID);
            return directory.id !== this.props.buildingID;
        });
        console.log(currentData);
        this.props.dataUpdate(currentData);
    }

    render() {
        return (
            <div>
                <Button
                    variant="danger"
                    onClick={this.dataUpdate.bind(this)}
                >Remove Building</Button>
            </div>
        );
    }
}

export default RemoveBuilding;