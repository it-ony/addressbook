define(["js/core/Module"], function (Module) {

    return Module.inherit('app.module.CompanyModuleClass', {

        defaults: {
            companies: null,
            company: null,
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
                this.set('companies', this.$.addressBook.getCollection("companies"));
            }

            this.$started = true;

            callback();
        },
        submitForm: function (e) {
            e.stopPropagation();
            e.preventDefault();
        },
        onNew: function(){
            this.editCompany(this.$.companies.createItem());
        },

        onRowDblClick: function(e){
            var company = e.target.find('item');

            this.editCompany(company.clone());
        },

        onEdit: function(){
            if(this.$.dataGrid.$.selectedItems && !this.$.dataGrid.$.selectedItems.isEmpty()){
                var company = this.$.dataGrid.$.selectedItems.at(0);
                this.editCompany(company.clone());
            }

        },

        editCompany: function(company){
            if(company.isNew()){
                this.set('dialogTitle', "Create new company");
            } else {
                this.set('dialogTitle', "Edit " + company.$.name);
            }
            this.set('company', company);
            this.$.companyDialog.showModal(function () {

            });
        },

        onRemove: function (e) {
            // get the company of the current row
            var company = e.target.find("data");

            var self = this;
            company.remove(null, function(err){
                if(!err){
                    self.$.companies.invalidatePageCache();
                }
            });
        }


    });

});