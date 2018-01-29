/*jshint esversion: 6 */

var NightSky = {
    mountainEls: [],
    treelineEls: [],
    starEls: [],

    //Called on page load
    draw: function(){
        var NightSky = this;

        //Add generated trees to our treelines
        NightSky.fillTreelines('.treeline-a', 100);
        NightSky.fillTreelines('.treeline-b', 100);

        //Add stars to the sky
        NightSky.addStars(30);

        NightSky.beginAnimating();

        //Perform our first scale of the page elements based on window size
        NightSky.refresh();
    },

    //Called when the window is resized 
    refresh: function(){

        
        //Scaling elements
        
        //Mountain A
        LukeHedin.scaleTriangle('.mountain-a', 4, 'bottom', 4);
        //Mountain B
        LukeHedin.scaleTriangle('.mountain-b', 4, 'bottom', 4);
        //Mountain C
        LukeHedin.scaleTriangle('.mountain-c', 3, 'bottom', 3);

        //Treeline A
        LukeHedin.scaleRect('.treeline-a', 12);
        LukeHedin.scaleTriangle('.treeline-a .tree', 93, 'bottom', 12);
        //Treeline B
        LukeHedin.scaleRect('.treeline-b', 10);
        LukeHedin.scaleTriangle('.treeline-b .tree', 64, 'bottom', 10);

        //Pinetrees
        LukeHedin.scaleTriangle('.pinetree-a', 18, 'bottom', 3.5);
        LukeHedin.scaleTriangle('.pinetree-b', 16, 'bottom', 3);
        LukeHedin.scaleTriangle('.pinetree-c', 20, 'bottom', 5.3);
        LukeHedin.scaleTriangle('.pinetree-d', 20, 'bottom', 3.2);
        LukeHedin.scaleTriangle('.pinetree-e', 22, 'bottom', 5.4);

        //Fireplace
        LukeHedin.scaleSquare('.fireplace', 2);
    },

    fillTreelines: function(sel, amount) {
        var container = $(sel);
        var trees = "";

        for(var i = 0; i < amount; i++){
            var randPadding = Math.floor(Math.random() * 60) + 1;
            trees += `<div class="triangle tree" style="padding-top:` + randPadding + `px"></div>`;
        }

        container.append(trees);
    },

    addStars: function(amount){
        var nightPanel = $('.star-container');
        var stars = "";

        for(var i = 0; i < amount; i++){
            var randX = LukeHedin.getRandom(1, 100);
            var randY = LukeHedin.getRandom(1, 80);
            stars += `<div class="star" style="left:` + randX + `%;top:` + randY + `%;">` +
                `<div class="triangle twinkle-a"></div>` +
                `<div class="triangle twinkle-b"></div>` +
            `</div>`;
        }

        nightPanel.prepend(stars);
    },

    beginAnimating: function(){

        var sparkleStars = function(){
            window.setTimeout(function(){
                var stars = $('.star');

                stars.each(function(idx, star){
                    var rand = LukeHedin.getRandom(6, 8);
                    $(star).css('opacity', '0.' + rand);
                });

                //Recall sparkle stars
                sparkleStars();
            }, LukeHedin.getRandom(100, 150));
        };
        
        sparkleStars();
    }
};
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