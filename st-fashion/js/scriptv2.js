(function(){if(Haravan&&Haravan.shop){var o=Haravan.shop;o=o.replace(".myharavan.com",""),o=o.replace(".sku.vn","");var n="//multiapp.haravan.com/social-login/zauth/facebook?shopname="+o+"&currentprotocol="+window.location.protocol+"&webdomain="+Haravan.domain,a="//multiapp.haravan.com/social-login/zauth/google?shopname="+o+"&currentprotocol="+window.location.protocol+"&webdomain="+Haravan.domain;popupwindow=function(o,n,a,i){function c(){r.closed&&(clearInterval(e),-1!=window.location.href.indexOf("account/register")||-1!=window.location.href.indexOf("account/login")?window.location.href=window.location.origin+"/account":window.location.reload())}var t=screen.width/2-a/2,l=screen.height/2-i/2,r=window.open(o,n,"toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width="+a+", height="+i+", top="+l+", left="+t),e=setInterval(c,500)},$(function(){$(".btsocialloginfb").click(function(o){popupwindow(n,"Social-Login",550,530)}),$(".btsociallogingg").click(function(o){popupwindow(a,"Social-Login",550,530)})})}}).call(this);