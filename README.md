# Development is finished
Please check app in link: http://ozlevka.github.io/welldone

# Sample Application Description #
* The sample application is called myLocations and it allows the user to maintain a list of categorized name locations.
* The domain model contains two main entities, a Category and a Location. A Category has a single property: Name. A Location has the following properties: Name, Address, Coordinates, and Category.
* All data is saved to the locale storage of the browser (an HTML5 feature) for simplicity.
* The application should use the new angular ui-router and ngTouch module.

# Use Cases #
* The user can manage (view, add, remove and edit) the list of Categories.
* The user can manage (view, add, remove and edit) the list of Locations.
* The user must fill all properties when saving an item.
* The user must choose a category from a list of existing categories when defining a Location.
* Each screen has a top toolbar with title and action buttons. The user executes an operation on a list item by clicking the appropriate button in the top toolbar.
* The application screen has a bottom bar with two iconic buttons: Categories and Locations. The user moves between Categories and Location management by clicking on their respective icons on the bottom button bar.
* The user can view all Locations sorted by alphabetical order, grouped or ungrouped by category.
* The user can view only the locations assigned a specific category she chooses.
* When clicking a location in the list, the user can choose to see the definition of the item or view it in on an actual map (using google maps or similar service, native or not).
* When the user clicks on a location, the device will vibrate (via native bridge support).
* The application exposes a share button which allows sending an email with the list of locations and categories in json format as an attachment (via native bridge support).
* Bonus:  allow selecting the coordinates from the map service and not entering by hand.
* Bonus: allow relating multiple categories to a single item, define and enhance the use cases and ui related to this.
