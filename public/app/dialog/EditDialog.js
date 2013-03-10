define(['xaml!js/ui/Dialog'], function(Dialog){

    return Dialog.inherit('app.dialog.EditDialog',{
        defaults: {
            model: null
        },

        submitForm: function(e){
            e.preventDefault();
        },

        confirmDialog: function(){
            var wasNew = this.$.model.isNew();

            this.$.model.validate();

            if (this.$.model.isValid()) {
                var self = this;
                this.$.model.save(null, function (err) {
                    if (!err) {
                        if (wasNew && self.$.model.$collection) {
                            // invalidate collection page cache
                            self.$.model.$collection.invalidatePageCache();
                        } else {
                            self.$.model.sync();
                        }
                    }
                    self.close(err);
                });

            }
        }

    });





});