/*  view_item(itemID)
Purpose:
    Redirects the user to the item info page.
Arguments:
    itemID: The itemID of the object to display.
Side Effects:
    Sets the localStorage.itemID to the passed in ID.
Returns:
    None
*/
function view_item(itemID) {
    localStorage.itemID = itemID;
    window.location = "./item.html";
}
