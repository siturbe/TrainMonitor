let trainsInTable;
let triansInTableFB;

//Make Add Train Functioinality Work
document.addEventListener("DOMContentLoaded",function(){
    const addTrainForm = document.querySelector("#add-train-form");
    addTrainForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newTrainDate = addTrainForm['add-date'].value;
        const newTrainName = addTrainForm['add-name'].value;
        const newTrainOrigin = addTrainForm['add-origin'].value;
        const newTrainDestination = addTrainForm['add-destination'].value;
        const newTrainDepTime = addTrainForm['add-depTime'].value;
        const newTrainArrTime = addTrainForm['add-arrTime'].value;

        //Add New Train Info to Firestore
        var myTrainsRef = db.collection('trains');
        var trainsCollection = Promise.all([
            myTrainsRef.doc().set({
                date: newTrainDate,
                name: newTrainName,
                origin: newTrainOrigin,
                destination: newTrainDestination,
                departure: newTrainDepTime,
                arrival: newTrainArrTime,
                type: 'train',
            })
        ]);

        //Read All Trains from Firestore and put in table
        let IDsToTable=[];
        var trainsInFS = db.collection('trains').where('type','==', 'train').orderBy('date','desc');
        trainsInFS.get().then(function(querySnapshot){
            $('#train-table').empty();
            let trainsInTableFB = [ ];
            querySnapshot.forEach(function(doc){
                let train = doc.data();
                trainsInTableFB.push(train);
                let FBid = doc.id;
                IDsToTable.push(FBid);

                let date = doc.data().date;
                    let momentDate = moment(date);
                let name = doc.data().name;
                let origin = doc.data().origin;
                let destination = doc.data().destination;
                let departure = doc.data().departure;
                    let departureFormat = "hh:mm A";
                    let momentTime = moment(departure, departureFormat);
                let arrival = doc.data().arrival;

                let dateTime = moment({
                    year: momentDate.year(),
                    month: momentDate.month(),
                    day: momentDate.date(),
                    hour: momentTime.hours(),
                    minute: momentTime.minutes()
                });

                
                let tRow = $('<tr>')
                let dateTD = "<td class='dateTD'> " + date + "</td>";
                    tRow.append(dateTD);
                let nameTD = "<td class='nameTD'> " + name + "</td>";
                    tRow.append(nameTD);
                let originTD = "<td class='originTD'> " + origin + "</td>";
                    tRow.append(originTD);
                let destinationTD = "<td class='destinationTD'> " + destination + "</td>";
                    tRow.append(destinationTD);
                let departureTD = "<td class='departureTD'> " + departure + "</td>";
                    tRow.append(departureTD);
                let arrivalTD = "<td class='arrivalTD'> " + arrival + "</td>";
                    tRow.append(arrivalTD);
                let timeUntilTD = "<td class='timeUntilTD'> " + moment(dateTime).fromNow() +"</td>";
                    tRow.append(timeUntilTD);

                $('#train-table').append(tRow);  

            })
            trainsInTable = [...new Set(trainsInTableFB)];
            

        });
        
        const modal = document.querySelector('#modal-addTrain');
        M.Modal.getInstance(modal).close();
        addTrainForm.reset();
    });
})



//Make Clear List Functionality Work
document.addEventListener("DOMContentLoaded", function(){
    const clearTrainForm = document.querySelector("#clear-train-form");
    clearTrainForm.addEventListener('submit', (e) =>{
        e.preventDefault();
        let choice;
        let clearTrue = document.getElementById('clear-box').checked;
        if( clearTrue == true){choice='delete'} else { choice = 'NOdelte'};
        
        if(choice === 'delete'){
            let IDsToDelete = [ ];
            var trainsInFS = db.collection('trains').where('type','==', 'train');
            trainsInFS.get().then(function(querySnapshot){
                querySnapshot.forEach(function(doc){
                    let FBid = doc.id;
                    IDsToDelete.push(FBid);
                })
               
                for(let i=0; i<IDsToDelete.length; i++){
                    db.collection('trains').doc(IDsToDelete[i]).delete();
                }
                $('#train-table').empty();
                trainsInTable = [];
                trainsInTableFB = [];
    
            });

        }
        



        const modal = document.querySelector('#modal-clearTrain');
        M.Modal.getInstance(modal).close();
        clearTrainForm.reset();        
    });
})



//Load Table from FireBase
$(document).ready(function(){
    var trainsInFS = db.collection('trains').where('type','==', 'train').orderBy('date','desc');
    trainsInFS.get().then(function(querySnapshot){
        $('#train-table').empty();
        let trainsInTableFB = [ ];
        querySnapshot.forEach(function(doc){
            let train = doc.data();
            trainsInTableFB.push(train);

            let date = doc.data().date;
                let momentDate = moment(date);
            let name = doc.data().name;
            let origin = doc.data().origin;
            let destination = doc.data().destination;
            let departure = doc.data().departure;
                let departureFormat = "hh:mm A";
                let momentTime = moment(departure, departureFormat);
            let arrival = doc.data().arrival;

            let dateTime = moment({
                year: momentDate.year(),
                month: momentDate.month(),
                day: momentDate.date(),
                hour: momentTime.hours(),
                minute: momentTime.minutes()
            });


            let tRow = $('<tr>')
            let dateTD = "<td class='dateTD'> " + date + "</td>";
                tRow.append(dateTD);
            let nameTD = "<td class='nameTD'> " + name + "</td>";
                tRow.append(nameTD);
            let originTD = "<td class='originTD'> " + origin + "</td>";
                tRow.append(originTD);
            let destinationTD = "<td class='destinationTD'> " + destination + "</td>";
                tRow.append(destinationTD);
            let departureTD = "<td class='departureTD'> " + departure + "</td>";
                tRow.append(departureTD);
            let arrivalTD = "<td class='arrivalTD'> " + arrival + "</td>";
                tRow.append(arrivalTD);
            let timeUntilTD = "<td class='timeUntilTD'> " + moment(dateTime).fromNow() +"</td>";
                tRow.append(timeUntilTD);

            $('#train-table').append(tRow);  

        })
        trainsInTable = [...new Set(trainsInTableFB)];
        

    });

});






// materialize components
document.addEventListener('DOMContentLoaded', function() {
    let modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
    let items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

  });

  //initialize the side nav
  $(document).ready(function(){
    $('.sidenav').sidenav();
  });


  //initialize DatePicker timepicker
  $(document).ready(function(){
    $('.datepicker').datepicker();
  });

$(document).ready(function(){
    $('.timepicker').timepicker();
  });

  
//Code attempting at just reloading the Div in question and not whole page every 60 seconds, but ran out of time
// function reloadTime(){
//     $('.timeUntilTD').load('index.html .timeUntilTD *');
// }

// (function(){
//     setTimeout(reloadTime, 60000);
// })