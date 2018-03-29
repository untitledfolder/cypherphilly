# Cypher Philly

# **The Idea**

Philly Graph DB and Code for Philly are starting a new initiative called Cypher Philly. The initiative is intended to inspire and equip citizen journalists, data enthusiast and social activists with the tools and data to do good for the city and citizens of Philadelphia. There are any number of reasons why Philadelphia needs your help from public safety issues to beautifying shared public spaces, transpiration updates or even unheard police complaints. Our goal is to harness the untapped potential of OpenDataPhilly.org which has an aggregate of hundreds of datasets for which to explore and draw effective solutions to these problems. Topics there rang from Arts/Culture/History, Education, Elections/Politics, Transportation, Public Safety, Environment & and much more. With a shared enthusiasm for making an actionable difference we believe you can help us make this initiative possible.     
  

# **The Code**

Cypher Philly's first priority is to build web application tools which contributators can use collaboratively. These web application tools will help us to query the data were working with and allow us to share the results we’ve discovered. The Cypher Philly web application tool can be found on our Github page and is completely open source, so anyone can contribute to the code. Each new project that is spawned from this initiative will get its own web page in which results can be displayed teams can collaborate on.   

# **The Data**

Additionally we need data experts to help in many aspects. Once a problem is identified by the Journalist and a topic chosen to explore, well need data experts to start the data preparation Phase. Wherein the data will need to be cleaned and modeled to fit the search parameters set out by the journalists to tell a story. Afterwards the prepared datasets will be imported into the Cypher Philly project main databases. Your next task will be to set up query parameters for using Cypher Philly Neo4j Graph Database web application and the Cypher Query language to query the data. After the datasets are queried for each project results will be displayed on the Cypher Philly website either in a visual, categorical, quantitative or combination any type that helps tell the story of the data. The data finding from each project will then be summarized in conjunction with the journalist in order to draw conclusions from the results and build recommendations for actionable steps moving forward.           

# **Journalism**

Most importantly we need philadelphian Journalists and Citizen Journalists to help us Identify problems that are most relevant to the data we have from Open Data Philly. Once we’ve identified the problems and datasets we’ll be working with, we’ll work with the data scientist to determine what parts of the data a most relevant to telling the story of the data. When the data scientist have concluded their analysis and published there finding; well need Journalists to tell the stories we find in the data and how we can use this information to make actionable change.



## Setup

To get setup for the project, you will first need to get
[Node.js](https://nodejs.org/en/). Also, you will need access to a `Neo4j`
instance. There is a script to setup `Neo4j`

Install Angular CLI:

```
npm install -g @angular/cli
```

Then, you should just need to do the install:

```
npm i
```

You will need to install [jq](https://stedolan.github.io/jq/) for some of the
CLI scripts.

## Links

https://www.opendataphilly.org/dataset/police-complaints/resource/aab05f09-727e-4269-80ed-27cd70c065ea?inner_span=True

API call:
https://phl.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20ppd_complaint_disciplines

