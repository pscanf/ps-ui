angular.module("ps-ui.in.delete", [])

.directive("psInDelete", function () {
	return {
		restrict: "E",
		templateUrl: "template/in/delete/delete.html",
		scope: {
			deleteAction: "&",
			text: "="
		}
	};
});
