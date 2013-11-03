$(document).ready(function(){

  // show links
  $('#links').delay(200).animate({ 'opacity' : '1' }, 'slow', 'easeOutCirc', function(){
    // change opacity of first icon and make it selected
    $('.info.link').addClass('is-selected');
    $('.background').addClass('is-opacified');
  });
  
  // show popup
  $('#popup_container').delay(800).animate({'opacity' : '1' }, 'slow', 'easeOutCirc', function(){
    $('.popup').css('height', $('.popup').height());
  });
  
  // change sections 
  $('#links a, .next').click(function(){ // remove .not
  
    // handle the current link
    $('.is-selected').removeClass('is-selected');
    
    // find out if its links or next was clicked
    if( $(this).is('#links a')){
      var clickedId = $(this).attr('id').replace('_link', '');
      $(this).addClass('is-selected'); 
    } else {
      var clickedId = $('.is-current.section').next('.section').attr('id');
      $('#' + clickedId + '_link').addClass('is-selected');
    }       
    
    //change the section
    $('.section.is-current').fadeOut('fast', function(){
      var clickSection = $('#' + clickedId);
      var sectionHeight = clickSection.height();
      
      if( $(this).is('#twitter') ) { // tweet out animation
        $('#tweet').animate({'top' : '+=20px'}, 'fast', 'easeInQuad').delay(200).animate({'top' : '400px',  'opacity' : '0'}, 'slow', 'easeInCirc', function(){
          $('.popup').animate({'height' : sectionHeight + 'px'}, 'fast', function(){
            clickSection.fadeIn('slow').addClass('is-current');
          });
          $(this).css({'top' : '-220px', 'opacity' : '1'});
        });
      } else if( clickSection.is('#twitter') ){ // tweet in animation
        $('.popup').animate({'height' : '60px' }, 'fast', function(){
          clickSection.fadeIn('slow').addClass('is-current');
          showTweet();
        });
      } else {
        $('.popup').animate({'height' : sectionHeight + 'px'}, 'fast', function(){
          clickSection.fadeIn('slow').addClass('is-current');
        });
      }
    }).removeClass('is-current');
  });
  
  // populate the dribble slides
  $.jribbble.getShotsByPlayerId('andrewliebchen', function (playerShots) {
      var html = [];
  
      $.each(playerShots.shots, function (i, shot) {
        html.push('<li class="shot">');
          html.push('<a href="' + shot.url + '" target="_blank">' + shot.title + '<br><i>view on Dribbble</i></a>');
          html.push('<img src="' + shot.image_url + '" alt="' + shot.title + '">');
          html.push('</li>');
          
      });
  
      $('#dribbble_slider').html(html.join(''));
      $('.shot:nth-child(5)').addClass('is-current');
  }, {page: 1, per_page: 5});
  
  // change dribbble slide
  $('#dribbble_click').click(function(){
    $('.shot.is-current').animate({'top' : '295px'}, 600, 'easeOutQuad', function(){
      if( $(this).is('.shot:first-child') ){
        reloadDribble();
      }
    }).removeClass('is-current').prev('.shot').addClass('is-current');
  });
  
  // reload the dribbble slides 
  function reloadDribble(){
    var shotCount = 0;
    $('.shot').delay(100).each(function(){
      var shotTop = shotCount * 3;
      var shotDelay = shotCount * 200;
      $(this).delay(shotDelay).animate({'top' : shotTop + 'px'}, 'slow', 'easeInQuad');
      shotCount++;
    });
    $('.shot:nth-child(5)').addClass('is-current');
  }
  
  // show the current Tweet
  function showTweet(){
    var tweetHeight = 200; // height of the tweet slip
    var tweetTotal = 6; // how many loops it takes to get the slip out
    var heightInterval = tweetHeight / tweetTotal;
    var tweetCount = 0;
    
    $('#tweet').show();
    while( tweetCount < tweetTotal ){
      $('#tweet').delay(200).animate({'top' : '+=' + heightInterval + 'px'}, 'fast');
      tweetCount++;
    }
  }
});
