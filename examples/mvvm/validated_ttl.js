var TTLInput = function (viewModel) {

  var label, valueInput, unitInput, error, row;

  $(viewModel).on('invalid', function (e, property, message) {
    if (property !== 'ttl')
      return;

    row.addClass('error');
    error.text(message).appendTo(row);
  });

  $(viewModel).on('valid', function (e, property) {
    if (property !== 'ttl')
      return;

    row.removeClass('error');
    error.remove();
  });

  this.render = function (container) {
    label = $('<label for="ttl">TTL</label>');
    valueInput = $('<input id="ttl" type="text">');
    valueInput.on('change', $.proxy(handleValueChanged, this));
    unitInput = $('<select><option>Seconds</option><option>Minutes</option></select>')
    unitInput.on('change', $.proxy(handleUnitChanged, this));
    error = $('<span class="help-inline"></span>');

    row = $('<div class="control-group"></div>');
    row.append(label);
    row.append(valueInput);
    row.append(unitInput);
    row.appendTo(container);
  };

  function handleValueChanged(e) {
    viewModel.updateTTLValue(valueInput.val());
  };

  function handleUnitChanged(e) {
    viewModel.updateTTLUnit(unitInput.val());
  };
};
