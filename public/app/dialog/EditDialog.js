define(['xaml!js/ui/Dialog'], function(Dialog){

    return Dialog.inherit('app.dialog.EditDialog',{
        defaults: {
            model: null
        },

        submitForm: function(e){
            e.preventDefault();
        },

        edit: function(model, callback){
            var wasNew = model.isNew();

            if(!model.isNew()){
                model = model.clone();
            }

            this.set('model', model);

            var self = this;

            this.showModal(function(err){
                if (!err) {
                    if (wasNew && self.$.model.$collection) {
                        // invalidate collection page cache
                        self.$.model.$collection.invalidatePageCache();
                    } else {
                        self.$.model.sync();
                    }
                }
                callback(err);
            })

        },

        confirmDialog: function(){
            this.$.model.validate();

            if (this.$.model.isValid()) {
                var self = this;
                this.$.model.save(null, function (err) {
                    if(!err){
                        self.close(true);
                    }
                });

            }
        }

    });





});