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


var getResultFromPromise = function(promise){
    promise.then(function(x) {
        console.log('loaded data')
    });
}
var index=[];
var current = 10000;
var max = 190000;
var increment = 10000;
while(current <= max ) {
    promise = jQuery.getJSON('https://health.data.ny.gov/resource/5q8c-d6xq.json?$limit=10000&$offset='+current);
    getResultFromPromise(promise)
    current += increment;
} 

// var p1= 
// var p2= jQuery.getJSON('https://health.data.ny.gov/resource/5q8c-d6xq.json?$limit=10000&$offset=10000');
// var p3= jQuery.getJSON('https://health.data.ny.gov/resource/5q8c-d6xq.json?$limit=20000&$offset=10000');
// var p4= jQuery.getJSON('https://health.data.ny.gov/resource/5q8c-d6xq.json?$limit=30000&$offset=10000');
// var p5= jQuery.getJSON('https://health.data.ny.gov/resource/5q8c-d6xq.json?$limit=40000&$offset=10000');
// var p6= jQuery.getJSON('https://health.data.ny.gov/resource/5q8c-d6xq.json?$limit=50000&$offset=10000');
// var p7= jQuery.getJSON('https://health.data.ny.gov/resource/5q8c-d6xq.json?$limit=60000&$offset=10000');
// var p8= jQuery.getJSON('https://health.data.ny.gov/resource/5q8c-d6xq.json?$limit=70000&$offset=10000');
// var p9= jQuery.getJSON('https://health.data.ny.gov/resource/5q8c-d6xq.json?$limit=80000&$offset=10000');
// var p10= jQuery.getJSON('https://health.data.ny.gov/resource/5q8c-d6xq.json?$limit=90000&$offset=10000');
// var p11= jQuery.getJSON('https://health.data.ny.gov/resource/5q8c-d6xq.json?$limit=100000&$offset=10000');
// var p12= jQuery.getJSON('https://health.data.ny.gov/resource/5q8c-d6xq.json?$limit=110000&$offset=10000');
// var p13= jQuery.getJSON('https://health.data.ny.gov/resource/5q8c-d6xq.json?$limit=120000&$offset=10000');
// var p14= jQuery.getJSON('https://health.data.ny.gov/resource/5q8c-d6xq.json?$limit=130000&$offset=10000');
// var p15= jQuery.getJSON('https://health.data.ny.gov/resource/5q8c-d6xq.json?$limit=140000&$offset=10000');
// var p16= jQuery.getJSON('https://health.data.ny.gov/resource/5q8c-d6xq.json?$limit=150000&$offset=10000');
// var p17= jQuery.getJSON('https://health.data.ny.gov/resource/5q8c-d6xq.json?$limit=160000&$offset=10000');
// var p18= jQuery.getJSON('https://health.data.ny.gov/resource/5q8c-d6xq.json?$limit=170000&$offset=10000');
// var p19= jQuery.getJSON('https://health.data.ny.gov/resource/5q8c-d6xq.json?$limit=180000&$offset=10000');
// var p20= jQuery.getJSON('https://health.data.ny.gov/resource/5q8c-d6xq.json?$limit=190000&$offset=1000');
//getResultFromPromise(p1)
// promise.all[(p1,p2,p3,p4,p5,p6,p7,p8,p9,p10,p11,p12,p13,p14,p15,p16,p17,p18,p19,p20)]
//     .then(function(x){
// 
//     }
// )
// localforage.keys().then(function(x){console.log(x)})



//var mathbiol={}
// root URI for https://health.data.ny.gov/resource/s8d9-z734.json etc 
//mathbiol.uri = 'health.data.ny.gov'
//mathbiol.sodaRead= new soda.Consumer(mathbiol.uri)
//mathbiol.yrs = [2009,2010,2011,2012,2013,2014]



