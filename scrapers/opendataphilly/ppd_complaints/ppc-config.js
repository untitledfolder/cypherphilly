exports.datagroup = {
  dataGroupName: "Philadelphia Police Complaints",
  dataGroupLabel: "PhiladelphiaPoliceComplaints",
  dataGroupAPI: "/philadelphia_police_complaints",
  datasets: [
    {
      name: "Complaint",
      label: "PPCComplaint",
      source: "https://phl.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20ppd_complaints",
      processor: "scrapers/opendataphilly/ppd_complaints/ppd_complaints-scraper.sh",
      test: {
        file: "test/fixtures/ppc.complaints.one-example.data",
        expected: ""
      },
      api: "/complaint",
      id: "cartodb_id",
      keys: [
        "cartodb_id",
        "the_geom",
        "the_geom_webmercator",
        "cap_number",
        "date_received",
        "dist_occurrence",
        "general_cap_classification",
        "summary"
      ]
    },
    {
      name: "Finding",
      label: "PPCFinding",
      source: "https://phl.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20ppd_complaint_disciplines",
      processor: "scrapers/opendataphilly/ppd_complaints/ppd_disciplines-scraper.sh",
      test: {
        file: "test/fixtures/ppc.disciplines.one-example.data",
        expected: ""
      },
      api: "/finding",
      id: "cartodb_id",
      keys: [
        "cartodb_id",
        "the_geom",
        "the_geom_webmercator",
        "cap_number",
        "po_initials",
        "po_race",
        "po_sex",
        "allegations_investigated",
        "investigative_findings",
        "disciplinary_findings"
      ]
    },
    {
      name: "Complainant",
      label: "PPCComplainant",
      source: "https://phl.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20ppd_complaint_complainants",
      processor: "scrapers/opendataphilly/ppd_complaints/ppd_complainants-scraper.sh",
      test: {
        file: "test/fixtures/ppc.complainants.one-example.data",
        expected: ""
      },
      api: "/complainant",
      id: "cartodb_id",
      keys: [
        "cartodb_id",
        "the_geom",
        "the_geom_webmercator",
        "cap_number",
        "complainant_sex",
        "complainant_race",
        "complainant_age",
        "complainant_initials"
      ]
    }
  ]
};
