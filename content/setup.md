# Setup

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
