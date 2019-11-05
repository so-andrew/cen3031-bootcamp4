import React from 'react';

class ViewBuilding extends React.Component {
	
	render() {
		const { data, buildingID } = this.props;
		const selectedBuilding = data.filter(directory => {
			return directory.id === buildingID;
		});

		//console.log(selectedBuilding);
		if(selectedBuilding.length !== 0){
			return (
				<div>
					<p><b>Code:</b> {selectedBuilding[0].code}</p>
					<p><b>Name:</b> {selectedBuilding[0].name}</p>
					{selectedBuilding[0].coordinates &&
						<p><b>Coordinates:</b> ({selectedBuilding[0].coordinates.latitude}, {selectedBuilding[0].coordinates.longitude})</p>
					}
					{selectedBuilding[0].address && 
						<p><b>Address:</b> {selectedBuilding[0].address}</p>
					}
				</div>
			);
		}
		else{
			return (
				<div>
					<p>
						<i>Click on a name to view more information.</i>
					</p>
				</div>
			);
		}
		
	}
}
export default ViewBuilding;
