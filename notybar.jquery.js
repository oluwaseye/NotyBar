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
            '<main></main>'
            , {
                class: 'main-block',
                notybar: 'main',
                appendTo: 'body'
            }
        );

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
            var blur = this.getBlur();
            var overlay = this.getOverlay();
            
            //Function to close NotyBar
            function closeNotyBar() {

                //Look for the target
                $(document).find('[notybar="active"]').removeAttr("notybar", "active");

                if (blur === true) {
                    $('html[notybar] main[notybar="main"]').removeAttr('data-notify-blur', 'true');
                } else {
                    $('html[notybar] main[notybar="main"]').removeAttr('data-notify-blur', 'false');
                }

                if (overlay === true) {
                    $('html[notybar] main[notybar="main"]').removeAttr('data-notify-overlay', 'true');
                } else {
                    $('html[notybar] main[notybar="main"]').removeAttr('data-notify-overlay', 'false');
                }
                $('html').removeAttr('notybar', '');
            }
           

            this.element.on("notybar_opening", {
                message: "NotyBar Opening..."
            }, function (event, msg) {
                if (typeof msg === "boolean" && msg === true) {
                    console.log(event.data.message);
                }
                
                $('html').attr('notybar', '');
                //Look for the target
                $('[data-notybar-target="' + $(this).attr("notybar-cta") + '"]').attr("notybar", "active");

               // $(document).find('aside[data-notybar-position="'+pos+'"]')
                
                if(blur === true){
                    $('html[notybar] main[notybar="main"]').attr('data-notify-blur', 'true');
                }else{
                    $('html[notybar] main[notybar="main"]').attr('data-notify-blur', 'false');
                }

                if(overlay === true){
                    $('html[notybar] main[notybar="main"]').attr('data-notify-overlay', 'true');
                }else{
                    $('html[notybar] main[notybar="main"]').attr('data-notify-overlay', 'false');
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
        getBlur: function () {
            return (typeof this.options.blur === "boolean" && this.options.blur !== undefined) ? this.options.blur : $.NotyBar.defaultOptions.blur;
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
        blur: false,
        overlay: true,
        logs: false
    };

}(jQuery));

