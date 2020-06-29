$.noConflict();
var now;

var em;
function getValue(id) {
    var div = document.getElementById(id);
    div.style.height = '1em';
    console.log(div.offsetHeight)
    return (em = div.offsetHeight);
}

var clearLSTaskItems = function() {
    //(re-)set localstorage "6amTask"..."6pmTask" to ""
    console.log("First reset for new day")
    localStorage.setItem("6amTask", "");
    localStorage.setItem("7amTask", "");
    localStorage.setItem("8amTask", "");
    localStorage.setItem("9amTask", "");
    localStorage.setItem("10amTask", "");
    localStorage.setItem("11amTask", "");
    localStorage.setItem("12pmTask", "");
    localStorage.setItem("1pmTask", "");
    localStorage.setItem("2pmTask", "");
    localStorage.setItem("3pmTask", "");
    localStorage.setItem("4pmTask", "");
    localStorage.setItem("5pmTask", "");
    localStorage.setItem("6pmTask", "");
}

var updateTaskText = function(){
    for (var i = 0; i < 13; i++) {
        with (jQuery("#schedule-area div:eq(" + i.toString() + ")")){
            if (!children().is("textarea")){
                children().text(localStorage.getItem(attr("id") + "Task"));
            }
        }
    }
}

var updateDate = function(){
    now = moment();
    jQuery("#currentDay").text(now.format('dddd, MMMM Do YYYY'));
    var hourIndex = parseInt(now.format("H"))-6;
    var nowDay = now.format("dddd");

    if (hourIndex > 12) {
        //show tomorrow's calendar
        jQuery("#currentDay").text(" Showing schedule for tomorrow, " + now.clone().add(1, 'day').format('dddd, MMMM Do YYYY'));
        nowDay = now.clone().add(1, 'day').format("dddd");
        localStorage.setItem("save-Date", nowDay);
        updateTaskText();
    }
    if (nowDay != localStorage.getItem("save-Date")){
        //set localstorage "save-date" to nowDay
        localStorage.setItem("save-Date", nowDay);
        clearLSTaskItems();
    }

    //if the date displayed is actually today
    if (nowDay === now.format("dddd")){
        updateTaskText();
        for (var i = 0; i < 13; i++){
            with (jQuery("#schedule-area div:eq(" + i.toString() + ")")){
                if (i < hourIndex){//past    
                    removeClass();
                    addClass("border-top border-light bg-dark text-white time-space font-weight-bold text-wrap text-break overflow-auto");
                }
                else if (i === hourIndex ) {//present
                    removeClass();
                    addClass("border-top border-light bg-secondary text-white time-space font-weight-bold overflow-auto");
                }
                else {//future
                    removeClass();
                    addClass("border-top border-dark bg-white text-black time-space font-weight-bold overflow-auto");
                }
            }
        }
    }
    else {//it's too late in the day, so show tomorrow's stuff (done elsewhere) and format it as future stuff (here)
        for (var i = 0; i < 13; i++) {
            with (jQuery("#schedule-area div:eq(" + i.toString() + ")")) {
                removeClass();
                addClass("border-top border-dark bg-white text-black time-space font-weight-bold overflow-auto");
            }
        }
    }
    console.log("Updated at " + now.format("HH:mm:ss"));
}

jQuery(".time-space").on("click","p", function () {
    //brings up a textarea box to fill in the desired task note
  
    var text = jQuery(this)
        .text()
        .trim();
    var textInput = jQuery("<textarea>")
        .addClass("form-control")
        .val(text);
    jQuery(this).replaceWith(textInput);
    textInput.trigger("focus");
    //adds a helpful note
    textInput.after("<p id='usage-note'>When complete, click outside the box or press ESC </p>")

});

jQuery(".time-space").on("blur", "textarea", function () {
    //remove helpful note
    jQuery("#usage-note").remove();
    // get the textarea's current value/text
    var text = jQuery(this)
        .val()
        .trim();
    // recreate p element
    var taskP = jQuery("<p>")
        .addClass("m-0 p-2 h-100 font-weight-bold overflow-auto")
        .text(text);

    //figure out what time slot the task is in and set to localstorage
    console.log(text + " logged for " +jQuery(this).parent().attr("id") + "Task");
    localStorage.setItem(jQuery(this).parent().attr("id") + "Task", text);
    // replace textarea with p element
    jQuery(this).replaceWith(taskP);
});


jQuery(".time-space").on("keyup", "textarea",function (event) {
    //allows user to force blur on pressing ESC key, for faster auto-saving
    if (event.keyCode === 27) {
        //error? still works.
        jQuery(this).blur();
    }
});
updateDate();
setInterval(updateDate,60000);