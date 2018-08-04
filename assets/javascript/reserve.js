// On Click Handlers for the submit button

	$(".submit").on("click", function(){

		// Here we grab the form elements
		var newReservation = {
			customerName: $('#reserve_name').val().trim(),
			phoneNumber: $('#reserve_phone').val().trim(),
			customerEmail: $('#reserve_email').val().trim(),
			customerID: $('#reserve_uniqueID').val().trim()
		};

		console.log(newReservation);

		// Here we get the location of the root page. We use this instead of explicitly because the url will change when we deploy.
        var currentURL = window.location.origin;
        
        // AJAX POST request to our server. The URL route is 
	    $.post(currentURL + "/api/reservations", newReservation,
	    function(data){

	    	// If a table is available... tell user they are booked.
	    	if(data == true){
	    		alert("Yay! You are officially booked!")
	    	}

	    	// If a table is available... tell user they on the waiting list.
	    	if(data == false){
	    		alert("Sorry you are on the wait list")
	    	}

	    	// Clear the form when submitting
    		$('#reserve_name').val("");
			$('#reserve_phone').val("");
			$('#reserve_email').val("");
			$('#reserve_uniqueID').val("");

	    });

return false;

});