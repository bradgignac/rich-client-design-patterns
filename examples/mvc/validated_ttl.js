var ValidatedTTL = function (model, name) {

  var controller, row, label, value, unit, error;

  controller = new ValidatedTTLController(this, model);

  $(model).on('invalid', $.proxy(showError, this));
  $(model).on('valid', $.proxy(clearError, this));

  this.render = function (container) {

    var eventProxy = $.proxy(proxyInputEvents, this);

    label = label = $('<label>' + name + '</label>').attr('for', 'ttlUnit');
    value = $('<input>').attr({ id: 'ttlUnit', type: 'text' });
    value.on('change', eventProxy);
    unit = $('<select><option>Seconds</option><option>Minutes</option></select>');
    unit.on('change', eventProxy);
    error = $('<span class="help-inline"></span>');
    row = $('<div class="control-group"></div>')
      .append(label)
      .append(value)
      .append(unit)
      .appendTo(container);
  };

  function proxyInputEvents() {
    $(this).trigger('change', [value.val(), unit.val()]);
  };

  function showError(e, property, message) {
    if (property !== 'ttl')
      return;

    row.addClass('error');
    error.text(message).appendTo(row);
  }

  function clearError(e, property) {
    if (property !== 'ttl')
      return;

    row.removeClass('error');
    error.remove();
  }
};

var ValidatedTTLController = function (view, model) {
  $(view).on('change', function (e, value, unit) {
    model.setTTL(value, unit);
  });
}
