define(["js/data/Model","js/data/validator/RegExValidator", "js/data/validator/EmailValidator", "app/entity/Address"], function(Model, RegExValidator, EmailValidator, Address){

    // returns a new class which inherits from js.data.Model
    return Model.inherit('app.model.Company',{

        schema: {
            name: {
                includeInIndex: true,
                type: String
            },
            email: {
                includeInIndex: true,
                type: String,
                required: false
            },
            phone: {
                includeInIndex: true,
                type: String,
                required: false
            },
            address: Address
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
            name: "",
            lastName: "",
            phone: "",
            address: Address
        }

    });



});