/**
 * contactos view model
 */

var app = app || {};

app.phs = (function () {
    'use strict'

   
    // contactos model
    var phsModel = (function () {

        var phModel = {

            id: 'Id',
            fields: {
                Name: {
                    field: 'Name',
                    defaultValue: ''
                },
                CreatedAt: {
                    field: 'CreatedAt',
                    defaultValue: new Date()
                },
                Picture: {
                    fields: 'Picture',
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
        var phsDataSource = new kendo.data.DataSource({
            type: 'everlive',
            schema: {
                model: phModel
            },
            transport: {
                // Required by Backend Services
                typeName: 'PH'
            },
            change: function (e) {

                if (e.items && e.items.length > 0) {
                    $('#no-ph-span').hide();
                } else {
                    $('#no-ph-span').show();
                }
            },
            sort: { field: 'CreatedAt', dir: 'desc' }
        });

        return {
            phs: phsDataSource
        };

    }());

    // contactos view model
    var phsViewModel = (function () {

        // Navigate to activityView When some activity is selected
        var phSelected = function (e) {
            app.currentPH=e.data;
          
            app.mobileApp.navigate('app/inicio/views/inicioView.html');
           
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
            phs: phsModel.phs,
            phSelected: phSelected,
            logout: logout
        };

    }());

    return phsViewModel;

}());
