angular.module("ps-ui.fc.tags", [])

.directive("psFcTags", function () {
	return {
		restrict: "E",
		templateUrl: "template/fc/tags/tags.html",
		scope: {
			tags: "="
		},
		link: function ($scope) {
			$scope.noTags = function () {
				if ($scope.tags) {
					return $scope.tags.length === 0;
				}
				return true;
			};
		}
	};
});
