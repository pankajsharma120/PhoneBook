

var phn_count = 1;
var email_count = 1;

function get_phn_field() {
  return '<div id="id_phn_warp_'+phn_count+'" class="form-row">\
      <div class="form-group col-md-11">\
          <label>Phonenumber '+phn_count+' </label>\
          <input type="number" class="form-control" name="mobile'+phn_count+'" placeholder="Mobile">\
          <small class="invalid-feedback">Contact with this number already exist.</small>\
      </div>\
      <div class="form-group col-md-1 text-center">\
          <span class="id_delete_phn fa fa-times-circle" data-target="'+phn_count+'" class="fa fa-times-circle" style="position: relative;top: 36px;font-size: 26px;cursor: pointer;"></span>\
      </div>\
  </div>'
}

function get_email_field(){
  return '<div id="id_email_warp_'+email_count+'" class="form-row">\
      <div class="form-group col-md-11">\
          <label>Email '+email_count+' </label>\
          <input type="email" class="form-control" name="email'+email_count+'" placeholder="Email">\
      </div>\
      <div class="form-group col-md-1 text-center">\
          <span class="id_delete_email fa fa-times-circle" data-target="'+email_count+'" class="fa fa-times-circle" style="position: relative;top: 36px;font-size: 26px;cursor: pointer;"></span>\
      </div>\
  </div>'
}

$("#id_add_phn_field").on('click', function(event) {
  $(this).parents('.form-row').after(get_phn_field());
  phn_count++;
});

$("#id_add_email_field").on('click', function(event) {
  $(this).parents('.form-row').after(get_email_field());
  email_count++;
});

$(document).on('click',".id_delete_phn",function(event) {
  $("#id_phn_warp_"+$(this).attr('data-target')).remove();
});


$(document).on('click',".id_delete_email", function(event) {
  $("#id_email_warp_"+$(this).attr('data-target')).remove();
});
