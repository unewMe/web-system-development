<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="Potwierdzenie wysłania formularza.">
    <meta name="keywords" content="potwierdzenie, kontakt">
    <meta name="author" content="Dinem">
    <title>Potwierdzenie - City Navigator</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
        }
        
        header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 55px;
            background-color: #f4f4f4;
        }

        .logo {
            display: flex;
            align-items: center;
        }

        .logo img {
            width: 55px;
            height: 55px;
            margin-left: 10px;
        }

        nav {
            display: flex;
            gap: 30px;
        }

        nav a {
            text-decoration: none;
            font-weight: bold;
            color: black;
        }

        nav a:hover {
            color: #007bff;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            color: #333;
        }
        p {
            color: #555;
        }
    </style>
</head>
<body>

    <header class="header">
      <div class="logo">
        <h2>City Navigator</h2>
        <img src="city.svg" alt="Logo miasta" />
      </div>
      <nav>
        <a href="index.html">Home</a>
        <a href="city.html">City</a>
        <a href="contact.html">Contact</a>
      </nav>
    </header>

    <div class="container">
        <h2>Dziękujemy za kontakt!</h2>

        <?php
        if ($_SERVER["REQUEST_METHOD"] == "POST") {

            $name = htmlspecialchars($_POST['name']);
            $email = htmlspecialchars($_POST['email']);
            $topic = htmlspecialchars($_POST['topic']);
            $phone = htmlspecialchars($_POST['phone']);
            $contact_method = htmlspecialchars($_POST['contact_method']);
            $message = htmlspecialchars($_POST['message']);

            echo "<p><strong>Imię:</strong> $name</p>";
            echo "<p><strong>Email:</strong> $email</p>";
            echo "<p><strong>Temat:</strong> $topic</p>";
            echo "<p><strong>Telefon:</strong> $phone</p>";
            echo "<p><strong>Sposób kontaktu:</strong> $contact_method</p>";
            echo "<p><strong>Wiadomość:</strong> $message</p>";
        } else {
            echo "<p>Brak danych do wyświetlenia.</p>";
        }
        ?>
    </div>

</body>
</html>
