angular.module("ps-ui", [
	"ps-ui.dashboard",
	"ps-ui.multi-transclude",
	"ps-ui.fc",
	"ps-ui.in",
	"ui.bootstrap",
	"ui.utils"
]);

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

angular.module("ps-ui.fc", [
	"ps-ui.fc.addresses",
	"ps-ui.fc.codice-fiscale",
	"ps-ui.fc.emails",
	"ps-ui.fc.phones",
	"ps-ui.fc.tags"
]);

angular.module("ps-ui.in", [
	"ps-ui.in.address",
	"ps-ui.in.delete",
	"ps-ui.in.tag"
]);

angular.module("ps-ui.multi-transclude", [])

.directive("psMultiTransclude", function () {
	return {
		link: function ($scope, $element, $attrs, controller, $transclude) {
			if (!$transclude) {
				throw new Error("Illegal use of psMultiTransculde");
			}
			$transclude(function (clone) {
				var wrapper = angular.element("<div></div>");
				wrapper.append(clone);
				var selector = "[name=" + $attrs.psMultiTransclude + "]";
				var target = wrapper[0].querySelector(selector);
				target = angular.element(target);
				$element.replaceWith(target);
			});
		}
	};
});

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

.factory("PsCfValidationService", ["PsCfConstants", function (PsCfConstants) {
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
}])

.directive("psFcCodiceFiscale", ["PsCfValidationService", function (PsCfValidationService) {
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
}]);

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
				if (e instanceof KeyboardEvent) {
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

angular.module("ps-ui.in.address", [])

.factory("PsPlaceFormattingService", [function () {
	var contains = function (array, element) {
		return array.indexOf(element) !== -1;
	};
	var format = function (gPlace) {
		var place = {};
		gPlace.address_components.forEach(function (component) {
			if (contains(component.types, "route")) {
				place.street = component.long_name;
			} else if (contains(component.types, "street_number")) {
				place.number = component.long_name;
			} else if (contains(component.types, "locality")) {
				place.city = component.long_name;
			} else if (contains(component.types, "postal_code")) {
				place.postalCode = component.long_name;
			} else if (contains(component.types, "administrative_area_level_2")) {
				place.county = component.short_name;
			} else if (contains(component.types, "country")) {
				place.country = component.long_name;
			}
		});
		return place;
	};
	return {
		format: format
	};
}])

.directive("psInAddress", ["PsPlaceFormattingService", function (PsPlaceFormattingService) {
	return {
		restrict: "E",
		replace: true,
		templateUrl: "template/in/address/address.html",
		scope: {
			place: "=",
			input: "=",
			options: "=",
			placeholder: "@"
		},
		link: function ($scope, $element) {
			try {
				$scope.autocomplete = new google.maps.places.Autocomplete($element[0], $scope.options);
				google.maps.event.addListener($scope.autocomplete, "place_changed", function () {
					$scope.$apply(function () {
						var place = $scope.autocomplete.getPlace();
						if (place && place.address_components) {
							place = PsPlaceFormattingService.format(place);
						}
						$scope.place = place;
					});
				});
			} catch (e) {
				return;
			}
		}
	};
}]);

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
