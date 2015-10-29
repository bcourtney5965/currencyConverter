$(document).ready(function() {
    $("body").append('<p>If you\'re reading this - jQuery is connected.</p>');

    $.getJSON( "https://openexchangerates.org/api/currencies.json", function( data ) {
        var items = [], startItems = [], targetItems = [];
        var startingCurrency, targetCurrency;
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

        startingCurrency = $("#startingCurrency").val();

        $("form").on("submit",function(event){
        	event.preventDefault();
        	var startingCurrencyText;
        	startingCurrencyText = $("#startingCurrencyText").val();

        	if ( (!!$.isNumeric(startingCurrencyText)) && (!($( "#startingCurrency > .dropDownMenu" ).val() === "Starting Currency")) && (!($( "#targetCurrency > .dropDownMenu" ).val() === "Target Currency")) ) {
        		// alert("works!");
        		$("#testingLabel").text("Works");
        	} else {
        		$("#testingLabel").text("Doesn't Work");
        	}
        });

        $.getJSON( "https://openexchangerates.org/api/latest.json?app_id=e6ab7a9ae6e04881a5c5a3d69da62dd7", function( data ) {
            //console.log(data["rates"]);
            // data["rates"].forEach(function(country){
                // console.log(country);
            // });
            for (key in data["rates"]){
                console.log(data["rates"][key])
            }
        });


    });

});

//There is an example that shows, but youmust know:
	// 1.) Starting Currency
	// 2.) Traget Currency
	// 3.) Currency amount