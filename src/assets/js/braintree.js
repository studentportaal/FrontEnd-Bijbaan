var button = document.querySelector('#submit-button');
braintree.dropin.create({
  authorization: 'ClientToken',
  container: '#dropin-container'
}, function (createErr, instance) {
  button.addEventListener('click', function(){
    instance.requestPaymentMethod(function(err, payload){

    });
  });
});
