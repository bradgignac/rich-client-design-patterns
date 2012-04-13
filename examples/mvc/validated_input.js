var ValidatedInput = function (model, key, name) {

  var controller, row, label, input, error;

  controller = new ValidatedInputController(this, domain, key);

  $(model).on('invalid', $.proxy(showError, this));
  $(model).on('valid', $.proxy(clearError, this));

  this.render = function (container) {
    label = $('<label></label>').attr('for', key).text(name);
    input = $('<input type="text">').attr('id', key);
    input.on('change', $.proxy(handleValueChanged, this));
    error = $('<span class="help-inline"></span>');

    row = $('<div class="control-group"></div>');
    row.append(label);
    row.append(input);
    row.appendTo(container);
  };

  function handleValueChanged() {
    $(this).trigger('change', input.val());
  };

  function showError(e, property, message) {
    if (property !== key)
      return;

    row.addClass('error');
    error.text(message).appendTo(row);
  }

  function clearError(e, property) {
    if (property !== key)
      return;

    row.removeClass('error');
    error.remove();
  }
};

var ValidatedInputController = function (view, model, key) {
  $(view).on('change', function (e, value) {
    model.set(key, value);
  });
};
