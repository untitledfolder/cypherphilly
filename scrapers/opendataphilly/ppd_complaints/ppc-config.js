exports.datagroup = {
  name: "Philadelphia Police Complaints",
  label: "PhiladelphiaPoliceComplaints",
  key: "philadelphia_police_complaints",
  description: "Group description goes here",
  datasets: [
    {
      name: "Complaint",
      label: "PPCComplaint",
      key: "complaint",
      description: "Complaint description",
      source: "https://phl.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20ppd_complaints",
      processor: "scrapers/opendataphilly/ppd_complaints/ppd_complaints-scraper.sh",
      test: {
        file: "test/fixtures/ppc.complaints.one-example.data",
        expected: ""
      },
      id: "cartodb_id",
      keys: [
        {
          title: "ID",
          key: "cartodb_id"
        },
        {
          title: "Geom",
          key: "the_geom"
        },
        {
          title: "Geom Webmercator",
          key: "the_geom_webmercator"
        },
        {
          title: "CAP Number",
          key: "cap_number"
        },
        {
          title: "Date Received",
          key: "date_received"
        },
        {
          title: "Distance",
          key: "dist_occurrence"
        },
        {
          title: "Classification",
          key: "general_cap_classification"
        },
        {
          title: "Summary",
          key: "summary"
        }
      ]
    },
    {
      name: "Finding",
      label: "PPCFinding",
      key: "finding",
      description: "Finding description",
      source: "https://phl.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20ppd_complaint_disciplines",
      processor: "scrapers/opendataphilly/ppd_complaints/ppd_disciplines-scraper.sh",
      test: {
        file: "test/fixtures/ppc.disciplines.one-example.data",
        expected: ""
      },
      id: "cartodb_id",
      keys: [
        {
          title: "ID",
          key: "cartodb_id"
        },
        {
          title: "Geom",
          key: "the_geom"
        },
        {
          title: "Geom Webmercator",
          key: "the_geom_webmercator"
        },
        {
          title: "CAP Number",
          key: "cap_number"
        },
        {
          title: "Initials",
          key: "po_initials"
        },
        {
          title: "Race",
          key: "po_race"
        },
        {
          title: "Sex",
          key: "po_sex"
        },
        {
          title: "Allegations Investigated",
          key: "allegations_investigated"
        },
        {
          title: "Investigation Findings",
          key: "investigative_findings"
        },
        {
          title: "Disciplinary Findings",
          key: "disciplinary_findings"
        }
      ]
    },
    {
      name: "Complainant",
      label: "PPCComplainant",
      key: "complainant",
      description: "Complainant description",
      source: "https://phl.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20ppd_complaint_complainants",
      processor: "scrapers/opendataphilly/ppd_complaints/ppd_complainants-scraper.sh",
      test: {
        file: "test/fixtures/ppc.complainants.one-example.data",
        expected: ""
      },
      id: "cartodb_id",
      keys: [
        {
          title: "ID",
          key: "cartodb_id"
        },
        {
          title: "Geom",
          key: "the_geom"
        },
        {
          title: "Geom Webmercator",
          key: "the_geom_webmercator"
        },
        {
          title: "CAP Number",
          key: "cap_number"
        },
        {
          title: "ex",
          key: "complainant_sex"
        },
        {
          title: "Race",
          key: "complainant_race"
        },
        {
          title: "Age",
          key: "complainant_age"
        },
        {
          title: "Initials",
          key: "complainant_initials"
        }
      ]
    }
  ]
};
