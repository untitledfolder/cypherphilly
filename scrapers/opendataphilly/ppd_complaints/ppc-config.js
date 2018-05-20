exports.datagroup = {
  dataGroupsName: "Philadelphia Police Complaints",
  dataGroupLabel: "PhiladelphiaPoliceComplaints",
  datasets: [
    {
      name: "Complaint",
      label: "PPCComplaint",
      source: "https://phl.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20ppd_complaints",
      test: {
        file: "test/fixtures/ppc.complaints.one-example.data",
        expected: ""
      }
    },
    {
      name: "Discipline",
      label: "PPCDiscipline",
      source: "https://phl.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20ppd_complaint_disciplines",
      test: {
        file: "",
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
