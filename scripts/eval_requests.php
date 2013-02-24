<?php
// some constant value..
$receivedStamp = '2013-02-01 00:00:00';


//	Function Definitions:

function init_db(){
/* Initializes and returns a database object	*/
	$db = new PDO('mysql:host=localhost;dbname=Inventory', 'root', 'root');
	return $db;
}

function getWarehouseID($wName){
/*	Returns the ID of the warehouse with a given name	*/
	
	$db = init_db();
	
	$w_id = "SELECT wId FROM Warehouse WHERE wName = '$wName'";
	$query1 = $db->prepare($w_id);
	$query1->execute();
	
	return $query1->fetch()['wId'];	
	
}

function checkTimestamp($w_id){
/*	When a user asks for the warehouse content, he gives the script a timestamp which records when the database last synced. If the date has remained the same in our server, we need not update any of his information (return false). If the date has changed, we have to update his local storage with the new information (return true). */

	$db = init_db();

	$timeStampQuery = "SELECT stamp FROM TimeStamp WHERE wId = $w_id";
	
	
	$exec_timestamp = $db->prepare($timeStampQuery);
	$exec_timestamp->execute();
	
	$timestamp = $exec_timestamp->fetch(PDO::FETCH_ASSOC)['stamp'];
	
	if ($timestamp == $receivedStamp) 	return true;
	else 								return false;
	
	$db = null;	// Close the Connection
}

function getWarehouseInventory($w_id){
/*	Returns the inventory of the warehouse the team is associated with. */
	
	$db = init_db();
	$returnArray = array();
	
	$itemquery = "call pc_Warehouse_GetItemInfo($w_id)";
	$exec_itemquery = $db->prepare($itemquery);
	$exec_itemquery->execute();
	
	/*	Items that we can get from this query:
			- teamMapId
			- teamName
			- itemId
			- itemType
			- catDesc
			- brandDesc
			- condDesc
			- condDetDesc
			- quantity
			- isBulk		
	*/
	
	$infoArray = array();
	
	while ($row = $exec_itemquery->fetch(PDO::FETCH_ASSOC)){
		array_push($infoArray, $row);
	}
	
	$db = null;	// Close the Connection
	
	return $infoArray;
}


function getTeamInventory(){
/*	Returns all the items that is currently borrowed by my team.	*/

}


function getNearbyTeams(){
/*	Returns the team_id's of nearby teams that are also associated with my supply base.	*/


}


$name = 'A';
$returnArray = array();

$w_id = getWarehouseID($name);
if(!checkTimestamp($w_id)){
	//echo "Success!";
	$returnArray = getWarehouseInventory($w_id);
}

echo "Size of Result Array:\t" . count($returnArray);
?>