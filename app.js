
var myBooks = [
            {
                "Name": "Alok",
                "Marks": 23,
                "Subject": "Computers"
               
            },
            {
                "Name": "Neha",
                "Marks": 24,
                "Subject": "History"
              
            },
            {
                "Name": "Alok",
                "Marks": 26,
                "Subject": "History"
              
            },
            {
                "Name": "Alok",
                "Marks": 26,
                "Subject": "Chemistry"
              
            },
            {
                "Name": "Neha",
                "Marks": 32,
                "Subject": "Computer"
            }
        ]
//  
//  
  var myDocs = [
            {
                "LDAP": "Alok",
                "Score": 23,
                "Course": "Computers",
                "Time Taken": 12
               
            },
            {
                "LDAP": "Alok",
                "Score": 28,
                "Course": "Chemistry",
                "Time Taken": 29
               
            },
            {
                "LDAP": "Neha",
                "Score": 24,
                "Course": "History",
                "Time Taken": 31
              
            },
            {
                "LDAP": "Alok",
                "Score": 26,
                "Course": "History",
                "Time Taken": 45
              
            },
            {
                "LDAP": "Neha",
                "Score": 26,
                "Course": "Chemistry",
                "Time Taken": 13
              
            },
            {
                "LDAP": "Sunil",
                "Score": 24,
                "Course": "History",
                "Time Taken": 17
              
            },
            {
                "LDAP": "Sunil",
                "Score": 24,
                "Course": "Chemistry",
                "Time Taken": 17
              
            }
        ]
  
  var sheetId = "1jorzZXpSORH4tUkYK_HtW1cMNWYhGiOAMxcqUEPISe8";

var getSheetURL = 'https://spreadsheets.google.com/feeds/list/'+sheetId+'/1/public/values?alt=json';
  
  $.getJSON(getSheetURL,function(response){
    
    myDocs =response.feed.entry.map(function(m,i){return JSON.parse("{\""+response.feed.entry.map(function(data){return data.content.$t})[i].trim().split(",").join('","').trim().split(":").join('":"').trim()+"\"}")});
    
      var select = document.getElementById("D1");


var optionsVal = Object.values(myDocs[0]).filter(function(v){return !isNaN(v);}).map(function(val){ return Object.keys(myDocs[0])[Object.values(myDocs[0]).indexOf(val)] });
      
      
      var stringHeadersVal = Object.values(myDocs[0]).filter(function(v){return isNaN(v);}).map(function(val){ return Object.keys(myDocs[0])[Object.values(myDocs[0]).indexOf(val)] });


for(var i=0;i<optionsVal.length;i++) {    
    opt = document.createElement("option");
    opt.value =optionsVal[i];
    opt.textContent = optionsVal[i];
    select.appendChild(opt);
}

document.getElementById("D1").addEventListener("change",function(event){
    dropDownChangd();
});


function dropDownChangd() {
    var selectedVal = $( "#D1 option:selected" ).text();
    
    for(var i=0;i< stringHeadersVal.length;i++) {
         var gData = getMarksById(myDocs,stringHeadersVal[i],selectedVal).map(
        function(data){
            var obj={};
            obj["name"]=data[stringHeadersVal[i]];
            obj["y"]=Number(data[selectedVal]);
            return obj; 
        });
        drawPieChart(gData,stringHeadersVal[i],stringHeadersVal[i]+" Breakage");
    }
    
}
      
      
      

      
document.getElementById("dropDownButton").addEventListener("click",function(){
     document.getElementById("myDropdown").classList.toggle("show");
})      

// Close the dropdown if the user clicks outside of it
window.onclick = function(e) {
  if (!e.target.matches('.dropbtn')) {
    var myDropdown = document.getElementById("myDropdown");
      if (myDropdown.classList.contains('show')) {
        myDropdown.classList.remove('show');
      }
  }
}

dropDownChangd();


createTableFromJSON(myDocs);
      
  });
  
  
  
  
 function getTotal(val, name1, name2, numVal1,numVal2) {
    totalArr1 =  val.reduce(function(r,o){if(r){r+= o[numVal1];} else {r= o[numVal1];} return r;},(0));
    totalArr2 =  val.reduce(function(r,o){if(r){r+= o[numVal2];} else {r= o[numVal2];} return r;},(0));
    var obj={};
    obj[numVal1] = totalArr1;
    obj[numVal2] = totalArr2;
    obj[name1] = "All";
    obj[name2] = "All";
    val.push(obj);
    
    return val;
  
     
 }



  
  function getMarksById(val, name, numVal ){  
    var valObj = val.reduce(
          function(r, o){
              if(r[o[name]]){
                  r[o[name]] +=Number(o[numVal]); }
              else {r[o[name]] = Number(o[numVal]); }
              return r;
          },{}); 
    var finalObj =  Object.keys(valObj).map(function(v,i){var obj={};obj[name]= v;obj[numVal]= valObj[v]; return obj; });
    totalArr =  finalObj.reduce(function(r,o){if(r){r+= o[numVal];} else {r= o[numVal];} return r;},(0));
    var obj={};
    obj[numVal] = totalArr;
    obj[name] = "All";
   // finalObj.push(obj);
    
    return finalObj;
  }
 




//CreateTableFromJSON(getMarksById(myBooks,"Subject","Marks"));

//CreateTableFromJSON(getMarksById(myBooks,"Subject","Marks"));

//CreateTableFromJSON(getMarksById(myDocs,"LDAP","Time Taken"));

// CreateTableFromJSON(getMarksById(myDocs,"Course","Time Taken"));

//CreateTableFromJSON(myBooks);
//CreateTableFromJSON(getTotal(myDocs,"LDAP","Course","Time Taken","Score"));








