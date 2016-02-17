function util() {}

// Get query string param
util.getQsParam = function(key) {
  key = key.replace(/[\[]/,'\\\[').replace(/[\]]/,'\\\]');
  var regex = new RegExp('[\\?&]'+key+'=([^&#]*)');
  var qs = regex.exec(window.location.href);
  if (qs == null) return '';
  return qs[1];
}

// Set URL state
util.setState = function(roomid, hostid) {
    util.clearQsParams();
    var url = location.origin + '/' + roomid;
    history.pushState({}, {}, url);
}

// Clear query string params
util.clearQsParams = function() {
  if (typeof location.origin === 'undefined')
    location.origin = location.protocol + '//' + location.host;
  history.pushState({}, {}, location.origin);
}

util.isEmptyObj = function(obj) {
  if (obj === undefined) return true;
  return Object.keys(obj).length === 0;
}

util.isEmptyStr = function(str) {
  if (str === undefined) return true;
  if (str.trim() === '') return true;
  return false;
}
