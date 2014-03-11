angular.module("ps-ui.fc.codice-fiscale", ["ui.utils"])

.factory("PsCfConstants", function () {
	var constants = {};
	constants.months = [
		"A", "B", "C", "D", "E", "H", "L", "M", "P", "R", "S", "T"
	];
	constants.odd = {
		"0":  1, "1":  0, "2":  5, "3":  7, "4":  9, "5": 13, "6": 15, "7": 17, "8": 19,
		"9": 21, "A":  1, "B":  0, "C":  5, "D":  7, "E":  9, "F": 13, "G": 15, "H": 17,
		"I": 19, "J": 21, "K":  2, "L":  4, "M": 18, "N": 20, "O": 11, "P":  3, "Q":  6,
		"R":  8, "S": 12, "T": 14, "U": 16, "V": 10, "W": 22, "X": 25, "Y": 24, "Z": 23
	};
	constants.even = {
		"0":  0, "1":  1, "2":  2, "3":  3, "4":  4, "5":  5, "6":  6, "7":  7, "8":  8,
		"9":  9, "A":  0, "B":  1, "C":  2, "D":  3, "E":  4, "F":  5, "G":  6, "H":  7,
		"I":  8, "J":  9, "K": 10, "L": 11, "M": 12, "N": 13, "O": 14, "P": 15, "Q": 16,
		"R": 17, "S": 18, "T": 19, "U": 20, "V": 21, "W": 22, "X": 23, "Y": 24, "Z": 25
	};
	constants.remaining = [
		"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
		"N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
	];
	return constants;
})

.factory("PsCfValidationService", function (PsCfConstants) {
	var check = {};
	check.length = function (cf) {
		if (cf.length !== 16) {
			throw new Error("Invalid length");
		}
	};
	check.month = function (cf) {
		var monthChar = cf.slice(8, 9);
		if (PsCfConstants.months.indexOf(monthChar) === -1) {
			throw new Error("Invalid month");
		}
	};
	check.day = function (cf) {
		var y = parseInt(cf.slice(6, 8), 10) + 1900;
		var m = PsCfConstants.months.indexOf(cf.slice(8, 9)) + 1;
		var d = parseInt(cf.slice(9, 11), 10);
		d = d > 41 ? d - 40 : d;
		var date = new Date(m + "-" + d + "-" + y);
		if (isNaN(date.valueOf())) {
			throw new Error("Invalid day");
		}
	};
	check.control = function (cf) {
		var sum = 0;
		for (var i=0; i<15; i++) {
			if (i%2 === 0) {
				sum += PsCfConstants.odd[cf[i]];
			} else {
				sum += PsCfConstants.even[cf[i]];
			}
		}
		var control = PsCfConstants.remaining[sum % 26];
		if (cf[cf.length - 1] !== control) {
			throw new Error("Invalid control digit. Should be " + control);
		}
	};
	var validate = function (cf) {
		cf = cf.toUpperCase();
		try {
			check.length(cf);
			check.month(cf);
			check.day(cf);
			check.control(cf);
		} catch (e) {
			console.log(e.message);
			return false;
		}
		return true;
	};
	return {
		validate: validate
	};
})

.directive("psFcCodiceFiscale", function (PsCfValidationService) {
	return {
		restrict: "E",
		templateUrl: "template/fc/codice-fiscale/codice-fiscale.html",
		scope: {
			cf: "="
		},
		link: function ($scope, $element) {
			$element.find("input").on("keyup", function () {
				$scope.$apply(function () {
					if (!$scope.cf) {
						$scope.invalidCf = true;
						return;
					}
					var valid = PsCfValidationService.validate($scope.cf);
					$scope.invalidCf = !valid;
					$scope.validCf = valid;
				});
			});
			$element.find("input").on("blur", function () {
				$scope.$apply(function () {
					if (!$scope.cf) $scope.invalidCf = false;
					$scope.validCf = false;
				});
			});
		}
	};
});
