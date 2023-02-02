# docker notes

## 1.Set up the environment.
First we need to install docker.
(Mac version:
https://docs.docker.com/desktop/install/mac-install/
Windows Version:
https://docs.docker.com/desktop/install/windows-install/)

After preparing the Docker environment, just open the terminal and use the following command to start the Elasticsearch cluster:
### docker network create elastic-network


## 2.Set up a node
This will create a basic "namespace" for our future containers.
Now, if you want to deploy only one node, please run:

### docker run --rm --name esn01 -p 9200:9200 -v esdata01:/usr/share/elasticsearch/data --network elastic-network -e "node.name=esn01" -e "cluster.name=liuxg-docker-cluster" -e "cluster.initial_master_nodes=esn01" -e "bootstrap.memory_lock=true" --ulimit memlock=-1:-1 -e ES_JAVA_OPTS="-Xms512m -Xmx512m" docker.elastic.co/elasticsearch/elasticsearch:7.5.0


We can open 
### localhost: 9200 
in the browser to view the information:
￼

Also, there are other commands in browser:

(1)View the nodes in our cluster:
### http://localhost:9200/_cat/nodes?v
(2)View the indices in our nodes:
### http://localhost:9200/_cat/indices?v

We can view the health of our cluster through the following command in terminal:
### curl localhost:9202/_cluster/health?pretty

## 3.Create Index
Let's use the Create-Index API to create an index, and then index a document to the Index-Document API. Run the following commands in terminal:

curl -X PUT \
  http://localhost:9200/test_imdb \
  -H 'Content-Type: application/json' \
  -d '{
    "settings" : {
        "index" : {
            "number_of_shards" : 3, 
            "number_of_replicas" : 2 
        }
    }
}'

we can run 
### http://localhost:9200/_cat/indices?v 
to check.


## 4.Load data
First download datafile name.basic.tsv from https://datasets.imdbws.com/. Then use the python file TsvToCsv.py to transfer tsv file to csv file. Hence we get the file name.basic.csv.

There is a python file that can input csv data into elasticsearch. The format command to that is:
python3 load_csv_or_json_to_elasticsearch.py filename indexName
For example:
### python3 load_csv_or_json_to_elasticsearch.py name.basic.csv test_imdb
(reference:  https://github.com/liu-xiao-guo/load_csv_or_json_to_elasticsearch)
After loading data, we can run http://localhost:9200/_cat/indices?v to check.
￼
I also provide a python file TsvToCsv.py that transfer tsv file to csv file.


## 5.View  and  search data:
### In the browser, to view data we run: http://localhost:9200/test-imdb/_search?pretty
To search data, For example  we search people whose primary  profession is actor, the we run:
### http://localhost:9200/test_imdb/_search?pretty&q=primaryProfession=actor
