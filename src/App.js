/* App.js */
import styled from "styled-components";
import React, { useState } from 'react';
import CanvasJSReact from './canvasjs.react';
import Confetti from 'react-confetti'
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
  margin-top: 50px auto; 
  color: black; 
  text-align: center; 
  display: block;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px auto;
`;

const StyledInput = styled.input`
  width: 20%;
`;

const StyledButton = styled.button`
  margin-top: 20px;
  width: 20%;
`;


var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const App = () => {
  const [showConfetti, setShowConfetti] = useState(true)
  const [isPaid, setIsPaid] = useState(false)

  const handlePayment = () => {
    setIsPaid(true);
  }

  var dataPoint;
  var total;
  const numberOfLayers = 20;
  const dataPoints = [];
  const startY = 2850;
  const startMoney = 1;
  const currentSales = ["Robin","Hugo","Shani","Victor","David"];
  const SOLD = "SOLD";
  const BUY_NOW = "BUY NOW";
  let Y = startY;
  let oldPrice = startMoney;

  const onClick = function(e){
    console.log("e.datapoint",e.dataPoint);
  }

  for(var i=0; i<numberOfLayers; i++){
    const yForThis = Y*1;
    const label = i<currentSales.length ? currentSales[i] : "Open for sale"
    const price = oldPrice*2;
    const tooltip = i<currentSales.length ? SOLD : BUY_NOW
    dataPoints.push({label, y: yForThis, price, tooltip, click: onClick});
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
      toolTipContent: "<b>{tooltip}</b>",
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
        <CanvasJSChart options={options}
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}

        <StyledForm>
        <StyledInput type="text" placeholder="Name of card holder"></StyledInput>
        <StyledInput type="text" placeholder="Mastercard number"></StyledInput>
        <StyledInput type="text" label="hej" placeholder="Expiration date"></StyledInput>
        <StyledInput type="text" placeholder="CVV"></StyledInput>

        <StyledButton onClick={() => this.handlePayment()}>
          Pay now
        </StyledButton>
      </StyledForm>

        {isPaid && (
          <>
            <StyledHeader>Now you are an official gold digger!</StyledHeader>
            <StyledLink href="./rich.pdf" download>Download your golddigger certificate here</StyledLink>
          </>
        )}

      </div>
    );
  }

export default App;

