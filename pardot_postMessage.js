// This script depends on finding element #pardot-form.
// We check if the DOM is ready and wait to execute if it isn't.
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', formListener);
} else {
    formListener();
}

function formListener() {
    // Find the form by id #pardot-form
    // Then add a 'submit' event listener to it
    var form = document.getElementById('pardot-form');
    form.addEventListener('submit', function (event) {
        // Stop the form from submitting so we have time to execute.
        event.preventDefault();
        // Check each required input for validity.
        // If one is invalid, 'valid' will be false.
        var requiredFields = document.querySelectorAll('div.required input');
        var valid = true;
        requiredFields.forEach(function (field) {
            if ((field.type === 'checkbox' && !field.checked) || (field.type !== 'checkbox' && field.value.trim() === '')) {
                valid = false;
            }
        });
        // If all required inputs are there, send a postMessage to the parent frame
        // Parent frame will capture message and push a data layer event
        // Continue on with original form submit behavior
        if (valid) {
            var payload = {
                'name': 'pardot_form_submit',
                'type': document.querySelector("[type=submit]").getAttribute("value")
            };
            parent.postMessage(payload, '*');
            event.target.submit();
        } else {
            event.target.submit();
        }
    });
}
