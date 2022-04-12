<?php

class Operations
{
 
    private $db_host = 'http://92.154.61.105:8080';
    private $db_name = 'Application';
    private $db_username = 'root';
    private $db_password = '';
 
 
    public function dbConnection()
    {
 
        try {
            $conn = new PDO('mysql:host=' . $this->db_host . ';dbname=' . $this->db_name, $this->db_username, $this->db_password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            echo "aa";
            return $conn;
        } catch (PDOException $e) {
            echo "Connection error " . $e->getMessage();
            exit;
        }
    }

}
dbConnection();
?>