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

        //Perform our first scale of the page elements based on window size
        NightSky.refreshScale();
    },

    //Called when the window is resized 
    refreshScale: function(){
        //Mountain A
        LukeHedin.scaleTriangle('.mountain-a', 4, 'bottom', 4);
        //Mountain B
        LukeHedin.scaleTriangle('.mountain-b', 4, 'bottom', 4);
        //Mountain C
        LukeHedin.scaleTriangle('.mountain-c', 3, 'bottom', 3);

        //Treeline A
        LukeHedin.scaleRect('.treeline-a', 12);
        LukeHedin.scaleTriangle('.treeline-a .tree', 80, 'bottom', 12);
        //Treeline B
        LukeHedin.scaleRect('.treeline-b', 10);
        LukeHedin.scaleTriangle('.treeline-b .tree', 64, 'bottom', 10);
    },

    fillTreelines: function(sel, amount) {
        var container = $(sel);
        var trees = "";

        for(var i = 0; i < amount; i++){
            var randPadding = Math.floor(Math.random() * 60) + 1;
            trees += '<div class="triangle tree" style="padding-top:' + randPadding + 'px"></div>';
        }

        container.append(trees);
    }
};