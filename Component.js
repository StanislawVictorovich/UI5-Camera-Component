sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"Camera/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("Camera.Component", {

		metadata: {
			manifest: "json",
			"properties": { 
				"width": "600",
	            "height": "800"
	        }
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		}
	});
});
