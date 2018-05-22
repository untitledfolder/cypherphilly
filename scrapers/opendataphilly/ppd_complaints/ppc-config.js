exports.datagroup = {
  dataGroupName: "Philadelphia Police Complaints",
  dataGroupLabel: "PhiladelphiaPoliceComplaints",
  datasets: [
    {
      name: "Complaint",
      label: "PPCComplaint",
      source: "https://phl.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20ppd_complaints",
      processor: "scrapers/opendataphilly/ppd_complaints/ppd_complaints-scraper.sh",
      test: {
        file: "test/fixtures/ppc.complaints.one-example.data",
        expected: ""
      }
    },
    {
      name: "Discipline",
      label: "PPCDiscipline",
      source: "https://phl.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20ppd_complaint_disciplines",
      processor: "scrapers/opendataphilly/ppd_complaints/ppd_disciplines-scraper.sh",
      test: {
        file: "test/fixtures/ppc.disciplines.one-example.data",
        expected: ""
      }
    },
    {
      name: "Finding",
      label: "PPCFinding",
      test: {
      }
    }
  ]
};
