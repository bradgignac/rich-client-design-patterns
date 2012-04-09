var DomainViewModel = function (domain) {

  $(domain).on('change', $.proxy(validateChange, this));

  this.set = function (key, value) {
    domain.set(key, value);
  };

  this.setTTL = function (value, unit) {

    var ttlInSeconds;

    if (unit === 'Seconds')
      ttlInSeconds = value;
    else
      ttlInSeconds = value * 60;

    domain.set('ttl', ttlInSeconds);
  };

  this.get = function (key) {
    return domain.get(key);
  };

  this.validate = function () {
    var self, errors;

    self = this;
    errors = [];
    errors.push({ key: 'name', message: validateName.call(this) });
    errors.push({ key: 'email', message: validateEmail.call(this) });
    errors.push({ key: 'ttl', message: validateTTL.call(this) });
    errors = $.grep(errors, function (error) {
      return error.message !== undefined;
    })

    $.each(errors, function (i, error) {
      fireEventForError.call(self, error.key, error.message);
    });

    return errors;
  };

  this.isValid = function () {
    var errors = this.validate();
    return this.validate().length === 0;
  }

  function validateChange(e, data) {

    var error;

    if (data.key === 'name')
      error = validateName.call(this);
    else if (data.key === 'email')
      error = validateEmail.call(this);
    else if (data.key === 'ttl')
      error = validateTTL.call(this);

    fireEventForError.call(this, data.key, error);
  };

  function validateName() {
    if (!this.get('name'))
      return 'Name cannot be empty.';
    else if (this.get('name').length > 10)
      return 'Name cannot be longer than 10 characters.';
  }

  function validateEmail() {
    if (!this.get('email'))
      return 'Email cannot be empty.';
  }

  function validateTTL() {
    if (!this.get('ttl') || this.get('ttl') < 300)
      return 'TTL must be greater than 300 seconds.';
  }

  function fireEventForError(key, message) {
    var eventType = message ? 'invalid' : 'valid';
    $(this).trigger(eventType, [key, message]);
  }
};
