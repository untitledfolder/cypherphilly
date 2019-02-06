# Process for Adding Scrapers

This describes the process of adding new data-sets.  This will become an easier
process in the future, however, that will require a lot of work. For now, this
will be a very manual process.

## Structure

There are two pieces to a scraper: one for doing the data gathering and one for
data uploading. The reason for this is to try and come up with a pattern and
simplify the process.

### Data Gathering

Data gathering is done via a simple bash script. There is two main steps:

1) The first thing the script should do is download the data from a source
whatever way necessary: download a `csv` file, access an API, or something
similar.

2) The next step should be to use `jq` to process what you want from the data
into a JSON object

