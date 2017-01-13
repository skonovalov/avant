$(document).ready(function() {
	console.time('loading...');

    preparePage();

    popupCall.init();
    focusInput();
    selectActiveMenu();

    console.timeEnd('loading...');
});


function preparePage() {

    if( $('#slider').length > 0) {

        var sl = $('#slider');

        sl.owlCarousel({
            singleItem : true,
            transitionStyle : 'fade',
            autoPlay: false,
            navigation: true,
            afterMove: function() {
                if( !$('.slider-menu ul li').eq( this.owl.currentItem ).hasClass('active')) {
                    $('.slider-menu').find('.active').removeClass('active');
                    $('.slider-menu ul li').eq( this.owl.currentItem ).addClass('active')
                }

                console.log(this.owl.currentItem);
            }
        });

        $('.slider-next').click(function() {
            sl.trigger('owl.next');
        });

         $('.slider-prev').click(function() {
            sl.trigger('owl.prev');
        });


        $('.slider-menu ul li a').each(function(index) {
            $(this).click(function(e) {
                e.preventDefault(); 

                var i = $(this).parent().data('item'),
                    owl = $(".owl-carousel").data('owlCarousel');
               
               owl.goTo(i);
            });
        }); 

    }

}



var popupCall = (function() {

    function _open() {

        $('.pop-call').fadeIn(600);
    }

    function _close() {
        $('.pop-call').fadeOut(400);
    }


    function _openThx() {
        $('.pop-call-inner').fadeOut(400);

        setTimeout(function() {
           $('.pop-call-thx').fadeIn(400);
        }, 400);

        
    }

    function _initHandlers() {

        $('.callback').on('click', function(e) {
            e.preventDefault();    

             _open();
        });


        $('.pop-call').on('click', function(e) {
            e.preventDefault();    

            if( $(e.target).closest('.pop-call-inner').length == 0) {

                _close();
            }
        });


        $('.pop-call-inner form button').on('click', function(e) {
            e.preventDefault();

            _openThx() ;
        }); 
    }

    return {
        init: function() {
            _initHandlers();
        }
    };
})();

function focusInput() {

    $('input').on('focus', function() {
        $(this).parent()
               .children('label')
               .fadeOut();


        $(this).on('blur', function() {
            if( $(this).val() ) {
                return;
            } else {

                $(this).parent()
                   .children('label')
                   .fadeIn();

            }

        });       
    })
}


function selectActiveMenu() {
    var href = location.href/*.substr(87)*/,
        a    = $('.header-menu-inner nav ul li a');

    console.log(href);   

    a.each(function() {
      if( href.indexOf( $(this).attr('href') ) != -1 ) {
        if( $(this).attr('href') == 'index.html') {
            return;
        }

         if(!$(this).hasClass('active')) {
          $(this).parent().parent().find('.active').removeClass('active');
          $(this).parent().addClass('active');
         }
      }
    });    
}