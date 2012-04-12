var ValidatedInput = function (name, viewModel, key, command) {

  var label, input, error, row;

  $(viewModel).on('invalid', function (e, property, message) {
    if (property !== key)
      return;

    row.addClass('error');
    error.text(message).appendTo(row);
  });

  $(viewModel).on('valid', function (e, property) {
    if (property !== key)
      return;

    row.removeClass('error');
    error.remove();
  });

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
    viewModel[command].call(viewModel, input.val());
  };
};

var NameInput = function (viewModel) {
  return new ValidatedInput('Name', viewModel, 'name', 'updateName');
};

var EmailInput = function (viewModel) {
  return new ValidatedInput('Email', viewModel, 'email', 'updateEmail');
};
