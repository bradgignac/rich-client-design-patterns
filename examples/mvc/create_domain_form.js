(function (exports) {

  var CreateDomainForm = function (domain) {

    var controller, inputs;

    controller = new CreateDomainFormController(this, domain);
    inputs = [
      new ValidatedInput(domain, 'name', 'Name'),
      new ValidatedInput(domain, 'email', 'Email'),
      new ValidatedTTL(domain)
    ];

    this.render = function (container) {

      var form = createFormWithInputs(inputs);
      form.on('submit', $.proxy(handleFormSubmission, this));

      $(container).append('<h1>Create Domain</h1>').append(form);
    };

    function createFormWithInputs(inputs) {
      var form = $('<form></form>');
      inputs.forEach(function (input) {
        input.render(form);
      });
      form.append('<button type="submit">Create Domain</button>');

      return form;
    };

    function handleFormSubmission(e) {
      $(this).trigger('submit', e.data);
      return false;
    };
  };

  var CreateDomainFormController = function (view, domain) {
    $(view).on('submit', function () {
      // Make sure all fields are valid before allowing submission.
      // If invalid, show an error message.
      // Otherwise, save the model.
    });
  };

  this.CreateDomainForm = CreateDomainForm;

}(window));
