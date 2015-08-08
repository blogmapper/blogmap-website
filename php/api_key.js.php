<?php
header('Content-Type: application/javascript');
echo 'L.mapbox.accessToken = "' . getenv('API_KEY') . '";';
echo 'var map_style = "' . getenv('STYLE') . '";';
echo 'var brooklyn_data ="' . getenv('BROOKLYN_DATA') . '";';
echo 'var manhattan_data ="' . getenv('MANHATTAN_DATA') . '";';
echo 'var philadelphia_data ="' . getenv('PHILADELPHIA_DATA') . '";';

?>