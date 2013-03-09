define(
    ["js/core/Application",
    "app/model/Person",
    "js/core/List"],
    function (Application, Person, List) {


        return Application.inherit({

            initialize: function () {
                this.set('persons', new List());
                this.set('person', new Person());
            },

            /***
             * Starts the application
             * @param parameter
             * @param callback
             */
            start:function (parameter, callback) {
                // false - disables autostart
                this.callBase(parameter, false);

                callback();
            },
            submitForm: function(e){
                this.$.person.validate();

                if(this.$.person.isValid()){
                    // add the current person to the list of persons
                    this.$.persons.add(this.$.person);

                    // set a new person as current person
                    this.set('person', new Person());
                }



                e.preventDefault();
            },
            onRemove: function(e){
                // get the person of the current row
                var person = e.target.find("person");

                // remove from list
                this.$.persons.remove(person);
            }
        });
    }
);