/**
 * AddContacto view model
 */

var app = app || {};

app.addContacto = (function () {
    'use strict'

    var addContactoViewModel = (function () {
        
        var $newNombre;
           var $newTelefono;
        var validator;
        
        var init = function () {
            
            validator = $('#enterStatus').kendoValidator().data('kendoValidator');
            $newNombre = $('#newNombre');
            $newTelefono = $('#newTelefono');
        };
        
        var show = function () {
            
            // Clear field on view show
            $newNombre.val('');
            $newTelefono.val('');
            validator.hideMessages();
        };
        
        var saveContacto = function () {
            
            // Validating of the required fields
            if (validator.validate()) {
                
                // Adding new Contacto to Contactos model
               
                
                var contactos = app.contactos.contactos;
                var contacto = contactos.add();
                contacto.Nombre = $newNombre.val();
                contacto.Telefono = $newTelefono.val();
                contacto.UserId = app.Users.currentUser.get('data').Id;
                contacto.PHId = app.currentPH.Id;
                
                contactos.one('sync', function () {
                    app.mobileApp.navigate('#:back');
                });
                
                contactos.sync();
               
            }
        };
        
        return {
            init: init,
            show: show,
            me: app.Users.currentUser,
            saveContacto: saveContacto
        };
        
    }());
    
    return addContactoViewModel;
    
}());
