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

.directive("psToggleSidebar", function () {
	return {
		restrict: "E",
		templateUrl: "template/dashboard/toggle-sidebar.html",
		scope: {},
		link: function ($scope) {
			$scope.toggle = function () {
				var sidebar = angular.element(document.getElementById("ps-sidebar"));
				var content = angular.element(document.getElementById("ps-content"));
				if (sidebar.hasClass("show-sidebar")) {
					sidebar.removeClass("show-sidebar");
					content.removeClass("show-sidebar");
				} else {
					sidebar.addClass("show-sidebar");
					content.addClass("show-sidebar");
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
