var ValidatedInput = function (name) {

  var label, input, error, row;

  this.render = function (container) {
    label = $('<label></label>').attr('for', name).text(name);
    input = $('<input type="text">').attr('id', name);
    input.on('change', $.proxy(handleValueChanged, this));
    error = $('<span class="help-inline"></span>');

    row = $('<div class="control-group"></div>');
    row.append(label);
    row.append(input);
    row.appendTo(container);
  };

  function handleValueChanged(e) {
    $(this).trigger('change', input.val());
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

var ValidatedInputPresenter = function (view, model, key) {
  $(view).on('change', function (e, value) {
    model.set(key, value);
  });

  $(model).on('invalid', function (e, property, message) {
    if (property !== key)
      return;

    view.showError(message);
  });

  $(model).on('valid', function (e, property) {
    if (property !== key)
      return;

    view.clearError();
  });
};
