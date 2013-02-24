/* Main entry point */
$(function () {
    /* Load any relevant information from local storage... */
    populate_inventory_entries();
})

/*  view_inventory(inventoryData)
Purpose:
    Redirects the user to the item info page.
Arguments:
    inventoryData: The assoc. array representing the inventory to display.
Side Effects:
    Sets localStorage.inventoryData to a dictionary containing 
    the name and type of the inventory.
Returns:
    None
*/
function view_inventory(inventoryData) {
    localStorage.inventoryData = JSON.stringify(inventoryData);
    window.location = "./inventory.html";
}


/*
Purpose:
    Displays what is in the current inventory.
Arguments:
    None
Side Effects:
    Connects to the local database and retrieves the relevant inventory 
    information.
Returns:
    None
*/
function populate_inventory_entries() {
    add_inventory_entry({ 'name': "Red", 'type': "team", 'update': true });
    add_inventory_entry({ 'name': "Blu", 'type': "team", 'update': true });
    add_inventory_entry({ 'name': "Gray Horde", 'type': "team", 'update': true });
    add_inventory_entry({ 'name': "Mann Co.", 'type': "warehouse", 'update': true });
}

/*
Purpose:
    Adds one inventory to an inventory list. 
Arguments:
    inventoryName: The name of the inventory.
    inventoryType: The type of the inventory ('warehouse' or 'team')
Side Effects:
    A new row will be added to the inventory table.
    The itemData will be inserted into the row's node data.
    [ [NAME CELL] [UPDATE CHECKBOX CELL] ]
Returns:
    None
*/
function add_inventory_entry(inventoryData) {
    var inventory_row = document.createElement('tr')
    var inventory_update_checkbox_cell = document.createElement('td')
    var inventory_name_cell = document.createElement('td')
    
    // Prepare the cells...
    $(inventory_name_cell).text(inventoryData.name)
    // When the user clicks on this cell, it should link them to the inventory page.
    .click(function () {
        view_inventory(inventoryData);
    })

    var inventory_update_checkbox = '<input type="checkbox">'
    $(inventory_update_checkbox).appendTo(inventory_update_checkbox_cell)
    // When the user clicks on this cell, it should toggle sync and store it to local storage
    .click(function () {
        inventoryData.sync = $(inventory_update_checkbox).is(':checked')
    })
    
    // Pack everything together...
    $(inventory_row).append([inventory_name_cell, inventory_update_checkbox_cell])

    // Add the row to the table! 
    // We can't add it directly because we need access to the <tbody> item
    // that is within the table.
    // There are two tables, depending on the type of the inventory.
    switch (inventoryData.type) {
        case "warehouse":
            $('#warehouse_table_header').parent().append(inventory_row)
            break;
        case "team":
            $('#team_table_header').parent().append(inventory_row)
            break;
    }
}
