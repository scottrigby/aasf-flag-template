/**
 * JS coloring (with modifications to match my SVG) courtesy of O'Reilly HTML5-for-Publishers.
 * See @link https://github.com/sandersk/HTML5-for-Publishers original source. @endlink
 */
window.addEventListener('load', eventWindowLoaded, false);
var undo_element = $('use[class="colorable"]')[0];
var undo_to_color = "white";

function eventWindowLoaded() {
    add_coloring_book_events();
}

function add_coloring_book_events() {
    // Add click events for colorable portions of drawing.
    // Oddly, the selector $('use.colorable') does not work in iBooks reader, although it does in Mobile Safari.
    $('use[class="colorable"]').bind("click", function (event) {
        // Suppress default; helpful on touchscreen devices.
        event.preventDefault();
        // Get the current element and color and save it in undo_element and undo_to_color variables.
        undo_element = this;
        undo_to_color = $(this).attr("fill");
        // Toggle the "Undo" button to make sure it says "Undo" (it might say "Redo").
        $('#undo_redo').attr("value", "Undo");
        // Set the fill of clicked portion of drawing to the color chosen in palette below.
        color_chosen = $("#color_chosen").html();
        $(this).attr("fill", color_chosen);
    });

    // Add click events for color palette
    $('.color_choice').bind("click", function (event) {
        // Get button id, which is the color name.
        color_chosen = $(this).attr("id");
        // Set color_chosen text to the name of color clicked.
        $("#color_chosen").html(color_chosen);
    });

    // Add click events for reset button, which reverts the fill of the entire drawing to white.
    $('#reset_image').bind("click", function (event) {
        // Get all the colorable elements and set fill back to white.
        $('use[class="colorable"]').attr("fill", "white");
        // Resetting the drawing clears all undo information.
        $('#undo_redo').attr("value", "Undo");
        undo_element = $('use[class="colorable"]')[0];
        undo_to_color = "white";
    });

    $('#undo_redo').bind("click", function (event) {
        // First, save the existing color of the element we're going to undo.
        var existing_color = $(undo_element).attr("fill");
        // Now revert the color back to the undo_to_color.
        $(undo_element).attr("fill", undo_to_color);
        // Finally, make existing_color the new undo_to_color, to support "Redo" functionality.
        undo_to_color = existing_color;
        // If the button is named "Undo", rename it "Redo" and vice versa.
        if ($(this).attr("value") == "Undo") {
            $(this).attr("value", "Redo");
        } else {
            $(this).attr("value", "Undo");
        }
    });
}
