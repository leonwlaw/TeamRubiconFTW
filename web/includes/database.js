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
			selectAll();
	    }
	} catch(e) {
 
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
	   tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)');
	});
	console.log("Created table");
	//prePopulate();
}

function prePopulate(){
	trlocaldb.transaction(
	    function (transaction) {
		//Optional Starter Data when page is initialized
		var data = ['1','none','#B3B4EF','Helvetica','Porsche 911 GT3'];
		transaction.executeSql("INSERT INTO page_settings(id, fname, bgcolor, font, favcar) VALUES (?, ?, ?, ?, ?)", [data[0], data[1], data[2], data[3], data[4]]);
	    }
	);
}

function selectAll(){
	trlocaldb.transaction(
	    function (transaction) {
	        transaction.executeSql("SELECT * FROM page_settings;", [], dataSelectHandler);
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

function updateSetting(){
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

initDatabase();
