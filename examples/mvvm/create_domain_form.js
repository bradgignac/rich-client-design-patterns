var CreateDomainForm = function (viewModel) {

  var nameInput, emailInput, ttlInput;

  nameInput = new NameInput(viewModel);
  emailInput = new EmailInput(viewModel);
  ttlInput = new TTLInput(viewModel);

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
    console.log('test');
    try {
      viewModel.submit();
    }
    catch (err) {
      console.log(err);
    }
    return false;
  };
};

var CreateDomainViewModel = function (domain) {

  var self, ttlValue, ttlUnit;

  self = this;
  ttlValue = undefined;
  ttlUnit = 'Seconds';

  this.updateName = function (name) {
    domain.set('name', name);
  };

  this.updateEmail = function (email) {
    domain.set('email', email);
  };

  this.updateTTLValue = function (value) {
    ttlValue = value;
    domain.set('ttl', computeTTL());
  };

  this.updateTTLUnit = function (unit) {
    ttlUnit = unit;
    domain.set('ttl', computeTTL());
  };

  function computeTTL() {

    var ttlInSeconds;

    if (ttlUnit === 'Seconds')
      ttlInSeconds = ttlValue;
    else
      ttlInSeconds = ttlValue * 60;

    return ttlInSeconds;
  }

  this.submit = function () {
    if (domain.isValid())
      alert('Valid!');
    else
      alert('Invalid.');
  };

  $(domain).on('invalid', function (e, property, message) {
    $(self).trigger('invalid', [property, message]);
  });

  $(domain).on('valid', function (e, property) {
    $(self).trigger('valid', property);
  });
};
