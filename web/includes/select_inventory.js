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
    get_warehouses(function (results) {
        for (var i = 0; i < results.rows.length; i++) {
            var inventoryData = results.rows.item(i);
            inventoryData.type = 'warehouse';
            add_inventory_entry(inventoryData)
        }
    })

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
    $(inventory_name_cell).text(inventoryData.wName)
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

/* 
Purpose:
    Retrieves the inventory's contents, based on the inventoryData.
Arguments:
    inventoryData: 
        An assoc. arr. describing the inventory to look up.
        It should contain a 'name' and a 'type'.
    callback:
        The function that should handle the returned data.
Side Effects:
    Retrieves rows from the local db.
Returns:
    None
*/
function get_warehouses(callback) {
    query('SELECT DISTINCT wId, wName FROM WarehouseInfo;', function (transaction, results) {
        callback(results);
    })
}