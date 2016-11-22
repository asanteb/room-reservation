<?php
  $username = trim($_POST['username']);
	$user_password = ($_POST['password']);

	if (dlaps_auth($username, $user_password))
	  {
			echo "OK"; // log in
			$_SESSION['user_session'] = $username;
	  } else {
		    echo "Invalid username or password";
	  }


  function dlaps_auth($username, $password)
 {
	$adServer = "ldap://dmprod01.ad.txwesleyan.edu";
    $ldap = ldap_connect($adServer, 636);

    $ldaprdn = $username;
    $ldaprdn = 'txwesleyan' . "\\" . $username;

    $bind = @ldap_bind($ldap, $ldaprdn, $password)
            or die("Invalid username or password");
			//or die("Could not bind: " . ldap_error($ldap));

    if ($bind) {
        return true;
    } else {
        return false;
    }
    @ldap_close($ldap);
 }
?>
