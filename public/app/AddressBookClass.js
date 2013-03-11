define(
    ["js/core/Application",
        "app/model/AddressBook",
        "js/data/DataSource",
        "flow"],
    function (Application, AddressBook, DataSource, flow) {


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

                var self = this;

                flow()
                    .seq(function (cb) {
                        var addressBook = self.$.dataSource.createEntity(AddressBook);

                        self.$.injection.addInstance("addressBook", addressBook);

                        cb();
                    })
                    .exec(function (err) {
                        if (err) {
                            callback(err);
                        } else {
                            // call start from super
                            self.start.baseImplementation.call(self, parameter, callback);
                        }
                    });
            },

            isModuleActive: function (moduleName) {
                return this.$.moduleLoader.$.currentModuleName === moduleName;
            }.on(['moduleLoader', 'change:currentModuleName'])

        });
    }
);