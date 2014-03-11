angular.module("ps-ui.fc.emails", [])

.directive("psFcEmails", function () {
	return {
		restrict: "E",
		templateUrl: "template/fc/emails/emails.html",
		scope: {
			emails: "="
		},
		link: function ($scope, $element) {
			$scope.text = {
				delete: "Elimina",
				question: "Confermi l'eliminazione?",
				yes: "Sì",
				no: "No"
			};
			$scope.addEmail = function (e) {
				if (e && e.type === "keyup") {
					if (e.keyCode !== 13) {
						return;
					}
				}
				if (!$scope.newEmail || $scope.newEmail === "") {
					return;
				}
				if (!$scope.emails) {
					$scope.emails = [];
				}
				$scope.emails.push({
					address: $scope.newEmail
				});
				$scope.newEmail = "";
			};
			$scope.delEmail = function (index) {
				$scope.emails.splice(index, 1);
			};
		}
	};
});
