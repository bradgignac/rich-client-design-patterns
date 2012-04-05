(function (exports) {

  var ValidatedInput = function (model, key, name) {

    var row, label, input, error, controller;

    controller = new RequiredInputController(this, domain);

    this.showValidationMessage = function (message) {
      if (this.isValid()) {
        error = $('<span class="error"></span>').text(message);
        row.append(error);
      }
    };

    this.clearValidationMessage = function () {
      if (!this.isValid()) {
        error.remove();
        error = null;
      }
    }

    this.isValid = function () {
      return error == null;
    }

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
  };

  var RequiredInputController = function (view) {
    $(view).on('change', function (e, value) {
      if (value)
        view.clearValidationMessage();
      else
        view.showValidationMessage('This field is invalid.');
    });
  };

  this.ValidatedInput = ValidatedInput;

}(window));
