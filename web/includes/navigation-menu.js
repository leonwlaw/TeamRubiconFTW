/*
To use this function, add what you want to be visible inside the string.
e.g. to add a link:
	navmenu_add_entry('<a href="path">Link to page</a>')
To add a header:
	navmenu_add_entry('<a href="path">Link to page</a>', true)
*/
function navmenu_add_entry(str, is_header) {
	// Entries are not headers by default
	if (is_header === undefined)
		is_header = false
	
	var output_str = "<li"
	if (is_header)
		output_str += " data-role=\"list-divider\""
	
	output_str += '>'+str+'</li>'
	document.write(output_str)
}

/*  When linking to other pages (and not a sub-page), if the page does not load, make 
    sure to include the following properties into the <a> element: 
        rel="external" data-ajax="false"
*/

navmenu_add_entry('Team Rubicon', true);
navmenu_add_entry('<a href="./" rel="external" data-ajax="false">Inventory</a>');
navmenu_add_entry('<a href="./select_inventory.html" rel="external" data-ajax="false">Change Inventory</a>');
navmenu_add_entry('<a href="login.html" data-rel="dialog">Sign In</a>');