$(document).ready(function() {
  // Wrap form elements to sections
  $('.en__field--paycurrency, .en__field--donationAmt').wrapAll('<div class="donations-formsection-amount"></div>');
  $('.en__field--firstName, .en__field--lastName, .en__field--address1, .en__field--city, .en__field--postcode, .en__field--country, .en__field--emailAddress').wrapAll('<div class="donations-formsection-info"></div>');
  $('.en__field--paymenttype, .en__field--ccnumber, .en__field--ccexpire, .en__field--ccvv').wrapAll('<div class="donations-formsection-payment"></div>');

  // Add headings on sections
  $('<div class="formsection-heading"><span class="badge badge-light">1</span>Your Gift Amount</div>').insertBefore('.donations-formsection-amount');
  $('<div class="formsection-heading"><span class="badge badge-light">1</span>Your Name &amp; Address</div>').insertBefore('.donations-formsection-info');
  $('<div class="formsection-heading"><span class="badge badge-light">1</span>Your Gift Payment Method</div>').insertBefore('.donations-formsection-payment');

  // Add next buttons on sections
  $('.donations-formsection-amount').append('<button id="formsection-amount-next" class="btn btn-primary btn-block">Next</button>');
  $('.donations-formsection-info').append('<button id="formsection-info-next" class="btn btn-primary btn-block">Next</button>');
  $('.donations-formsection-payment').append('<button id="formsection-payment-next" class="btn btn-primary btn-block">Next</button>');

  // Next buttons visibility trigger
  $('#formsection-next').click(function() {
    $(this).parent().hide();
  });
});
