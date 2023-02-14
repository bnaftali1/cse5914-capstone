
import pandas as pd
import numpy as np

#if one have no useful jobs, they will be in the dorp_index_list
def get_useful_job_man(df):
    useful_jobs_name=['actor','actress','director','soundtrack','writer','producer','composer','cinematographer']
    drop_index_list=[]
    for index,row in df.iterrows():
        one_list=row['primaryProfession'].split(",")
        useful=0
        for job in one_list:
            if job in useful_jobs_name:
                useful=1
                break
                
        
        if useful==0:
            drop_index_list.append(index)
            #print(str(index)+" not in ")
    return drop_index_list


#simply and get the useful information about the original dataset
def preprocessing(people_name_df,rating_df,title_name_df):
    
    #=======get df, the title dataset with rating information=========
    df1=title_name_df.copy()
    df2=rating_df.copy()    
    df=df1.set_index('tconst').join(df2.set_index('tconst'))

    #rotes must be larger than 1000
    df=df[df['numVotes']>1000]
    df=df[df['titleType']=='movie']

    #runtime must be longer than 10
    df=df[df['runtimeMinutes'].notna()]
    df['runtimeMinutes'].replace('\\N',0,inplace=True)
    df['runtimeMinutes']=df['runtimeMinutes'].astype(int)
    df=df[df['runtimeMinutes']>20]



    #=======get the better people dataset========
    dff=people_name_df.copy()


    #they must primaryprofession and knownfortitle information
    dff=people_name_df.copy()
    dff=dff[dff['primaryProfession'].notna()]
    dff['knownForTitles'].replace('\\N',np.nan,inplace=True)
    dff=dff[dff['knownForTitles'].notna()]
    
    #they must have their birthday
    dff['birthYear'].replace('\\N',np.nan,inplace=True)
    dff=dff[dff['birthYear'].notna()]
    
    #they must have useful job
    list1=get_useful_job_man(dff)
    dff=dff.drop(labels=list1,axis=0)

    return (dff,df)
    

#df1 is about people,df2 is about movie titles after preprocessing
def get_useful_dataset(df1,df2):
    useful_jobs_name=['actor','actress','director','soundtrack','writer','producer','composer','cinematographer']
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


#dff is the dataset about people,df5 is the dataset about movie titles
def combine_2_table(dff,df5):
    #those data_set should be download from imdb website
    
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
    dff_c=get_useful_job_man(df5_c,dff_c)



    return dff_c
    

#===== Main part=======
#those file should be  downloaded from the website
people_name_df=pd.read_table("name.basics.tsv")
rating_df=pd.read_table("title.ratings.tsv")
title_name_df=pd.read_table("title.basics.tsv")

#get the useful people and title information
(useful_people,useful_title)=preprocessing(people_name_df,rating_df,title_name_df)

#Use these two set to get the final set
final_dataset=combine_2_table(useful_people,useful_title)
final_dataset.to_csv("final_dataset.tsv", sep ="\t")




