var CreateDomainForm = function (domain) {

  var controller, nameInput, emailInput, ttlInput;

  controller = new CreateDomainFormController(this, domain);
  nameInput = new ValidatedInput(domain, 'name', 'Name');
  emailInput = new ValidatedInput(domain, 'email', 'Email');
  ttlInput = new ValidatedTTL(domain, 'TTL');

  this.render = function (container) {

    var fieldset, form;

    fieldset = $('<fieldset><legend>Create Domain</legend></fieldset>');
    nameInput.render(fieldset);
    emailInput.render(fieldset);
    ttlInput.render(fieldset);
    fieldset.append('<button class="btn btn-primary" type="submit">Create Domain</button>');

    form = $('<form class="form-horizontal"></form>');
    form.on('submit', $.proxy(this.handleFormSubmission, this));
    form.append(fieldset);
    form.appendTo(container);
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
