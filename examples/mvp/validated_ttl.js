var ValidatedTTL = function () {

  var label, valueInput, unitInput, error, row;

  this.render = function (container) {
    label = $('<label for="ttl">TTL</label>');
    valueInput = $('<input id="ttl" type="text">');
    valueInput.on('change', $.proxy(handleValueChanged, this));
    unitInput = $('<select><option>Seconds</option><option>Minutes</option></select>')
    unitInput.on('change', $.proxy(handleValueChanged, this));
    error = $('<span class="help-inline"></span>');

    row = $('<div class="control-group"></div>');
    row.append(label);
    row.append(valueInput);
    row.append(unitInput);
    row.appendTo(container);
  };

  function handleValueChanged(e) {
    $(this).trigger('change', [valueInput.val(), unitInput.val()]);
  };

  this.showError = function (message) {
    row.addClass('error');
    error.text(message).appendTo(row);
  };

  this.clearError = function () {
    row.removeClass('error');
    error.remove();
  };
};

var ValidatedTTLPresenter = function (view, model) {
  $(view).on('change', function (e, value, unit) {
    model.setTTL(value, unit);
  });

  $(model).on('invalid', function (e, property, message) {
    if (property !== 'ttl')
      return;

    view.showError(message);
  });

  $(model).on('valid', function (e, property) {
    if (property !== 'ttl')
      return;

    view.clearError();
  });
};
