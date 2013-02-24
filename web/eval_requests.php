<?php

//	Initialize my connection to the Database:
$db = new PDO('mysql:host=localhost;dbname=Inventory', 'root', 'root');

/* I can always expect an associative array sent in $_POST with these respective values:
- myfunc (signifying the function name)
- warehouse_name = the name of the warehouse
- lastupdate = the last time the user was synced with the database (we check it against any changes that could have been made afterwards)

*/

$functionName = $_POST['myfunc'];
$w_name = $_POST['warehouse_name'];
$t_name = $_POST['team_name'];
$lastUpdated = $_POST['lastupdate'];

//$arr = array('smart', 1, 2, 3, 'blah');
?>




<?php
//	Function Definitions:

function getWarehouseID($wName){
/*	Returns the ID of the warehouse with a given name	*/

	$w_id = "SELECT wId FROM Warehouse WHERE wName = '$wName'";
	$query1 = $db->prepare($w_id);
	$query1->execute();
	$row1 = $query1->fetch();
	return $row1['wId'];	
}

function getWarehouseInventory($wname){
/*	Returns the inventory of the warehouse the team is associated with. */

	echo getWarehouseID($wName);

}


function getTeamInventory(){
/*	Returns all the items that is currently borrowed by my team.	*/

}


function getNearbyTeams(){
/*	Returns the team_id's of nearby teams that are also associated with my supply base.	*/


}

?>




<?php
//testcode
$name = 'A';
getWarehouseInventory($name);

?>



<?php



$db->close();
?>