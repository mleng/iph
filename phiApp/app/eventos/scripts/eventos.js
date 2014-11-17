
var app = app || {};

app.eventos = (function () {
    'use strict'

     var nombrePH="No Definido"  
      var eventosViewModel = kendo.observable (function () {
         
    
        var init = function () {
            
        };
        
        var show = function () {
               $('.TitleSelector').text(app.currentPH.Name);
        };
        
        return {
            init: init,
            show: show,
            me: app.Users.currentUser,
            nombrePH: nombrePH
        };
        
    }());
    
    return eventosViewModel;
    
}());
