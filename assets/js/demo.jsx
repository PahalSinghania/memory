import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

export default function run_demo(root) {
  ReactDOM.render(<Demo side={0}/>, root);
}

class Demo extends React.Component {
	constructor(props) {
		super(props);
		this.state = { side: props.side,
							tiles:this.shuffle(),
					visible : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					clicks : 0,
					active : 0,
					matches : 0,
					score : 20,
					second : -1,
					first : -1};
	}

	toggle(side) {
		var t = this.state.tiles;
		var c = this.state.clicks;
		var v = this.state.visible;
		var a = this.state.active;
		var f = this.state.first;
		var s = this.state.second;
		var m = this.state.matches; 
		var sc = this.state.score;
		if (f != side && v[side] != 1) {
			c++;
			if (this.state.active == 0) {
				f = side;
				a = 1;
				s = -1;
			} else if (this.state.active == 1 && f != side) {
				if (t[f] == t[side]){
					v[f] = 1;
					v[side] = 1;
					m = m+1;
					sc = sc + 12;
					if (m == 8) {
						//game over
						sc = sc - 2;
						alert("You win, score:" + sc );
					}
				}
				s = side;
				a = 0;
				sc = sc - 2;
			}
			var side = +!this.state.side;
			this.setState({side: side, clicks:c, visible:v, second:s, active:a, first:f, matches:m, score:sc});
			if (a == 0 && f != -1) {
				setTimeout(() => {s = -1; f = -1;
					this.setState({ second:s, first:f});}, 1000);
			}
		}	
	}

	//refrenced stack overflow https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
	shuffle () {
		let tiles = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
		for (let i = 0; i < tiles.length; i++) {
			let j = Math.floor(Math.random() * (i + 1));
			[tiles[i], tiles[j]] = [tiles[j], tiles[i]];
		}
		return tiles;
	}

	restart() {
		this.setState({tiles:this.shuffle(),
					visible : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 					clicks : 0,
					active : 0,
          matches : 0,
         	score : 0,
					second : -1,
          first : -1});
  }

	render() {
		var toggle = this.toggle.bind(this);
		//var state = {tiles : this.shuffle(), score : 20};
		var restart = this.restart.bind(this);
		var value =  ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
		for (let i = 0; i < this.state.tiles.length; i++) {
			if (this.state.visible[i] == 1 || this.state.first == i || this.state.second == i) {
				value[i] = this.state.tiles[i];
			}
		}

		return (
			<div>
				<div className="grid">
				<div className = "row">
					<button onClick={ () => toggle(0) } className = "tile">{value[0] }</button>
					<button onClick={ () => toggle(1) } className = "tile">{value[1]}</button>
					<button onClick={ () => toggle(2) } className = "tile">{value[2]}</button>
					<button onClick={ () => toggle(3) }c className = "tile">{value[3]}</button>
				</div>	
				<div className = "row">
					<button onClick={ () => toggle(4) } className = "tile">{value[4]}</button>
					<button onClick={ () => toggle(5) } className = "tile">{value[5]}</button>
					<button onClick={ () => toggle(6) } className = "tile">{value[6]}</button>
					<button onClick={ () => toggle(7) } className = "tile">{value[7]}</button>
				</div>  
				<div className = "row">
					<button onClick={ () => toggle(8) } className = "tile">{value[8]}</button>
					<button onClick={ () => toggle(9) } className = "tile">{value[9]}</button>
					<button onClick={ () => toggle(10) } className = "tile">{value[10]}</button>
					<button onClick={ () => toggle(11) } className = "tile">{value[11]}</button>
				</div>  
				<div className = "row">
					<button onClick={ () => toggle(12) } className = "tile">{value[12]}</button>
					<button onClick={ () => toggle(13) } className = "tile">{value[13]}</button>
					<button onClick={ () => toggle(14) } className = "tile">{value[14]}</button>
					<button onClick={ () => toggle(15) } className = "tile">{value[15]}</button>
				</div>  
				</div>
				<div className = "score">
					<div>
						<p> clicks : {this.state.clicks } </p>	
					</div>
					<br />
					<div>
						<p> score : {this.state.score } </p>
					</div>
					<br />
					<div>
						<button className = "restart" onClick = {() => restart()}> restart </button>
					</div>
				</div>
			</div>
		);
  }
}

function Side(params) {
  if (params.show) {
    return (
      <div id="side-0" className="side col" onMouseOver={ () => params.toggle() }>
        <Button onClick={ () => alert("cheater") }>Click Me</Button>
      </div>
    );
  }
  else {
    return (
      <div id="side-0" className="side col">
        &nbsp;
      </div>
    );
  }
}
