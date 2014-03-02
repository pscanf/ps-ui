angular.module("ps-ui.in.tag", [])

.directive("psInTag", function () {
	return {
		restrict: "E",
		templateUrl: "template/in/tag/tag.html",
		scope: {
			tags: "=",
			placeholder: "@"
		},
		link: function ($scope) {
			$scope.delTag = function (index) {
				$scope.tags.splice(index, 1);
			};
			$scope.addingKeyCodes = [13, 32, 188, 186];
			$scope.addTag = function (e) {
				if (e instanceof KeyboardEvent) {
					if ($scope.addingKeyCodes.indexOf(e.keyCode) === -1) {
						return;
					}
				}
				if (e instanceof MouseEvent) {
					if (e.button !== 0) {
						return;
					}
				}
				if ($scope.newTag === "") {
					return;
				}
				var tag = $scope.newTag.trim();
				var lastChar = tag[tag.length -1];
				if (lastChar === "," || lastChar === ";") {
					tag = tag.slice(0, -1);
				}
				if (!$scope.tags) {
					$scope.tags = [];
				}
				if ($scope.tags.indexOf(tag) === -1) {
					$scope.tags.push(tag);
				}
				$scope.newTag = "";
			};
		}
	};
});
