// Type definitions for cordova.plugins.diagnostic v4
// Project: https://github.com/dpa99c/cordova-diagnostic-plugin
// Definitions by: Dave Alden <https://github.com/dpa99c/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="cordova" />

/**
 * Checks whether device hardware features are enabled or available to the app, e.g. camera, GPS, wifi
 */
interface Diagnostic {

    /**
     * ANDROID ONLY
     * "Dangerous" permissions that need to be requested at run-time (Android 6.0/API 23 and above)
     * See http://developer.android.com/guide/topics/security/permissions.html#perm-groups
     * @type {Object}
     */
    permission?: any;

    /**
     * ANDROID ONLY
     * Permission groups indicate which associated permissions will also be requested if a given permission is requested.
     * See http://developer.android.com/guide/topics/security/permissions.html#perm-groups
     * @type {Object}
     */
    permissionGroups?: any;

    /**
     * ANDROID and iOS ONLY
     * Constants for requesting and reporting the various permission states.
     * @type {Object}
     */
    permissionStatus?: any;

    /**
     * ANDROID ONLY
     * Constants for the various NFC power states.
     * @type {Object}
     */
    NFCState?: any;

    /**
     * ANDROID ONLY
     * Constants for the various CPU architectures.
     * @type {Object}
     */
    cpuArchitecture?: any;

    /**
     * Checks if Wifi is available.
     * On iOS this returns true if the device is connected to a network by WiFi.
     * On Android and Windows 10 Mobile this returns true if the WiFi setting is set to enabled, and is the same as isWifiEnabled()
     * @param successCallback
     * @param errorCallback
     */
    isWifiAvailable: (
        successCallback: (available: boolean) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * Checks if camera is available.
     * On Android & iOS this returns true if the device has a camera AND the application is authorized to use it.
     * On Windows 10 Mobile this returns true if the device has a rear-facing camera.
     * @param successCallbackOrParams
     * @param errorCallback
     * @param externalStorageOrParams
     */
    isCameraAvailable: (
        successCallbackOrParams?: (available: boolean) => void|{},
        errorCallback?: (error: string) => void,
        externalStorageOrParams?: boolean|{}
    ) => void;


    /**
     * ANDROID and WINDOWS ONLY
     * Displays mobile settings to allow user to enable mobile data.
     */
    switchToMobileDataSettings?: () => void;


    /**
     * ANDROID and WINDOWS ONLY
     * Displays WiFi settings to allow user to enable WiFi.
     */
    switchToWifiSettings?: () => void;

    /**
     * ANDROID and WINDOWS ONLY
     * Returns true if the WiFi setting is set to enabled, and is the same as isWifiAvailable()
     * @param successCallback
     * @param errorCallback
     */
    isWifiEnabled?: (
        successCallback: (enabled: boolean) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * ANDROID and WINDOWS ONLY
     * Enables/disables WiFi on the device.
     * @param successCallback
     * @param errorCallback
     * @param state
     */
    setWifiState?: (
        successCallback: (enabled: boolean) => void,
        errorCallback: (error: string) => void,
        state: boolean
    ) => void;


    /**
     * ANDROID and iOS ONLY
     * Enables debug mode, which logs native plugin debug messages to the native and JS consoles.
     * Debug mode is initially disabled on plugin initialisation.
     */
    enableDebug?: (
        successCallback: () => void
    ) => void;

    /**
     * ANDROID and iOS ONLY
     * Checks if camera hardware is present on device.
     * @param successCallback
     * @param errorCallback
     */
    isCameraPresent?: (
        successCallback: (present: boolean) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * ANDROID and iOS ONLY
     * Checks if the application is authorized to use the camera.
     * @param successCallback
     * @param errorCallback
     * @param externalStorageOrParams
     */
    isCameraAuthorized?: (
        successCallbackOrParams?: (authorized: boolean) => void|{},
        errorCallback?: (error: string) => void,
        externalStorageOrParams?: boolean|{}
    ) => void;

    /**
     * ANDROID and iOS ONLY
     * Returns the camera authorization status for the application.
     * @param successCallback
     * @param errorCallback
     * @param externalStorageOrParams
     */
    getCameraAuthorizationStatus?: (
        successCallbackOrParams?: (status: string) => void|{},
        errorCallback?: (error: string) => void,
        externalStorageOrParams?: boolean|{}
    ) => void;

    /**
     * ANDROID and iOS ONLY
     * Requests camera authorization for the application.
     * @param successCallback
     * @param errorCallback
     * @param externalStorageOrParams
     */
    requestCameraAuthorization?: (
        successCallbackOrParams?: (status: string) => void|{},
        errorCallback?: (error: string) => void,
        externalStorageOrParams?: boolean|{}
    ) => void;

    /**
     * ANDROID and iOS ONLY
     * Opens settings page for this app.
     * On Android, this opens the "App Info" page in the Settings app.
     * On iOS, this opens the app settings page in the Settings app. This works only on iOS 8+ - iOS 7 and below will invoke the errorCallback.
     */
    switchToSettings?: (
        successCallback: () => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * ANDROID ONLY
     * Restarts the application.
     * By default, a "warm" restart will be performed in which the main Cordova activity is immediately restarted, causing the Webview instance to be recreated.
     * However, if the `cold` parameter is set to true, then the application will be "cold" restarted, meaning a system exit will be performed, causing the entire application to be restarted.
     * This is useful if you want to fully reset the native application state but will cause the application to briefly disappear and re-appear.
     *
     * Note: There is no successCallback() since if the operation is successful, the application will restart immediately before any success callback can be applied.
     * @param {(error: string) => void} errorCallback
     * @param {boolean} cold
     */
    restart?: (
        errorCallback: (error: string) => void,
        cold: boolean
    ) => void;

    /**
     * ANDROID and iOS ONLY
     * Returns CPU architecture of the current device.
     * @param successCallback
     * @param errorCallback
     */
    getArchitecture?: (
        successCallback: (state: string) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * ANDROID ONLY
     * Checks if the device data roaming setting is enabled.
     * Returns true if data roaming is enabled.
     * @param successCallback
     * @param errorCallback
     */
    isDataRoamingEnabled?: (
        successCallback: (enabled: boolean) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * ANDROID ONLY
     * Returns the current authorisation status for a given permission.
     * @param successCallback
     * @param errorCallback
     * @param permission
     */
    getPermissionAuthorizationStatus?: (
        successCallback: (status: string) => void,
        errorCallback: (error: string) => void,
        permission: string
    ) => void;

    /**
     * ANDROID ONLY
     * Returns the current authorisation status for multiple permissions.
     * @param successCallback
     * @param errorCallback
     * @param permissions
     */
    getPermissionsAuthorizationStatus?: (
        successCallback: (status: string[]) => void,
        errorCallback: (error: string) => void,
        permissions: string[]
    ) => void;

    /**
     * ANDROID ONLY
     * Requests app to be granted authorisation for a runtime permission.
     * @param successCallback
     * @param errorCallback
     * @param permission
     */
    requestRuntimePermission?: (
        successCallback: (status: string) => void,
        errorCallback: (error: string) => void,
        permission: string
    ) => void;

    /**
     * ANDROID ONLY
     * Requests app to be granted authorisation for multiple runtime permissions.
     * @param successCallback
     * @param errorCallback
     * @param permissions
     */
    requestRuntimePermissions?: (
        successCallback: (status: string[]) => void,
        errorCallback: (error: string) => void,
        permissions: string[]
    ) => void;

    /**
     * ANDROID ONLY
     * Indicates if the plugin is currently requesting a runtime permission via the native API.
     */
    isRequestingPermission?: () => boolean;

    /**
     * ANDROID ONLY
     * Registers a function to be called when a runtime permission request has completed. Pass in a falsey value to de-register the currently registered function.
     * @param successCallback
     */
    registerPermissionRequestCompleteHandler?: (
        successCallback: (statuses: any) => void
    ) => void;

    /**
     * iOS ONLY
     * Checks if the application is authorized to use the Camera Roll in Photos app.
     * @param successCallback
     * @param errorCallback
     */
    isCameraRollAuthorized?: (
        successCallback: (authorized: boolean) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * iOS ONLY
     * Returns the authorization status for the application to use the Camera Roll in Photos app.
     * @param successCallback
     * @param errorCallback
     */
    getCameraRollAuthorizationStatus?: (
        successCallback: (status: string) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * iOS ONLY
     * Requests camera roll authorization for the application.
     * @param successCallback
     * @param errorCallback
     */
    requestCameraRollAuthorization?: (
        successCallback: (status: string) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * ANDROID ONLY
     * Checks if ADB mode(debug mode) is enabled.
     * @param successCallback
     * @param errorCallback
     */
    isADBModeEnabled?: (
        successCallback: (enabled: boolean) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * ANDROID ONLY
     * Checks if device is rooted.
     * @param successCallback
     * @param errorCallback
     */
    isDeviceRooted?: (
        successCallback: (enabled: boolean) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * iOS ONLY
     * Checks if the application is authorized for background refresh.
     * @param successCallback
     * @param errorCallback
     */
    isBackgroundRefreshAuthorized?: (
        successCallback: (authorized: boolean) => void,
        errorCallback: (error: string) => void
    ) => void;

    /**
     * iOS ONLY
     * Returns the background refresh authorization status for the application.
     * @param successCallback
     * @param errorCallback
     */
    getBackgroundRefreshStatus?: (
        successCallback: (status: string) => void,
        errorCallback: (error: string) => void
    ) => void;

}

interface CordovaPlugins {
    diagnostic: Diagnostic
}
