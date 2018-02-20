import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

export default function run_demo(root, channel) {
   
  ReactDOM.render(<Demo channel = {channel}/>, root);
}

class Demo extends React.Component {
	constructor(props) {
		super(props);
		this.channel = props.channel;
		this.state = { 
                  tiles:[],
                  visible: [],
                  clicks: '',
                  active: '',
                  matches: '',
                  score: 20,
                  second: -1,
                  first: -1};
		this.channel.join()
                  .receive("ok", this.gotView.bind(this))
                  .receive("error", resp => {console.log("Unable to join", resp)});
	}

	toggle(side) {
		this.channel.push("guess", {index: side})
                  	.receive("ok", this.gotView.bind(this))
                	.receive("error", resp => {console.log("Unable to toggle", resp)});
	}
	
	gotView(view) {
    		console.log("New view", view);
    		this.setState(view.game);
		if (view.game.active == 2) {
			$('#board').css('pointer-events', 'none');
			setTimeout (() => {	
                        this.channel.push("reset")
				.recieve("ok", this.gotView.bind(this))
				.recieve("error", resp => {console.log("reset failiure", resp)})}, 1000);
			$('#board').css('pointer-events', 'auto');
			render();	
		}
  	}

	restart() {
    		this.channel.push("restart")
 			.receive("ok", this.gotView.bind(this))
			.receive("error", resp => {console.log("Unable to restart", resp)});
  	}

	render() {
		var toggle = this.toggle.bind(this);
		var restart = this.restart.bind(this);
		var j = 0;
		var value =  ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
		for (let i = 0; i < this.state.tiles.length; i++) {
			if (this.state.visible[i] == 1 || this.state.first == i || this.state.second == i) {
				value[i] = this.state.tiles[i];
				j++
			}
		}

		let x = "";
		if (j == 16) {
			alert("Congratulations! You Win");
			x = "Congratulations! You Win!";
		}

		return (
			<div>
				<div className="grid" id = "grid">
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
						<p>{x + " "+ this.state.matches}</p>
						<button className = "restart" onClick = {() => restart()}> restart </button>
					</div>
				</div>
			</div>
		);
  	}
}
