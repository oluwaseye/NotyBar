(function ($) { //an IIFE so safely alias jQuery to $
    $.NotyBar = function (element, options) { //renamed arg for readability

        //stores the passed element as a property of the created instance.
        //This way we can access it later
        this.element = (element instanceof $) ? element : $(element);

        if (typeof options === "object" && !Array.isArray(options) && options !== null) {
            this.options = options;
        }
        $('body').addClass("NotyBar");

        $(
            '<div></div>', {
              class: 'notybar_overlay',
              notybar: 'overlay',
              'notybar-close': '',
              appendTo: 'body'
             }
        );

    };

    //assigning an object literal to the prototype is a shorter syntax
    //than assigning one property at a time
    $.NotyBar.prototype = {
        InitEvents: function () {
            //`this` references the instance object inside of an instace's method,
            //however `this` is set to reference a DOM element inside jQuery event
            //handler functions' scope.

            var that = this;
            //Firefox doesn't fire the keypress event for non-printable
            //characters so we use a keydown handler






            //this.element.attr('data-notify', this.getBlur());

            var pos = this.getPosition();
            var logs = this.getLog();
            var overlay = this.getOverlay();
            
            //Function to close NotyBar
            function closeNotyBar() {

                //Look for the target
                $(document).find('[notybar="active"]').removeAttr("notybar", "active");

                if (overlay === true) {
                    $('html[notybar] div[notybar="overlay"]').removeAttr('data-notify-overlay');
                } else {
                    $('html[notybar] div[notybar="overlay"]').removeAttr('data-notify-overlay');
                }
                $('html').removeAttr('notybar', '');
            }
            //close when ESC key is pressed
            $(document).keydown(function (e) {
                var key = e.which;
                if (key == 27) {
                     closeNotyBar();
                } 
            });

            this.element.on("notybar_opening", {
                message: "NotyBar Opening..."
            }, function (event, msg) {
                if (typeof msg === "boolean" && msg === true) {
                    console.log(event.data.message);
                }
                closeNotyBar();
                $('html').attr('notybar', '');
                //Look for the target
                $('[data-notybar-target="' + $(this).attr("notybar-cta") + '"]').attr("notybar", "active");

               if(overlay === true){
                   $('html[notybar] div[notybar="overlay"]').attr('data-notify-overlay', 'true');
                }else{
                   $('html[notybar] div[notybar="overlay"]').attr('data-notify-overlay', 'false');
                }
            });


            $('[notybar-close]').on("notybar_closing", {
                message: "NotyBar Closing..."
            }, function (event, msg) {
                if (typeof msg === "boolean" && msg === true) {
                    console.log(event.data.message);
                }

              closeNotyBar();
                
            });




            this.element.on("click", function () {

                $(this).trigger("notybar_opening", logs);
            });

            $('[notybar-close]').on("click", function () {

               $(this).trigger("notybar_closing", logs);
            });



        },
        //renamed your method to start with lowercase, convention is to use
        //Capitalized names for instanceables only

        getPosition: function () {
            return ($.NotyBar.positions.indexOf(this.options.position) >= 0) ? this.options.position : $.NotyBar.defaultOptions.position;
        },
        getOverlay: function () {
            return (typeof this.options.overlay === "boolean") ? this.options.overlay : $.NotyBar.defaultOptions.overlay;
        },
        getLog: function () {
            return (typeof this.options.logs === "boolean") ? this.options.logs : $.NotyBar.defaultOptions.logs;
        },
        closeBar: function(){
            $('html[notybar] main[notybar="main"]').removeAttr('data-notify-blur');
            $('html[notybar] main[notybar="main"]').removeAttr('data-notify-overlay');
        }
    };

    $.NotyBar.positions = ['top', 'right', 'bottom', 'left'];

    $.NotyBar.defaultOptions = {
        position: 'left',
        overlay: true,
        logs: false
    };

}(jQuery));

