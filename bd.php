<?php
$username = "username";
$password = 'password';
$address = "localhost";
$database = "database";
class Message
{
	public $prefix = "";

	public $posfix = "";

	public $color = "";

}

$order_of_posts = "m.prefix ASC, m.postfix ASC";
$idfinal = 0;
$start = 0;
$total_of_posts = 0;
$prefix = '';
$post = '';
$color = 0;
$previous_msgs = '';
$consent = 0;
$blocked = '';
mb_internal_encoding("UTF-8");
mb_http_output("UTF-8");
ob_start("mb_output_handler");
header("Content-Type: text/html; charset=UTF-8", true);

if (isset($_GET['total'])) {
	global $total_of_posts;
	if (is_int((int)$_GET['total'])) {
		$total_of_posts = (int)$_GET['total'];
	}
	else {
		$total_of_posts = 0;
	}
}

if (isset($_GET['start'])) {
	global $start;
	if (is_int((int)$_GET['start'])) {
		$start = (int)$_GET['start'];
	}
	else {
		$start = 0;
	}
}

if (isset($_GET['idfinal'])) {
	global $idfinal;
	if (is_int((int)$_GET['idfinal'])) {
		$idfinal = (int)$_GET['idfinal'];
	}
	else {
		$idfinal = 0;
	}
}

if (isset($_GET['order'])) {
	global $order_of_posts;
	if ($_GET['order'] == "ascending") {
		$order_of_posts = "m.prefix ASC, m.postfix ASC";
	}
	elseif ($_GET['order'] == "descending") {
		$order_of_posts = "m.id DESC";
	}
	elseif ($_GET['order'] == "random") {
		$order_of_posts = "RAND()";
	}
}

if (isset($_COOKIE['user'])) {
	$previous_msgs = $_COOKIE['user'];
}


if (isset($_GET['function'])) {
	if ($_GET['function'] == "lastid") {
		echo get_lastid();
	}
	elseif ($_GET['function'] == "allposts") {
			if (isset($_GET['blocked'])) {
				$blocked = $_GET['blocked'];
			}
			echo get_posts();
		}
}	elseif (isset($_POST['function'])){
	if ($_POST['function'] == "savepost") {
			if (isset($_POST['color'])) {
				$color = $_POST['color'];
			}

			if (isset($_POST['prefix'])) {
				$prefix = $_POST['prefix'];
			}

			if (isset($_POST['posfix'])) {
				$post = $_POST['posfix'];
			}

			if (isset($_POST['consent'])) {
				$consent = $_POST['consent'];
			}

			if (isset($_COOKIE['user'])) {
				$previous_msgs = $_COOKIE['user'];
			}
			else {
				$previous_msgs = '';
			}
			echo set_newpost();
		}
	elseif ($_POST['function'] == "blockpost") {
		if (isset($_POST['id']) && isset($_POST['block'])) {
			echo block_post($_POST['block'], $_POST['id']);
		}
	}
	elseif ($_POST['function'] == "consentpost") {
		if (isset($_POST['id']) && isset($_POST['consent'])) {
			echo consent_post($_POST['consent'], $_POST['id']);
		}
	}
}
die();


function consent_post($consent, $id)
{
	global $username;
	global $password;
	global $address;
	global $database;
	$html = '';
	$mysqli = new mysqli($address, $username, $password, $database, 3306);
	$resultArray = array();
	if ($consent == "true") {
		$query = "UPDATE message SET consent='1' WHERE id='$id'";
	}
	else {
		$query = "UPDATE message SET consent='0' WHERE id='$id'";
	}

	if (mysqli_query($mysqli, $query)) {
		if ($consent == "true") {
			$html = "consented";
		}
		else {
			$html = "unconsented";
		}
	}
	else {
		printf("Errormessage: %s\n", $mysqli->error);
	}

	$mysqli->close();
	return $html;
}

function block_post($block, $id)
{
	global $username;
	global $password;
	global $address;
	global $database;
	$html = '';
	$mysqli = new mysqli($address, $username, $password, $database, 3306);
	$resultArray = array();
	if ($block == "true") {
		$query = "UPDATE message SET blocked='1' WHERE id='$id'";
	}
	else {
		$query = "UPDATE message SET blocked='0' WHERE id='$id'";
	}

	if (mysqli_query($mysqli, $query)) {
		if ($block == "true") {
			$html = "blocked";
		}
		else {
			$html = "unblocked";
		}
	}
	else {
		printf("Errormessage: %s\n", $mysqli->error);
	}

	$mysqli->close();
	return $html;
}

function get_posts()
{
	global $username;
	global $password;
	global $address;
	global $database;
	global $total_of_posts;
	global $order_of_posts;
	global $idfinal;
	global $start;
	global $blocked;
	$json = '';
	$mysqli = new mysqli($address, $username, $password, $database, 3306);
	$mysqli->set_charset("utf8mb4");
	$resultArray = array();
	if ($blocked == 'true') {
		$query = "SELECT m.blocked, m.prefix, m.postfix, m.color, m.id FROM message m WHERE m.id >'$idfinal' ORDER BY $order_of_posts";
	}
	else {
		$query = "SELECT m.blocked, m.prefix, m.postfix, m.color, m.id FROM message m WHERE m.blocked=0 and m.id >'$idfinal' ORDER BY $order_of_posts";
	}

	if ($total_of_posts > 0 && $start == 0) {
		$query.= " LIMIT $total_of_posts";
	}
	elseif ($start > 0 && $total_of_posts > 0) {
		$query.= " LIMIT $start,$total_of_posts";
	}

	if ($result = $mysqli->query($query)) {
		$count = 0;
		while ($row = $result->fetch_object()) {
			$newMessage = new Message();
			$newMessage->blocked = $row->blocked;
			$newMessage->id = $row->id;
			$newMessage->prefix = $row->prefix;
			$newMessage->posfix = $row->postfix;
			$newMessage->color = $row->color;
			if ($count == 0) {
				$newMessage->lastid = $row->id;
				$count++;
			}

			array_push($resultArray, $newMessage);
		}
	}

	$json = html_entity_decode(json_encode($resultArray));
	$result->close();
	$mysqli->close();
	return $json;
}

function get_lastid()
{
	global $username;
	global $password;
	global $address;
	global $database;
	global $idprefix;
	$json = '';
	$mysqli = new mysqli($address, $username, $password, $database, 3306);
	$resultArray = array();
	$query = "SELECT m.id  FROM message m WHERE m.blocked=0 ORDER BY m.id DESC LIMIT 1";
	if ($result = $mysqli->query($query)) {
		while ($row = $result->fetch_object()) {
			$newMessage = new Message();
			$newMessage->lastid = utf8_encode($row->id);
			array_push($resultArray, $newMessage);
		}
	}

	$json = html_entity_decode(json_encode($resultArray));
	$result->close();
	$mysqli->close();
	return $json;
}

function removeAccents($str) {
  $a = array('À', 'Á', 'Â', 'Ã', 'Ä', 'Å', 'Æ', 'Ç', 'È', 'É', 'Ê', 'Ë', 'Ì', 'Í', 'Î', 'Ï', 'Ð', 'Ñ', 'Ò', 'Ó', 'Ô', 'Õ', 'Ö', 'Ø', 'Ù', 'Ú', 'Û', 'Ü', 'Ý', 'ß', 'à', 'á', 'â', 'ã', 'ä', 'å', 'æ', 'ç', 'è', 'é', 'ê', 'ë', 'ì', 'í', 'î', 'ï', 'ñ', 'ò', 'ó', 'ô', 'õ', 'ö', 'ø', 'ù', 'ú', 'û', 'ü', 'ý', 'ÿ', 'Ā', 'ā', 'Ă', 'ă', 'Ą', 'ą', 'Ć', 'ć', 'Ĉ', 'ĉ', 'Ċ', 'ċ', 'Č', 'č', 'Ď', 'ď', 'Đ', 'đ', 'Ē', 'ē', 'Ĕ', 'ĕ', 'Ė', 'ė', 'Ę', 'ę', 'Ě', 'ě', 'Ĝ', 'ĝ', 'Ğ', 'ğ', 'Ġ', 'ġ', 'Ģ', 'ģ', 'Ĥ', 'ĥ', 'Ħ', 'ħ', 'Ĩ', 'ĩ', 'Ī', 'ī', 'Ĭ', 'ĭ', 'Į', 'į', 'İ', 'ı', 'Ĳ', 'ĳ', 'Ĵ', 'ĵ', 'Ķ', 'ķ', 'Ĺ', 'ĺ', 'Ļ', 'ļ', 'Ľ', 'ľ', 'Ŀ', 'ŀ', 'Ł', 'ł', 'Ń', 'ń', 'Ņ', 'ņ', 'Ň', 'ň', 'ŉ', 'Ō', 'ō', 'Ŏ', 'ŏ', 'Ő', 'ő', 'Œ', 'œ', 'Ŕ', 'ŕ', 'Ŗ', 'ŗ', 'Ř', 'ř', 'Ś', 'ś', 'Ŝ', 'ŝ', 'Ş', 'ş', 'Š', 'š', 'Ţ', 'ţ', 'Ť', 'ť', 'Ŧ', 'ŧ', 'Ũ', 'ũ', 'Ū', 'ū', 'Ŭ', 'ŭ', 'Ů', 'ů', 'Ű', 'ű', 'Ų', 'ų', 'Ŵ', 'ŵ', 'Ŷ', 'ŷ', 'Ÿ', 'Ź', 'ź', 'Ż', 'ż', 'Ž', 'ž', 'ſ', 'ƒ', 'Ơ', 'ơ', 'Ư', 'ư', 'Ǎ', 'ǎ', 'Ǐ', 'ǐ', 'Ǒ', 'ǒ', 'Ǔ', 'ǔ', 'Ǖ', 'ǖ', 'Ǘ', 'ǘ', 'Ǚ', 'ǚ', 'Ǜ', 'ǜ', 'Ǻ', 'ǻ', 'Ǽ', 'ǽ', 'Ǿ', 'ǿ', 'Ά', 'ά', 'Έ', 'έ', 'Ό', 'ό', 'Ώ', 'ώ', 'Ί', 'ί', 'ϊ', 'ΐ', 'Ύ', 'ύ', 'ϋ', 'ΰ', 'Ή', 'ή','!','?','@','#','$','&','4','1','3','0','7','5');
  $b = array('A', 'A', 'A', 'A', 'A', 'A', 'AE', 'C', 'E', 'E', 'E', 'E', 'I', 'I', 'I', 'I', 'D', 'N', 'O', 'O', 'O', 'O', 'O', 'O', 'U', 'U', 'U', 'U', 'Y', 's', 'a', 'a', 'a', 'a', 'a', 'a', 'ae', 'c', 'e', 'e', 'e', 'e', 'i', 'i', 'i', 'i', 'n', 'o', 'o', 'o', 'o', 'o', 'o', 'u', 'u', 'u', 'u', 'y', 'y', 'A', 'a', 'A', 'a', 'A', 'a', 'C', 'c', 'C', 'c', 'C', 'c', 'C', 'c', 'D', 'd', 'D', 'd', 'E', 'e', 'E', 'e', 'E', 'e', 'E', 'e', 'E', 'e', 'G', 'g', 'G', 'g', 'G', 'g', 'G', 'g', 'H', 'h', 'H', 'h', 'I', 'i', 'I', 'i', 'I', 'i', 'I', 'i', 'I', 'i', 'IJ', 'ij', 'J', 'j', 'K', 'k', 'L', 'l', 'L', 'l', 'L', 'l', 'L', 'l', 'l', 'l', 'N', 'n', 'N', 'n', 'N', 'n', 'n', 'O', 'o', 'O', 'o', 'O', 'o', 'OE', 'oe', 'R', 'r', 'R', 'r', 'R', 'r', 'S', 's', 'S', 's', 'S', 's', 'S', 's', 'T', 't', 'T', 't', 'T', 't', 'U', 'u', 'U', 'u', 'U', 'u', 'U', 'u', 'U', 'u', 'U', 'u', 'W', 'w', 'Y', 'y', 'Y', 'Z', 'z', 'Z', 'z', 'Z', 'z', 's', 'f', 'O', 'o', 'U', 'u', 'A', 'a', 'I', 'i', 'O', 'o', 'U', 'u', 'U', 'u', 'U', 'u', 'U', 'u', 'U', 'u', 'A', 'a', 'AE', 'ae', 'O', 'o', 'Α', 'α', 'Ε', 'ε', 'Ο', 'ο', 'Ω', 'ω', 'Ι', 'ι', 'ι', 'ι', 'Υ', 'υ', 'υ', 'υ', 'Η', 'η','','','a','','S','S','A','I','E','O','T','S');
  return str_replace($a, $b, $str);
}

function check_array($string,$array){
   $trans = array("é" => "e", "&eacute;" => "e", "&aacute;" => "a", "á" => "a", "&iacute;" => "i","í"=>"i", "ó"=>"o", "&oacute;" => "o", "&uacute;" => "u", "ú"=>"u","&ouml;" => "u", "ü"=>"u");
   $realString = strtr($string,$trans);
   foreach($array as $val){
	  $realVal = strtr($val,$trans);
	  if(strcasecmp( $realVal, $realString ) == 0){
		 return true;
	  }
   }
   return false;
}

function findBadWords ($string) {
$badwords = array("123","12345","XXX");
$badwordsaccents = array("COCÔ");
mb_internal_encoding("UTF-8");
$string1 = explode(" ", removeAccents($string));
$found = false;
  foreach ($string1 as $value ) {
	if (check_array(mb_strtoupper($value), $badwords)) {
		$found = true; break; 
	}
  }
$string0 = explode(" ", $string);
  foreach ($string0 as $value ) {
		if (in_array(mb_strtoupper($value), $badwordsaccents)) {
			$found = true; break; 
			}
  }
  return $found;
}

function set_newpost()
{
	global $username;
	global $password;
	global $address;
	global $database;
	global $prefix;
	global $post;
	global $blocked;
	global $color;
	global $previous_msgs;
	global $consent;
	$html = '';
	$mysqli = new mysqli($address, $username, $password, $database, 3306);
	mysqli_set_charset($mysqli, 'utf8mb4');
	$blocked = '0';
	if ($consent == "true") {
		$consent = '1';
	}
	else {
		$consent = '0';
	}
$post = str_replace("'", "\'",$post);

	$query = "INSERT INTO message (id, prefix, postfix, created, blocked, color, consent, previous_msgs) VALUES (NULL, '$prefix', '$post', CURRENT_TIMESTAMP, '$blocked', '$color', '$consent', '$previous_msgs');";
	if (mysqli_query($mysqli, $query)) {
		if ($mysqli->insert_id != 0) {
			$used_id = $mysqli->insert_id;
			$html = "ok" . $used_id;
			if (!isset($_COOKIE['user'])) {
				setcookie('user', $used_id, (time() + (30 * 24 * 3600)));
				$query = "UPDATE message SET previous_msgs='$used_id' WHERE id='$used_id'";
				mysqli_query($mysqli, $query);
			}
		}
		else {
			$html = "ok";
		}
	}
	else {
		printf("Errormessage: %s\n", $mysqli->error);
	}

	$previous_msgs = '';
	$mysqli->close();
	return $html;
}

?>