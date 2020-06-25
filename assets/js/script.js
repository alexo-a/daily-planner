$.noConflict();
var now;

var em;
function getValue(id) {
    var div = document.getElementById(id);
    div.style.height = '1em';
    console.log(div.offsetHeight)
    return (em = div.offsetHeight);
}


var updateDate = function(){
    now = moment();
    jQuery("#currentDay").text(now.format('dddd, MMMM Do YYYY'));
    var hourIndex = parseInt(now.format("H"))-6;
    console.log(hourIndex);
    if (hourIndex > 0 && hourIndex <=12){
        for (var i = 0; i < hourIndex; i++){
            with (jQuery("#schedule-area div:eq(" + i.toString() + ")")){
                addClass("bg-secondary");
                addClass("text-white");
            }
        }
        //entire area is 1300px tall
        if (hourIndex < 12) {
            //insert you are here thingy
            var timeArrowText = jQuery("<p id='locator'>⬅️you are here</p>");
            jQuery("#blank-right").append(timeArrowText);
            var nowFractional = (hourIndex + parseInt(now.format("m")) / 60)/13 * 1300;
            console.log(nowFractional);
            with (jQuery("#locator")){
                css("position", "absolute");
                
                css("top", nowFractional - 0.699999999*getValue("currentDay"));
                css("right", 0);
            }
        }
        else {
            jQuery("#locator").remove();
        }
    }
    if (hourIndex > 12) {
        //show tomorrow's calendar
        jQuery("#currentDay").text(" Showing schedule for tomorrow, " + now.add(1, 'day').format('dddd, MMMM Do YYYY'));
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
        .addClass("m-0 p-2 font-weight-bold overflow-auto")
        .text(text);
    if (text != "") {
        taskP.addClass("bg-primary text-white")
    }
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

