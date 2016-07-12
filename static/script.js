var win = $('body');
var contentContainer = $('.content-container');
var bodyWidth = win.css('width');
var bodyHeight = win.css('height');
var initialYlogo = parseInt( $('.login-screen .inevio-logo.white').css('transform').split(',')[5] );
var initialMarginTopLogo = parseInt( $('.content-container').css('margin-top') ) || parseInt( $('.content-container').css('top') ) ;
var initialTopLogo = parseInt( $('.login-screen .inevio-logo.dark').css('top') );
var initialMarginRightBtn = $('.login-buttons .accept').css('margin-right');
var initialMarginLeftLogo = $('.login-screen .inevio-logo.dark').css('margin-left');
var initialButtonWidth = $('.login-buttons .accept').css('width');
var initialHeight = contentContainer.height();
var inevioLogo = $('.inevio-logo');
var backButton = $('.back-button');
var loginStage = 0;// 0 = intro, 1=sign-in, 2=sign-up, 3=recover 4=recover-success, -1 transition
var hammerJS;
var hammerLoaded = false;
var menuMode = false;
var menuStage = 1;
var lowResMode = false;
var used = false;
var transitioning = false;

if( parseInt( win.css('width') ) < 360 ){
  lowResMode = true;
}

/*var intervalo = setInterval( function(){

  if( typeof Hammer !== 'undefined' ){
    clearInterval( intervalo );
    hammerLoaded = true;
    hammerJS = new Hammer(win[0] , {
      domEvents:true
    });
    hammerJS.get('swipe').set({ direction: Hammer.DIRECTION_ALL })
  }
},50);*/

var createCache = function(){

  //initialYlogo = parseInt( $('.login-screen .inevio-logo.white').css('transform').split(',')[5] );
  initialMarginTopLogo = parseInt( $('.content-container').css('margin-top') ) || parseInt( $('.content-container').css('top') );
  initialTopLogo = parseInt( $('.login-screen .inevio-logo.dark').css('top') );
  initialMarginRightBtn = $('.login-buttons .accept').css('margin-right');
  initialMarginLeftLogo = $('.login-screen .inevio-logo.dark').css('margin-left');
  initialButtonWidth = $('.login-buttons .accept').css('width');
  initialHeight = contentContainer.height();

}

var back = function( stage ){

  $('.login-screen .error').removeClass('error');
  if( stage == 1 ){

    loginStage = -1;
    $('.login-screen .inevio-logo').transition({
      'top': initialTopLogo,
    },500);

    $('.login.inputs').transition({
      'x': bodyWidth
    },250,function(){

      $(this).hide();
      $('.slogan').show().transition({
        'x' : '0%'
      },250);

    });

    $('.sign-in').css('float','right').transition({
      'width': initialButtonWidth,
    },500,function(){

      $('.sign-up').css( 'margin-right', initialMarginRightBtn ).show().css('opacity','1');
      $(this).addClass('transparent');
      $(this).removeClass('accept').removeAttr( 'style' );
      loginStage = 0;

    });

    $('.more').show().transition({
      'opacity' : '1'
    },500);

    backButton.transition({
      'opacity' : '0'
    },500, function(){
      $(this).hide();
    });

    $('.forgot').hide();

  }else if( stage == 2 ){

    loginStage = -1;
    $('.login-screen .inevio-logo').transition({
      'top': initialTopLogo,
    },500,function(){});

    $('.inputs.register').transition({
      'x': bodyWidth
    },250,function(){

      $(this).hide();
      $('.slogan').show().transition({
        'x' : '0%'
      },250);

    });

    contentContainer.transition({
      'height' : initialHeight
    },500);

    $('.sign-up').transition({
      'width': initialButtonWidth
    },500,function(){

      //$(this).removeAttr( 'style' );
      $('.sign-in').show();
      loginStage = 0;

    });

    $('.more').show().transition({
      'opacity' : '1'
    },500);

    backButton.transition({
      'opacity' : '0'
    },500, function(){
      $(this).hide();
    });

  }else if( stage == 3 ){

    loginStage = -1;
    $('.passwd-recover').transition({
      'opacity': '0'
    },500,function(){
      $(this).hide();
    });

    contentContainer.transition({
      'height' : initialHeight
    },500);

    $('.inputs.login .password').show().transition({
      'opacity':'1'
    },500,function(){

      $('.forgot').show();
      $('.inputs.login .email').addClass('username').removeClass('email').find('input').attr('placeholder','Username').val('');
      $('.login-buttons .sign-in').removeClass('recover').find('span').text('Sign in');
      loginStage = 1;

    });

  }else if( stage == 4 ){

    loginStage = -1;
    $('.passwd-recover').show().transition({
      'opacity' : '1'
    },500);

    $('.recover-passwd-success').transition({
      'x' : bodyWidth
    },250,function(){

      $(this).hide();
      $('.inputs.login').show().transition({
        'x' : '0'
      },250,function(){
        loginStage = 3;
      });

      $('.login-buttons').show().transition({
        'x' : '0%'
      },250);

    });

  }

}

var menuSwipe = function( value ){

  if( !transitioning ){

    console.log(value);
    if( value === 1 ){

      if( menuStage !== 3 ){

        transitioning = true;

        $('.menu-content.active').transition({
          'left' : '-100%'
        },500,function(){

          menuStage++;
          $(this).removeClass('active');
          $(this).hide();
          $('.bullet.active').removeClass('active');
          $('.bullet-' + menuStage).addClass('active');
          transitioning = false;

        });

        $('.menu-content-' + menuStage).show().transition({
          'left' : '0'
        },500,function(){
          $(this).addClass('active');
        });


      }

    }else{

      if( menuStage !== 1 ){

        transitioning = true;
        menuStage--;
        $('.menu-content.active').transition({
          'left' : '100%'
        },500,function(){

          $(this).removeClass('active');
          $(this).hide();
          $('.bullet.active').removeClass('active');
          $('.bullet-' + menuStage).addClass('active');
          transitioning = false;

        });

        $('.menu-content-' + menuStage).show().transition({
           'left' : '0'
         },500,function(){
           $(this).addClass('active');
         })

      }

    }

  }


}

win.on('click', '.sign-in', function(){

  if( !used ){
   used = true;
   createCache();
  }

  if( loginStage == 0 ){

    loginStage = -1;
    $('.login-screen .inevio-logo').transition({
      'top': '0px',
    },500);

    $('.slogan').transition({
      'x': '-' + bodyWidth
    },250,function(){

      $(this).hide();
      $('.login.inputs').show().transition({
        'x' : '0'
      },250);

    });

    $('.sign-up').css({'margin-right':'0px'}).transition({
      'opacity': '0'
    },50,function(){//50
      $(this).hide();
    });

    $(this).transition({
      'width': '100%',
      'background-color': '#60b25e',
      'border': '2px solid #60b25e'
    },500,function(){

      $(this).addClass('accept').css('float','right');
      $(this).removeClass('transparent');
      $('.forgot').show();
      loginStage = 1;

    });

    $('.more').transition({
      'opacity' : '0'
    },500, function(){
      $(this).hide();
    });

    backButton.show().transition({
      'opacity' : '1'
    },500);

  }else if( loginStage == 1 ){

    if( $('.login.inputs .username').find('input').val() === 'a' ){
      $('.login.inputs .input').removeClass('error');
    }else{
      $('.login.inputs .input').addClass('error');
    }

  }

})

.on('click', '.sign-up', function(){

  if( !used ){
   used = true;
   createCache();
  }

  if( loginStage == 0 ){

    loginStage = -1;
    $('.login-screen .inevio-logo').transition({
      'top': '0',
    },500);

    $('.slogan').transition({
      'x': '-' + bodyWidth
    },250,function(){

      $(this).hide();
      $('.inputs.register').show().transition({
        'x' : '0%'
      },250);

    });

    console.log(initialHeight);
    contentContainer.transition({
      'height' : initialHeight + 73
    },500);

    $('.sign-in').hide();

    $(this).transition({
      'width': '100%',
      'margin-right':'0px',
      'background-color': '#60b25e',
      'border': 'none'
    },500);

    $('.more').transition({
      'opacity' : '0'
    },500, function(){

      $(this).hide();
      loginStage = 2;

    });

    backButton.show().transition({
      'opacity' : '1'
    },500);

  }

})

.on('click', '.forgot', function(){

  $('.login-screen .error').removeClass('error');
  loginStage = -1;
  $('.passwd-recover').show().transition({
    'opacity': '1'
  },500);

  var height = 360;
  if( lowResMode ){
    height = 265;
  }

  contentContainer.transition({
    'height' : height
  },500);

  $('.inputs.login .password').transition({
    'opacity':'0'
  },500,function(){

    $(this).hide();
    $('.forgot').hide();
    $('.inputs.login .username').removeClass('username').addClass('email').find('input').attr('placeholder','Email').val('');
    $('.login-buttons .sign-in').addClass('recover').find('span').text('Recover');
    loginStage = 3;

  });

})

.on('click', '.recover', function(){

  console.log('recover');
  if( $('.login.inputs .email').find('input').val() === 'a' ){

    loginStage = -1;
    $('.login.inputs .email').removeClass('error');
    $('.passwd-recover').removeClass('error').text('Recover password');

    $('.passwd-recover').transition({
      'opacity' : '0'
    },500,function(){
      $(this).hide();
    });

    $('.inputs.login').transition({
      'x' : '-' + bodyWidth
    },250,function(){

      $(this).hide();
      $('.recover-passwd-success').show().transition({
        'x' : '0',
        'y' : '50px'
      },250,function(){
        loginStage = 4;
      })

    });

    $('.login-buttons').transition({
      'x' : '-' + bodyWidth
    },500,function(){
      $(this).hide();
    });

  }else{
    $('.login.inputs .email').addClass('error');
    $('.passwd-recover').addClass('error').text('Email incorrecto');
  }

})

.on('click', '.back-button', function(){
  back( loginStage );
})

.on('click', '.more', function(){

  if( !used ){
   used = true;
   createCache();
  }

  if( $('.start .inevio-logo').length == 0 ){
    $('.start').append( inevioLogo.clone().css({'top': (initialMarginTopLogo + initialTopLogo),'background-size':'cover', 'margin-left':'0px', 'left': $('.inevio-logo.dark').css('margin-left') }).show() );
  }

  $('.start .inevio-logo.white').show().transition({
    'width': '108px',
    'height': '21px',
    'top': '20px',
    'left': '20px',
    'opacity' : '0.2'
  },1000,function(){
    menuMode = true;
    $(this).hide();
    $('.menu-screen .header figure').show();
  });

  $('.start .inevio-logo.dark').show().transition({
    'width': '108px',
    'height': '21px',
    'top': '20px',
    'left': '20px',
    'opacity' : '1'
  },1000,function(){
    $(this).hide();
  });

  $('.login-screen .inevio-logo').hide();

  $('.menu-screen').show().transition({
    'bottom' : '0'
  },1000);

})

.on('click', '.less', function(){

  $('.start .inevio-logo.white').show().transition({
    'width': $('.login-screen .inevio-logo.white').css('width'),
    'height': $('.login-screen .inevio-logo.white').css('height'),
    'left': initialMarginLeftLogo,
    'top': initialMarginTopLogo + initialTopLogo,
    'opacity' : '1'
  },1000,function(){
    menuMode = false;
    $(this).hide();
    $('.login-screen .inevio-logo').show();
  });

  $('.start .inevio-logo.dark').show().transition({
    'width': $('.login-screen .inevio-logo.white').css('width'),
    'height': $('.login-screen .inevio-logo.white').css('height'),
    'top': initialMarginTopLogo + initialTopLogo,
    'left': initialMarginLeftLogo,
    'opacity' : '0'
  },1000,function(){
    $(this).hide();
  });

  $('.menu-screen .header figure').hide();

  $('.menu-screen').transition({
    'bottom' : '-100%'
  },1000,function(){
    $(this).hide();
  });

})

.on( 'swipeleft', function(){

  if( menuMode ){
    menuSwipe(1);
  }

})

.on( 'swiperight', function(){

  if( menuMode ){
    menuSwipe(-1);
  }else{
    backButton.click();
  }

})

.on( 'swipeup', function(){

  if( !menuMode ){
    $('.more').click();
  }

})

.on( 'swipedown', function(){

  if( menuMode ){
    $('.less').click();
  }

});
