<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Проверка почты</title>
</head>
<body>
    <p>Для сброса пароля перейдите по указанной ссылки:</p>
    <a href="{{'http://localhost:8080/#/passwordSetting/' . $user->remember_token}}">
        {{'http://localhost:8080/#/passwordSetting/' . $user->remember_token}}
    </a>
</body>
</html>