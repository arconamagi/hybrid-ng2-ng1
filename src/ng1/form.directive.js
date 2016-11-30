function ng1appForm(dataFormat) {
  return {
    restrict: 'E',
    templateUrl: '/src/ng1/form.directive.html',
    scope: {
      'editingPerson': '=',
      'onApply': '&',
      'onCancel': '&'
    },
    link: function (scope, elem, attrs) {
      scope.dataFormat = dataFormat;

      scope.isVisible = function () {
        return (scope.editingPerson !== null);
      };

      scope.apply = function () {
        scope.onApply();
      };

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

