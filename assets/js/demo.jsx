import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

export default function run_demo(root) {
  ReactDOM.render(<Demo />, root);
}


class Demo extends React.Component {
	
	initTiles : ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];

	constructor(props) {
		super (props);
		this.state = {tiles:this.shuffle(this.intTiles),
                        visible : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        clicks : 0,
                        active : 0,
                        matches : 0,
                        score : 0,
                        first : -1};
	}

	//refrenced stack overflow https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
	shuffle (tiles) {
		for (let i = 0; i < tiles.length; i++) {
			let j = Math.floor(Math.random() * (i + 1));
			[tiles[i], tiles[j]] = [tiles[j], tiles[i]];
		}
		return tiles;
	}

	update (index) {
		if (this.state.visible[index] == 0 && this.state.matches != 8){

			this.state.clicks++;
			let tiles = this.state.tiles;
	
			if (this.state.active == 0 ) {
				this.setState({active : 1, first : index, second : -1})
			}
			else if(this.state.active == 1) {
				if (this.state.tiles[this.state.first] == this.state.tiles[index]) {
					let nvisible = this.state.visible;
					nvisible[this.state.first] = 1;
					nvisible[this.state.index] = 1;
					let match = this.state.matches +1;
					this.setState ({visible:nvisible, active : 0, matches: match});
					if(match == 8 ) {
						this.setState({active: 2});
					//	return ({() => alert ("Congrats! Score = "{this.state.score})});
					}
				}
				else {
					setTimeout(() =>{this.setState({active : 0, first : -1, second : index})})
				}
			}
				
		} 
	}

	show(index) { 
		if (this.state.first == index || this.state.visible[index] != 0 || this.state.second == index ) 
			return this.state.tiles[index];

	}
	
	restart() {
		this.setState ={tiles:this.shuffle(this.intTiles),
                        visible : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        clicks : 0,
                        active : 0,
                        matches : 0,
                        score : 0,
                        first : -1};
 

	}
	
	render() {
		var tile = this.state.tiles;
		return (
			<div>
				<div className="grid">   			
					{this.state.tiles.map ((tile, i) =>
						<div className="col-xs-3" key = {i}>
							<button className = "tile" key={tile} onClick = {() => this.update(index) } > {this.show(index)} </button>
						</div> )
					}
				</div>	
				<div>	
					<p> score = {100 - this.state.count} </p>
					<p> clicks = {this.state.clicks} </p>		
					<button className = "reset" onClick = {() => this.restart() } > restart </button>
				</div>
			</div>
		);
	}
}




