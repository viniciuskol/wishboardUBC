<?php header('Access-Control-Allow-Origin: *'); ?>
<?php
/* Verifica qual é o sistema operacional do servidor para ajustar o cabeçalho de forma correta. Não alterar */
if(PHP_OS == "Linux") $break = "\n"; //Se for Linux
elseif(PHP_OS == "WINNT") $break = "\r\n"; // Se for Windows
else die("Error");
 
// Passando os dados obtidos pelo formulário para as variáveis abaixo
if (isset($_POST['name']) && isset($_POST['country']) && $_POST['country'] =='') {

$name     = $_POST['name'];
$email    = trim($_POST['email']);
$emailsender = "*****@shareyourwishes.ca";
$subject           = "WishBoard - Comments";
$message          = $_POST['message'];
 
/* Montando a mensagem a ser enviada no corpo do e-mail. */
$messageHTML = '<h2>Message</h2><br/><br/><table style="undefined;table-layout: fixed; width: 689px"><colgroup><col style="width: 111px"><col style="width: 578px"></colgroup><tr><td>Name</td><td>'.$name.'</td></tr><tr><td>E-mail</td><td>'.$email.'</td></tr><tr><td>Message</td><td>'.$message.'</td></tr></table>';
 
/* Montando o cabeçalho da mensagem */
$headers = "MIME-Version: 1.1" . $break;
$headers .= "Content-type: text/html; charset=UTF-8" . $break;
// Perceba que a linha acima contém "text/html", sem essa linha, a mensagem não chegará formatada.
$headers .= "From: " . $emailsender . $break;
$headers .= "Return-Path: " . $emailsender . $break;
$headers .= "Reply-To: " . $email . $break;
// Note que o e-mail do remetente será usado no campo Reply-To (Responder Para)
 
/* Enviando a mensagem */
if (mail($emailsender, $subject, $messageHTML, $headers, "-r". $emailsender)) {
	print "ok";	
}

} 
?>
