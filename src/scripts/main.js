///////////////////////////////////////////////////////////
//  src/scripts/main.js
//
//  M. Nealon, 2018.
//

    function main() {
        var inputCmp;
        var outputCmp;

        // First, we will create a new dataset where we
        // will store the value of the range input
        dataset.newDataset("other", [
            { "name": "val", "data": 0.0 }
        ]);

        // Create the range input component
        inputCmp = component(
            "input",
            "my-input",
            null,
            0.0,            // Will be assigned to input value
            "other:val",    // Bind the input value to this
            "range"         // Type, e.g "text", "password", etc
        );

        // The output component, this will be updated to show
        // the value of the range input
        outputCmp = component(
            "div",
            "my-div",
            null,
            "Range input value = {other:val}"
        );

        inputCmp.build("inner");
        inputCmp.render();

        outputCmp.build("inner");
        outputCmp.render();

        // Add the observer to re-render the output
        // comonent any time out value changes
        dataset.addObserver({
            "matchDataset": "other",
            "matchName": "val",
            "match": function() {
                outputCmp.render();
            }
        });

        // And just for fun, we will automatically update
        // the value of "other:val" after 5 seconds and
        // you will see the range input slider shift back
        // to 0.50
        setTimeout(function() {
            dataset.setValue("other:val", 50);
        }, 5000);

    }
