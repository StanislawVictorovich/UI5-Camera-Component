sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("Camera.controller.Home", {

		onInit: function () {
			var oJsonModel = new JSONModel({
                photos: []
            })
			
			this.getView().setModel(oJsonModel);
            this.byId("buttonUndoSnapshot").setEnabled(false);
		},

        /**
         * Taking photo from camera.
         * @param {object} name
         * @returns {object}
         */		
        onSnapshot: function (oEvent) {
            var oModel = this.getView().getModel();
            var oPhotos = oModel.getProperty("/photos");
            
            oPhotos.push({src: oEvent.getParameter("image")});
            oModel.setProperty("/photos", oPhotos);
            this.byId("buttonUndoSnapshot").setEnabled(true);
            oModel.refresh(true);
        },
   
        /**
         * Switch rendering the camera by button press.
         * @param {object} name
         * @returns {object}
         */		
		onSwitchCamera: function (oEvent) {
			var oCamera = this.getView().byId("idCamera");
			
			if (!oEvent.getParameters().state) { 
				oCamera.stopCamera();
			} 
				
			oCamera.rerender();
		},
		
        /**
         * Delete the last made snapshot.
         * @param {object} name
         * @returns {object}
         */			
		onUndoSnapshot: function (oEvent) {
            var oModel = this.getView().getModel();
			var oPhotos = oModel.getProperty("/photos");
			
			oPhotos.splice(0,1);
			
			if (!oPhotos.length) {
				oEvent.getSource().setEnabled(false);
			}
			
			oEvent.getSource().setEnabled(true);
			oModel.refresh(true);
		},
		
        /**
         * Save selected picture.
         * @param {object} name
         * @returns {object}
         */			
		onSavePicture: function (oEvent) {
			var download = document.createElement("a");
			
			download.href = oEvent.getSource().getSrc();
			download.download = "image"+(Math.floor(Math.random() * (8999)) + 1000)+".png";
			download.click();
		}
	});
});
