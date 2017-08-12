$(document).ready(function () { 
  //show submenu and sub-submenu
  $('.menu').hoverIntent(function () {
     //show submenu
     $('.submenu').show();
     $('.menu a').addClass('active');	
     $('.submenu a').removeClass('active');
   }, 
   function () {
     //hide submenu
     $('.menu a').removeClass('active');	
     $('.submenu').hide();         
   }); 
  $('.submenu > li').hoverIntent(function(){      	 
    $(this).find('.sub-submenu').show();
    $(this).find('a').addClass('active-s');
    $('.sub-submenu a').removeClass('active-s');
  },
  function () {
  $('.submenu a').removeClass('active-s');
  $(this).find('.sub-submenu').hide();	
 });

  $('.sub-submenu li').hoverIntent(function(){
  $(this).find('a').css('color','#C37100'); 
  $(this).find('a').css('background', 'none');
       
 });	
  $('.submenu li:last-child').css('border-bottom','none'); 

  $('#review ul li:last-child').css('border-bottom','none'); 
  $('.news-and-events ul li:last-child').css('padding-bottom','none'); 

  /*****************Quicksand********************/
   $.fn.sorted = function(customOptions) {
    var options = {
     reversed: false,
     by: function(a) {
      return a.text();
    }
  };
  $.extend(options, customOptions);

  $datax = $(this);
  arr = $datax.get();
  arr.sort(function(a, b) {

    var valA = options.by($(a));
    var valB = options.by($(b));
    if (options.reversed) {
      return (valA < valB) ? 1 : (valA > valB) ? -1 : 0;				
    } else {		
      return (valA < valB) ? -1 : (valA > valB) ? 1 : 0;	
    }
  });
  return $(arr);
};
var read_button = function(class_names) {
  var r = {
    selected: false,
    type: 0
  };
  for (var i=0; i < class_names.length; i++) {
    if (class_names[i].indexOf('selected-') == 0) {
      r.selected = true;
    }
    if (class_names[i].indexOf('segment-') == 0) {
      r.segment = class_names[i].split('-')[1];
    }
  };
  return r;
};

var determine_sort = function($buttons) {
  var $selected = $buttons.parent().filter('[class*="selected-"]');
  return $selected.find('a').attr('data-value');
};

var determine_kind = function($buttons) {
  var $selected = $buttons.parent().filter('[class*="selected-"]');
  return $selected.find('a').attr('data-value');
};

var $preferences = {
  duration:800,
  easing: 'easeInOutQuad',
  adjustHeight: 'auto'
};

var $list = $('#list');
var $data = $list.clone();


var $controls = $('.splitter');

$controls.each(function(i) {

  var $control = $(this);
  var $buttons = $control.find('a');

  $buttons.bind('click', function(e) {

    var $button = $(this);
    var $button_container = $button.parent();
    var button_properties = read_button($button_container.attr('class').split(' '));      
    var selected = button_properties.selected;
    var button_segment = button_properties.segment;

    if (!selected) {

      $buttons.parent().removeClass('selected-0').removeClass('selected-1').removeClass('selected-2').removeClass('selected-3').removeClass('selected-4').removeClass('selected-5');
      $button_container.addClass('selected-' + button_segment);

      var sorting_type = determine_sort($controls.eq(1).find('a'));
      var sorting_kind = determine_kind($controls.eq(0).find('a'));

      if (sorting_kind == 'all') {
        var $filtered_data = $data.find('li');
      } else {
        var $filtered_data = $data.find('li.' + sorting_kind);
      }

      if (sorting_type == 'size') {
        var $sorted_data = $filtered_data.sorted({
          by: function(v) {
            return parseFloat($(v).find('span').text());
          }
        });
      } else {
        var $sorted_data = $filtered_data.sorted({
          by: function(v) {
            return $(v).find('strong').text().toLowerCase();
          }
        });
      }

      $list.quicksand($sorted_data, $preferences, function() {
         $(".group1").colorbox({rel:'group1'});
         $(".group2").colorbox({rel:'group2'});
         $.fn.hoverImage();
         $.fn.hoverBigImage();
     });
    }
    e.preventDefault();
  });

}); 

var high_performance = true;  
var $performance_container = $('#performance-toggle');
var $original_html = $performance_container.html();

$performance_container.find('a').live('click', function(e) {
  if (high_performance) {
    $preferences.useScaling = false;
    $performance_container.html('CSS3 scaling turned off. Try the demo again. <a href="#toggle">Reverse</a>.');
    high_performance = false;
  } else {
    $preferences.useScaling = true;
    $performance_container.html($original_html);
    high_performance = true;
  }
  e.preventDefault();
});
/*********************Hover image**************************/ 
$.fn.hoverImage =function(){
  $(".cake-tumb").hoverIntent(function(){
    $(this).find("img").fadeTo(200, 0.5); 
     $(this).css('border','1px solid #e7dbb2')  
  },    
  function(){
     $(this).find("img").fadeTo(200, 1.0); 
     $(this).css('border','1px solid #f0f1f1')    
  });    
};
 $.fn.hoverImage();

$.fn.hoverBigImage = function(){
  $(".cake-tumb-big").hoverIntent(function(){
    $(this).find("img").fadeTo(200, 0.5); 
     $(this).css('border','1px solid #e7dbb2')  
  },    
  function(){
     $(this).find("img").fadeTo(200, 1.0); 
     $(this).css('border','1px solid #f0f1f1')    
  });    
};
 $.fn.hoverBigImage(); 
   
$(".blog-tumb-medium").hoverIntent(function(){
    $(this).find("img").fadeTo(200, 0.5); 
     $(this).css('border','1px solid #e7dbb2')  
  },    
  function(){
     $(this).find("img").fadeTo(200, 1.0); 
     $(this).css('border','1px solid #f0f1f1')    
  });   
   
$(".image").hoverIntent(function(){
    $(this).find('img').animate({
      width: "145px",
      height: "33px"        
    },500 );  
    $(this).find('span').delay(100).fadeIn();
  },
  function(){
    $(this).find('img').animate({
      width: "80px",
      height: "33px"        
    },500);  
    $(this).find('span').fadeOut();
});

});
