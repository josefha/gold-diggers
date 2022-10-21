/* App.js */
import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
// var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class App extends Component {
	render() {
		var dataPoint;
		var total;
    const numberOfLayers = 50;
    const dataPoints = [];
    const startY = 2850;
    let Y = startY;
    for(var i=0; i<numberOfLayers; i++){
      const yForThis = Y*0.8;
      dataPoints.push({label: "whatever", y: yForThis});
      Y = yForThis;
    }
		const options = {
			animationEnabled: true,
			title: {
				text: "Sales via Advertisement"
			},
			legend: {
				horizontalAlign: "right",
				verticalAlign: "center",
				reversed: true
			},
			data: [{
				type: "pyramid",
				showInLegend: true,
				legendText: "{label}",
				indexLabel: "{label} - {y}",
				toolTipContent: "<b>{label}</b>: {y} <b>({percentage}%)</b>",
				dataPoints
			}]
		}
		//calculate percentage
		dataPoint = options.data[0].dataPoints;
		total = dataPoint[0].y;
		for(var i = 0; i < dataPoint.length; i++) {
			if(i === 0) {
				options.data[0].dataPoints[i].percentage = 100;
			} else {
				options.data[0].dataPoints[i].percentage = ((dataPoint[i].y / total) * 100).toFixed(2);
			}
		}
		return (
		<div>
			<CanvasJSChart options = {options}
				 /*onRef={ref => this.chart = ref}*/
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}

      <a style={{fontSize: "52px", margin: "50px auto", color: "black"}} href="./RICH.pdf" download>Download the pdf baby</a>
		</div>
		);
	}
}
export default App;
