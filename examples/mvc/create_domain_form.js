(function (exports) {

  var CreateDomainForm = function (domain) {

    var controller, inputs;

    controller = new CreateDomainFormController(this, domain);
    this.inputs = [
      new ValidatedInput(domain, 'name', 'Name'),
      new ValidatedInput(domain, 'email', 'Email'),
      // new ValidatedTTL(domain)
    ];

    this.render = function (container) {

      var form;

      form = this.createForm();
      form.on('submit', $.proxy(this.handleFormSubmission, this));

      $(container).append('<h1>Create Domain</h1>').append(form);
    };

    this.createForm = function () {

      var form;

      form = $('<form></form>');
      this.inputs.forEach(function (input) {
        input.render(form);
      });
      form.append('<button type="submit">Create Domain</button>');

      return form;
    };

    this.handleFormSubmission = function (e) {
      $(this).trigger('submit', e.data);
      return false;
    };
  };

  var CreateDomainFormController = function (view, domain) {
    $(view).on('submit', function () {

      var isValid;

      isValid = true;
      view.inputs.forEach(function (input) {
        isValid = isValid && input.isValid();
      });

      if (isValid)
        alert('Valid!');
      else
        alert('Invalid');
    });
  };

  this.CreateDomainForm = CreateDomainForm;

}(window));
