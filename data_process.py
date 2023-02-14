
import pandas as pd
import numpy as np

#those data_set should be download from imdb website
dff=pd.read_table("title.basics.tsv")
df5=pd.read_table("name.basics.tsv")
#This file just for find relative people for a movie, no limitation include
dff_c=dff.copy()
df5_c=df5.copy()
dff_c.set_index('tconst',inplace=True)
dff_c['actor']=""
dff_c['actor']=""
dff_c['actress']=""
dff_c['director']=""
dff_c['soundtrack']=""
dff_c['writer']=""
dff_c['producer']=""
dff_c['composer']=""
dff_c['cinematographer']=""
useful_jobs_name=['actor','actress','director','soundtrack','writer','producer','composer','cinematographer']

def get_useful_job_man(df1,df2):
    for index,row in df1.iterrows():
        job_list=row['primaryProfession'].split(",")
        titles=row['knownForTitles'].split(",")
        
        for title in titles:
            if title in df2.index:
                for job in job_list:
                    if job in useful_jobs_name:
                        if df2.loc[title,job]=="":
                            df2.loc[title,job]=row['primaryName']
                        else:
                            df2.loc[title,job]=str(df2.loc[title,job])+","+row['primaryName']
                        #print(row['primaryName']+"   "+job+"  "+title)

    return df2



dff_c=get_useful_job_man(df5_c,dff_c)
dff_c.to_csv("final_dataset.tsv", sep ="\t")


