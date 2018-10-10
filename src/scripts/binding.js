///////////////////////////////////////////////////////////
//  src/scripts/binding.js
//
//  This script includes two function, the first is
//  resolveBindings() and the second is bindData().
//
//  You should look at the component() and pageComponent()
//  functions in src/scripts/components.js. You should
//  also check out src/modules/binding.js
//
//  Essentially, what happens is that when we create new
//  component element the element will have a specific tag
//  attrobute that identifies it. The Simplest is a "tag"
//  element that allows for variable expansion - the "tag"
//  element and other options are defined in the
//  src/modules/binding.js script and can be accessed
//  thusly:
//
//      bindTag = modBinding.options[0].tag;
//
//  By default this tag is set to "bind-data". This means
//  component()/pageCompoent() will create elements like this:
//
//      <element id="id" class="class" bind-data>
//      </element>
//
//  And the bindData() function will now know that this element
//  may contain content that requires expansion:
//
//      {some_data}
//
//  Naturally, this data is ripped from the dataset object so
//  you should have some understanding of how that works (see
//  modules/dataset.js)
//
//  M. Nealon, 2018.
//

    const   BIND_CAPS = [ '{', '}' ];


    var resolveBindings = function(bindings, modData) {
        var content = bindings.innerHTML;

        var bindStart = content.indexOf(BIND_CAPS[0]);
        var bindEnd = content.indexOf(BIND_CAPS[1]);

        while (bindStart >= 0 && bindEnd > bindStart) {
            bindings.innerHTML =
                content.substr(0, bindStart) +
                modData.getValue(content.substr((bindStart + 1), (bindEnd - bindStart - 1))) +
                content.substr((bindEnd + 1), (content.length - (bindEnd)));

            content = bindings.innerHTML;

            bindStart = content.indexOf(BIND_CAPS[0]);
            bindEnd = content.indexOf(BIND_CAPS[1]);
        }

        return bindings.textContent;
    }

    function bindData(modData) {
        var bindTag = "bind-data";

        // The tag should be defined in the src/modules/binding.js
        // script - it's inserted into an element on creation (see
        // src/scripts/component.js)
        if (modBinding.options[0].hasOwnProperty("tag"))
            bindTag = modBinding.options[0].tag;

        try {
            var bindings = Array.from(document.querySelectorAll('[' + bindTag + ']'))
        } catch {
            return false;
        }

        if (bindings !== null && typeof(bindings[0]) !== "undefined") {
            bindings.forEach(binding => {
                binding.innerHTML = resolveBindings(binding, modData);
            });
        }

        return true;
    }
