<?php
include('includes/db.php');

$wh = $_GET['wh'];
$ts = $_GET['ts'];

function get_items_at_warehouse($wh, $ts){
	$con = connect();
	$get_warehouse_items = $con->prepare("SELECT * FROM `Warehouse` INNER JOIN `Item` on Warehouse.wId = Item.wId");
	$get_warehouse_items->execute(array());
	$items = $get_warehouse_items->fetchAll(PDO::FETCH_ASSOC);
	print_r($items);
	return $items;
}

get_items_at_warehouse($wh, $ts);

?>
