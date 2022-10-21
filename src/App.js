/* App.js */
import styled from "styled-components";
import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;

const StyledHeader = styled.h1`
  font-size: 100px; 
  margin-top: 50px; 
  color: black; 
  text-align: center; 
  display: block;
`;

const StyledLink = styled.a`
  font-size: 52px; 
  margin-top: 50px; 
  color: black; 
  text-align: center; 
  display: block;
`;


var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class App extends Component {
	render() {
    let didPayment = true;
		var dataPoint;
		var total;
    const numberOfLayers = 20;
    const dataPoints = [];
    const startY = 2850;
    const startMoney = 1;
    const currentSales = ["Robin","Hugo","Shani","Victor","David"];
    let Y = startY;
    let oldPrice = startMoney;
    for(var i=0; i<numberOfLayers; i++){
      const yForThis = Y*1;
      const label = i<currentSales.length ? currentSales[i] : "Open for sale"
      const price = oldPrice*2;
      dataPoints.push({label, y: yForThis, price });
      oldPrice=price;
      Y = yForThis;
    }
    const reversedData = dataPoints.reverse();
    const colors = [];
    const gold= "#D4AF37";
    const gray ="#C8C6C4";
    for(var i=0; i<dataPoints.length; i++){
      if(i < currentSales.length){
        colors.push(gold);
      }else{
        colors.push(gray);
      }
    }
    const reversedColors = colors.reverse();
    CanvasJS.addColorSet("goldAndGray",reversedColors);
		const options = {
      colorSet: "goldAndGray",
      height: 1000,
			animationEnabled: true,
			title: {
				text: "Gold digger - buy gold and be a digger"
			},
			data: [{
				type: "pyramid",
				legendText: "{label}",
				indexLabel: "{label} - {price}$",
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

      {didPayment && (
        <>
          <StyledHeader>Now you are a official gold digger!</StyledHeader>
          <StyledLink href="./rich.pdf" download>Download your golddigger certificate here</StyledLink>
        </>
      )}
      
		</div>
		);
	}
}
export default App;

