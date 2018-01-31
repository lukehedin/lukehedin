/*jshint esversion: 6 */

var LukeHedin = {
    //returns a random number between min and max
    getRandom: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

    getMaxWidthOrHeight: function(){
        return $(window).width() < $(window).height() ? $(window).width() : $(window).height();
    },

    //baseSide: 'top' 'bottom' 'left' 'right' or null
    scaleTriangle: function(elSelector, division, baseSide, pointDivision) {
        var scaleAmount = LukeHedin.getMaxWidthOrHeight();
        var triangleEl = $(elSelector);
        
        var scaledVal = (scaleAmount / division);

        triangleEl.css('border-width', `${scaledVal}px`);
    
        var pointScaledVal = (scaleAmount / pointDivision);

        //extends the point of the triangle to a different amount if provided
        if(pointDivision) {
            triangleEl.css(`border-${baseSide}-width`, `${pointScaledVal}px`);
        }
    },
    
    scaleRect: function(elSelector, division) {
        var scaleAmount = LukeHedin.getMaxWidthOrHeight();
        var rectEl = $(elSelector);
        
        var scaledVal = (scaleAmount / division);
        
        rectEl.css('height', `${scaledVal}px`);
    },

    scaleSquare: function(elSelector, division){
        var scaleAmount = LukeHedin.getMaxWidthOrHeight();
        var rectEl = $(elSelector);
        
        var scaledVal = (scaleAmount / division);

        rectEl.css('height', `${scaledVal}px`);
        rectEl.css('width', `${scaledVal}px`);
    }
};

$(document).on('ready', function(e){
    //Night Panel drawing
    NightPanel.draw();
    NightPanel.bindEvents();

    $(window).on('resize', function(e){
        NightPanel.refresh();
    });

    $(window).on('scroll', function(e){
        NightPanel.refresh();
    });
});