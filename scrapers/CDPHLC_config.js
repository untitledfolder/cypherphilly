exports.datagroup = {
  name: "CDPH",
  label: "cdph",
  key: "cdph",
  description: "California Department of Public Health",
  datasets: [
    {
      name: "License",
      label: "license",
      key: "license",
      description: "Licensing and Certification",
      source: "https://data.chhs.ca.gov/dataset/59d9abe7-2664-407a-a5aa-f89a866f3381/resource/bd107216-1e93-4dea-abc6-001176a389b5/download/licensed-healthcare-facility-listing-december-31-2018.csv",
      processor: "",
      test: {
        file: "",
        expected: ""
      },
      keys: [
        {
          title: "OSHPD ID",
          key: "OSHPD_ID"
        },
        {
          title: "Facility Name",
          key: "FACILITY_NAME"
        },
        {
          title: "License Num",
          key: "LICENSE_NUM"
        },
        {
          title: "Facility Level Desc",
          key: "FACILITY_LEVEL_DESC"
        },
        {
          title: "DBA Address1",
          key: "DBA_ADDRESS1"
        },
        {
          title: "DBA City",
          key: "DBA_CITY"
        },
        {
          title: "DBA Zip Code",
          key: "DBA_ZIP_CODE"
        },
        {
          title: "County Code",
          key: "COUNTY_CODE"
        },
        {
          title: "County Name",
          key: "COUNTY_NAME"
        },
        {
          title: "ER Service Level Desc",
          key: "ER_SERVICE_LEVEL_DESC"
        },
        {
          title: "Total Number Beds",
          key: "TOTAL_NUMBER_BEDS"
        },
        {
          title: "Facility Status Desc",
          key: "FACILITY_STATUS_DESC"
        },
        {
          title: "Facility Status Date",
          key: "FACILITY_STATUS_DATE"
        },
        {
          title: "License Type Desc",
          key: "LICENSE_TYPE_DESC"
        },
        {
          title: "License Category Desc",
          key: "LICENSE_CATEGORY_DESC"
        },
        {
          title: "Latitude",
          key: "LATITUDE"
        },
        {
          title: "Longitude",
          key: "LONGITUDE"
        },
        }
      ]
    }
  ]
};

