<?php
    $filename = "leerlingen.json";

    $jsonContents = file_get_contents("php://input");

    if ($jsonContents) {
        file_put_contents($filename, $jsonContents);
    } else {
        file_put_contents("log.txt", $jsonContents, FILE_APPEND);
    }
?>
