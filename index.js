var psUiDemo = angular.module("ps-ui-demo", ["ps-ui"]);

psUiDemo.controller("MainCtrl", function ($scope) {
	$scope.menu = {
		items: [
			{
				title: "Social networks",
				icon: "fa-users",
				type: "submenu",
				items: [
					{
						title: "Google Plus",
						href: "https://plus.google.com",
						icon: "fa-google-plus"
					},
					{
						title: "Facebook",
						href: "https://facebook.com",
						icon: "fa-facebook"
					},
					{
						title: "Twitter",
						href: "https://twitter.com",
						icon: "fa-twitter"
					}
				]
			},
			{
				title: "Time wasting sites",
				icon: "fa-clock-o",
				type: "submenu",
				items: [
					{
						title: "Reddit",
						href: "http://reddit.com"
					},
					{
						title: "xkcd",
						href: "http://xkcd.com"
					}
				]
			},
			{
				title: "Personal website",
				href: "http://pscanf.com",
				icon: "fa-user"
			}
		]
	};
	$scope.emails = [
		{
			address: "paolo.scanferla@pcm.it",
			tags: ["Work"]
		}
	];
	$scope.addresses = [
		{
			street: "viale Berengario",
			number: "11",
			city: "Milano",
			postalCode: "20149",
			county: "Milano",
			country: "Italia",
			tags: ["Office"]
		}
	];
	$scope.phones = [
		{
			number: "+39 02 43987133",
			tags: ["Office"]
		}
	];
	$scope.faxes = [
		{
			number: "02 40042621",
			tags: ["Office"]
		}
	];
	$scope.gOpts = {
		types: ["geocode"],
		componentRestrictions: {
			country: "it"
		}
	};
});
