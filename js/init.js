(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();
    $("#upcoming").load("https://howestproxy.appspot.com/proxer?req=https://ctftime.org/ div #upcoming");
    $("#writeups").load("https://howestproxy.appspot.com/proxer?req=https://ctftime.org/writeups #writeups_table");
    $('#ledenonline').load("https://howestproxy.appspot.com/proxer?req=https://watismijnip.nl/ .top");

  }); // end of document ready
})(jQuery); // end of jQuery name space