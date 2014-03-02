angular.module("ps-ui.fc.phones", [])

.directive("psFcPhones", function () {
	return {
		restrict: "E",
		templateUrl: "template/fc/phones/phones.html",
		scope: {
			phones: "="
		},
		link: function ($scope) {
			$scope.text = {
				delete: "Elimina",
				question: "Confermi l'eliminazione?",
				yes: "Sì",
				no: "No"
			};
			$scope.addPhone = function (e) {
				if (e instanceof KeyboardEvent) {
					if (e.keyCode !== 13) {
						return;
					}
				}
				if (!$scope.newPhone || $scope.newPhone === "") {
					return;
				}
				if (!$scope.phones) {
					$scope.phones = [];
				}
				$scope.phones.push({
					number: $scope.newPhone
				});
				$scope.newPhone = "";
			};
			$scope.delPhone = function (index) {
				$scope.phones.splice(index, 1);
			};
		}
	};
});
