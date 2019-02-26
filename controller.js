//Store button controls on page load
let buttonControls = $("#button_controls");
let buttonControlsLabel = $("label[for='button_controls']");

//When the user changes select model logic, hide or show the extra controls depending on whether they need it or not
$("#select_model_logic").on('change', function () {
    const modelTypeVal = $("#select_model_logic option:selected").text();

    switch (modelTypeVal) {
        case "Random Guess": {
            buttonControls.hide();
            buttonControlsLabel.hide();
            break;
        }

        case "Threshold Based": {
            buttonControls.show();
            buttonControlsLabel.show();
            break;
        }
    }
});

/**
 * Output the results of the data the user entered.
 */
function outputUserInfo() {
    //User feedback from the data they just entered
    const userName = $('#first_name').val() + " " + $('#middle_name').val() +
        " " + $('#last_name').val();
    const commentVal = $("#comment").val();
    const sexVal = $("#sex option:selected").text();
    const modelTypeVal = $("#select_model_logic option:selected").text();
    let garlicVal = $("#garlic_checkbox").prop("checked");
    let shadowVal = $("#shadow_checkbox").prop("checked");
    let complexionVal = $("#complexion_checkbox").prop("checked");

    //Call functions from the model that will output data to the screen
    calculateVampire(userName, sexVal, garlicVal, shadowVal, complexionVal, commentVal, modelTypeVal);
}