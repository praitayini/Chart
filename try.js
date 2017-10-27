var response=jQuery.getJSON('https://health.data.ny.gov/resource/5q8c-d6xq.json?$query=SELECT%20COUNT(*)')
    .then(  function(x) {
        var count = parseInt(count.responseJSON[0]['count']);
        var wk = document.getElementById('work')
        wk.innerHTML='';
        wk.innerHTML='Number of observartions = '+ count
        wk.style.color='blue'
    });
var wk = document.getElementById('work')
wk.innerHTML='';
wk.innerHTML='Number of observartions = '+ count
wk.style.color='blue'
//mathbiol=(function(){
var p1=[];
var p2=[];
var index=[];    
var p1= jQuery.getJSON('https://health.data.ny.gov/resource/5q8c-d6xq.json?$limit=10000');
var p2= jQuery.getJSON('https://health.data.ny.gov/resource/5q8c-d6xq.json?$limit=10000&offset=10000');
var p3= jQuery.getJSON('https://health.data.ny.gov/resource/5q8c-d6xq.json?$limit=20000&offset=10000');
var p3= jQuery.getJSON('https://health.data.ny.gov/resource/5q8c-d6xq.json?$limit=30000&offset=10000');

  
var mathbiol={}
// root URI for https://health.data.ny.gov/resource/s8d9-z734.json etc 
mathbiol.uri = 'health.data.ny.gov'
mathbiol.sodaRead= new soda.Consumer(mathbiol.uri)
mathbiol.yrs = [2009,2010,2011,2012,2013,2014]



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

mathbiol.sodaRead= new soda.Consumer(mathbiol.uri)

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
var wk = document.getElementById('work')
   wk.innerHTML='';
    wk.innerHTML='Number of observartions = '+ count
    wk.style.color='blue'



jQuery.getJSON('https://health.data.ny.gov/resource/5q8c-d6xq.json')
  .then(function(obj) {
     var count = Object.keys(obj).length;
         for (var i = 0; i < obj.length; i++) {
         // alert(obj[i].patient_zipcode);
           yourArray.push(obj[i].patient_zipcode);
        }
        MAX_THRESHOLD = 10000
        min = 0
        max = MAX_THRESHOLD
        while( max < yourArray.length() ){
            current_payload = yourArray.slice[min,max];
            // do whatever you want to do with you payload
            min += MAX_THRESHOLD + 1;
            max += MAX_THRESHOLD;
        }
        getDropDownList('zipcode','zipcode', $.unique(yourArray))

          datas(obj,'');

  }) 

  sparcs.getJSON=function(url){
    return new Promise(function(resolve, reject) {
      // do a thing, possibly async, then…
      localforage.getItem(url)
        .then(function(x){
            if(x){
                resolve(x)
            }else{
                $.getJSON(url)
                 .then(function(x){
                  localforage.setItem(url,x)
                  resolve(x)
                })
                 .fail(function(err){reject(err)})
            }})
    })
}


/*
sparcs.getJSON=function(url,fun,err){
    localforage.getItem(url)
     .then(function(x){fun(x)})
     .catch(function(){
         $.getJSON(url)
          .then(function(x){
              localforage.setItem(url,x)
              fun(x)
          })
          .fail(function(x){err(x)})
     })
}
*/

sparcs.countCounty=function(){
    var pp =[] // promises
    // get variables
    pp.push(
        sparcs.getJSON('https://health.data.ny.gov/resource/pzzw-8zdv.json?$limit=1')
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