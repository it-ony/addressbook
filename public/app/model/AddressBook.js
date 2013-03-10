define(["js/data/Model", "js/data/Collection", "app/model/Company", "app/model/Person"], function (Model, Collection, Company, Person) {

    // returns a new class which inherits from js.data.Model
    return Model.inherit('app.model.AddressBook', {

        schema: {
            companies: Collection.of(Company),
            persons: Collection.of(Person)
        }

    });


});