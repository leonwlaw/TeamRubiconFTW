// Gloval variables
/* The ID of the item that we need to display on this page. */
var itemData;

// Main Entry Point
$(function() {
    itemData = JSON.parse(localStorage.itemData);
    display_item(itemData);
})

/*
Purpose:
    Given an item, modify the DOM to display its data.
Arguments:
    itemData: an assoc. array describing the item.
Side Effects:
    Relevant values in the DOM will be updated to reflect what's
    inside the itemData assoc array.
*/
function display_item(itemData) {
    // Update general fields...
    $('.item_name').text(itemData.brandDesc);
    $('.item_category').text(itemData.catDesc);
    $('.item_description').text(itemData.itemType);
    $('#item_comment').text(itemData.condDetDesc);
    // Hide all unrelevant fields.  We only want to show the user what 
    // is totally necessary.  Extraneous information is distracting.
    // Also update only what is actually shown.

    // Single Item
    if (itemData.isBulk == 'Unique') {
        $('.bulk').hide();
        $('#set_item_working').click(function () {
            itemData.is_working = true;
            $('.toggle_item_working').addClass('item_is_working')
                .removeClass('item_is_not_working')
        });
        $('#set_item_not_working').click(function () {
            itemData.is_working = false;
            $('.toggle_item_working').addClass('item_is_not_working')
                .removeClass('item_is_working')
        });

        // Trigger the initial coloring
        if (itemData.is_working)
            $('#set_item_working').click()
        else
            $('#set_item_not_working').click()

        itemData.quantity = $('#item_quantity').val;
        itemData.condDetDesc = $('#item_comment').val;
    }
    // Bulk Item
    else {
        $('.single').hide();
        $('#item_quantity').val(itemData.quantity);
    }
}
