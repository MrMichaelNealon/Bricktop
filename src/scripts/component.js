///////////////////////////////////////////////////////////
//  src/scripts/components.js
//
//  M. Nealon, 2018.
//

    var pageComponent = function(
        component_type,
        component_id,
        component_class,
        component_content
    ) {
        this.parent = null;

        this.component_type = component_type;
        this.component_id = component_id;
        this.component_class = component_class;
        this.component_content = component_content;

        this.el;

        var self = this;

///////////////////////////////////////////////////////////
//  render()
//
//  This method will render the component to the display.
//
//  The build() method creates the element, render will
//  apply any style that is defined in this components
//  dataset and will also update the content.
//
//  New content can be passed to the function, failing that
//  the component is updated with component_content - the
//  data is also bound again by the call to bindData
//
        var render = function(content) {
            if (typeof(content) !== "undefined")
                self.component_content = content;

            // Render will automatically check the dataset for
            // component_id:style, if it exists then it is applied
            // to the component
            var style = dataset.getValue(self.component_id + ":style");

            if (style)
                Object.assign(self.el.style, style);

            self.el.textContent = self.component_content;

            bindData(dataset);
        };

///////////////////////////////////////////////////////////
//  build()
//
//  Builds the component element using the current
//  configuration.
//
        var build = function(parent) {
            self.parent = parent;

            self.el = document.createElement(self.component_type);
            var tag = modBinding.options[0].tag;

            if (self.component_id) self.el.setAttribute("id", self.component_id);
            if (self.component_class) self.el.className = self.component_class;

            self.el.setAttribute(tag, "");

            document.getElementById(self.parent).appendChild(self.el);

            enableEvents();
        };

///////////////////////////////////////////////////////////
//  enableEvents()
//
//  Enables mouse events for a component. Nothing complex,
//  the current object context is bound to the callback
//  for each event.
//
//  Enabling events is simple enough - in the dataset for
//  the component simply set either the "mouseover",
//  "mouseout" or "click" values with a callback to handle
//  each event.
//
        var enableEvents = function() {
            var mouseoverEvents = dataset.getValue(self.component_id + ":mouseover");
            var mouseoutEvents = dataset.getValue(self.component_id + ":mouseout");
            var mouseclickEvents = dataset.getValue(self.component_id + ":click");

            if (mouseoverEvents) {
                _mouseoverEvents = mouseoverEvents.bind(self);
                document.getElementById(self.component_id).addEventListener(
                    "mouseover", function() {
                        var obj = dataset.getValue(self.component_id + ":self");
                        _mouseoverEvents(obj);
                    }
                );
            }

            if (mouseoutEvents) {
                _mouseoutEvents = mouseoutEvents.bind(self);
                document.getElementById(self.component_id).addEventListener(
                    "mouseout", function() {
                        var obj = dataset.getValue(self.component_id + ":self");
                        _mouseoutEvents(obj);
                    }
                );
            }

            if (mouseclickEvents) {
                _mouseclickEvents = mouseclickEvents.bind(self);
                document.getElementById(self.component_id).addEventListener(
                    "click", function() {
                        var obj = dataset.getValue(self.component_id + ":self");
                        _mouseclickEvents(obj);
                    }
                );
            }
        };

///////////////////////////////////////////////////////////
//  updateContent()
//
//  Can be used to set the component_content.
//
        var updateContent = function(content) {
            self.component_content = content;
        };


        return {
            "build":            build,
            "render":           render,

            "updateContent":    updateContent
        };
    }


    var component = function(
        component_type,
        component_id,
        component_class,
        component_content
    ) {
        if (component_type === null) component_type = "div";
        if (component_id === null) component_id = "container-id";
        if (component_class === null) component_class = "";
        if (component_content === null) component_content = "&nbsp;";

        var cmp =  new pageComponent(
            component_type,
            component_id,
            component_class,
            component_content
        );

//  The AUTO_DATASET option can be set in the main config
//  file (src/boot/config.js)
//
//  Put simply - if this value is true then any time a new
//  component is created it will automatically be assigned
//  a dataset namespace
//
//  The dataset will be empty except for an instance of the
//  component object (self) which is automatically passed to
//  mouse event handrels by the build() method.
//
        if (AUTO_COMPONENT_DATASET) {
            var datasetReturn = dataset.newDataset(component_id, [
                { "name": "self", "data": cmp }
            ]);

            if (! datasetReturn)
                return false;
        }

        return cmp;
    }
