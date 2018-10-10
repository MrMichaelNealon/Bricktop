///////////////////////////////////////////////////////////
//  src/boot/bootloader.js
//
//  Loads all dependencies and intialises the system.
//
//  M. Nealon, 2018.
//


/////////////////////////////////////////////////////////
//  debugMsg()
//
//  Dumps the given error_msg to console if ENABLE_DEBUG
//  is true (see src/boot/config.js)
//
    function debugMsg(debug_msg) {
        if (ENABLE_DEBUG)
            console.log(debug_msg);
    }


///////////////////////////////////////////////////////////
//  errorMsg()
//
//  If the given error_msg is not false a new Error
//  object is thrown forcing termination
//
    function errorMsg(error_msg) {
        if (error_msg !== false)
            throw new Error(error_msg);
    }


///////////////////////////////////////////////////////////
//  loadAsset()
//
//  Returns a promise to load a JavaScript asset - will
//  call debugMsg() and return nothing on success, will
//  rturn anerror string on error.
//
//  This function is used by the prepAssets() function
//  to prepare an array of promises returned by this
//  function.
//
    var loadAsset = function(asset) {
        return new Promise(function(resolved, rejected) {
            var el = document.createElement("script");
            el.onerror = function() {
                rejected("loadAsset(): Error loading asset " + asset);
            }
            el.onload = function() {
                debugMsg("loadAsset(): Loaded asset " + asset + " successfully");
                resolved();
            }
            el.setAttribute("src", asset);
            document.head.appendChild(el);
        });
    }


///////////////////////////////////////////////////////////
//  prepAssets()
//
//  This function just maps an array of assets to an
//  array of promises returned by loadAsset().
//
//  The purpose is to return an array of promises that
//  can be handled via Promise.all - this is done by
//  the checkPreppedAssets() function (defined
//  below)
//
    var prepAssets = function(assets) {
        return assets.map(function(asset) {
            return loadAsset(asset);
        });
    }


///////////////////////////////////////////////////////////
//  checkAllAssets()
//
//  Does a Promise.all on the given preppedAssets
//  array, calling the given callback on success or
//  calling errorMsg() on error.
//
    function checkPreppedAssets(preppedAssets, callback) {
        Promise.all(
            preppedAssets
        ).then(function() {
            callback();
        }).catch(function(error_msg) {
            errorMsg(error_msg);
        });
    }


///////////////////////////////////////////////////////////
//  There are 4 sets or arrays of assets to be loaded:
//
//      src/configs
//      src/objects
//      src/modules
//      src/scripts
//
//  They are loaded in that order. The next four functions
//  manage this process - they are successively passed to
//  checkPreppedAssets() as the callback parameter.
//
//  This allows for the sequential loading of assets in
//  the above order - all we need to do is make an initial
//  call to loadConfigs(), this loads all cnfigs and on
//  success calls loadObjects(), which on success calls
//  loadModules() and so on.
//
//  Finally when the loadScripts() function has successfully
//  loaded all scripts it calls the main() function.
//
    function loadedConfigs() {
        // If all goes well call loadObjects()
        checkPreppedAssets(objectAssets, loadedObjects);
    }

    function loadedObjects() {
        // If all goes well call loadModules()
        checkPreppedAssets(moduleAssets, loadedModules);
    }

    function loadedModules() {
        // If all goes well call loadScripts()
        checkPreppedAssets(scriptAssets, loadedScripts);
    }

    function loadedScripts() {
        // All went well! Call main() - this is normally
        // defined in src/scripts/main.js
        main()
    }


///////////////////////////////////////////////////////////
//  Prep the asset arrays - take a look at the
//  src/boot/config.js script for more info on what is
//  happening here.
//
//  Put simply, the assets are defined as modules in
//  the main config - the .assets handle simply returns
//  the array of file names - this array is passed to
//  prepAssets which generated the array of promises to
//  load these files.
//
    var configAssets = prepAssets(_configAssets.assets);
    var objectAssets = prepAssets(_objectAssets.assets);
    var moduleAssets = prepAssets(_moduleAssets.assets);
    var scriptAssets = prepAssets(_scriptAssets.assets);


///////////////////////////////////////////////////////////
//  Finally...
//
//  Start the booting process by first loading the
//  config assets, if all goes well we'll land in the
//  main() function.
//
    checkPreppedAssets(configAssets, loadedConfigs);
