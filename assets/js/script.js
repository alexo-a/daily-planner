$.noConflict();
var now;
var updateDate = function(){
    now = moment();
    jQuery("#currentDay").text(now.format('dddd, MMMM Do YYYY'));
    var hourIndex = parseInt(now.format("H"))-5;
    if (hourIndex > 0){
        for (var i = 0; i < hourIndex; i++){
            with (jQuery("#schedule-area div:eq(" + i.toString() + ")")){
                addClass("bg-secondary");
                addClass("text-white");
            }
                

        }
    }
}



jQuery(".time-space").on("click", "p", function () {
    var text = jQuery(this)
        .text()
        .trim();
    var textInput = jQuery("<textarea>")
        .addClass("form-control")
        .val(text);
    jQuery(this).replaceWith(textInput);
    textInput.trigger("focus");
    textInput.after("<p id='usage-note'>When complete, click outside the box or press ESC </p>")
});


jQuery(".time-space").on("blur", "textarea", function () {
    jQuery("#usage-note").remove();
    // get the textarea's current value/text
    var text = jQuery(this)
        .val()
        .trim();
    // recreate p element
    var taskP = jQuery("<p>")
        .addClass("m-1")
        .text(text);

    // replace textarea with p element
    jQuery(this).replaceWith(taskP);
});


jQuery(".time-space").on("keyup", "textarea",function (event) {
    //allows user to force blur on pressing escape key, for faster auto-saving
    console.log(event.keyCode);
    if (event.keyCode === 27) {
        jQuery(".time-space textarea").blur();
    }
});
updateDate();