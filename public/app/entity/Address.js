define(['js/data/Entity'], function(Entity){

    return Entity.inherit('app.entity.Address',{
        schema: {
            street: String,
            city: String
        }
    });

});