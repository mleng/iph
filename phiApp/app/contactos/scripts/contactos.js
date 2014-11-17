/**
 * contactos view model
 */

var app = app || {};

app.contactos = (function () {
    'use strict'

   
    // contactos model
    var contactosModel = (function () {

        var contactoModel = {
            
            id: 'Id',
            fields: {
                Nombre: {
                    field: 'Nombre',
                    defaultValue: ''
                },
                Descripcion: {
                    field: 'Descripcion',
                    defaultValue: ''
                },
                 Categoria: {
                    field: 'Categoria',
                    defaultValue: ''
                },
                Telefono: {
                    field: 'Telefono',
                    defaultValue: ''
                },
                 PHId: {
                    field: 'PHId',
                    defaultValue: ''
                },
                CreatedAt: {
                    field: 'CreatedAt',
                    defaultValue: new Date()
                },
                Picture: {
                    fields: 'Picture',
                    defaultValue: null
                },
                UserId: {
                    field: 'UserId',
                    defaultValue: null
                }
             
            },
            CreatedAtFormatted: function () {

                return app.helper.formatDate(this.get('CreatedAt'));
            },
            PictureUrl: function () {

                return app.helper.resolvePictureUrl(this.get('Picture'));
            },
            User: function () {

                var userId = this.get('UserId');

                var user = $.grep(app.Users.users(), function (e) {
                    return e.Id === userId;
                })[0];

                return user ? {
                    DisplayName: user.DisplayName,
                    PictureUrl: app.helper.resolveProfilePictureUrl(user.Picture)
                } : {
                    DisplayName: 'Anonymous',
                    PictureUrl: app.helper.resolveProfilePictureUrl()
                };
            },
            isVisible: function () {
                var currentUserId = app.Users.currentUser.data.Id;
                var userId = this.get('UserId');

                return currentUserId === userId;
            }
        };

        // contactos data source. The Backend Services dialect of the Kendo UI DataSource component
        // supports filtering, sorting, paging, and CRUD operations.
        var contactosDataSource = new kendo.data.DataSource({
            type: 'everlive',
            schema: {
                 total: function(response) {
                  return response.Count; // total is returned in the "total" field of the response
                 },
                 model: contactoModel
            },
             
            transport: {
                // Required by Backend Services
                typeName: 'Contactos'
            },
            change: function (e) {

                if (e.items && e.items.length > 0) {
                    $('#no-contactos-span').hide();
                } else {
                    $('#no-contactos-span').show();
                }
            },
            sort: { field: 'CreatedAt', dir: 'desc' },
            filter: { field: 'PHId', operator: 'eq', value: app.emptyGuid },
            group:  { field: "Categoria" }

        });

        return {
            contactos: contactosDataSource
            
        };

    }());

    // contactos view model
    var contactosViewModel = (function () {

        // Navigate to activityView When some activity is selected
        var contactoSelected = function (e) {

            app.mobileApp.navigate('views/activityView.html?uid=' + e.data.uid);
        };
        
         var show = function () {

            $('.TitleSelector').text(app.currentPH.Name);
            contactosViewModel.contactos.filter({ field: 'PHId', operator: 'eq', value: app.currentPH.Id });
     
        };

        // Navigate to app home
        var navigateHome = function () {

            app.mobileApp.navigate('#welcome');
        };

        // Logout user
        var logout = function () {
   
            app.helper.logout()
            .then(navigateHome, function (err) {
                app.showError(err.message);
                navigateHome();
            });
        };

        return {
            show: show,
            contactos: contactosModel.contactos,
            contactoSelected: contactoSelected,
            logout: logout
        };

    }());

    return contactosViewModel;

}());
