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


    for (var i = 0; i < pqi_name.length; i++ ){
        if (listofZipcode.indexOf(patient_zipcode[i]) === -1 ){
            listofZipcode.push(patient_zipcode[i]);
        }
    }

    function getZipcode(chosenZipcode) {
        currentY1 = [];
        currentP = [];
        for (var i = 0 ; i < pqi_name.length ; i++){
            if (patient_zipcode[i] === chosenZipcode) {
                currentP.push(pqi_name[i]);
                currentY1.push(y1[i]);
            }
        }
    };

    // Default Country Data
    setBubblePlot('10001');

    function setBubblePlot(chosenZipcode) {
        getZipcode(chosenZipcode);

        var trace1 = {
            x: currentP,
            y: currentY1,
            mode: 'lines+markers',
            marker: {
                size: 12,
                opacity: 0.5
            }
        };

        var data = [trace1];

        var layout = {
            title:'Line and Scatter Plot',
            height: 1000,
            width: 1000
        };

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
        setBubblePlot(zipcodeSelector.value);
    }

    zipcodeSelector.addEventListener('change', updateZipcode, false);
});
