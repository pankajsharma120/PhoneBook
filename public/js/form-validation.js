

var inValidForms = new Set();

$(document).on('focusout', "[name^='mobile']", function(event) {
    if($(this).val()){
      var regex = /^\d{10}$/;
      if($(this).val().match(regex)){
        validate_phn_no($(this))
      }
      else {
        $(this).next('.invalid-feedback').html('Invalid Phone number');
        $(this).addClass('is-invalid')
      }
    }
});

function validate_phn_no(ele) {
  $.ajax({
    url: '/person/validate-phone',
    type: 'GET',
    data: {phn_no: [ele.val(),]},
    success: function(response) {
      if(response.status=="208"){
        inValidForms.add(ele.attr('name'));
        $(this).next('.invalid-feedback').html('Contact with this number already exists.');
        ele.addClass('is-invalid');
      }else{
        console.log(inValidForms.delete(ele.attr('name')));
        ele.removeClass('is-invalid');
        ele.next('invalid-feedback').remove();
      }
    }
  })
}


function validateForm() {
  let first_val = inValidForms.values().next().value;
  if(first_val){
    $("[name='"+first_val+"']")[0].scrollIntoView();
    return false;
  }
  else{
    true;
  }
}
