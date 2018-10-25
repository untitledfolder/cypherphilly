
# **Cypher Philly**


## **The Idea**

Philly Graph DB and Code for Philly are starting a new initiative called Cypher Philly. The initiative is intended to inspire and equip citizen journalists, data enthusiasts and social activists with the tools and data to do good for the city and citizens of Philadelphia. There are a number of reasons why Philadelphia needs your help from public safety issues to beautifying shared public spaces, transportation updates or even unheard police complaints. Our goal is to harness the untapped potential of OpenDataPhilly.org which has hundreds of datasets that could help inform effective solutions to these problems. Topics range from Arts/Culture/History, Education, Elections/Politics, Transportation, Public Safety, Environment & and much more. With a shared enthusiasm for making an actionable difference we believe you can help us make this initiative possible.    
  

## **The Code**

Cypher Philly's first priority is to build web application tools which contributors can use collaboratively. These tools will help us to query the data were working with and allow us to share the results we’ve discovered. The Cypher Philly web application tool can be found on our Github page and is completely open source, so anyone can contribute to the code. Each new project that is spawned from this initiative will get its own web page. 

## **The Data**

Additionally we need data experts to help in many aspects. Once a problem is identified by the journalist and a topic chosen to explore, we’ll need data experts to start the data preparation phase. Wherein the data will need to be cleaned and modeled to fit the search parameters set out by the journalists to tell a story. Afterwards the prepared datasets will be imported into the Cypher Philly project main databases. Your next task will be to set up query parameters for using Cypher Philly Neo4j Graph Database web application and the Cypher Query language to query the data. After the datasets are queried for each project, results will be displayed on the Cypher Philly website either in a visual, categorical, quantitative or any combination that helps tell the story of the data. The data findings from each project will then be summarized in conjunction with the journalist in order to draw conclusions from the results and build recommendations for actionable steps moving forward.          

## **Journalism**

Most importantly we need Philadelphia journalists and citizens to help us identify problems that are most relevant to the data we have from Open Data Philly. Once we’ve identified the problems and datasets we’ll be working with, we’ll work with data scientists to determine what parts of the data are most relevant to telling the story. When the data scientists have concluded their analysis and published their findings; we’ll need journalists to tell the stories we find in the data and how we can use this information to make actionable change.

# **How to get involved**
 
## With The Code
[cypherphilly on github](https://github.com/AddictiveSci/cypherphilly)

## With The Data
[Data Query Formatting](https://docs.google.com/document/d/1NosqI_z8zaGZ7evIJKxCyOJNdujUWoQU1rZKyx_O2qE/edit?usp=sharing)

[OpenDataPhilly](https://www.opendataphilly.org/dataset)

## With Journalism
### **Journalistic Organizations Involved** 
[Journalistic Outlets In Philly Go Here ](https://en.wikipedia.org/wiki/News_media)

## Project Collaboration:

### **Community Project Boards**
[Cypher Philly[Trello Board]](https://trello.com/b/ZHv7dIfb)

[Code for Philly[Cypher Philly Project Page]](https://codeforphilly.org/pages/cypherphilly)

### **Meetups**
[Philly Graph DB Meetup Group ](https://www.meetup.com/Philly-GraphDB/)

[Code For Philly Meetup Group](https://www.meetup.com/Code-for-Philly/)




## Tools and Technologies:


### **Neo4j** 

[Neo4j](https://neo4j.com/) is a graph database management system developed by Neo4j, Inc. Described by its developers as an ACID-compliant transactional database with native graph storage and processing, Neo4j is the most popular graph database according to DB-Engines ranking.

Neo4j is available in a GPL3-licensed open-source "community edition", with online backup and high availability extensions licensed under the terms of the Affero General Public License. Neo also licenses Neo4j with these extensions under closed-source commercial terms.

Neo4j is implemented in Java and accessible from software written in other languages using the Cypher Query Language through a transactional HTTP endpoint, or through the binary "bolt" protocol.

### **Cypher** 
[Cypher](https://neo4j.com/cypher-graph-query-language/)
 is a vendor-neutral open graph query language employed across the graph ecosystem. Cypher’s ASCII-art style syntax provides a familiar, readable way to match patterns of nodes and relationships within graph datasets.

Like SQL, Cypher is a declarative query language that allows users to state what actions they want performed (such as match, insert, update or delete) upon their graph data without requiring them to describe (or program) exactly how to do it.

Two years ago, Neo4j, Inc. decided to open source the Cypher language and make the most popular graph query language available to any technology provider with the aim that Cypher become the "SQL for graphs." Thus, the openCypher project was born.



### **OpenRefine**

[OpenRefine](http://openrefine.org/) (formerly Google Refine) is a powerful tool for working with messy data: cleaning it; transforming it from one format into another; and extending it with web services and external data.

Please note that since October 2nd, 2012, Google is not actively supporting this project, which has now been rebranded to OpenRefine. Project development, documentation and promotion is now fully supported by volunteers. Find out more about the history of OpenRefine and how you can help the community.




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

[OpenDataPhilly](https://www.opendataphilly.org/dataset/police-complaints/resource/aab05f09-727e-4269-80ed-27cd70c065ea?inner_span=True)

API call:

```
https://phl.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20ppd_complaint_disciplines
```
