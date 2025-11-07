<?php
session_start();
require_once 'segurança.php'; 

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $CNPJ = trim($_POST["cnpj"]);
    $Senha = trim($_POST["senha"]);
    $sql = "SELECT ID_empresa, CNPJ, Senha FROM empresa WHERE CNPJ = ?";

    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("s", $param_CNPJ);
        $param_CNPJ = $CNPJ;

        if ($stmt->execute()) {
            $stmt->store_result();

            if ($stmt->num_rows == 1) {
                $stmt->bind_result($id, $CNPJ, $hashed_password);
                if ($stmt->fetch()) {
                    if (password_verify($Senha, $hashed_password)) {
                        $_SESSION["loggedin"] = true;
                        $_SESSION["id"] = $ID_empresa;
                        $_SESSION["cnpj"] = $CNPJ;

                        header("location: index2.html");
                    } else {
                        echo "Invalid password.";
                    }
                }
            } else {
                echo "No account found with that username.";
            }
        } else {
            echo "Oops! Something went wrong. Please try again later.";
        }
        $stmt->close();
    }
    $conn->close();
}
?>