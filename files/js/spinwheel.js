// const wheel = document.getElementById('wheel');
// let spinBtn = document.getElementById('spin-btn');
// const finalValue = document.getElementById('final-value');

// const rotationValues = [
// 	{minDegree: 0, maxDegree: 120, value: "Cкидка 200 MDL"},
// 	{minDegree: 121, maxDegree: 240, value: 'Бесплатная доставка'},
// 	{minDegree: 241, maxDegree: 360, value: "Cкидка 100 MDL"},
// ];

// const data = [16,16,16];

// let pieColors = ["#4a98fa","#7472dd","#e93565"];

// let myChart = new Chart(wheel, {
// 	plugins: [ChartDataLabels],

// 	type: "pie",
// 	data: {
// 		labels: ["🎁","🎁","🎁"],
// 		datasets: [
// 			{
// 				backgroundColor: pieColors,
// 				data: data,
// 			}
// 		]
// 	},
// 	options: {
// 		responsive: true,
// 		animation: {duration: 0} , 
// 			plugins: {
// 				tooltip: false,
// 				legend: {
// 					display: false
// 				},
// 				datalabels: {
// 					color: "#fffff",
// 					formatter: (_,context) => context.chart.data.labels[context.dataIndex],
// 					font: {size: 40},
// 				}
			
// 		}
// 	}
// })


// const valueGenerator = (angleValue) => {
// 	for(let i of rotationValues) {

// 		if(angleValue >= i.minDegree && angleValue <= i.maxDegree ) {
// 			finalValue.innerHTML = `<p>${i.value}</p>`;

// 			break;
// 		}
// 	}
// }

// let count = 0;

// let resultValue = 101;
// spinBtn.addEventListener('click', () => {
// 	spinBtn.disabled = true;
// 	finalValue.innerHTML= `<p>Желаем удачи</p>`;
// 	let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);

// 	let rotationInterval = window.setInterval(() => {
// 		myChart.options.rotation = myChart.options.rotation + resultValue;

// 		myChart.update();
// 		if(myChart.options.rotation >= 360 ) {
// 			count += 1;
// 			resultValue -= 5;
// 			myChart.options.rotation = 0;

// 		}else if (count > 15 && myChart.options.rotation == randomDegree) {
// 			valueGenerator(randomDegree);
// 			clearInterval(rotationInterval);
// 			count = 0;
// 			resultValue = 101;
// 		}

// 	}, 10)
// })