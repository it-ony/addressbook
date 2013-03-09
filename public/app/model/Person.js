define(["js/data/Model"], function(Model){

    // returns a new class which inherits from js.data.Model
    return Model.inherit('app.model.Person',{

        defaults: {
            firstName: "",
            lastName: "",
            phone: ""
        },

        fullName: function(){
            return this.$.firstName + " " + this.$.lastName;
        }.onChange("firstName","lastName")

    });



});