var response=
jQuery.getJSON('https://health.data.ny.gov/resource/5q8c-d6xq.json?$query=SELECT%20COUNT(*)')
    .then(function(x) {
        //console.log(x)
//debugger
        var count = parseInt(x[0].count);
        var wk = document.getElementById('work')
        wk.innerHTML='';
        wk.innerHTML='Number of observartions = '+ count
        wk.style.color='blue'
    });

var xx=[]
var getResultFromPromise = function(promise){
    promise.then(function(x) {
    console.log('loaded data') 
    xx.push(promise) 
    });
}
console.log(xx);
var index=[];
var current = 10000;
var max = 190000;
var increment = 10000;
while(current <= max ) {
    promise = jQuery.getJSON('https://health.data.ny.gov/resource/5q8c-d6xq.json?$limit=10000&$offset='+current);
    getResultFromPromise(promise)
    //getElement(xx)
    current += increment;
} 
 
 
var yourArray_year = [];
for(var i=1945; i < 2020;i++)
{
jQuery.getJSON('https://health.data.ny.gov/resource/5q8c-d6xq.json?year='+i)
  .then(function(obj){
     var count = Object.keys(obj).length;
	if(count!=''){
		for (var i = 0; i < obj.length; i++) {
         // alert(obj[i].patient_zipcode);
           yourArray_year.push(obj[i].year);
        }
        getDropDownList_year('year','year', $.unique(yourArray_year));  //   datas(obj,'');
	}
  })

}

   
function getDropDownList_year(name, id, optionList) {
    var combo = $("<select onchange='get_year();'></select>").attr("id", id).attr("name", name);
    combo.append("<option value='' >Please select year</option>");
    $.each(optionList, function (i, el) {
        combo.append("<option value="+ el +" >" + el + "</option>");
    });

    //return combo;
    // OR
	$("#drop_year").html('');
    $("#drop_year").append(combo);
}

 function get_year()
 {
	 var yr = $("#year option:selected").val(); 
	 if(yr!='')
	 {
		var yourArray = [];
		var patient = [];
		var current = 10000;
		var max = 190000;
		var increment = 10000;
		while(current <= max ) {

				jQuery.getJSON('https://health.data.ny.gov/resource/5q8c-d6xq.json?$limit=10000&$offset='+current+'&year='+yr)
				  .then(function(obj){
					 var count = Object.keys(obj).length;
					 
						 for (var i = 0; i < obj.length; i++) {
						 // alert(obj[i].patient_zipcode);

						   yourArray.push(obj[i].patient_zipcode);
						   patient.push(obj[i].patient_zipcode);
						   
						}
						getDropDownList('zipcode','zipcode', $.unique(yourArray))
						$("#total_record").html(patient.length);	
						  datas(obj,'');

			  })
			   current += increment;
	  }
		 }else
		 {
		   $("#drop").html('');
		 }
 }

function datas(obj,value){
 var index;
 var pqi_name= [];
 var y1  = [];
 var y2  = [];
 for    (index = 0; index < obj.length; index++) {
    pqi_name.push(obj[index].pqi_name);
    y1.push(obj[index].observed_rate_per_100_000_people);
    y2.push(obj[index].expected_rate_per_100_000_people);
 }
    var trace1 = {
      x: pqi_name,
      y: y1,
      name: 'Observed Rate ',
      marker: {color: 'rgb(55, 83, 109)'},
      type: 'bar'
    };

    var trace2 = {
      x: pqi_name,
      y: y2,
      name: 'Expected Rate ',
      marker: {color: 'rgb(26, 118, 255)'},
      type: 'bar'
    };

    var data = [trace1, trace2];
    if(value=='')
    {
      var text = 'Health data for all Zip code';
    }else
    {
      var text = 'Health data for ' +value+' Zip code';
    }
    var layout = {

      title: text,
      xaxis: {tickfont: {
          size: 14,
          color: 'rgb(107, 107, 107)'
        }},
      yaxis: {
        title: '',
        titlefont: {
          size: 16,
          color: 'rgb(107, 107, 107)'
        },
        tickfont: {
          size: 14,
          color: 'rgb(107, 107, 107)'
        }
      },
      legend: {
        x: 0,
        y: 1.0,
        bgcolor: 'rgba(255, 255, 255, 0)',
        bordercolor: 'rgba(255, 255, 255, 0)'
      },
      barmode: 'group',
      bargap: 0.15,
      bargroupgap: 0.1
    };

    Plotly.newPlot('myDiv', data, layout);
   //var wk = document.getElementById('work')
   //wk.innerHTML='';
    //wk.innerHTML='Number of observartions = '+obj.length
    //wk.style.color='blue'

}

function getDropDownList(name, id, optionList) {
    var combo = $("<select onchange='get_zipcode();'></select>").attr("id", id).attr("name", name);
    combo.append("<option value='' >Please select zipcode</option>");
    $.each(optionList, function (i, el) {
        combo.append("<option value="+ el +" >" + el + "</option>");
    });

    //return combo;
    // OR
	$("#drop").html('');
    $("#drop").append(combo);
}





function get_zipcode()
{
   yourArray=[];
  var value =   jQuery("#zipcode option:selected").val();
  
  	var yourArray = [];
		var patient = [];
		var current = 10000;
		var max = 190000;
		var increment = 10000;
		while(current <= max ) {
	 			  jQuery.getJSON('https://health.data.ny.gov/resource/5q8c-d6xq.json?$limit=10000&$offset='+current+'&patient_zipcode='+value)
				  .then(function(obj){
				jsonObj=[];
					 var count = Object.keys(obj).length;
						 for (var i = 0; i < obj.length; i++) {
						 // alert(obj[i].patient_zipcode);
						    yourArray.push(obj);

							item = {}
							item ["patient_zipcode"] = obj[i].patient_zipcode;
							item ["observed_rate_per_100_000_people"] = obj[i].observed_rate_per_100_000_people;
							item ["year"] = obj[i].year;
							item ["pqi_number"] = obj[i].pqi_number;
							item ["software_version"] = obj[i].software_version;
							item ["expected_rate_per_100_000_people"] = obj[i].expected_rate_per_100_000_people; 
							item ["pqi_name"] = obj[i].pqi_name;

							 jsonObj.push(item);
						 }
						 
        

      //  getDropDownList('zipcode','zipcode', $.unique(yourArray))

			datas(jsonObj,value);

			}) 
		}

}



