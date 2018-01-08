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
                "Course": "Histoy",
                "Time Taken": 17
              
            },
            {
                "LDAP": "Sunil",
                "Score": 24,
                "Course": "Chemistry",
                "Time Taken": 17
              
            }
        ]
  
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
                  r[o[name]] +=o[numVal]; }
              else {r[o[name]] = o[numVal]; }
              return r;
          },{}); 
    var finalObj =  Object.keys(valObj).map(function(v,i){var obj={};obj[name]= v;obj[numVal]= valObj[v]; return obj; });
    totalArr =  finalObj.reduce(function(r,o){if(r){r+= o[numVal];} else {r= o[numVal];} return r;},(0));
    var obj={};
    obj[numVal] = totalArr;
    obj[name] = "All";
    finalObj.push(obj);
    
    return finalObj;
  }
 



//CreateTableFromJSON(getMarksById(myBooks,"Subject","Marks"));

//CreateTableFromJSON(getMarksById(myBooks,"Subject","Marks"));

//CreateTableFromJSON(getMarksById(myDocs,"LDAP","Time Taken"));

// CreateTableFromJSON(getMarksById(myDocs,"Course","Time Taken"));

//CreateTableFromJSON(myBooks);
//CreateTableFromJSON(getTotal(myDocs,"LDAP","Course","Time Taken","Score"));

CreateTableFromJSON(myDocs);



function CreateTableFromJSON(jsonElementArray) {

        // EXTRACT VALUE FOR HTML HEADER. 
        // ('Book ID', 'Book Name', 'Category' and 'Price')
        var col = [];
        for (var i = 0; i < jsonElementArray.length; i++) {
            for (var key in jsonElementArray[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");
        
            table.setAttribute("id","tableData");
            table.setAttribute("class","table table-striped table-bordered");
            
        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.


        var thead = document.createElement("thead");
                 
                
                
        table.appendChild(thead);        
   
        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i <  jsonElementArray.length; i++) {

            tr = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = jsonElementArray[i][col[j]];
            }
        }

      
                
        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
             
        var trThead = document.createElement("tr");
      //  var thThead = document.createElement("th");
                
        for (var i = 0; i < col.length; i++) {
            var thThead = document.createElement("th");      // TABLE HEADER.
            thThead.innerHTML = col[i];
            trThead.appendChild(thThead);
        }
                
                
        trThead.appendChild(thThead);
        document.querySelector("thead").appendChild(trThead);        
                
                
          var newtable = $('#tableData').DataTable({
                lengthChange: false,
                buttons: [ 'excel', 'pdf', 'colvis' ]
            });

            newtable.buttons().container().appendTo( ' .col-sm-6:eq(0)' );        
             
                
    }

  //CreateTableFromJSON(anotherBooks, "showNewData");

