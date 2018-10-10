///////////////////////////////////////////////////////////
//  src/modules/binding.js
//
//  M. Nealon, 2018.
//


///////////////////////////////////////////////////////////
//  modBinding
//
//  Defines and returnd data-binding options.
//
    var modBinding = (function() {
        var options = [
            {
                // options[0].tag defines the tag used to
                // specify template elements. See the
                // component() and pageComponent() functions
                // in src/scripts/component.js for more info
                //
                // Essentially it's a string that's inserted
                // into an element as an attribute to identify
                // it to the bindData() function (see
                // src/scripts/binding.js)
                "tag": "bind-data"
            }
        ];

        return {
            "options": options
        };
    })();
