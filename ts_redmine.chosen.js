/*##########################
  基于chosen插件实现
##########################*/

$(document).ready(function() {
  /*
   * chosens managements
   */
  window.redmine_chosens = {};

  var ensure_chosen = function(name1) {
    // create chosen
    var orig_selector = $("select[name='" + name1 + "']");
    // return if already inited.
    if (orig_selector.length > 1) { return false; }

    // change all default as multiple
    orig_selector.attr('multiple', 'multiple').hide();

    var fake_selector = orig_selector.clone();
    orig_selector.after(fake_selector);

    // and modiy css
    var fake_selector_width = orig_selector.find('option[selected=selected]').length || 1;
    fake_selector.chosen({width: '' + fake_selector_width * 85 + 'px'});
    var chosen_container = fake_selector.siblings('.chosen-container');
    chosen_container.css('position', 'absolute'); // .css('left', '360px');
    var chosen_drop = chosen_container.find('.chosen-drop');

    var adjust_width = function() {
      var width = 0;
      if (!chosen_container.hasClass('chosen-container-single')) {
         width = chosen_container.find('ul li.search-choice').length;
      }
      width = (width < 5) ? 5 : width;
      chosen_container.css('width', '' + width * 85 + 'px');
      chosen_container.closest("tr").css("height", "60px");
    };

    // and bind event at last.
    fake_selector.on('change', function(evt, params) {
      orig_selector.val(params.selected);
      adjust_width();
    });

    // Fix dropdown menu's css
    fake_selector.on('chosen:ready', function(evt, params) {
      chosen_drop.hide();
      adjust_width();
    });
    fake_selector.on('chosen:showing_dropdown', function(evt, params) {
      adjust_width();
      chosen_drop.show().css('position', 'relative');
    });
    fake_selector.on('chosen:hiding_dropdown', function(evt, params) {
      chosen_drop.hide();
    });

    // Fix index's css
    setTimeout(function() {
      fake_selector.trigger('chosen:ready');
    }, 100);
    //chosen_container.find('li.search-field input').focus();
  };

    var chosen_items = new Array();
    var get_chosen_items = function() {
      $('select').each(function(){
        var item = $(this);
        var item_name = item.attr("name");
        if (item_name) {
          chosen_items.push(item_name);
        }
      });
    };

  // 1. chosen show
  redmine_chosens.show = {};
  redmine_chosens.show.func = function() {
    //ensure_chosen('issue[assigned_to_id]');
    /*$('select').each(function() {
	var item = $(this);
	if(item.attr("name")) {
	    ensure_chosen((item.attr["name"]).toString());
	}
    });*/

    for (var i = chosen_items.length - 1; i >= 0; i--) {
      ensure_chosen(chosen_items[i].toString()); 
    }

  };

  // only execute when edit or new an issue
  if ( window.location.pathname.match(/\/issues\/(new|[0-9]+)/) ) {
    // Reenable chosen when reload form.
    // The reason is <select updateIssueFrom('/redmine/projects/17zuoye-junior/issues/new.js?id=2739')>
    redmine_chosens.show.task = setInterval(function() {
      chosen_items.length = 0; //清空數組
      get_chosen_items();
      redmine_chosens.show.func();
    }, 1000);
  }

  // 2. chosen index
  redmine_chosens.index = {};
  redmine_chosens.index.func = function() {
    $.each("assigned_to_id author_id".split(' '), function(idx, name1) {
      ensure_chosen('v[' + name1 + '][]');
      $("table#filters-table").on("change select[name='op[" + name1 + "]']", function(evt, params) {
        // console.log('filters-table', params); // filters-table Object {deselected: "109"} 
        $(evt.target).closest("td.operator").siblings("td.values").find("span").show().find('select').hide();
      });
    });
  };

  if ( window.location.pathname.match(/\/issues/) ) {
    redmine_chosens.index.task = setInterval(function() {
      redmine_chosens.index.func();
    }, 1000);
  }

});
