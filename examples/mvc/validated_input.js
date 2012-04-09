var ValidatedInput = function (model, key, name) {

  var controller, row, label, input, error;

  controller = new ValidatedInputController(this, domain, key);

  $(model).on('invalid', $.proxy(showError, this));
  $(model).on('valid', $.proxy(clearError, this));

  this.render = function (container) {

    var eventProxy = $.proxy(proxyInputEvents, this);

    label = $('<label>' + name + '</label>').attr('for', key);
    input = $('<input>').attr({ id: key, type: 'text' });
    input.on('change', eventProxy);
    error = $('<span class="help-inline"></span>');
    row = $('<div class="control-group"></div>')
      .append(label)
      .append(input)
      .appendTo(container);
  };

  function proxyInputEvents() {
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
