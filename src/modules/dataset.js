///////////////////////////////////////////////////////////
//  src/modules/dataset.js
//
//  M. Nealon, 2018.
//


    const   DATASET_NOT_FOUND = -1;
    const   DATASET_VAR_NOT_FOUND = -2;
    const   DATASET_ALREADY_EXISTS = -3;


    var dataset = (function() {

        var datasets = [
            {
                "id": "standard",
                "data": [
                    { "name": "name", "data": "Michael" },
                    { "name": "age", "data": 38 }
                ]
            }
        ];


        var observers = [
        ];


        var updateObservers = function(change_type, dataset_id, var_name, var_data) {
            observers.forEach(o => {
                if (change_type == "newDataset") {
                    if (o.hasOwnProperty("newDatasetCallback"))
                        o.newDatasetCallback(dataset_id);
                }
                if (change_type == "newValue") {
                    if (o.hasOwnProperty("newValueCallback"))
                        o.newValueCallback(dataset_id, var_name);
                }
                if (change_type == "updateValue") {
                    if (o.hasOwnProperty("updateValueCallback"))
                        o.updateValueCallback(dataset_id, var_name);
                }

                if (o.hasOwnProperty("matchDataset") && o.hasOwnProperty("matchName")) {
                    var _match = o.match;

                    if (o.matchDataset == dataset_id && o.matchName == var_name) {
                        if (o.hasOwnProperty("match"))
                            o.match(dataset_id, var_name, var_data);
                    }
                } else {
                    if (o.hasOwnProperty("match")) {
                        if (o.hasOwnProperty("matchDataset") && o.matchDataset == dataset_id)
                            o.match(dataset_id, var_name, var_data);
                        if (o.hasOwnProperty("matchName") && o.matchName == var_name)
                            o.match(dataset_id, var_name, var_data);
                    }
                }

                if (o.hasOwnProperty("callback"))
                    o.callback(dataset_id, var_name);
            });;
        };


        var addObserver = function(options) {
            observers.push(options)
        };


///////////////////////////////////////////////////////////
//  getDatasetIndex()
//
//  Returns the index of the first dataset whose id
//  matched the one given, returns DATAST_NOT_FOUND (-1)
//  on error.
//
        var getDatasetIndex = function(dataset_id) {
            for (var set = 0; set < datasets.length; set++) {
                if (datasets[set].id == dataset_id)
                    return set;
            }
            return DATASET_NOT_FOUND;
        };

///////////////////////////////////////////////////////////
//  getDatasetPairIndex()
//
//  Will return DATASET_NOT_FOUND if dataset_index is out
//  of range.
//
//  If dataset_index is within range, then it will attempt
//  to find a data element within the dataset whose name
//  matched var_name - if found its index is returned.
//
        var getDatasetPairIndex = function(dataset_index, var_name) {
            if (dataset_index < 0 || dataset_index >= datasets.length)
                return DATASET_NOT_FOUND;

            for (var v = 0; v < datasets[dataset_index].data.length; v++) {
                if (datasets[dataset_index].data[v].name == var_name)
                    return v;
            }

            return DATASET_VAR_NOT_FOUND;
        };

///////////////////////////////////////////////////////////
//  getDatasetValue()
//
//  Looks up the key var_name in the set with an id of
//  dataset_id - returned the value if found.
//
//  Example, if we have:
//
//      datasets = [
//          {
//              "id": "standard",
//              "data": [
//                  { "name": "var_one", "data": "This is val 1" },
//                  { "name": "var_two", "data": "This is var 2" }
//              ]
//          }
//      ];
//
//  Then if we call:
//
//      dataset.getDatasetValue("standard", "var_one");
//
//  We get the corresponding value:
//
//      This is var 1
//
//  Returns either the expanded value or returns false
//  if either dataset_id or var_name don't exist.
//
        var getDatasetValue = function(dataset_id, var_name) {
            if (dataset_id === null)
                // Default to standard namespace
                dataset_id = "standard";

            var dataset_index = getDatasetIndex(dataset_id);

            if (dataset_index >= 0) {
                // dataset_index points to a valid dataset...
                var var_index = getDatasetPairIndex(dataset_index, var_name);
                if (var_index != DATASET_VAR_NOT_FOUND)
                    // Data found - return it.
                    return datasets[dataset_index].data[var_index].data;
            }

            return false;
        };

///////////////////////////////////////////////////////////
//  newDataset()
//
//  Creates a new dataset with the given dataset_id and
//  adds the given data.
//
//  The data is expected to be an array of name/data
//  pair objects:
//
//      { "name": "variable_1", "data": "Uno" },
//      { "name": "variable_2", "data": "Dos" },
//      { "name": "variable_3", "data": "Tres" }
//
//  Returns DATASET_ALREADY_EXISTS (-3) if dataset_id is
//  the name of an existing dataset.
//
        var newDataset = function(dataset_id, data) {
            var dataset_index = getDatasetIndex(dataset_id);

            if (dataset_index >= 0)
                return DATASET_ALREADY_EXISTS;

            datasets.push({
                "id": dataset_id,
                "data": data
            });

            updateObservers("newDataset", dataset_id, data);

            // Return the index of the newly created
            // dataset.
            return (datasets.length - 1);
        };


        var getDatasetInfo = function(str_id) {
            var id_parts = str_id.split(":");

            this.dataset_index = 0;
            this.dataset_id = "standard";
            this.var_name = id_parts[0];

            if (id_parts.length > 1) {
                this.dataset_index = getDatasetIndex(id_parts[0]);
                this.dataset_id = id_parts[0];
                this.var_name = id_parts[1];
            }
        };


///////////////////////////////////////////////////////////
//  getValue()
//
//  This is similar to getDatasetValue() except we can
//  specify the namespace and variable name in the
//  same string (str_id) in the following format:
//
//      namespace_id:var_name
//
//  So, for example we can reference the var_1 variable
//  in the standard namespace with:
//
//      standard:var_1
//
//  If we don't specify a namespace then getValue()
//  defaults to datasets[0] ("standard" by default)
//
        var getValue = function(str_id) {
            var datasetInfo = new getDatasetInfo(str_id);
            return getDatasetValue(datasetInfo.dataset_id, datasetInfo.var_name);
        };


///////////////////////////////////////////////////////////
//  setValue()
//
//  Set or update the given data value.
//
//  Like the getValue() method - the str_id can be ither
//  a variable name on it's own in which case the standard
//  context (0) is used.
//
//  Otherwise str_id can be a dataset_id:var_name pair, in
//  which case we're creating/updating var_data in a
//  specific dataset.
//
//  Returns true on success or false on error.
//
        var setValue = function(str_id, var_data) {
            var datasetInfo = new getDatasetInfo(str_id);

            if (datasetInfo.dataset_index < 0)
                return false;

            var pair_index = getDatasetPairIndex(datasetInfo.dataset_index, datasetInfo.var_name);

            if (pair_index >= 0) {
                datasets[datasetInfo.dataset_index].data[pair_index].data = var_data;
                updateObservers("updateValue", datasetInfo.dataset_id, datasetInfo.var_name, var_data);
            }
            else {
                datasets[datasetInfo.dataset_index].data.push({
                    "name": datasetInfo.var_name, "data": var_data
                });
                updateObservers("newValue", datasetInfo.dataset_id, datasetInfo.var_name, var_data);
            }

            return true;
        };


        return {
            "addObserver":          addObserver,

            "getDatasetIndex":      getDatasetIndex,
            "getDatasetValue":      getDatasetValue,
            "getDatasetPairIndex":  getDatasetPairIndex,

            "newDataset":           newDataset,

            "getValue":             getValue,
            "setValue":             setValue
        };

    })();
