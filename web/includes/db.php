<?php

function connect(){//connect to the database and return the connection once established
	$pdo = new PDO("mysql:host=localhost;dbname=rubicon", 'root', 'password22');//

	if (!$pdo){
		echo "Connection failed!";
		exit();
	}
	return $pdo;
}
?>
