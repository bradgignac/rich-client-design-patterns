(function (exports) {

  var DomainViewModel = function (domain) {

    $(domain).on('change', $.proxy(validateChange, this));

    this.set = function (key, value) {
      domain.set(key, value);
    };

    this.get = function (key) {
      return domain.get(key);
    };

    function validateChange(e, data) {

      var errors = [];

      validateName(data, errors);
      validateEmail(data, errors);
      validateTTL(data, errors);

      if (errors.length === 0)
        $(this).trigger('valid');
      else
        $(this).trigger('invalid', errors);
    };

    function validateName(data, errors) {
      if (data.key !== 'name')
        return;

      if (!data.newValue)
        errors.push({ key: 'name', message: 'Name cannot be empty.' });
      else if (data.newValue.length > 10)
        errors.push({ key: 'name', message: 'Name cannot be longer than 10 characters.' });
    }

    function validateEmail(data, errors) {
      if (data.key !== 'email')
        return;

      if (!data.newValue)
        errors.push({ key: 'email', message: 'Email cannot be empty.' });
    }

    function validateTTL(data, errors) {

      var ttlValue, ttlUnit, ttlInSeconds;

      if (data.key !== 'ttlUnit' || data.key !== 'ttlValue')
        return;

      ttlValue = domain.get('ttlValue');
      ttlUnit = domain.get('ttlUnit');
      ttlInSeconds = ttlUnit === 'Seconds' ? ttlValue : ttlValue * 60;

      if (ttlInSeconds < 300)
        errors.push({ key: 'ttlValue', message: 'TTL must be greater than or equal to 300 seconds.' });
    }
  };

  exports.DomainViewModel = DomainViewModel;

}(window));
