angular.module("ps-ui.fc.faxes", [])

.directive("psFcFaxes", function () {
	return {
		restrict: "E",
		templateUrl: "template/fc/faxes/faxes.html",
		scope: {
			faxes: "="
		},
		link: function ($scope) {
			$scope.text = {
				delete: "Elimina",
				question: "Confermi l'eliminazione?",
				yes: "Sì",
				no: "No"
			};
			$scope.addFax = function (e) {
				if (e instanceof KeyboardEvent) {
					if (e.keyCode !== 13) {
						return;
					}
				}
				if (!$scope.newFax || $scope.newFax === "") {
					return;
				}
				if (!$scope.faxes) {
					$scope.faxes = [];
				}
				$scope.faxes.push({
					number: $scope.newFax
				});
				$scope.newFax = "";
			};
			$scope.delFax = function (index) {
				$scope.faxes.splice(index, 1);
			};
		}
	};
});
