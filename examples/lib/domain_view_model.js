var DomainViewModel = function (domain) {

  $(domain).on('change', $.proxy(validateChange, this));

  this.set = function (key, value) {
    domain.set(key, value);
  };

  this.get = function (key) {
    return domain.get(key);
  };

  this.validate = function () {
    var errors = [];
    errors.push(validateName());
    errors.push(validateEmail());
    errors.push(validateTTL());

    $.grep(errors, function (error) {
      return error !== undefined;
    });

    return errors;
  };

  this.isValid = function () {
    return this.validate().length === 0;
  }

  function validateChange(e, data) {

    var error;

    if (data.key === 'name')
      error = validateName.call(this);
    else if (data.key === 'email')
      error = validateEmail.call(this);

    if (error)
      $(this).trigger('invalid', [data.key, error]);
    else
      $(this).trigger('valid', [data.key]);
  };

  function validateName() {
    var name = this.get('name');
    if (!name)
      return 'Name cannot be empty.';
    if (name.length > 10)
      return 'Name cannot be longer than 10 characters.';
  }

  function validateEmail(data, errors) {
    if (!this.get('email'))
      return 'Email cannot be empty.';
  }
};
