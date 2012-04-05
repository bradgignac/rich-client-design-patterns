(function (exports) {

  var Domain = function () {

    var data = {};

    this.set = function (key, value) {

      var oldValue;

      oldValue = data[key];
      data[key] = value;

      $(this).trigger('change', {
        key: key,
        oldValue: oldValue,
        newValue: value
      });
    }

    this.get = function (key) {
      return data[key];
    }
  };

  exports.Domain = Domain;

}(window));
