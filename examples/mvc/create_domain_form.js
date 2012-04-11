var CreateDomainForm = function (domain) {

  var controller, inputs;

  controller = new CreateDomainFormController(this, domain);
  this.inputs = [
    new ValidatedInput(domain, 'name', 'Name'),
    new ValidatedInput(domain, 'email', 'Email'),
    new ValidatedTTL(domain, 'TTL')
  ];

  this.render = function (container) {

    var form;

    form = this.createForm();
    form.on('submit', $.proxy(this.handleFormSubmission, this));
    form.appendTo(container);
  };

  this.createForm = function () {

    var form, fieldset;

    form = $('<form class="form-horizontal"></form>');
    fieldset = $('<fieldset><legend>Create Domain</legend></fieldset>');
    this.inputs.forEach(function (input) {
      input.render(fieldset);
    });
    fieldset.append('<button class="btn btn-primary" type="submit">Create Domain</button>');
    fieldset.appendTo(form);

    return form;
  };

  this.handleFormSubmission = function (e) {
    $(this).trigger('submit', e.data);
    return false;
  };
};

var CreateDomainFormController = function (view, domain) {
  $(view).on('submit', function () {
    if (domain.isValid())
      alert('Valid!');
    else
      alert('Invalid.');
  });
};
