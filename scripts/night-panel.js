/*jshint esversion: 6 */

var NightPanel = {
    mountainEls: [],
    treelineEls: [],
    starEls: [],

    //Called on page load
    draw: function(){
        //Add generated trees to our treelines
        NightPanel.fillTreelines('.treeline-a', 50);
        NightPanel.fillTreelines('.treeline-b', 50);

        //Add stars to the sky
        NightPanel.addStars(100);

        NightPanel.beginAnimating();

        //Perform our first scale of the page elements based on window size
        NightPanel.refresh();
    },

    //Called when the window is resized 
    refresh: function(){

        
        //Scaling elements
        
        //Mountain A
        LukeHedin.scaleTriangle('.mountain-a', 3.8, 'bottom', 3.8);
        //Mountain B
        LukeHedin.scaleTriangle('.mountain-b', 3, 'bottom', 3);

        //Treeline A
        LukeHedin.scaleRect('.treeline-a', 12);
        LukeHedin.scaleTriangle('.treeline-a .tree', 92, 'bottom', 12);
        //Treeline B
        LukeHedin.scaleRect('.treeline-b', 10);
        LukeHedin.scaleTriangle('.treeline-b .tree', 64, 'bottom', 10);

        //Pinetrees
        LukeHedin.scaleTriangle('.pinetree-a', 22, 'bottom', 3.5);
        LukeHedin.scaleTriangle('.pinetree-b', 20, 'bottom', 3);
        LukeHedin.scaleTriangle('.pinetree-c', 24, 'bottom', 5.3);
        LukeHedin.scaleTriangle('.pinetree-d', 24, 'bottom', 3.2);
        LukeHedin.scaleTriangle('.pinetree-e', 26, 'bottom', 5.4);

        //Fireplace
        LukeHedin.scaleSquare('.fireplace', 3);
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

    beginAnimating: function() {
        NightPanel.sparkleStars();
        NightPanel.fireplaceGlow();
        NightPanel.fireFlames();
    },

    //Animations
    sparkleStars: function() {
        var stars = $('.star');

        //First, do a random number to see if this star will change at all (roughly a quarter of them change at a time)
        stars = stars.filter(function(){ return LukeHedin.getRandom(1, 4) === 1; });

        stars.each(function(idx, star){
            $(star).children().first().css('opacity', '0.' + LukeHedin.getRandom(3, 6));
            $(star).children().last().css('opacity', '0.' + LukeHedin.getRandom(3, 6));
        });

        window.setTimeout(NightPanel.sparkleStars, LukeHedin.getRandom(100,200));
    },

    fireplaceGlow: function(){
        var fireglow = $('.fireglow');

        var currentOpacity = parseFloat(fireglow.css('opacity'));
        var newOpacity;
        
        if(currentOpacity <= 0.55){
            newOpacity = '0.' + LukeHedin.getRandom(56, 62);
        } else {
            newOpacity = '0.' + LukeHedin.getRandom(48, 54);
        }

        fireglow.fadeTo(LukeHedin.getRandom(100, 300), newOpacity, function(){
            NightPanel.fireplaceGlow();
        });
    },

    fireFlames: function() {
        var fire = $('.fire');

        var offset = LukeHedin.getRandom(-8, 8);

        var flame = $(`<div class="triangle flame" style="left:` + offset + `px;"></div>`);
        fire.append(flame);
        flame.animate({
            bottom: '100%',
            opacity: 0
        }, 1000, function(){
            flame.remove();
        });

        window.setTimeout(NightPanel.fireFlames, LukeHedin.getRandom(20, 60));
    }
};