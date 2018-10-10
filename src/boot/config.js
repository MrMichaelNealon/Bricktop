///////////////////////////////////////////////////////////
//  src/boot/config.js
//
//  This is the main configuration file that's included
//  directly inside index.html along with the bootloader.
//
//  M. Nealon, 2018.
//


///////////////////////////////////////////////////////////
//  Enable debugging - if this is true the debugMsg()
//  function in the bootloader will dump debugging info
//  to the console
//
    ENABLE_DEBUG = true;


///////////////////////////////////////////////////////////
//  Each of the (_*Assets(){})() functions return an
//  array of scripts to be loaded.
//
//  For example, if we call _configAssets.assets then
//  we will get an array of config asset files to
//  include.
//
//  There are 4 sets of assets that are loaded before
//  the main() function is finally called - defined
//  here they are:
//
//      _configAssets()         Returns an array of
//                              config files, ususally
//                              stored in src/configs/
//
//      _objectAssets()         Returns an array of
//                              object files, usually
//                              stored in src/objects/
//
//      _moduleAssets()         Returns an array of
//                              modules, usually stored
//                              in src/modules/
//
//      _scriptAssets()         Returns an array of
//                              core scripts, usually
//                              stored in src/scripts/
//
//  These are required (see src/boot/bootloader.js)
//  by the bootloader and failuer to load any asset will
//  result in an error and termination of the application.

// _configAssets()
//
//  Returns an array of config assets in src/configs/
//
    var _configAssets = (function() {
        var assets = [
            "src/configs/site.js",
            "src/configs/app.js"
        ];

        return {
            "assets":       assets
        };
    })();


///////////////////////////////////////////////////////////
// _objectAssets()
//
//  Returns an array of object assets in src/objects/
//
    var _objectAssets = (function() {
        var assets = [
            "src/objects/objURL.js"
        ];

        return {
            "assets":       assets
        };
    })();


///////////////////////////////////////////////////////////
//  _moduleAssets()
//
//  Returns an array of module assets in src/modules/
//
    var _moduleAssets = (function() {
        var assets = [
            "src/modules/dataset.js",
            "src/modules/binding.js"
        ];

        return {
            "assets":       assets
        };
    })();


///////////////////////////////////////////////////////////
//  _scriptAssets()
//
//  Returns the array of core scripts in src/scripts/
//
    var _scriptAssets = (function() {
        var assets = [
            "src/scripts/app.js",
            "src/scripts/url.js",
            "src/scripts/binding.js",
            "src/scripts/component.js",
            "src/scripts/main.js"
        ];

        return {
            "assets":       assets
        };
    })();


///////////////////////////////////////////////////////////
//  AUTO_COMPONENT_DATASET
//
//  When true, component datasets will be automatically
//  created whenever a component is created (see the
//  src/scripts/component.js script)
//
//  If false, component datasets must be created by the
//  user.
//
    AUTO_COMPONENT_DATASET = true;
