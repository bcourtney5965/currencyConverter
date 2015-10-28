$(document).ready(function() {
    $("body").append('<p>If you\'re reading this - jQuery is connected.</p>');

    $.getJSON( "https://openexchangerates.org/api/currencies.json", function( data ) {
        var items = [], startItems = [], targetItems = [];
        $.each( data, function( key, val ) {
              items.push( "<option id='" + key + "'>" + val + "</option>" );
        });
        startItems  = items.slice(0);
        targetItems = items.slice(0);
 
        startItems.unshift("<option id='startingCurrent'>Starting Currency</option>");
        targetItems.unshift("<option id='startingCurrent'>Target Currency</option>");

        $( "<select/>", {
            "class": "dropDownMenu",
            html: startItems.join( "" )
        }).prependTo( "#startingCurrency" );

        $( "<select/>", {
            "class": "dropDownMenu",
              html: targetItems.join( "" )
        }).prependTo( "#targetCurrency" );

        $("form").on("submit",function(event){
        	event.preventDefault();
        	var startingCurrency;
        	startingCurrency = +$("#startingCurrencyText").val();
        	if (startingCurrency.constructor === Number) {
        		$("#targetCurrency").append("Works");
        	}
        });

    });

});