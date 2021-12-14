$(document).ready(function () {
    var backgroundImgNum = Math.round(Math.random() * (3 - 1) + 1);
    
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