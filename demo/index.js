var psUiDemo = angular.module("ps-ui-demo", ["ps-ui"]);

psUiDemo.controller("MnCtrl", function ($scope) {
	$scope.menu = {
		items: [
			{
				title: "Search engines",
				icon: "fa-search",
				type: "submenu",
				items: [
					{
						title: "Google",
						href: "http://www.google.com",
						icon: "fa-google-plus"
					},
					{
						title: "Bing",
						href: "http://www.bing.com"
					},
					{
						title: "Yahoo!",
						href: "http://www.yahoo.com"
					}
				]
			},
			{
				title: "xkcd",
				href: "http://xkcd.com",
				icon: "fa-user"
			}
		]
	};
	$scope.emails = [
		{
			address: "paolo.scanferla@gmail.com",
			description: "Home"
		},
		{
			address: "sixgh@hotmail.it",
			description: "Work"
		}
	];
	$scope.addresses = [
		{
			street: "via Plinio",
			number: "22",
			city: "Milano",
			postalCode: "20129",
			county: "Milano",
			country: "Italia",
			formattedAddress: "Via Plinio, 22, Milano, MI, Italia",
			tags: ["Paolo"]
		},
		{
			street: "via Caroi",
			number: "7",
			city: "Campovico",
			postalCode: "23017",
			county: "Sondrio",
			country: "Italia",
			formattedAddress: "Via Caroi, 7, Campovico, SO, Italia"
		}
	];
	$scope.phones = [
		{
			number: "0342 611182",
			tags: ["Casa"]
		}
	];
	$scope.faxes = [
		{
			number: "02 40042621",
			tags: ["Fiam"]
		}
	];
	$scope.gOpts = {
		types: ["geocode"],
		componentRestrictions: {
			country: "it"
		}
	};
});
