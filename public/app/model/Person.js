define(["js/data/Model","js/data/validator/RegExValidator", "js/data/validator/EmailValidator", "app/entity/Address", "app/model/Company"], function(Model, RegExValidator, EmailValidator, Address, Company){

    // returns a new class which inherits from js.data.Model
    return Model.inherit('app.model.Person',{

        schema: {
            firstName: {
                type: String,
                includeInIndex: true
            },
            lastName: {
                type: String,
                includeInIndex: true
            },
            email: {
                type: String,
                required: false,
                includeInIndex: true
            },
            phone: {
                type: String,
                includeInIndex: true,
                required: false
            },
            address: Address,
            company: {
                type: Company,
                required: false,
                includeInIndex: true
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
            phone: "",
            address: Address
        },

        fullName: function(){
            return this.$.firstName + " " + this.$.lastName;
        }.onChange("firstName","lastName")

    });



});