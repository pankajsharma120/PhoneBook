

var inValidForms = new Set();

$(document).on('focusout', "[name^='mobile']", function(event) {
    if($(this).val()){
      var regex = /^\d{10}$/;
      if($(this).val().match(regex)){
        remove_from_set($(this));
        validate_phn_no($(this));
      }
      else {
        inValidForms.add($(this).attr('data-name'));
        $(this).next('.invalid-feedback').html('Invalid Phone number');
        $(this).addClass('is-invalid')
      }
    }
});

function validate_phn_no(ele) {
  var pid = $("[name='_id']").val();
  $.ajax({
    url: '/person/validate-phone',
    type: 'GET',
    data: {phn_no: [ele.val()],pid:pid},
    success: function(response) {
      if(response.status=="208"){
        inValidForms.add(ele.attr('data-name'));
        $(this).next('.invalid-feedback').html('Contact with this number already exists.');
        ele.addClass('is-invalid');
      }else{
        remove_from_set(ele);
        ele.removeClass('is-invalid');
        ele.next('invalid-feedback').remove();
      }
    }
  })
}

function remove_from_set(ele) {
  console.log(ele);
  console.log(inValidForms.delete(ele.attr('data-name')));
}

function validateForm(event) {

  if(inValidForms.size>0){
    let first_val = inValidForms.values().next().value;
    $("[name='"+first_val+"']")[0].scrollIntoView();
    return false;
  }
  else{
    return true;
  }
}
