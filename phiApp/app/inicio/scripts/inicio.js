
var app = app || {};

app.inicio = (function () {
    'use strict'

      var isNullOrEmpty = function (value) {
        return typeof value === 'undefined' || value === null || value === '';
    };
    
     var nombrePH="No Definido"  
    var inicioViewModel = kendo.observable (function () {
         
    
        var init = function () {
            
        };
        
        var show = function () {
 
           if(isNullOrEmpty(app.currentPH))
                {   kendo.mobile.application.hideLoading();
                    app.mobileApp.navigate('app/phs/views/phsView.html');
                    alert("Necesita seleccionar un PH!");
                }
            else 
            {    $('.TitleSelector').text(app.currentPH.Name); 
             
            }
        };
        
        return {
            init: init,
            show: show,
            me: app.Users.currentUser,
            nombrePH: nombrePH,
        };
        
    }());
    
    return inicioViewModel;
    
}());
