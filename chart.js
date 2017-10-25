var count=jQuery.getJSON('https://health.data.ny.gov/resource/5q8c-d6xq.json?$query=SELECT%20COUNT(*)')
console.log(count)
//mathbiol=(function(){
var mathbiol={}
// root URI for https://health.data.ny.gov/resource/s8d9-z734.json etc 
// mathbiol.uri = 'health.data.ny.gov'
// mathbiol.yrs = [2009,2010,2011,2012,2013,2014]

/*mathbiol.res={}
mathbiol.res[2009]="s8d9-z734"
mathbiol.res[2010]="dpew-wqcg"
mathbiol.res[2011]="n5y9-zanf"
mathbiol.res[2012]="rv8x-4fm3"
mathbiol.res[2013]="tdf6-7fpk"
mathbiol.res[2014]="pzzw-8zdv"


// data sources
mathbiol.dtSrc={}
mathbiol.yrs.forEach(function(yr){
    mathbiol.dtSrc['url'+yr]='https://'+mathbiol.uri+'/resource/'+mathbiol.res[yr]+'.json'
})

mathbiol.dt.url2009="https://health.data.ny.gov/resource/s8d9-z734.json"
mathbiol.dt.url2010="https://health.data.ny.gov/resource/dpew-wqcg.json"
mathbiol.dt.url2011="https://health.data.ny.gov/resource/n5y9-zanf.json"
mathbiol.dt.url2012="https://health.data.ny.gov/resource/rv8x-4fm3.json"
mathbiol.dt.url2013="https://health.data.ny.gov/resource/tdf6-7fpk.json"
mathbiol.dt.url2014="https://health.data.ny.gov/resource/pzzw-8zdv.json"


// SODA readers

//mathbiol.sodaRead= new soda.Consumer(mathbiol.uri)

4

// get 
mathbiol.get=function(q,yr){
    if(!yr){
    yr=Object.getOwnPropertyNames(mathbiol.dtSrc)
    }
    if(!Array.isArray(yr)){
    yr=[yr]
    }
    // handle year provided as number
    yr=yr.map(function(yi){
        if(typeof(yi)=="number"){yi="url"+yi}
        return yi
    })
}
*/
mathbiol.count=function(yrs,fun){
    yrs = yrs || mathbiol.yrs
    if(typeof(yrs)=="number"){yrs=[yrs]} // making sure it is an Array
    var count={}
    console.log('number of entries for years ',yrs)
    yrs.forEach(function(yr){
        $.getJSON('https://health.data.ny.gov/resource/5q8c-d6xq.json?$query=SELECT%20COUNT(*)')
         .then(function(c){
             c[0].COUNT=parseInt(c[0].COUNT)
                 console.log(yr,c[0].COUNT)
             count[yr]=c[0].COUNT
             // have some fun if done
             if(Object.getOwnPropertyNames(count).length==yrs.length){
                 console.log('done:')
                 fun = fun || function(){console.log(count)}
                 fun()
             }
         })
    })
    return count
    //https://health.data.ny.gov/resource/s8d9-z734.json?$query=SELECT%20COUNT(*)

}



var yourArray = [];

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
   var wk = document.getElementById('work')
   wk.innerHTML='';
    wk.innerHTML='Number of observartions = '+obj.length
    wk.style.color='blue'

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


