<?
	//Define Your own database settings
	$host = 'elite-korn.home.pl';
	$database = '08628551_anghand';
	$user = '08628551_anghand';
	$pass = '%jCIT5q4zljY';
	error_reporting(E_ERROR | E_PARSE);
	try {
		$link = mysql_connect($host,$user,$pass);
		mysql_select_db($database);
		unset($host,$database,$user,$pass);
	} catch (Exception $e) {
		$link = null;
	}
	
	//Get Acess Token from database
	$sql = 'SELECT * FROM authentication LIMIT 1';
	$result = mysql_query($sql);
	$i = 0;
	if( $row = mysql_fetch_assoc($result) ){
		echo $row['access_token'];
	}
?>