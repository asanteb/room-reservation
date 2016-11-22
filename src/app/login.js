var authenticate(data){
  $.ajax({
  		   type : 'POST',
  		   url  : 'login_process.php',
  		   data : data
       });
}
