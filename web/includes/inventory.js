/* Main entry point */
$(function () {
    /* Load any relevant information from local storage... */
    inventoryData = JSON.parse(localStorage.inventoryData);
    populate_inventory_entries(inventoryData);
})

/*  view_item(itemData)
Purpose:
    Redirects the user to the item info page.
Arguments:
    itemData: The itemData object representing the item to display.
Side Effects:
    Sets the localStorage.itemID to the passed in ID.
Returns:
    None
*/
function view_item(itemData) {
    localStorage.itemData = JSON.stringify(itemData);
    window.location = "./item.html";
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
function populate_inventory_entries(inventoryData) {
    get_inventory_contents(inventoryData, function (results) {
        for (var i = 0; i < results.rows.length; i++) {
            add_inventory_entry(results.rows.item(i))
        }
    })
}

/*
Purpose:
    Adds one item to the inventory list. 
Arguments:
    itemData: The item assoc. array that contains all info about the item.
Side Effects:
    A new row will be added to the inventory table.
    The itemData will be inserted into the row's node data.
    [ [ID CELL] [NAME CELL] ]
Returns:
    None
*/
function add_inventory_entry(itemData) {
    var item_row = document.createElement('tr')
    var item_id_cell = document.createElement('td')
    var item_name_cell = document.createElement('td')
    var item_quantity_cell = document.createElement('td')

    // Load up the values...
    $(item_id_cell).text(itemData.itemId);
    $(item_name_cell).text(itemData.itemType);
    $(item_quantity_cell).text(itemData.quantity);
    

    // Pack everything together...
    $(item_row).append([item_id_cell, item_name_cell, item_quantity_cell])
    // When the user clicks on this row, it should link them to the item page.
    .click(function () {
        view_item(itemData);
    })
    /* End of row preparation */

    // Add the row to the table! 
    // We can't add it directly because we need access to the <tbody> item
    // that is within the table.
    $('#inventory_table_header').parent().append(item_row)
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
function get_inventory_contents(inventoryData, callback) {
<<<<<<< Updated upstream
    switch (inventoryData.type) {
        case 'warehouse':
            query('SELECT * FROM WarehouseInfo WHERE wName="'+inventoryData.wName+'"', function(transaction, results) {
                callback(results);
            })
        break;
        case 'team':
            query('SELECT * FROM TeamInfo WHERE teamName="' + inventoryData.teamName+ '"', function (transaction, results) {
                callback(results);
            })
    }
}
=======
    query('SELECT * FROM WarehouseInfo WHERE wName="'+inventoryData.wName+'"', function(transaction, results) {
        callback(results);
    })
}
>>>>>>> Stashed changes
