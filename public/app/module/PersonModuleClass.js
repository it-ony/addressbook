define(["js/core/Module"], function (Module) {

    return Module.inherit('app.module.PersonModuleClass', {

        defaults: {
            persons: null,
            person: null,
            companies: null,
            dialogTitle: ""
        },

        inject: {
            addressBook: "addressBook"
        },

        /***
         * Starts the application
         * @param parameter
         * @param callback
         */
        start: function (callback) {
            if(!this.$started){
                this.set('persons', this.$.addressBook.getCollection("persons"));
                this.set('companies', this.$.addressBook.getCollection("companies"));
                this.$.companies.fetch();
            }

            this.$started = true;
            callback();
        },
        submitForm: function (e) {
            e.stopPropagation();
            e.preventDefault();
        },
        onNew: function(){
            this.editPerson(this.$.persons.createItem());
        },

        onRowDblClick: function(e){
            var person = e.target.find('item');

            this.editPerson(person.clone());
        },

        onEdit: function(){
            if(this.$.dataGrid.$.selectedItems && !this.$.dataGrid.$.selectedItems.isEmpty()){
                var person = this.$.dataGrid.$.selectedItems.at(0);
                this.editPerson(person.clone());
            }

        },

        editPerson: function(person){
            if(person.isNew()){
                this.set('dialogTitle', "Create new person");
            } else {
                this.set('dialogTitle', "Edit " + person.fullName());
                person.fetch();
            }
            this.set('person', person);
            this.$.personDialog.showModal(function () {

            });
        },

        onRemove: function (e) {
            // get the person of the current row
            var person = e.target.find("data");

            var self = this;
            person.remove(null, function(err){
                if(!err){
                    self.$.persons.invalidatePageCache();
                }
            });
        }


    });

});