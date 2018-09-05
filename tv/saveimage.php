<?php
mb_internal_encoding("UTF-8"); 
mb_http_output( "UTF-8" );  
ob_start("mb_output_handler");
header("Content-Type: text/html; charset=UTF-8",true);

if(isset($_POST['saveimage']) && isset($_POST['message'])) { 
    $data = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '',$_POST['saveimage']));
    $filename = 'wishes/wish-'.$_POST['id'].'.png';
    file_put_contents($filename, $data);
    // Get new dimensions
	list($width, $height) = getimagesize($filename);
	if ($width > 788)
	{
		$new_width = 788;
		$new_height = 540;
		$image_p = imagecreatetruecolor($new_width, $new_height);
		$image = imagecreatefrompng($filename);
		imagecopyresampled($image_p, $image, 0, 0, 0, 0, $new_width, $new_height, $width, $height);
		imagepng($image_p, $filename);
	}
	require_once ('lib/twitter/codebird.php');
	  \Codebird\Codebird::setConsumerKey('xKkwilDjS8wxDXKxK7W4l1l54', '0YyPa0th7CNicTxEorVbXQWcF2gnsFbtvdCWK0MZ4nTK6p4MX2');

	  $cb = \Codebird\Codebird::getInstance();
	  $cb->setUseCurl(false);
	  $cb->setToken('706604562069774337-skkO3tXu3RI4tzaSkbs6x4VaiKFCCCo', 'avUYhlJcKDEI0SMLQq4jjmJ0fyW6vjnNk1sa3Vv6tN985');

	  // these files to upload. You can also just upload 1 image!
	  $image_str = 'wishes/wish-'.$_POST['id'].'.png';
	  $media_files = [$image_str];
	  // will hold the uploaded IDs
	  $media_ids = [];

	  foreach ($media_files as $file) {
	    // upload all media files
	    $reply = $cb->media_upload([
	      'media' => $file
	    ]);
	    // and collect their IDs
	    $media_ids[] = $reply->media_id_string;
	  }
	  // convert media ids to string list
	  $media_ids = implode(',', $media_ids);

	  // send Tweet with these medias
	  $reply = $cb->statuses_update([
	    'status' => '"'.$_POST['message'].'" #WishBoardatUBC',
	    'media_ids' => $media_ids
	  ]);

	  //print_r($reply);
	  
	  if (isset($reply->created_at)) {
    	echo "saved";
	  } else {
	    echo "error";
	  }
	}



?>