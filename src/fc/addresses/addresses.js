angular.module("ps-ui.fc.addresses", [])

.directive("psFcAddresses", function () {
	return {
		restrict: "E",
		templateUrl: "template/fc/addresses/addresses.html",
		scope: {
			addresses: "=",
			options: "="
		},
		link: function ($scope) {
			$scope.text = {
				delete: "Elimina",
				question: "Confermi l'eliminazione?",
				yes: "Sì",
				no: "No"
			};
			$scope.input = "";
			$scope.addAddress = function (e) {
				if (e instanceof KeyboardEvent) {
					if (e.keyCode !== 13) return;
					if (!$scope.place) return;
					if (!$scope.place.country) return;
				}
				var adr = $scope.place || {};
				adr.street		= adr.street		|| $scope.input || "";
				adr.number		= adr.number		|| "";
				adr.postalCode	= adr.postalCode	|| "";
				adr.city		= adr.city			|| "";
				adr.county		= adr.county		|| "";
				adr.country		= adr.country		|| "";
				if (!$scope.addresses) {
					$scope.addresses = [];
				}
				$scope.addresses.push(adr);
				$scope.place = {};
				$scope.input = "";
			};
			$scope.delAddress = function (index) {
				$scope.addresses.splice(index, 1);
			};
			$scope.oneLineAddress = function (adr) {
				var ola = "";
				if (adr.street !== "") {
					ola += adr.street;
					if (adr.number !== "") {
						ola += " " + adr.number;
					}
					ola += ",";
				}
				if (adr.postalCode !== "") {
					ola += " " + adr.postalCode;
				}
				if (adr.city !== "") {
					ola += " " + adr.city;
				}
				if (adr.county !== "") {
					ola += " (" + adr.county + ")";
				}
				if (ola === "") {
					ola = "Nuovo indirizzo";
				}
				return ola;
			};
		}
	};
});
