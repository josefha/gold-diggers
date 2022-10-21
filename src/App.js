/* App.js */
import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
// var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class App extends Component {
	render() {
		var dataPoint;
		var total;
    const numberOfLayers = 20;
    const dataPoints = [];
    const startY = 2850;
    const currentSales = ["Robin","Hugo","Shani","Victor","David"];
    let Y = startY;
    for(var i=0; i<numberOfLayers; i++){
      const yForThis = Y*1;
      const label = i<currentSales.length ? currentSales[i] : "Open for sale"
      dataPoints.push({label, y: yForThis});
      Y = yForThis;
    }
    const reversedData = dataPoints.reverse();
		const options = {
      height: 1000,
			animationEnabled: true,
			title: {
				text: "Gold digger - buy gold and be a digger"
			},
			data: [{
				type: "pyramid",
				legendText: "{label}",
				indexLabel: "{label} - {y}",
				toolTipContent: "<b>{label}</b>: {y} <b>({percentage}%)</b>",
				dataPoints: reversedData
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
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}
export default App;
