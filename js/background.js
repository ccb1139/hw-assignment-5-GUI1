$(document).ready(function () {
    //Choses a random number for the background 
    var backgroundImgNum = Math.round(Math.random() * (3 - 1) + 1);
    
    //Sets the background of the body with some options to make it so the imagine always covers 
    //The background
    switch(backgroundImgNum){
        case 1:

            $("body").css({
                "background": 'url("graphics_data/gameRoom.jpg") no-repeat center center fixed',
                "-webkit-background-size": "cover",
                "-moz-background-size": "cover",
                "-o-background-size": "cover",
                "background-size": "cover"
            });
            break;
        case 2:
            $("body").css({
                "background": 'url("graphics_data/coffeShop.jpg") no-repeat center center fixed',
                "-webkit-background-size": "cover",
                "-moz-background-size": "cover",
                "-o-background-size": "cover",
                "background-size": "cover"
            });
            break;
        case 3:
            $("body").css({
                "background": 'url("graphics_data/library.jpg") no-repeat center center fixed',
                "-webkit-background-size": "cover",
                "-moz-background-size": "cover",
                "-o-background-size": "cover",
                "background-size": "cover"
            });
            break;
    }
});