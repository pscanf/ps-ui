angular.module("ps-ui.fc.tags", [])

.directive("psFcTags", function () {
	return {
		restrict: "E",
		templateUrl: "template/fc/tags/tags.html",
		scope: {
			tags: "="
		}
	};
});
