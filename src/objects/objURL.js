///////////////////////////////////////////////////////////
//  src/objects/objURL.js
//
//  The objURL object simply specifies how a url should
//  be parsed into a dataset - see the src/scripts/url.js
//  script for more.
//
//  M. Nealon, 2018.
//

    var objURL = {
        // url_dataset specifies the name of the dataset that the
        // url parameters are stored in.
        //
        // Every other property in this object specifies a
        // value that will be defined in this dataset. So,
        // for example we can access the url_domain like
        //
        //      url_dataset:url_domain
        //
        // Or the array of url parameters like:
        //
        //      url_dataset:url_param
        //
        "url_dataset": "url_dataset",

        // url_id specifies the name of the unaltered url string.
        "url_id": "url_id",

        // The identifier in the url that separates the domain
        // and parameters portions of the string.
        //
        // The separator is the character that divides the parameters,
        // by default the identifier is "?" and the separator is
        // "/" therefore parseURL (see src/scripts.url.js) will
        // expect urls to have the following format:
        //
        //      www.domain.com?param_1/param_2/param_3
        //
        "url_param_identifier": "?",
        "url_param_separator": "/",

        // url_domain specifies the name of the domain portion of
        // the url. url_params is the unparsed string of parameters
        // (if any) that follow the url_param_identifier
        "url_domain": "url_domain",
        "url_params": "url_params",

        // Array of parsed parameters (if any).
        "url_param_name": "url_param"
    };
