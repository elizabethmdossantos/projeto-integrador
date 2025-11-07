<?php
$Nome= filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
$Senha = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_STRING);
$CNPJ = filter_input(INPUT_POST, 'cnpj', FILTER_SANITIZE_STRING);
$Telefone = filter_input(INPUT_POST, 'telefone', FILTER_SANITIZE_STRING);
$Email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_STRING);
$hashed_password = password_hash($Senha, PASSWORD_DEFAULT);

$databaseHost = 'localhost';
$databaseUsername = 'root';
$databasePassword = '';
$databaseName = 'TruckGestão';

$conn = new mysqli($databaseHost, $databaseUsername, $databasePassword, $databaseName);

if ($conn->connect_error) {
        die("Conexão falhou: " . $conn->connect_error);
    }

$sql = "INSERT INTO empresa (Nome, Senha, CNPJ, Telefone, Email) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssss", $Nome, $hashed_password, $CNPJ, $Telefone, $Email);

if ($stmt->execute()) {
        echo "Novo registro criado com sucesso";
    } else {
        echo "Erro: " . $sql . "<br>" . $conn->error;
    }

    $stmt->close();
    $conn->close();

?>