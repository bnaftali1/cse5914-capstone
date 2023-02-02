from elasticsearch import Elasticsearch, helpers
import os
import json
import re

def create_Index(es):
    
    es.indices.create(index='imdb', ignore=400)
    mapping = {
    'properties': {
        'title': {
            'type': 'text',
            'analyzer': 'standard',
            'search_analyzer': 'standard'
            }
        }
    }
    result = es.indices.put_mapping(index='news', body=mapping)
    print(result)


def Input_data(es):
    with open("name.basics.json") as file:
        docs = json.loads(file.read())
        #print(docs)
    
    
    for doc in docs:
        es.index(index='imdb', body=doc)


def find_match_results(es,string_use):
    dsl = {
    'query': {
        'match': {
            'primaryProfession': string_use
        }
    }
}
 
    result = es.search(index='imdb', body=dsl)
    return result

#==================================================[  Main  Part  ]==================================================

bonsai='https://ma8uksnn1e:p2z0os6mqq@osu-cse-search-4067143756.us-east-1.bonsaisearch.net:443'
auth = re.search('https\:\/\/(.*)\@', bonsai).group(1).split(':')
host = bonsai.replace('https://%s:%s@' % (auth[0], auth[1]), '')

# optional port
match = re.search('(:\d+)', host)
if match:
    p = match.group(0)
    host = host.replace(p, '')
    port = int(p.split(':')[1])
else:
    port=443

# Connect to cluster over SSL using auth for best security:
es_header = [{
    'host': host,
    'port': port,
    'use_ssl': True,
    'http_auth': (auth[0],auth[1])
}]

# Instantiate the new Elasticsearch connection:
es = Elasticsearch(es_header)


command=input("Input a command(0 for delete, 1 for create, 2 for see all data, 3 for search, q for quit):")
while(command!='q'):
    if(command.isdigit()):
        command=int(command)
            
        # delet index news
    if(command==0):
        es.indices.delete(index='imdb', ignore=[400, 404])
        print("Finish delet index = imdb")

        # create index news
    elif(command==1):
        #create_Index(es)
        Input_data(es)
    elif(command==2):
        result = es.search(index='news')
        i=1
        for hit in result['hits']['hits']:
            print(str(i)+" : ")
            print(hit)
            i=i+1

    # search the keyword basketball
    elif(command==3):
        result2=find_match_results(es,'actor')
        print("The result of searching actor")
        i=1
        for hit in result2['hits']['hits']:
            print(str(i)+" : ")
            print(hit)
            i=i+1

        

command=input("Input a command(0 for delete, 1 for create, 2 for see all data, 3 for search, q for quit):")

    
    
    
    
 
    
