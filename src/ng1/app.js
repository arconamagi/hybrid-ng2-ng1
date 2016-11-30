/**
 * A root component for the application. It just wraps Angular 2 component.
 */
function ng1appRoot() {
  return {
    restrict: 'E',
    template: '<ng2app></ng2app>',
    scope: {}
  }
}

module.exports = angular.module('ng1app', [])
  .directive('ng1appRoot', ng1appRoot);

require('./data-format.service');
require('./form.directive');
