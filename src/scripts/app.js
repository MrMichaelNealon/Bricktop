///////////////////////////////////////////////////////////
//  src/scripts/app.js
//
//  M. Nealon, 2018.
//

    async function loadAppComponents(component_name, successCallback) {
        var component_model = "new " +  component_name + "Model();";
        var component_view = "new " + component_name + "View();";
        var component_controller = "new " + component_name + "Controller(model, view);";

        this.controller = null;

        var self = this;

        await Promise.all(
            prepAssets([
                APP_PATH + "/models/" + component_name + ".js",
                APP_PATH + "/views/" + component_name + ".js",
                APP_PATH + "/controllers/" + component_name + ".js"
            ])
        ).then(function() {
            var model = eval(component_model);
            var view = eval(component_view);
            var controller = eval(component_controller);

            // If the controllers dataset exists then it is an
            // array of controllers - this controller is added
            // also.
            //
            // Note that if a controller named component_name
            // it will be overwritten with the new controller
            // as dataset.setValue() is being used (see
            // src/modules/dataset.js)
            //
            var ctr = dataset.getDatasetIndex("controllers");

            if (ctr >= 0) {
                console.log("Adding new controller: controllers:" + component_name)
                dataset.setValue("controllers:" + component_name, controller);
            }

            if (successCallback)
                successCallback(controller);
        }).catch(function(error_msg) {
            errorMsg(error_msg);
        });
    }
