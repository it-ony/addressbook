define(
    ["js/core/Application",
        "app/model/Person",
        "js/core/List",
        "js/data/Collection"],
    function (Application, Person, List, Collection) {


        return Application.inherit({

            defaults: {
                persons: null,
                person: null
            },

            /***
             * Starts the application
             * @param parameter
             * @param callback
             */
            start: function (parameter, callback) {
                this.set('persons', this.$.dataSource.createCollection(Collection.of(Person)));
                this.set('person', this.$.persons.createItem());

                // false - disables autostart
                this.callBase(parameter, false);

                this.$.persons.fetch({noCache: true}, function (err) {
                    callback();
                });


            },
            submitForm: function (e) {
                this.$.person.validate();

                if (this.$.person.isValid()) {
                    var self = this;
                    this.$.person.save(null, function (err) {
                        if (!err) {
                            // add the current person to the collection of persons
                            self.$.persons.add(self.$.person);

                            // set a new person as current person
                            self.set('person', self.$.persons.createItem());
                        }
                    });

                }


                e.preventDefault();
            },
            onRemove: function (e) {
                // get the person of the current row
                var person = e.target.find("person");

                person.remove();
            }
        });
    }
);