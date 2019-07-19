Stripe.setPublishableKey('pk_test_IshQe5eM415H0qKFZezdfNpp00ZTqzfJ8S');
var $form = $('#checkout-form');
$form.submit(function(event){
    $form.find('button').prop('disabled', true);
    Stripe.card.createToken({
        number: $('#card-number').val(),
        cvc: $('#card-cvc').val(),
        exp_month: $('#card-expiry-month').val(),
        exp_year: $('#card-expiry-year').val(),
        name: $('#card-name').val()
    }, stripeResponseHandler);
    return false;
});

function stripeResponseHandler(status, response) {
    if(response.error) {
        
        //Show the errors on the form
        $('#change-error').text(response.error.message);
        $('#change-error').removeClass('hidden');
        $('button').prop('disabled', false);
    } else {
        // Get the token ID:
        var token = response.id;
        // Insert the token into the form so it gets submitted to the server:
        $form.append($('<input type="hidden" name="stripeToken" />').val(token));
        // Submit the form:
        $form.get(0).submit();
    }
}