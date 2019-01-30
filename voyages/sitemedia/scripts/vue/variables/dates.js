// this is included but not used in the search; primarily for the full detail to display
var var_imp_arrival_at_port_of_dis = new YearVariable({
    varName: "imp_arrival_at_port_of_dis",
    label: "Year of arrival at port of disembarkation",
    description: "",
  },{
    op: "is equal to",
    searchTerm0: null,
    searchTerm1: null
  },{
    isImputed: true,
    isAdvanced: false
  });

var_length_middle_passage_days = new NumberVariable({
    varName: "length_middle_passage_days",
    label: "Middle passage",
    description: "",
  },{
    op: "is equal to",
    searchTerm0: null,
    searchTerm1: null
  },{
    isImputed: false,
    isadvanced: false
  });

var_voyage_began = new DateVariable({
    varName: "voyage_began",
    label: "Date that voyage began",
    description: "",
  },{
    op: "is equal to",
    searchTerm0: null,
    searchTerm1: null
  },{
    isImputed: true,
    isadvanced: false
  });

var_slave_purchase_began = new DateVariable({
    varName: "slave_purchase_began",
    label: "Date trade began in Africa",
    description: "",
  },{
    op: "is equal to",
    searchTerm0: null,
    searchTerm1: null
  },{
    isImputed: false,
    isadvanced: false
  });

var_date_departed_africa = new DateVariable({
    varName: "date_departed_africa",
    label: "Date vessel departed Africa",
    description: "",
  },{
    op: "is equal to",
    searchTerm0: null,
    searchTerm1: null
  },{
    isImputed: false,
    isadvanced: false
  });

var_first_dis_of_slaves = new DateVariable({
    varName: "first_dis_of_slaves",
    label: "Date vessel arrived with slaves",
    description: "",
  },{
    op: "is equal to",
    searchTerm0: null,
    searchTerm1: null
  },{
    isImputed: false,
    isadvanced: false
  });

var_departure_last_place_of_landing = new DateVariable({
    varName: "departure_last_place_of_landing",
    label: "Date vessel departed for homeport",
    description: "",
  },{
    op: "is equal to",
    searchTerm0: null,
    searchTerm1: null
  },{
    isImputed: false,
    isadvanced: false
  });

var_voyage_completed = new DateVariable({
    varName: "voyage_completed",
    label: "Date voyage completed",
    description: "",
  },{
    op: "is equal to",
    searchTerm0: null,
    searchTerm1: null
  },{
    isImputed: false,
    isadvanced: false
  });

var_imp_length_home_to_disembark = new NumberVariable({
    varName: "imp_length_home_to_disembark",
    label: "Voyage length, homeport to disembarkation",
    description: "",
  },{
    op: "is equal to",
    searchTerm0: null,
    searchTerm1: null
  },{
    isImputed: false,
    isadvanced: false
  });

dates = {
  overallDates: {
    var_imp_length_home_to_disembark: var_imp_length_home_to_disembark,
    var_length_middle_passage_days: var_length_middle_passage_days,
    count: {
      changed: 0,
      activated: 0,
    }
  },
  durationDates: {
    var_imp_arrival_at_port_of_dis: var_imp_arrival_at_port_of_dis,
    var_voyage_began: var_voyage_began,
    var_slave_purchase_began: var_slave_purchase_began,
    var_date_departed_africa: var_date_departed_africa,
    var_first_dis_of_slaves: var_first_dis_of_slaves,
    var_departure_last_place_of_landing: var_departure_last_place_of_landing,
    var_voyage_completed: var_voyage_completed,
    count: {
      changed: 0,
      activated: 0,
    }
  },
  count: {
    changed: 0,
    activated: 0,
  },
}
