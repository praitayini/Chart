jQuery.getJSON('https://health.data.ny.gov/resource/5q8c-d6xq.json')
  .then(function(dt){
    var avg=function(a){
      return a.reduce(function(a,b){
        return a+b
        })/a.length
    }
    console.log('data loaded: ',dt)
    var x=dt.map(function(xi){
      return parseFloat(xi.expected_rate_per_100_000_people)
    })
    avg(x)
    // data in x, ready for stats
    var wk = document.getElementById('work')
    wk.innerHTML='Number of observartions = '+x.length+'<br>Average value : '+avg(x)
    wk.style.color='blue'
    
    //debugger
})

Plotly.d3.json('https://health.data.ny.gov/resource/5q8c-d6xq.json', function(items){
 var index;
 var pqi_name= [];
 var y1  = [];
 var y2  = [];
 var patient_zipcode= [];
 var listofZipcode = [];
    
 for	(index = 0; index < items.length; index++) {
 	pqi_name.push(items[index].pqi_name);
 	y1.push(items[index].observed_rate_per_100_000_people);
 	y2.push(items[index].expected_rate_per_100_000_people);
    patient_zipcode.push(items[index].patient_zipcode);
 }
    

//var allCountryNames = unpack(rows, 'country'),
  //  allYear = unpack(rows, 'year'),
    //allGdp = unpack(rows, 'gdpPercap'),
    
    //var currentCountry,
    var currentY1 = [];
    var currentY2 = [];

  for (index = 0; index < items.length; index++ ){
    if (listofZipcode.indexOf(patient_zipcode[index]) === -1 ){
      listofZipcode.push(patient_zipcode[index]);
    }
  }
  
  function getZipcode(chosenZipcode) {
    var patient_zipcode = [];
    for (index = 0 ; index < items.length ; index++){
      if ( patient_zipcode[index] === chosenZipcode ) {
        currentY1.push(y1[index]);
        currentY2.push(y2[index]);
      } 
    }
  };

// Default Country Data
setBarPlot('10001');
  
function setBarPlot(chosenZipcode) {
    getZipcode(chosenZipcode);  

    var trace1 = {
      x: pqi_name,
      y: currentY1,
      name: 'Observed Rate (per 100,000 people)',
      marker: {color: 'rgb(55, 83, 109)'},
      type: 'bar'
    };

    var trace2 = {
      x: pqi_name,
      y: currentY2,
      name: 'Expected Rate (per 100,000 people)',
      marker: {color: 'rgb(26, 118, 255)'},
      type: 'bar'
    };

    var data = [trace1, trace2];

    var layout = {
      title: 'Health data in 2015'};

    Plotly.newPlot('plotdiv', data, layout);
};
  
var innerContainer = document.querySelector('[data-num="0"'),
    plotEl = innerContainer.querySelector('.plot'),
    zipcodeSelector = innerContainer.querySelector('.patientzipcode');

function assignOptions(textArray, selector) {
  for (var i = 0; i < textArray.length;  i++) {
      var currentOption = document.createElement('option');
      currentOption.text = textArray[i];
      selector.appendChild(currentOption);
  }
}

assignOptions(listofZipcode, zipcodeSelector);

function updateZipcode(){
    setBarPlot(zipcodeSelector.value);
}
  
zipcodeSelector.addEventListener('change', updateZipcode, false);
});