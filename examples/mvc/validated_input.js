(function (exports) {

  var ValidatedInput = function (model, key, name) {

    var isValid, controller, row, label, input, error;

    isValid = true;
    controller = new ValidatedInputController(this, domain, key);
    error = $('<span class="error"></span>');

    $(model).on('valid', $.proxy(clearError, this));
    $(model).on('invalid', $.proxy(showError, this));

    this.render = function (container) {

      var eventProxy = $.proxy(proxyInputEvents, this);

      label = $('<label>' + name + '</label>').attr('for', key);
      input = $('<input>').attr({ id: key, type: 'text' });
      input.on('change', eventProxy);
      row = $('<div class="row"></div>')
        .append(label)
        .append(input)
        .appendTo(container);
    };

    function proxyInputEvents() {
      $(this).trigger('change', input.val());
    };

    function clearError(e) {
      isValid = true;
      row.removeClass('error');
      error.remove();
    }

    function showError(e, data) {
      if (data.key !== key)
        return;

      isValid = false;
      row.removeClass('error');
      error.text(data.message).appendTo(row);
    }
  };

  var ValidatedInputController = function (view, model, key) {
    $(view).on('change', function (e, value) {
      model.set(key, value);
    });
  };

  this.ValidatedInput = ValidatedInput;

}(window));
