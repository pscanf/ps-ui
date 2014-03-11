angular.module("ps-ui.in.address", [])

.factory("PsPlaceFormattingService", function () {
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
})

.directive("psInAddress", function (PsPlaceFormattingService) {
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
});
