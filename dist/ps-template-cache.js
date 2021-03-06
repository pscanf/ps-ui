(function(module) {
try {
  module = angular.module('ps-ui.ps-template-cache');
} catch (e) {
  module = angular.module('ps-ui.ps-template-cache', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('template/dashboard/content.html',
    '<div id="ps-content" ng-transclude></div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('ps-ui.ps-template-cache');
} catch (e) {
  module = angular.module('ps-ui.ps-template-cache', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('template/dashboard/sidebar.html',
    '<div id="ps-sidebar">\n' +
    '	<div ps-multi-transclude="before"></div>\n' +
    '	<ul class="nav">\n' +
    '		<li ng-repeat="item in menu.items" ng-click="toggleSubmenu(item)" class="ps-clickable">\n' +
    '			<a ng-href="{{item.href}}">\n' +
    '				<span class="ps-width-20" ng-if="item.icon">\n' +
    '					<i class="fa {{item.icon}}"></i>\n' +
    '				</span>\n' +
    '				{{item.title}}\n' +
    '				<span ng-if="isSubmenu(item)" class="pull-right">\n' +
    '					<i ng-if="!item.open"class="fa fa-angle-left"></i>\n' +
    '					<i ng-if="item.open"class="fa fa-angle-down"></i>\n' +
    '				</span>\n' +
    '			</a>\n' +
    '			<ul ng-if="isSubmenu(item)" collapse="!item.open" class="nav nav-second-level">\n' +
    '				<li ng-repeat="subitem in item.items">\n' +
    '					<a ng-href="{{subitem.href}}">\n' +
    '						<span class="ps-width-20">\n' +
    '						</span>\n' +
    '						<span class="ps-width-20" ng-if="subitem.icon">\n' +
    '							<i class="fa {{subitem.icon}}"></i>\n' +
    '						</span>\n' +
    '						{{subitem.title}}\n' +
    '					</a>\n' +
    '				</li>\n' +
    '			</ul>\n' +
    '		</li>\n' +
    '	</ul>\n' +
    '	<div ps-multi-transclude="after"></div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('ps-ui.ps-template-cache');
} catch (e) {
  module = angular.module('ps-ui.ps-template-cache', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('template/dashboard/toggle-sidebar.html',
    '<button id="ps-toggle-sidebar" class="btn btn-sm btn-default" type="button" ng-click="toggle()">\n' +
    '	<i class="fa fa-bars"></i>\n' +
    '</button>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('ps-ui.ps-template-cache');
} catch (e) {
  module = angular.module('ps-ui.ps-template-cache', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('template/fc/addresses/addresses.html',
    '<label>\n' +
    '	<i class="fa fa-map-marker"></i>\n' +
    '	Indirizzi\n' +
    '</label>\n' +
    '<div class="ps-vsp-4"></div>\n' +
    '<accordion class="ps-accordion">\n' +
    '	<accordion-group ng-repeat="address in addresses" class="ps-accordion-heading">\n' +
    '		<accordion-heading>\n' +
    '			{{oneLineAddress(address)}}\n' +
    '			<span class="pull-right label label-default ps-tag" ng-repeat="tag in address.tags">\n' +
    '				{{tag}}\n' +
    '			</span>\n' +
    '		</accordion-heading>\n' +
    '		<div class="ps-address">\n' +
    '			<label>\n' +
    '				<i class="fa fa-map-marker"></i>\n' +
    '				Indirizzo\n' +
    '			</label>\n' +
    '			<div class="ps-vsp-4"></div>\n' +
    '			<div>\n' +
    '				<input type="text" class="ps-address-street form-control" placeholder="Via o piazza" ng-model="address.street">\n' +
    '				<input type="text" class="ps-address-number form-control" placeholder="Civico" ng-model="address.number">\n' +
    '			</div>\n' +
    '			<div class="ps-vsp-4"></div>\n' +
    '			<div>\n' +
    '				<input type="text" class="ps-address-postal-code form-control" placeholder="CAP" ng-model="address.postalCode">\n' +
    '				<input type="text" class="ps-address-city form-control" placeholder="Città" ng-model="address.city">\n' +
    '				<input type="text" class="ps-address-county form-control" placeholder="Provincia" ng-model="address.county">\n' +
    '			</div>\n' +
    '			<div class="ps-vsp-4"></div>\n' +
    '			<div>\n' +
    '				<input type="text" class="ps-address-country form-control" placeholder="Nazione" ng-model="address.country">\n' +
    '			</div>\n' +
    '			<br />\n' +
    '		</div>\n' +
    '		<ps-fc-tags tags="address.tags"></ps-fc-tags>\n' +
    '		<br />\n' +
    '		<ps-in-delete delete-action="delAddress($index)" text="text"></ps-in-delete>\n' +
    '	</accordion-group>\n' +
    '</accordion>\n' +
    '<div class="ps-vsp-4"></div>\n' +
    '<div class="input-group">\n' +
    '	<ps-in-address\n' +
    '		place="place"\n' +
    '		placeholder="Aggiungi indirizzo"\n' +
    '		input="input"\n' +
    '		ng-keyup="addAddress($event)"\n' +
    '		options="options">\n' +
    '	</ps-in-address>\n' +
    '	<span class="input-group-btn">\n' +
    '		<button class="btn btn-default" type="button" ng-click="addAddress($event)">\n' +
    '			<i class="fa fa-plus"></i>\n' +
    '		</button>\n' +
    '	</span>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('ps-ui.ps-template-cache');
} catch (e) {
  module = angular.module('ps-ui.ps-template-cache', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('template/fc/codice-fiscale/codice-fiscale.html',
    '<div class="form-group has-feedback" ng-class="{\'has-error\': invalidCf, \'has-success\': validCf}">\n' +
    '	<label class="control-label">\n' +
    '		<i class="fa fa-credit-card"></i>\n' +
    '		Codice fiscale\n' +
    '	</label>\n' +
    '	<div class="ps-vsp-4"></div>\n' +
    '	<input class="form-control ps-uppercase" ui-mask="AAA AAA 99A99 A99*A" ng-model="cf" />\n' +
    '	<i ng-if="invalidCf" class="fa fa-times form-control-feedback"></i>\n' +
    '	<i ng-if="validCf" class="fa fa-check form-control-feedback"></i>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('ps-ui.ps-template-cache');
} catch (e) {
  module = angular.module('ps-ui.ps-template-cache', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('template/fc/emails/emails.html',
    '<label>\n' +
    '	@\n' +
    '	Indirizzi email\n' +
    '</label>\n' +
    '<div class="ps-vsp-4"></div>\n' +
    '<accordion class="ps-accordion">\n' +
    '	<accordion-group ng-repeat="email in emails" class="ps-accordion-heading">\n' +
    '		<accordion-heading>\n' +
    '			{{email.address}}\n' +
    '			<span class="pull-right label label-default ps-tag" ng-repeat="tag in email.tags">\n' +
    '				{{tag}}\n' +
    '			</span>\n' +
    '		</accordion-heading>\n' +
    '		<div class="form-group">\n' +
    '			<label>@ Indirizzo</label>\n' +
    '			<div class="ps-vsp-4"></div>\n' +
    '			<input type="text" class="form-control" placeholder="Indirizzo" ng-model="email.address">\n' +
    '		</div>\n' +
    '		<ps-fc-tags tags="email.tags"></ps-fc-tags>\n' +
    '		<br />\n' +
    '		<ps-in-delete delete-action="delEmail($index)" text="text"></ps-in-delete>\n' +
    '	</accordion-group>\n' +
    '</accordion>\n' +
    '<div class="ps-vsp-4"></div>\n' +
    '<div class="input-group">\n' +
    '	<input type="text" class="form-control" placeholder="Aggiungi indirizzo email" ng-model="newEmail" ng-keyup="addEmail($event)" />\n' +
    '	<span class="input-group-btn">\n' +
    '		<button class="btn btn-default" type="button" ng-click="addEmail($event)">\n' +
    '			<i class="fa fa-plus"></i>\n' +
    '		</button>\n' +
    '	</span>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('ps-ui.ps-template-cache');
} catch (e) {
  module = angular.module('ps-ui.ps-template-cache', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('template/fc/faxes/faxes.html',
    '<label>\n' +
    '	<i class="fa fa-print"></i>\n' +
    '	Numeri di fax\n' +
    '</label>\n' +
    '<div class="ps-vsp-4"></div>\n' +
    '<accordion class="ps-accordion">\n' +
    '	<accordion-group ng-repeat="fax in faxes" class="ps-accordion-heading">\n' +
    '		<accordion-heading>\n' +
    '			{{fax.number}}\n' +
    '			<span class="pull-right label label-default ps-tag" ng-repeat="tag in fax.tags">\n' +
    '				{{tag}}\n' +
    '			</span>\n' +
    '			</span>\n' +
    '		</accordion-heading>\n' +
    '		<div class="form-group">\n' +
    '			<label><i class="fa fa-print"></i> Numero</label>\n' +
    '			<div class="ps-vsp-4"></div>\n' +
    '			<input type="text" class="form-control" placeholder="Numero" ng-model="fax.number">\n' +
    '		</div>\n' +
    '		<ps-fc-tags tags="fax.tags"></ps-fc-tags>\n' +
    '		<br />\n' +
    '		<ps-in-delete delete-action="delFax($index)" text="text"></ps-in-delete>\n' +
    '	</accordion-group>\n' +
    '</accordion>\n' +
    '<div class="ps-vsp-4"></div>\n' +
    '<div class="input-group">\n' +
    '	<input type="text" class="form-control" placeholder="Aggiungi numero" ng-model="newFax" ng-keyup="addFax($event)" />\n' +
    '	<span class="input-group-btn">\n' +
    '		<button class="btn btn-default" type="button" ng-click="addFax($event)">\n' +
    '			<i class="fa fa-plus"></i>\n' +
    '		</button>\n' +
    '	</span>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('ps-ui.ps-template-cache');
} catch (e) {
  module = angular.module('ps-ui.ps-template-cache', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('template/fc/phones/phones.html',
    '<label>\n' +
    '	<i class="fa fa-phone"></i>\n' +
    '	Numeri di telefono\n' +
    '</label>\n' +
    '<div class="ps-vsp-4"></div>\n' +
    '<accordion class="ps-accordion">\n' +
    '	<accordion-group ng-repeat="phone in phones" class="ps-accordion-heading">\n' +
    '		<accordion-heading>\n' +
    '			{{phone.number}}\n' +
    '			<span class="pull-right label label-default ps-tag" ng-repeat="tag in phone.tags">\n' +
    '				{{tag}}\n' +
    '			</span>\n' +
    '			</span>\n' +
    '		</accordion-heading>\n' +
    '		<div class="form-group">\n' +
    '			<label><i class="fa fa-phone"></i> Numero</label>\n' +
    '			<div class="ps-vsp-4"></div>\n' +
    '			<input type="text" class="form-control" placeholder="Numero" ng-model="phone.number">\n' +
    '		</div>\n' +
    '		<ps-fc-tags tags="phone.tags"></ps-fc-tags>\n' +
    '		<br />\n' +
    '		<ps-in-delete delete-action="delPhone($index)" text="text"></ps-in-delete>\n' +
    '	</accordion-group>\n' +
    '</accordion>\n' +
    '<div class="ps-vsp-4"></div>\n' +
    '<div class="input-group">\n' +
    '	<input type="text" class="form-control" placeholder="Aggiungi numero" ng-model="newPhone" ng-keyup="addPhone($event)" />\n' +
    '	<span class="input-group-btn">\n' +
    '		<button class="btn btn-default" type="button" ng-click="addPhone($event)">\n' +
    '			<i class="fa fa-plus"></i>\n' +
    '		</button>\n' +
    '	</span>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('ps-ui.ps-template-cache');
} catch (e) {
  module = angular.module('ps-ui.ps-template-cache', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('template/fc/tags/tags.html',
    '<label>\n' +
    '	<i class="fa fa-tags"></i>\n' +
    '	Etichette\n' +
    '</label>\n' +
    '<div class="ps-vsp-4" ng-if="noTags()"></div>\n' +
    '<ps-in-tag tags="tags" placeholder="Aggiungi etichetta"></ps-in-tag>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('ps-ui.ps-template-cache');
} catch (e) {
  module = angular.module('ps-ui.ps-template-cache', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('template/in/address/address.html',
    '<input type="text" class="form-control" placeholder={{placeholder}} ng-model="input" />\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('ps-ui.ps-template-cache');
} catch (e) {
  module = angular.module('ps-ui.ps-template-cache', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('template/in/delete/delete.html',
    '<button class="btn btn-default btn-xs" type="button" ng-show="!toggle" ng-click="toggle = !toggle">\n' +
    '	<span class="ps-width-20">\n' +
    '		<i class="fa fa-trash-o"></i>\n' +
    '	</span>\n' +
    '	{{text.delete}}\n' +
    '</button>\n' +
    '<div ng-show="toggle">\n' +
    '	{{text.question}}\n' +
    '	&nbsp;\n' +
    '	<button class="btn btn-default btn-xs ps-width-30" type="button" ng-click="deleteAction()">\n' +
    '		{{text.yes}}\n' +
    '	</button>\n' +
    '	&nbsp;\n' +
    '	<button class="btn btn-default btn-xs ps-width-30" type="button" ng-click="toggle = !toggle">\n' +
    '		{{text.no}}\n' +
    '	</button>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('ps-ui.ps-template-cache');
} catch (e) {
  module = angular.module('ps-ui.ps-template-cache', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('template/in/tag/tag.html',
    '<div ng-if="!noTags()">\n' +
    '	<span class="label label-default ps-tag" ng-repeat="tag in tags">\n' +
    '		{{tag}}\n' +
    '		<i class="fa fa-times ps-clickable" ng-click="delTag($index)"></i>\n' +
    '	</span>\n' +
    '	<div class="ps-vsp-4"></div>\n' +
    '	<div class="ps-vsp-4"></div>\n' +
    '</div>\n' +
    '<div class="input-group">\n' +
    '	<input class="form-control" placeholder="{{placeholder}}" ng-model="newTag" ng-keyup="addTag($event)" />\n' +
    '	<span class="input-group-btn">\n' +
    '		<button class="btn btn-default" type="button" ng-click="addTag($event)">\n' +
    '			<i class="fa fa-plus"></i>\n' +
    '		</button>\n' +
    '	</span>\n' +
    '</div>\n' +
    '');
}]);
})();
