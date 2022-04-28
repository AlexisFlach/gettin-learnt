<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$pdo = new PDO('mysql:host=localhost;port=8889;dbname=products_crud', 'root', 'root');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$errors = [];

$title = '';
$price = '';
$description = '';


if ( $_SERVER['REQUEST_METHOD'] === 'POST') {

$title = $_POST['title'];
$description = $_POST['description'];
$price = $_POST['price'];
$date = date('Y-m-d H:i:s');

if(!$title) {
    $errors[] = "Product title is required";
}
if(!$price) {
    $errors[] = "Product price is required";
}

if(!is_dir('images')) {
    mkdir('images');
}

if(empty($errors)) {

    $image = $_FILES['image'] ?? null;
    $imagePath = '';
    if ($image && $image['tmp_name']) {

        $imagePath = 'images/'.randomString(8).'/'.$image['name'];
        mkdir(dirname($imagePath));
        move_uploaded_file($image['tmp_name'], $imagePath);
    }


    $statement = $pdo->prepare("INSERT INTO products (title, image, description, price, create_date) VALUES(:title,:image, :description, :price, :date )");
    $statement->bindValue(':title', $title);
    $statement->bindValue(':image', $imagePath);
    $statement->bindValue(':description', $description);
    $statement->bindValue(':price', $price);
    $statement->bindValue(':date', $date);

    $statement->execute();
    header('Location: index.php');
}

}

function randomString($n) {
    $char = '01234ABCDabcd';
    $str = '';
    for($i = 0; $i < $n; $i++) {
        $index = rand(0, strlen($char) - 1);
        $str .= $char[$index];
    }
    return $str;
}


?>

<!doctype html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous">
    <link rel="stylesheet" href="app.css">
    <title>Products CRUD</title>
</head>
<body>
<h1>Create new Product</h1>
<p>
    <a href="create.php" class="btn btn-success">Create Product</a>
</p>

<?php if (!empty($errors)): ?>
<div class="alert alert-danger">
    <?php foreach ($errors as $error): ?>
    <div><?php echo $error ?></div>
    <?php  endforeach; ?>
</div>
<?php endif; ?>


<form action="" method="post" enctype="multipart/form-data">
    <div class="form-group">
        <label>Product Image</label><br>
        <input type="file" name="image">
    </div>
    <div class="form-group">
        <label>Product title</label>
        <input type="text" name="title" value="<?php echo $title ?>" class="form-control">
    </div>
    <div class="form-group">
        <label>Product description</label>
        <textarea class="form-control" name="description"><?php echo $description ?></textarea>
    </div>
    <div class="form-group">
        <label>Product price</label>
        <input type="number" step=".01" name="price" value="<?php echo $price ?>" class="form-control">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
</form>

</body>
</html>