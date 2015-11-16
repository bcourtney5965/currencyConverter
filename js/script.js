$(document).ready(function() {
    var rates;
    $.getJSON( "https://openexchangerates.org/api/currencies.json", function( data ) {
        var items = [], startItems = [], targetItems = [];
        var startingCurrency, targetCurrency;
        $.each( data, function( key, val ) {
              items.push( "<option value='" + key + "'>" + val + "</option>" );
        });
        startItems  = items.slice(0);
        targetItems = items.slice(0);
 
        startItems.unshift("<option value='startingCurrency'>Starting Currency</option>");
        targetItems.unshift("<option value='targetCurrency'>Target Currency</option>");

        $("#startCur").html(startItems.join( "" ));
        $("#targetCur").html(targetItems.join( "" ));

    });

    $.getJSON( "https://openexchangerates.org/api/latest.json?app_id=e6ab7a9ae6e04881a5c5a3d69da62dd7", function( data) {
        rates = data["rates"];
    });

    $("form").on("submit",function(event){
        event.preventDefault();
        var startingCurrency = $("#startCur").val();
        var targetCurrency = $("#targetCur").val();
        var startingToDollarRate;
        var targetToDollarRate;
        var startingCurrencyText = $("#startingCurrencyText ").val();
        var intraCurrencyRate;

        // Verifies we have all needed info
    	if ( (!!$.isNumeric(startingCurrencyText)) && 
            ($( "#startCur" ).val() !== 'startingCurrency') && 
            ($( "#targetCur" ).val() !== 'targetCurrency') ) { 
                
      		// Currency to dollar rates
            targetToDollarRate = rates[targetCurrency];
            startingToDollarRate = rates[startingCurrency];

            // If starting currency is US Currency
            if (startingCurrency === "USD") {
                // Display the Target/Dollar Rate 
                $("#testingLabel").text((targetToDollarRate * startingCurrencyText).toFixed(2));
            // If target currency is US Currency
            } else if (targetCurrency === "USD") {
                // Display the Starting/Dollar Rate 
                $("#testingLabel").text((startingCurrencyText/startingToDollarRate).toFixed(2));
            // If US currency is neither starting nor target 
            } else {
                // Intracurrency Converting Math
                intraCurrencyRate = (1/startingToDollarRate) * targetToDollarRate;
                $("#testingLabel").text((startingCurrencyText * intraCurrencyRate).toFixed(2));
           }
        } else {
        	$("#testingLabel").text("Try again");
        }
    });
});

