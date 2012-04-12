var CreateDomainForm = function () {

  var nameInput, emailInput, ttlInput;

  nameInput = new ValidatedInput('Name');
  emailInput = new ValidatedInput('Email');
  ttlInput = new ValidatedTTL();

  this.getNameView = function () {
    return nameInput;
  };

  this.getEmailView = function () {
    return emailInput;
  };

  this.getTTLView = function () {
    return ttlInput;
  };

  this.render = function (container) {

    var fieldset, form;

    fieldset = $('<fieldset><legend>Create Domain</legend></fieldset>');
    nameInput.render(fieldset);
    emailInput.render(fieldset);
    ttlInput.render(fieldset);
    fieldset.append('<button class="btn btn-primary" type="submit">Create Domain</button>')

    form = $('<form class="form-horizontal"></form>');
    form.on('submit', $.proxy(handleFormSubmission, this));
    form.append(fieldset);
    form.appendTo(container);
  };

  function handleFormSubmission(e) {
    $(this).trigger('submit', e.data);
    return false;
  };
};

var CreateDomainPresenter = function (view, domain) {

  var namePresenter, emailPresenter, ttlPresenter;

  namePresenter = new ValidatedInputPresenter(view.getNameView(), domain, 'name');
  emailPresenter = new ValidatedInputPresenter(view.getEmailView(), domain, 'email');
  ttlPresenter = new ValidatedTTLPresenter(view.getTTLView(), domain);

  $(view).on('submit', function (e) {
    if (domain.isValid())
      alert('Valid!');
    else
      alert('Invalid.');
  });
};
