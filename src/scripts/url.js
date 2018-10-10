///////////////////////////////////////////////////////////
//  src/scripts/url.js
//
//  The parseURL() function is defined herein - it is used
//  to parse a url into a dataset based off the state of
//  the objURL object (see src/objects/objURL,js for more
//  info).
//
//  M. Nealon, 2018.
//

    function parseURL(url) {
        if (typeof(url) === "undefined")
            var url;

        if (! url || url === null)
            url = window.location.href;

        var url_dataset = objURL.hasOwnProperty("url_dataset") ? objURL.url_dataset : "url";
        var url_id = objURL.hasOwnProperty("url_id") ? objURL.url_id : "url";

        var url_domain = objURL.hasOwnProperty("url_domain") ? objURL.url_domain : "domain";
        var url_params = objURL.hasOwnProperty("url_params") ? objURL.url_params : "params";

        var url_param_identifier = objURL.hasOwnProperty("url_param_identifier") ? objURL.url_param_identifier : "?";
        var url_param_separator = objURL.hasOwnProperty("url_param_separator") ? objURL.url_param_separator : "/";

        var url_param_name = objURL.hasOwnProperty("url_param_name") ? objURL.url_param_name : "param";

        // First, the url is split at the url_param_identifier, this
        // gives us two parts - this example assumes that the
        // url_param_identifier is set to default "?" and that
        // url_param_separator is set to default "/":
        //
        //      www.somesite.com?one/two/three
        //
        // Will be split into two parts, these become the url_domain
        // and url_parts in the dataset:
        //
        //      url_domain == "www.somesite.com"
        //      url_params == "one/two/three"
        //
        var url_parts = url.split(url_param_identifier);

        console.log("Split " + url + " into " + url_parts[0] + " and " + url_parts[1]);
        // And now the params are split at the / character info
        // an array - this array is assigned to url_param_name
        // in the dataset:
        var urlParam = [];

        if (url_parts.length > 1 && typeof(url_parts[1]) !== "undefined")
            urlParam = url_parts[1].split(url_param_separator);

        // And finally - create the dataset.
        dataset.newDataset(url_dataset, [
            { "name": url_id, "data": url },

            { "name": url_domain, "data": url_parts[0] },
            { "name": url_params, "data": url_parts[1] },

            { "name": "url_param_identifier", "data": url_param_identifier },
            { "name": "url_param_separator", "data": url_param_separator },

            { "name": url_param_name, "data": urlParam.map(function(p) {
                if (typeof(p) !== "undefined" && p != "")
                    return p;
            })}
        ]);

        return true;
    }
