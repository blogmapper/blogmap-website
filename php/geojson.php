<?php
header('Content-Type: application/json');
require("config.inc.php");

$con = mysqli_connect("localhost",$user,$password);
$con or die(mysqli_error($con));
mysqli_select_db($con,"stumblr") or die(mysqli_error($con));

$sql = 'SELECT * FROM Blogposts'
$rs = $con->mysqli_query($sql)

if (!$rs) {
	echo 'An SQL error occored.\n'
	exit;
}

echo '
{ "type": "FeatureCollection",
  "features": [
  ';

while ($row = $rs->mysqli_fetch_assoc($result)) {
	echo <<<EOT
	{ 
      "type": "Feature",
      "geometry": {
        "type": "Point", 
        "coordinates": [$row['lng'], $row['lat']]
      },
      "properties": {
        "sourceUrl": "$row['url']",
        "otherThing": "$row['otherThing']"
      }
    },
EOT;
}

echo "]}"

mysqli_close($con);

?>
