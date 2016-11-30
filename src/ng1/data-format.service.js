function dataFormat() {
  this.validValues = [
    'first_last', 'last_first'
  ];

  this.format = this.validValues[0];
}

module.exports = angular.module('ng1app')
  .service('dataFormat', dataFormat);
