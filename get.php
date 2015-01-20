<?php
    $filename = "leerlingen.json";
    $file = fopen($filename, "r");
    echo fread($file, filesize($filename));
    fclose($file);
?>
