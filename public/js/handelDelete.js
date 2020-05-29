

$(".delete_rec").on('click', function(event) {
    var r = confirm("Are you sure you want to delete this record ?");
    var ele = $(this);
    if(r){
      $.ajax({
        url: '/person/delete',
        type: 'POST',
        data: {id:ele.attr('data-target')},
        success: function(response) {
          if(response.status=="202"){
            $("#card_"+ele.attr('data-target')).remove();
          }
        }
      })
    }
});
