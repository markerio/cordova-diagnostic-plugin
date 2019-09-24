/**
 *  Diagnostic plugin for iOS
 *
 *  Copyright (c) 2015 Working Edge Ltd.
 *  Copyright (c) 2012 AVANTIC ESTUDIO DE INGENIEROS
 **/
var Diagnostic = (function(){

    /********************
     * Internal functions
     ********************/


    /********************
     * Public properties
     ********************/
    var Diagnostic = {};

    /**
     * Permission states
     * @type {object}
     */
    Diagnostic.permissionStatus = {
        "NOT_REQUESTED": "not_determined", // App has not yet requested this permission
        "DENIED_ALWAYS": "denied_always", // User denied access to this permission
        "RESTRICTED": "restricted", // Permission is unavailable and user cannot enable it.  For example, when parental controls are in effect for the current user.
        "GRANTED": "authorized", //  User granted access to this permission
        "GRANTED_WHEN_IN_USE": "authorized_when_in_use" //  User granted access use location permission only when app is in use
    };

    Diagnostic.cpuArchitecture = {
        UNKNOWN: "unknown",
        ARMv6: "ARMv6",
        ARMv7: "ARMv7",
        ARMv8: "ARMv8",
        X86: "X86",
        X86_64: "X86_64"
    };

    /*****************************
     *
     * Protected member functions
     *
     ****************************/

    Diagnostic._ensureBoolean = function (callback){
        return function(result){
            callback(!!result);
        }
    };

    /**********************
     *
     * Public API functions
     *
     **********************/

    /***********
     * Core
     ***********/

    /**
     * Enables debug mode, which logs native debug messages to the native and JS consoles.
     * Debug mode is initially disabled on plugin initialisation.
     *
     * @param {Function} successCallback - The callback which will be called when enabling debug is successful.
     */
    Diagnostic.enableDebug = function(successCallback) {
        return cordova.exec(successCallback,
            null,
            'Diagnostic',
            'enableDebug',
            []);
    };

    /**
     * Switch to settings app. Opens settings page for this app.
     *
     * @param {Function} successCallback - The callback which will be called when switch to settings is successful.
     * @param {Function} errorCallback - The callback which will be called when switch to settings encounters an error.
     * This callback function is passed a single string parameter containing the error message.
     * This works only on iOS 8+. iOS 7 and below will invoke the errorCallback.
     */
    Diagnostic.switchToSettings = function(successCallback, errorCallback) {
        return cordova.exec(successCallback,
            errorCallback,
            'Diagnostic',
            'switchToSettings',
            []);
    };

    /**
     * Returns CPU architecture of the current device.
     *
     * @param {Function} successCallback -  The callback which will be called when the operation is successful.
     * This callback function is passed a single string parameter defined as a constant in `cordova.plugins.diagnostic.cpuArchitecture`.
     * @param {Function} errorCallback -  The callback which will be called when the operation encounters an error.
     *  This callback function is passed a single string parameter containing the error message.
     */
    Diagnostic.getArchitecture = function(successCallback, errorCallback) {
        return cordova.exec(successCallback,
            errorCallback,
            'Diagnostic',
            'getArchitecture',
            []);
    };

    /**
     * Returns the background refresh authorization status for the application.
     *
     * @param {Function} successCallback - The callback which will be called when operation is successful.
     * This callback function is passed a single string parameter which indicates the authorization status as a constant in `cordova.plugins.diagnostic.permissionStatus`.
     * @param {Function} errorCallback -  The callback which will be called when operation encounters an error.
     * This callback function is passed a single string parameter containing the error message.
     */
    Diagnostic.getBackgroundRefreshStatus = function(successCallback, errorCallback) {
        return cordova.exec(successCallback,
            errorCallback,
            'Diagnostic',
            'getBackgroundRefreshStatus',
            []);
    };

    /**
     * Checks if the application is authorized for background refresh.
     *
     * @param {Function} successCallback - The callback which will be called when operation is successful.
     * This callback function is passed a single boolean parameter which is TRUE if background refresh is authorized for use.
     * @param {Function} errorCallback -  The callback which will be called when operation encounters an error.
     * This callback function is passed a single string parameter containing the error message.
     */
    Diagnostic.isBackgroundRefreshAuthorized = function(successCallback, errorCallback) {
        Diagnostic.getBackgroundRefreshStatus(function(status){
            successCallback(status === Diagnostic.permissionStatus.GRANTED);
        }, errorCallback);
    };

    /************
     * Camera   *
     ************/

    /**
     * Checks if camera is enabled for use.
     * On iOS this returns true if both the device has a camera AND the application is authorized to use it.
     *
     * @param {Object} params - (optional) parameters:
     *  - {Function} successCallback - The callback which will be called when operation is successful.
     * This callback function is passed a single boolean parameter which is TRUE if camera is present and authorized for use.
     *  - {Function} errorCallback -  The callback which will be called when operation encounters an error.
     * This callback function is passed a single string parameter containing the error message.
     */
    Diagnostic.isCameraAvailable = function(params) {
        if(cordova.plugins.diagnostic.camera){
            cordova.plugins.diagnostic.camera.isCameraAvailable.apply(this, arguments);
        }else{
            throw "Diagnostic Camera module is not installed";
        }
    };

    /**
     * Checks if camera hardware is present on device.
     *
     * @param {Function} successCallback - The callback which will be called when operation is successful.
     * This callback function is passed a single boolean parameter which is TRUE if camera is present
     * @param {Function} errorCallback -  The callback which will be called when operation encounters an error.
     * This callback function is passed a single string parameter containing the error message.
     */
    Diagnostic.isCameraPresent = function(successCallback, errorCallback) {
        if(cordova.plugins.diagnostic.camera){
            cordova.plugins.diagnostic.camera.isCameraPresent.apply(this, arguments);
        }else{
            throw "Diagnostic Camera module is not installed";
        }
    };


    /**
     * Checks if the application is authorized to use the camera.
     *
     * @param {Object} params - (optional) parameters:
     *  - {Function} successCallback - The callback which will be called when operation is successful.
     * This callback function is passed a single boolean parameter which is TRUE if camera is authorized for use.
     *   - {Function} errorCallback -  The callback which will be called when operation encounters an error.
     * This callback function is passed a single string parameter containing the error message.
     */
    Diagnostic.isCameraAuthorized = function(params) {
        if(cordova.plugins.diagnostic.camera){
            cordova.plugins.diagnostic.camera.isCameraAuthorized.apply(this, arguments);
        }else{
            throw "Diagnostic Camera module is not installed";
        }
    };

    /**
     * Returns the camera authorization status for the application.
     *
     * @param {Object} params - (optional) parameters:
     *  - {Function} successCallback - The callback which will be called when operation is successful.
     * This callback function is passed a single string parameter which indicates the authorization status as a constant in `cordova.plugins.diagnostic.permissionStatus`.
     *  - {Function} errorCallback -  The callback which will be called when operation encounters an error.
     * This callback function is passed a single string parameter containing the error message.
     */
    Diagnostic.getCameraAuthorizationStatus = function(params) {
        if(cordova.plugins.diagnostic.camera){
            cordova.plugins.diagnostic.camera.getCameraAuthorizationStatus.apply(this, arguments);
        }else{
            throw "Diagnostic Camera module is not installed";
        }
    };

    /**
     * Requests camera authorization for the application.
     * Should only be called if authorization status is NOT_REQUESTED. Calling it when in any other state will have no effect.
     *
     * @param {Object} params - (optional) parameters:
     * - {Function} successCallback - The callback which will be called when operation is successful.
     * This callback function is passed a single string parameter indicating whether access to the camera was granted or denied:
     * `cordova.plugins.diagnostic.permissionStatus.GRANTED` or `cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS`
     * - {Function} errorCallback -  The callback which will be called when operation encounters an error.
     * This callback function is passed a single string parameter containing the error message.
     */
    Diagnostic.requestCameraAuthorization = function(params){
        if(cordova.plugins.diagnostic.camera){
            cordova.plugins.diagnostic.camera.requestCameraAuthorization.apply(this, arguments);
        }else{
            throw "Diagnostic Camera module is not installed";
        }
    };

    /**
     * Checks if the application is authorized to use the Camera Roll in Photos app.
     *
     * @param {Function} successCallback - The callback which will be called when operation is successful.
     * This callback function is passed a single boolean parameter which is TRUE if access to Camera Roll is authorized.
     * @param {Function} errorCallback -  The callback which will be called when operation encounters an error.
     * This callback function is passed a single string parameter containing the error message.
     */
    Diagnostic.isCameraRollAuthorized = function(successCallback, errorCallback) {
        if(cordova.plugins.diagnostic.camera){
            cordova.plugins.diagnostic.camera.isCameraRollAuthorized.apply(this, arguments);
        }else{
            throw "Diagnostic Camera module is not installed";
        }
    };

    /**
     * Returns the authorization status for the application to use the Camera Roll in Photos app.
     *
     * @param {Function} successCallback - The callback which will be called when operation is successful.
     * This callback function is passed a single string parameter which indicates the authorization status as a constant in `cordova.plugins.diagnostic.permissionStatus`.
     * @param {Function} errorCallback -  The callback which will be called when operation encounters an error.
     * This callback function is passed a single string parameter containing the error message.
     */
    Diagnostic.getCameraRollAuthorizationStatus = function(successCallback, errorCallback) {
        if(cordova.plugins.diagnostic.camera){
            cordova.plugins.diagnostic.camera.getCameraRollAuthorizationStatus.apply(this, arguments);
        }else{
            throw "Diagnostic Camera module is not installed";
        }
    };

    /**
     * Requests camera roll authorization for the application.
     * Should only be called if authorization status is NOT_REQUESTED. Calling it when in any other state will have no effect.
     *
     * @param {Function} successCallback - The callback which will be called when operation is successful.
     * This callback function is passed a single string parameter indicating the new authorization status:
     * `cordova.plugins.diagnostic.permissionStatus.GRANTED` or `cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS`
     * @param {Function} errorCallback -  The callback which will be called when operation encounters an error.
     * This callback function is passed a single string parameter containing the error message.
     */
    Diagnostic.requestCameraRollAuthorization = function(successCallback, errorCallback) {
        if(cordova.plugins.diagnostic.camera){
            cordova.plugins.diagnostic.camera.requestCameraRollAuthorization.apply(this, arguments);
        }else{
            throw "Diagnostic Camera module is not installed";
        }
    };

    /************
     * WiFi     *
     ************/

    /**
     * Checks if Wi-Fi is connected.
     * On iOS this returns true if the WiFi setting is set to enabled AND the device is connected to a network by WiFi.
     *
     * @param {Function} successCallback - The callback which will be called when operation is successful.
     * This callback function is passed a single boolean parameter which is TRUE if device is connected by WiFi.
     * @param {Function} errorCallback -  The callback which will be called when operation encounters an error.
     * This callback function is passed a single string parameter containing the error message.
     */
    Diagnostic.isWifiAvailable = function(successCallback, errorCallback) {
        if(cordova.plugins.diagnostic.wifi){
            cordova.plugins.diagnostic.wifi.isWifiAvailable.apply(this, arguments);
        }else{
            throw "Diagnostic Wifi module is not installed";
        }
    };

    /**
     * Checks if Wifi is enabled.
     * On iOS this returns true if the WiFi setting is set to enabled (regardless of whether it's connected to a network).
     *
     * @param {Function} successCallback -  The callback which will be called when the operation is successful.
     * This callback function is passed a single boolean parameter which is TRUE if WiFi is enabled.
     * @param {Function} errorCallback -  The callback which will be called when the operation encounters an error.
     *  This callback function is passed a single string parameter containing the error message.
     */
    Diagnostic.isWifiEnabled = function(successCallback, errorCallback) {
        if(cordova.plugins.diagnostic.wifi){
            cordova.plugins.diagnostic.wifi.isWifiEnabled.apply(this, arguments);
        }else{
            throw "Diagnostic Wifi module is not installed";
        }
    };

    return Diagnostic;
})();
module.exports = Diagnostic;
