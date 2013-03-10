define(
    ["js/core/Application",
        "app/model/AddressBook",
        "js/data/DataSource"],
    function (Application, AddressBook, DataSource) {


        return Application.inherit({

            inject: {
                dataSource: DataSource
            },

            defaults: {
                addressBook: null
            },

            defaultRoute: function (routeContext) {
                routeContext.router.navigate("persons", routeContext.callback);
            }.async(),

            start: function (parameter, callback) {
                var addressBook = this.$.dataSource.createEntity(AddressBook);

                this.$.injection.addInstance("addressBook",addressBook);

                // false - disables autostart
                this.callBase();
            },

            isModuleActive: function(moduleName){
                return this.$.moduleLoader.$.currentModuleName === moduleName;
            }.on(['moduleLoader','change:currentModuleName'])

        });
    }
);