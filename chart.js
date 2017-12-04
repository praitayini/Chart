
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
    },function(error){
      console.error('uh oh:',error);
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


var grid = {};
jQuery(function($) {
  for(var i = 0; i < xx.length; i++){
  for (var j = 0; j < xx[i].responseJSON.length; j++) {
    year = xx[i].responseJSON[j].year;
    zipcode = xx[i].responseJSON[j].patient_zipcode;
    if( grid[year] )
      grid[year][zipcode] = 1
    else
      grid[year] = { zipcode : 1 }
  }
}
yrs=Object.keys(grid)
for(var i = 0; i < yrs.length; i++) {
  zips = Object.keys( grid[yrs[i]] );
  grid[yrs[i]] = zips;
} 

console.log(grid)
});


jQuery(function($) {
    
    var $locations = $('#location');
    $('#year').change(function () {
        var year = $(this).val().toString();
        console.log(year);
        console.log(grid);
        lcns = grid[year] || [1,2,3];
        var html = $.map(lcns, function(lcn){
            return '<option value="' + lcn + '">' + lcn + '</option>'
        }).join('');
        console.log(html)
        $locations.html(html)
    });
});


/*
localforage.setItem('health',xx)
  .then(function(dt)
    {//console.log(dt)

    })

localforage.getItem('health')
  .then(function(photo) {
    // Create a data URI or something to put the photo in an <img> tag or similar.
    console.log(photo);
});
*/
/*
jQuery.getJSON('https://health.data.ny.gov/resource/5q8c-d6xq.json')
  .then(function(obj){
     var count = Object.keys(obj).length;
         for (var i = 0; i < obj.length; i++) {
         // alert(obj[i].patient_zipcode);
           yourArray.push(obj[i].patient_zipcode);
        }
        getDropDownList('zipcode','zipcode', $.unique(yourArray))

          datas(obj,'');

  })
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
    $("#drop").append(combo);
}





function get_zipcode()
{
   yourArray=[];
  var value =   jQuery("#zipcode option:selected").val();
  jQuery.getJSON('https://health.data.ny.gov/resource/5q8c-d6xq.json')
  .then(function(obj){
jsonObj=[];
     var count = Object.keys(obj).length;
         for (var i = 0; i < obj.length; i++) {
         // alert(obj[i].patient_zipcode);
         if(obj[i].patient_zipcode==value || value==''){
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
        }
        

      //  getDropDownList('zipcode','zipcode', $.unique(yourArray))

          datas(jsonObj,value);

  }) 

}










/*jQuery.getJSON('https://health.data.ny.gov/resource/5q8c-d6xq.json')
  .then(function(y){
    return new Promise(function(resolve, reject) {
      localforage.setItem('https://health.data.ny.gov/resource/5q8c-d6xq', y)
         .then(function () {
         return localforage.getItem('https://health.data.ny.gov/resource/5q8c-d6xq');})
           .then(function (y) {
             resolve(y)})// we got our value
              .catch(function (err) {
                reject(err);// we got an error
           });
     })
})



sparcs.countCounty=function(){
    var pp =[] // promises
    // get variables
    pp.push(
        sparcs.getJSON('https://health.data.ny.gov/resource/5q8c-d6xq.json?$limit=1')
         .then(function(x){ // sampling one reccord from 2014
            sparcs.vars=Object.getOwnPropertyNames(x[0])
          })
    )
    sparcs.years.forEach(function(yr){
        sparcs.urls[yr].county={}
        var li = document.createElement('li')
        sparcsYearsInfo.appendChild(li)
        li.innerHTML='<b>'+yr+'</b>: <span style="color:orange">counting ...</span>'
        li.id="liYear_"+yr
        var url = sparcs.urls[yr].url
        // https://dev.socrata.com/docs/queries/
        // https://dev.socrata.com/docs/functions
        pp.push(sparcs.getJSON(url+'?$select=hospital_county,%20count(*)&$group=hospital_county&$limit=10000')
         .then(function(x){
            sparcs.urls[yr].count=0
            x.forEach(function(xi){
                xi.hospital_county=xi.hospital_county||'NA'
                sparcs.urls[yr].county[xi.hospital_county]={count:parseInt(xi.count)}
                sparcs.urls[yr].count+=sparcs.urls[yr].county[xi.hospital_county].count
                4

            })
            li.innerHTML='For <b style="color:blue">'+yr+'</b> found <b style="color:blue">'+sparcs.urls[yr].count.toLocaleString()+'</b> patient records in <b style="color:blue">'+Object.entries(sparcs.urls[yr].county).length+'</b> counties</span>'
        }))
    })
    //console.log(pp)
    return Promise.all(pp)
}


yourArray = []; obj = {};
  for (var i = 0; i < xx.length; i++) {
    for (var j = 0; j < xx[i].responseJSON.length; j++){
		year = xx[i].responseJSON[j].year;
		zipcode = xx[i].responseJSON[j].patient_zipcode
		obj['year']['zipcode'] = 1;
		yourArray.push(year);
      }
  }
*/


    
    
    




