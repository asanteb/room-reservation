var ldap = require('ldapjs');
var username = 'abuil';
var password= 'G33kEnforcer22';
var client = ldap.createClient({
  url: 'ldap://dmprod01.ad.txwesleyan.edu:636'
});
console.log('hi');
var dn = "txwesleyan\\" + username;

client.bind(username, password, function(err) {
  if (err){
    console.log('Cannot bind');
    console.log(err);
  }
  else {
    console.log('Binded');
  }
});
