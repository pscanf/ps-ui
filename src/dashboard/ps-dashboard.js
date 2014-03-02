angular.module("ps-ui.dashboard", [])

.directive("psSidebar", function () {
	return {
		restrict: "E",
		templateUrl: "template/dashboard/sidebar.html",
		transclude: true,
		scope: {
			menu: "="
		},
		link: function ($scope) {
			$scope.isSubmenu = function (item) {
				return item.type === "submenu";
			};
			$scope.toggleSubmenu = function (item) {
				if (item.type === "submenu") {
					item.open = !item.open;
				}
			};
		}
	};
})

.directive("psContent", function () {
	return {
		restrict: "E",
		templateUrl: "template/dashboard/content.html",
		transclude: true
	};
});
