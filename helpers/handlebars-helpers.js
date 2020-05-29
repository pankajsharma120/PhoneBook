module.exports = {
  times: function(from, to, incr, block){
    var accum = '';
    for(var i = from; i <= to; i += incr)
      {block.data.index = i;
      block.data.first = i === 0;
      block.data.last = i === (to - 1);
      accum += block.fn(this);}
    return accum;
  },
  eq: (v1, v2) => {return v1 == v2},
  teq: (v1, v2) => {return v1 === v2},
  ne: (v1, v2) => v1 !== v2,
  lt: (v1, v2) => v1 < v2,
  gt: (v1, v2) => v1 > v2,
  lte: (v1, v2) => v1 <= v2,
  gte: (v1, v2) => v1 >= v2,
  and() {
      return Array.prototype.every.call(arguments, Boolean);
  },
  or() {
      return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
  },
  url_replace: function(req,page,next_page,block) {
    return "OK"
  }
}
