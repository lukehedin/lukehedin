/*jshint esversion: 6 */

var LukeHedin = {
    //returns a random number between min and max
    getRandom: function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    },

    getMaxWidthOrHeight: function(){
        return $(window).width() < $(window).height() ? $(window).width() : $(window).height();
    },

    //baseSide: 'top' 'bottom' 'left' 'right' or null
    scaleTriangle: function(elSelector, division, baseSide, pointDivision) {
        var LukeHedin = this;

        var scaleAmount = LukeHedin.getMaxWidthOrHeight();
        var triangleEl = $(elSelector);
        
        triangleEl.css('border-width', (scaleAmount / division) + 'px');
    
        //extends the point of the triangle to a different amount if provided
        if(pointDivision) {
            triangleEl.css('border-' + baseSide + '-width', (scaleAmount / pointDivision) + 'px');
        }
    },
    
    scaleRect: function(elSelector, division) {
        var LukeHedin = this;

        var scaleAmount = LukeHedin.getMaxWidthOrHeight();
        var rectEl = $(elSelector);
        
        rectEl.css('height', (scaleAmount / division) + 'px');
    },

    scaleSquare: function(elSelector, division){
        var LukeHedin = this;

        var scaleAmount = LukeHedin.getMaxWidthOrHeight();
        var rectEl = $(elSelector);
        
        rectEl.css('height', (scaleAmount / division) + 'px');
        rectEl.css('width', (scaleAmount / division) + 'px');
    }
};

$(document).on('ready', function(e){
    NightSky.draw();
    
    $(window).on('resize', function(e){
        NightSky.refresh();
    });
});