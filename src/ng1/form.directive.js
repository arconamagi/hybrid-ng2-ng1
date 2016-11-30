/**
 * A form to create or modify provided person info.
 * Is used from Angular 2 `AppComponent` component.
 */
function ng1appForm(dataFormat) {
  return {
    restrict: 'E',
    templateUrl: '/src/ng1/form.directive.html',
    scope: {
      'person': '=',
      'onApply': '&',
      'onCancel': '&'
    },
    link: function (scope, elem, attrs) {
      scope.dataFormat = dataFormat;

      /**
       * Checks if the form should be visible
       */
      scope.isVisible = function () {
        return (scope.person !== null);
      };

      /**
       * 'Apply' button handler
       */
      scope.apply = function () {
        scope.onApply();
      };

      /**
       * 'Cancel' button handler
       */
      scope.cancel = function () {
        if (scope.onCancel) {
          scope.onCancel();
        }
      };

    }
  }
}

module.exports = angular.module('ng1app')
  .directive('ng1appForm', ng1appForm);

