<?php
session_start();

// Check if the user is logged in and the session is valid
if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true) {
    echo 'true';
} else {
    echo 'false';
}
