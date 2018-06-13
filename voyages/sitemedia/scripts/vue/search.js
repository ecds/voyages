var searchTerms = [
  RangeSearchTerm(new VariableInfo('voyage_id', 'ship_nation_owners', 'Voyage ID'), '', null, 'Voyage id help text'),
  TextSearchTerm(new VariableInfo('intra_american_voyage', 'ship_nation_owners', 'Is I-Am voyage?'), 'equals', null, 'Type true or false.', minLengthValidator(4)),
  TextSearchTerm(new VariableInfo('ship_name', 'ship_nation_owners', 'Vessel Name'), 'contains', null, 'Please type one or more words (or even partial words) that should appear in the name of the vessel. The search is case insensitive.', minLengthValidator(3)),
  TextSearchTerm(new VariableInfo('owner', 'ship_nation_owners', 'Vessel Owners'), 'contains', null, 'Look for names of slave vessel owners.', minLengthValidator(3)),
  PlaceSearchTerm(new VariableInfo('imp_port_voyage_begin_idnum', 'itinerary', 'Place voyage began*'), 'is one of', null, 'Select the places where voyages began.', null),
  PlaceSearchTerm(new VariableInfo('imp_principal_place_of_slave_purchase_idnum', 'itinerary', 'Principal place of slave purchase*'), 'is one of', null, 'help text.', null),
  PlaceSearchTerm(new VariableInfo('imp_principal_port_slave_dis_idnum', 'itinerary', 'Principal place of slave landing*'), 'is one of', null, 'help text.', null),
  PlaceSearchTerm(new VariableInfo('place_voyage_ended_idnum', 'itinerary', 'Place voyage ended'), 'is one of', null, 'Select the places where voyages ended.', null),
  RangeSearchTerm(new VariableInfo(YEAR_RANGE_VARNAME, 'dates', 'Year arrived with slaves*'), '', null, 'The imputed year in which the ship arrived with slaves at the first? port of disembarkation', dateRangeValidation),
  TextSearchTerm(new VariableInfo('captain', 'captain_crew', 'Captain\'s Name'), 'contains', null, 'Look for names of slave vessel captains.', minLengthValidator(3)),
  RangeSearchTerm(new VariableInfo('imp_total_num_slaves_purchased', 'numbers', 'Total slaves embarked*'), '', null, 'total_slaves_embarked help text', null, 3),
  RangeSearchTerm(new VariableInfo('imp_total_slaves_disembarked', 'numbers', 'Total slaves disembarked*'), '', null, 'total_slaves_disembarked help text', null, 3),
  RangeSearchTerm(new VariableInfo('year_range', 'numbers', 'Year range of your search'), '', null, 'year_range help text', null, 3),
  TextSearchTerm(new VariableInfo('sources_plaintext_search', 'source', 'Source'), 'contains', null, 'Please type one or more words (or even partial words) that should appear in the source references for the voyage. The search is case insensitive.', minLengthValidator(3)),
];

var searchTermsDict = {};
for (var i = 0; i < searchTerms.length; ++i) {
  var item = searchTerms[i];
  searchTermsDict[item.varName] = item;
}

var categoryNames = [
  "Year Range",
  "Ship, Nation, Owners",
  "Itinerary",
  "Slave",
  "Dates",
  "Captain and Crew",
  "Outcome",
  "Source",
];

var allColumns = [
  // year range
  {
    data: "var_" + YEAR_RANGE_VARNAME,
    category: 0,
    header: "Year arrived with slaves*",
    isImputed: false,
  },

  // ship nation owner
  { data: "var_voyage_id", category: 1, header: "Voyage ID", isImputed: false },
  { data: "var_ship_name_plaintext", category: 1, header: "Vessel Name", isImputed: false },
  { data: "var_owner_plaintext", category: 1, header: "Vessel Owner", "visible": false, isImputed: false },
  { data: "var_year_of_construction", category: 1, header: "Year Constructed", "visible": false, isImputed: false },
  { data: "var_vessel_construction_place_idnum", category: 1, header: "Place Constructed", "visible": false, isImputed: false },
  { data: "var_registered_year", category: 1, header: "Year Registered", "visible": false, isImputed: false },
  { data: "var_registered_place_idnum", category: 1, header: "Place Registered", "visible": false, isImputed: false },
  { data: "var_nationality", category: 1, header: "Flag", "visible": false, isImputed: false },
  { data: "var_imputed_nationality", category: 1, header: "Flag Imputed", "visible": false, isImputed: true },
  { data: "var_rig_of_vessel", category: 1, header: "Rig of Vessel", "visible": false, isImputed: true },
  { data: "var_tonnage", category: 1, header: "Tonnage", "visible": false, isImputed: false },
  { data: "var_tonnage_mod", category: 1, header: "Standardized Tonnage", "visible": false, isImputed: true },
  { data: "var_guns_mounted", category: 1, header: "Guns Mounted", "visible": false, isImputed: false },

  // itinerary
  { data: "var_imp_port_voyage_begin", category: 2, header: "Place where Voyage Began", isImputed: true },
  { data: "var_imp_principal_place_of_slave_purchase", category: 2, header: "Principal Place of Purchase", isImputed: true },
  { data: "var_first_place_slave_purchase", category: 2, header: "1st Place of Purchase", "visible": false, isImputed: false },
  { data: "var_second_place_slave_purchase", category: 2, header: "2nd Place of Purchase", "visible": false, isImputed: false },
  { data: "var_third_place_slave_purchase", category: 2, header: "3rd Place of Purchase", "visible": false, isImputed: false },
  { data: "var_port_of_call_before_atl_crossing", category: 2, header: "Places of Call before Atlantic Crossing", "visible": false, isImputed: false },
  { data: "var_imp_principal_port_slave_dis", category: 2, header: "Principal Place of Slave Landing", isImputed: true },
  { data: "var_first_landing_place", category: 2, header: "1st Place of Slave Landing", "visible": false, isImputed: false },
  { data: "var_second_landing_place", category: 2, header: "2nd Place of Slave Landing", "visible": false, isImputed: false },
  { data: "var_third_landing_place", category: 2, header: "3rd Place of Slave Landing", "visible": false, isImputed: false },
  { data: "var_place_voyage_ended", category: 2, header: "Place where Voyage Ended", "visible": false, isImputed: false },

  // slaves
  { data: "var_imp_total_num_slaves_purchased", category: 3, header: "Total Slaves Embarked Imputed", "visible": false, isImputed: true },
  { data: "var_total_num_slaves_purchased", category: 3, header: "Total Slaves Embarked", "visible": false, isImputed: false },
  { data: "var_imp_total_slaves_disembarked", category: 3, header: "Total Slaves Disembarked Imputed", "visible": false, isImputed: true },
  { data: "var_num_slaves_intended_first_port", category: 3, header: "Number of Slaves Intended at First Place of Purchase", "visible": false, isImputed: false },
  { data: "var_num_slaves_carried_first_port", category: 3, header: "Slaves Carried from 1st Port of Purchase", "visible": false, isImputed: false },
  { data: "var_num_slaves_carried_second_port", category: 3, header: "Slaves Carried from 2nd Port of Purchase", "visible": false, isImputed: false },
  { data: "var_num_slaves_carried_third_port", category: 3, header: "Slaves Carried from 3rd Port of Purchase", "visible": false, isImputed: false },
  { data: "var_total_num_slaves_arr_first_port_embark", category: 3, header: "Number of Slaves Arriving at 1st Place of Landing", isImputed: false },
  { data: "var_num_slaves_disembark_first_place", category: 3, header: "Number of Slaves Disembarked at 1st Place of Landing", "visible": false, isImputed: false },
  { data: "var_num_slaves_disembark_second_place", category: 3, header: "Number of Slaves Disembarked at 2nd Place of Landing", "visible": false, isImputed: false },
  { data: "var_num_slaves_disembark_third_place", category: 3, header: "Number of Slaves Disembarked at 3rd Place of Landing", "visible": false, isImputed: false },
  { data: "var_imputed_percentage_men", category: 3, header: "Percentage Men", "visible": false, isImputed: true },
  { data: "var_imputed_percentage_women", category: 3, header: "Percentage Women", "visible": false, isImputed: true },
  { data: "var_imputed_percentage_boys", category: 3, header: "Percentage Boys", "visible": false, isImputed: true },
  { data: "var_imputed_percentage_girls", category: 3, header: "Percentage Girls", "visible": false, isImputed: true },
  { data: "var_imputed_percentage_male", category: 3, header: "Percentage Males", "visible": false, isImputed: true },
  { data: "var_imputed_percentage_child", category: 3, header: "Percentage Children", "visible": false, isImputed: true },
  { data: "var_imputed_sterling_cash", category: 3, header: "Sterling Cash Price in Jamaica", "visible": false, isImputed: true },
  { data: "var_imputed_death_middle_passage", category: 3, header: "Slave Deaths during Middle Passage", "visible": false, isImputed: true },
  { data: "var_imputed_mortality", category: 3, header: "Mortality Rate", "visible": false, isImputed: true },


  // dates
  { data: "var_length_middle_passage_days", category: 4, header: "Middle Passage (days)", "visible": false, isImputed: true },
  { data: "var_imp_length_home_to_disembark", category: 4, header: "Voyage Length, Homeport to Slaves Landing (days)", "visible": false, isImputed: true },
  { data: "var_voyage_began", category: 4, header: "Year Voyage Began", "visible": false, isImputed: false },
  { data: "var_slave_purchase_began", category: 4, header: "Year Trade Began in Africa", "visible": false, isImputed: false },
  { data: "var_date_departed_africa", category: 4, header: "Year Vessel Departed Africa", "visible": false, isImputed: false },
  { data: "var_first_dis_of_slaves", category: 4, header: "Year Vessel Arrived with Slaves", "visible": false, isImputed: false },
  { data: "var_departure_last_place_of_landing", category: 4, header: "Year Vessel Departed for Homeport", "visible": false, isImputed: false },
  { data: "var_voyage_completed", category: 4, header: "Year Voyage Completed", "visible": false, isImputed: false },

  // captain and crew
  { data: "var_captain_plaintext", category: 5, header: "Captain's Name", isImputed: false },
  { data: "var_crew_voyage_outset", category: 5, header: "Crew at Voyage Outset", "visible": false, isImputed: false },
  { data: "var_crew_first_landing", category: 5, header: "Crew at First Landing of Slaves", "visible": false, isImputed: false },
  { data: "var_crew_died_complete_voyage", category: 5, header: "Crew Deaths during Voyage", "visible": false, isImputed: false },

  // outcome
  { data: "var_outcome_voyage", category: 6, header: "Particular Outcome of Voyage", "visible": false, isImputed: false },
  { data: "var_outcome_slaves", category: 6, header: "Outcome of Voyage for Slaves", "visible": false, isImputed: true },
  { data: "var_outcome_ship_captured", category: 6, header: "Outcome of Voyage if Ship Captured", "visible": false, isImputed: true },
  { data: "var_outcome_owner", category: 6, header: "Outcome of Voyage for Owner", "visible": false, isImputed: true },
  { data: "var_resistance", category: 6, header: "African Resistance", "visible": false, isImputed: false },

  // sources
  {
    data: "var_sources",
    category: 7,
    header: "Sources",
    "visible": false,
    render: function ( data ) {
      var sourceString = "";
      var count = 0;
      if (data !== null) {
        data.forEach(function(source) {
          count += 1;
          var elements = source.split("<>");
          // var postfix = data.length == count ? "" : ";";
          var postfix = "";
          sourceString += "<span data-toggle='tooltip' data-placement='top' data-html='true' title='" + elements[1] + "'>" + elements[0] + postfix + " </span><br/>";
        });
      }
      return sourceString;
    },
    isImputed: false,
  },
];


var categories = $.map(categoryNames, function(name) {
  return {
    name: name,
    columns: []
  };
});

allColumns.forEach(function(c, index) {
  categories[c.category].columns.push({
    extend: 'columnToggle',
    text: c.header,
    columns: index,
  });

  // add render function to customize the display of imputed variables
  if (c.isImputed) {
    c.title = "<span class='imputed-result'>" + c.header + "</span>"; // italicized column title
    c.render = function(data) {
      var formatedString = "";
      if (data !== null) {
        formattedString = "<span class='imputed-result'>" + data + "</span>";
      } else {
        formattedString = data
      }
      return formattedString;
    };
  }
});

var columnToggleMenu = {
  extend: 'collection',
  text: 'Configure Columns',
  titleAttr: 'Configure visible columns',
  className: 'btn btn-info buttons-collection dropdown-toggle',
  buttons: $.map(categories, function(category) {
    return category.columns.length == 1 && category.columns[0].text === category.name ?
      category.columns[0] :
      {
        extend: 'collection',
        text: category.name,
        buttons: category.columns
      };
  })
};

var pageLength = {
  extend: 'pageLength',
  className: 'btn btn-info buttons-collection dropdown-toggle',
};

// TEMP Yang: I think this method and possibly this entire file must be removed
// right? Are you using something from here??
function search(query, activeSearchTerms) {
  var query = query;

  // replace this with the searchAll function
  if (activeSearchTerms.length == 0) {
    activeSearchTerms = jQuery.map(query, function(val, id) {
      if (val.hasChanged) {
        var term = searchTermsDict[val.varName];
        // Here we allow custom search types to generate their backend terms.
        var backendSearchTerm = term.hasOwnProperty('getBackendSearchTerm') ?
          term.getBackendSearchTerm() :
          term.getSearchTerm();

        // return { varName: term.varName, op: term.operatorLabel, searchTerm: backendSearchTerm };
        return {
          varName: term.varName,
          op: val.current.op,
          searchTerm: val.current.searchTerm
        };
      }
    });
  }

  // var activeSearchTerms = function(query) {
  // 	var term = searchTermsDict[id];
  // 	// Here we allow custom search types to generate their backend terms.
  // 	var backendSearchTerm = term.hasOwnProperty('getBackendSearchTerm')
  // 		? term.getBackendSearchTerm()
  // 		: term.getSearchTerm();
  // 	return { varName: term.varName, op: term.operatorLabel, searchTerm: backendSearchTerm };
  // }

  var currentSearchObj = {
    items: activeSearchTerms,
    orderBy: []
  };
  // Store current search on session storage.
  var searchState = {
    currentSearchObj: currentSearchObj,
    searchTerms: jQuery.map(["voyage_id"], function(id) {
      return searchTermsDict[id].serialize();
    }),
    yearRange: "1514 - 1866"
  };
  var serializedSearch = JSON.stringify(searchState);
  sessionStorage.setItem('searchState', serializedSearch);
  // Check if this is a new search
  var d = new Date();
  var isRepeat = false;
  var searchHistory = [];
  searchHistory.some(function(h) {
    isRepeat = h.search == serializedSearch;
    if (isRepeat) {
      h.date = d;
    }
    return isRepeat;
  });
  if (!isRepeat) {
    var label = ["voyage_id"];
    searchHistory.push({
      label: label == '' ? '*' : label,
      search: serializedSearch,
      date: d
    });
  }
  sessionStorage.setItem('searchHistory', JSON.stringify(searchHistory));

  if ($.fn.DataTable.isDataTable('#results_main_table')) {
    $('#results_main_table').DataTable().destroy();
  }

  var mainDatatable = $('#results_main_table').DataTable({
    ajax: {
      url: "876167cf-bc40-44f7-9557-ee8117d94008/beta_ajax_search",
      type: 'POST',
      data: function(d) {
        if (d.order) {
          currentSearchObj.orderBy = $.map(d.order, function(item) {
            var columnIndex = mainDatatable ?
              mainDatatable.colReorder.order()[item.column] :
              item.column;
            return {
              name: allColumns[columnIndex].data.substring(4),
              direction: item.dir
            };
          });
        }

        // TEMP Yang: I don't think this is the right place for this code...
        // Besides, I think that this is attaching multiple handlers for
        // the click, which is inefficient.
        $('#results_main_table').on( 'click', 'tr', function () {
            searchBar.row.data = mainDatatable.row( this ).data();
        });

        // console.log(JSON.stringify({ searchData: currentSearchObj, tableParams: d, output: 'resultsTable' }))
        return JSON.stringify({
          searchData: currentSearchObj,
          tableParams: d,
          output: 'resultsTable'
        });
      }
    },


    // dom: 'ifrtBp',
    dom:  "<'flex-container'iB>" +
          "<'row'<'col-sm-12'tr>>" +
          "<'row'<'col-sm-5'><'col-sm-7'p>>",
    lengthMenu: [
      [20, 30, 50, 100],
      ['20 rows', '30 rows', '50 rows', '100 rows']
    ],

    buttons: [
      columnToggleMenu,
      pageLength,
      // {
      //   extend: 'collection',
      //   // text: '<span class="fa fa-columns" style="vertical-align: middle;"></span>',
      //   className: 'btn btn-info buttons-collection dropdown-toggle',
      //   text: 'Download',
      //   titleAttr: 'Download results',
      //   buttons: [
      //     // {
      //     // 	text: 'CSV - not implemented',
      //     // 	action: function() { alert('not implemented yet'); },
      //     // },
      //     {
      //       text: 'Excel',
      //       action: function() {
      //         var visibleColumns = $.map($.makeArray(mainDatatable.columns().visible()), function(visible, index) {
      //           return visible ? allColumns[index].data : undefined;
      //         });
      //         var form = $("<form action='876167cf-bc40-44f7-9557-ee8117d94008/beta_ajax_download' method='post'>{% csrf_token %}</form>");
      //         form.append($("<input name='data' type='hidden'></input>").attr('value', JSON.stringify({
      //           searchData: currentSearchObj,
      //           cols: visibleColumns
      //         })));
      //         form.appendTo('body').submit().remove();
      //       },
      //     }
      //   ]
      // }
    ],
    //pagingType: "input",
    bFilter: false,
    processing: true,
    serverSide: true,
    columns: allColumns,
    stateSave: true,
    stateDuration: -1,
    colReorder: true,
    initComplete: function() {
      $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      })
    }
  });



  // console.log(activeSearchTerms);

  // var $yearRange = $("#year_range");
  //
  // // Check if the user explicitly specified the year search.
  // var hasYearSearch = activeSearchTerms.some(function(t) {
  // 	var match = t.varName == YEAR_RANGE_VARNAME;
  // 	if (match) {
  // 		var range = t.searchTerm;
  // 		range = [range[0], range[1] || range[0]];
  // 		$yearRange.val(range[0] + ' - ' + range[1]);
  // 		$yearRange.change();
  // 	}
  // 	return match;
  // });
  //
  // if (!hasYearSearch) {
  // 	// Add year range to search.
  // 	var yearRange = $yearRange.val().split('-');
  // 	if (yearRange.length == 2) {
  // 		var first = parseInt(yearRange[0]);
  // 		var last = parseInt(yearRange[1]);
  // 		if (!isNaN(first) && !isNaN(last)) {
  // 			activeSearchTerms.push({varName: YEAR_RANGE_VARNAME, op: 'is between', searchTerm: [first, last]});
  // 		}
  // 	}
  // }
  //
  // currentSearchObj = {items: activeSearchTerms, orderBy: []};
  // // Store current search on session storage.
  // var searchState = {
  // 	currentSearchObj: currentSearchObj,
  // 	searchTerms: jQuery.map($('#current_search').val(), function(id) { return searchTermsDict[id].serialize(); }),
  // 	yearRange: $("#year_range").val()
  // };
  //
  // var serializedSearch = JSON.stringify(searchState);
  //
  // sessionStorage.setItem('searchState', serializedSearch);
  // // Check if this is a new search
  // var d = new Date();
  // var isRepeat = false;
  // searchHistory.some(function(h) {
  // 	isRepeat = h.search == serializedSearch;
  // 	if (isRepeat) {
  // 		h.date = d;
  // 	}
  // 	return isRepeat;
  // });
  // if (!isRepeat) {
  // 	var label = $('#current_search').val();
  // 	searchHistory.push({ label: label == '' ? '*' : label, search: serializedSearch, date: d });
  // }
  // sessionStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  // updateHistory();
  // searchCallback();
}
