

var urlSerializer = function(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

exports.page_url_replace = function (query) {
  var new_req_query = query;
  delete new_req_query.page;
  return urlSerializer(new_req_query)
}
