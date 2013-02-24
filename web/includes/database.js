/* Global Variables */
var trlocaldb;

function initDatabase() {
	try {
	    if (!window.openDatabase) {
	        alert('Databases are not supported in this browser.');
	    } else {
	        var shortName = 'teamrubiconlocal';
	        var version = '1.0';
	        var displayName = 'TeamRubiconLocalDb';
	        var maxSize = 500000; //  bytes
	        trlocaldb = openDatabase(shortName, version, displayName, maxSize);
	        createTables(trlocaldb);
			//selectAll();
	    }
	}catch(e){
 
	    if (e == 2) {
	        // Version number mismatch.
	        console.log("Invalid database version.");
	    } else {
	        console.log("Unknown error "+e+".");
	    }
	    return;
	}
}

function createTables(database){
	database.transaction(function (tx) {
	   tx.executeSql('CREATE TABLE IF NOT EXISTS WarehouseInfo(wId INT, wName VARCHAR(20), itemId INT, itemType VARCHAR(20), catDesc VARCHAR(20), brandDesc VARCHAR(100), condDesc VARCHAR(20), condDetDesc VARCHAR(20), quantity INT, isBulk VARCHAR(15));');
	   tx.executeSql('CREATE TABLE IF NOT EXISTS TeamInfo(teamMapId INT, teamName VARCHAR(20), itemId INT, itemType VARCHAR(20), catDesc VARCHAR(20), brandDesc VARCHAR(20), condDesc VARCHAR(20), condDetDesc VARCHAR(20), quantity INT, isBulk VARCHAR(15));');
	   tx.executeSql('CREATE TABLE IF NOT EXISTS TimeStampLocal(timestamp DATETIME);');
	});
	populate();
}

function populate(){
	//Get the data
	if (navigator.onLine){
		//if online, then get the data from the server..first we get the Warehouse info
		$.ajax({
		   url: "http://ec2-75-101-184-135.compute-1.amazonaws.com/rubicon/scripts/update_requests.php",
		   success: function(data){
			   trlocaldb.transaction(
					function (transaction) {
						var obj = jQuery.parseJSON(data);
						
						for (var i = 0; i<obj.length; i++){
							transaction.executeSql("INSERT INTO WarehouseInfo(wId, wName, itemId, itemType, catDesc, brandDesc, condDesc, condDetDesc, quantity, isBulk) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [obj[i][0], obj[i][1], obj[i][2], obj[i][3], obj[i][4], obj[i][5], obj[i][6], obj[i][7], obj[i][8], obj[i][9]]);
						}
					}
				);	
		   }
		 });
		 
		 //Next we get the teams
		 $.ajax({
		   url: "http://ec2-75-101-184-135.compute-1.amazonaws.com/rubicon/scripts/getTeams.php",
		   success: function(data){
			   trlocaldb.transaction(
					function (transaction) {
						var obj = jQuery.parseJSON(data);
						
						for (var i = 0; i<obj.length; i++){
							transaction.executeSql("INSERT INTO TeamInfo(teamMapId, teamName, itemId, itemType, catDesc, brandDesc, condDesc, condDetDesc, quantity, isBulk) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [obj[i][0], obj[i][1], obj[i][2], obj[i][3], obj[i][4], obj[i][5], obj[i][6], obj[i][7], obj[i][8], obj[i][9]]);
						}
					}
				);	
		   }
		 });
		 
		 
	}
}


function selectAll() {
    var results = $.get("example.php", function () {
        alert("success");
    })
}

function query(sql_statement, handler){
	trlocaldb.transaction(
	    function (tx) {
	        tx.executeSql(sql_statement, [], handler);
	    }
	);
}


function dataSelectHandler(transaction, results){
	// Handle the results
    for (var i=0; i<results.rows.length; i++) {
 
    	var row = results.rows.item(i);
        var newFeature = new Object();
 
    	newFeature.fname   = row['fname'];
        newFeature.bgcolor = row['bgcolor'];
        newFeature.font    = row['font'];
        newFeature.favcar  = row['favcar'];
 
        $('body').css('background-color',newFeature.bgcolor);
        $('body').css('font-family',newFeature.font);
        $('#content').html('<h4 id="your_car">Your Favorite Car is a '+ newFeature.favcar +'</h4>');
 
        if(newFeature.fname != 'none') {
       		$('#greeting').html('Howdy-ho, '+ newFeature.fname+'!');
       		$('#fname').val(newFeature.fname);
        }
 
       $('select#font_selection').find('option[value='+newFeature.font+']').attr('selected','selected');
       $('select#bg_color').find('option[value='+newFeature.bgcolor+']').attr('selected','selected');
       $('select#fav_car').find('option[value='+newFeature.favcar+']').attr('selected','selected');
    }
 
}

function update(dataObject){
	trlocaldb.transaction(
	    function (transaction) {
	    	if($('#fname').val() != '') {
	    		var fname = $('#fname').val();
	    	} else {
	    		var fname = 'none';
	    	}
			var bg    = $('#bg_color').val();
			var font  = $('#font_selection').val();
			var car   = $('#fav_car').val();
	    	transaction.executeSql("UPDATE page_settings SET fname=?, bgcolor=?, font=?, favcar=? WHERE id = 1", [fname, bg, font, car]);
	    }
	);
		selectAll();
}



$(function () {
    initDatabase();
});
