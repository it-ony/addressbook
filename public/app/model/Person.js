define(["js/data/Model","js/data/validator/RegExValidator", "js/data/validator/EmailValidator"], function(Model, RegExValidator, EmailValidator){

    // returns a new class which inherits from js.data.Model
    return Model.inherit('app.model.Person',{

        schema: {
            firstName: String,
            lastName: String,
            email: {
                type: String,
                required: false
            },
            phone: {
                type: String,
                required: false
            }
        },

        validators: [
            new EmailValidator({
                field: "email"
            }),
            new RegExValidator({
                field: "phone",
                regEx: /^[\+\-\d]+$/,
                errorMessage: "not a valid number",
                errorCode: "invalidNumber"
            })
        ],

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