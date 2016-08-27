# crib

Home automation system build on node js with amicro service architecture utilizing websockets. 

The system is built around a websocket messages buss on which the modules register. This buss is not tied to one 
process or machine making the system scalable and robust.

* Scalable over several machines
* Easy to add new capabilities through adding new websockets
* Possible to restart one specific service without taking the whole system down

# Modules

The modules are places in the crib modules folder., The reason for them not being npm modules are from a practical 
standpoint. This is actually how they started out but then it became a bit slow and tedious when developing. Say that a change was 
introduced in the mq, then this needs to be committed and all modules that use the mq needs to be updated.

Instead the crib modules folder was introduced where each service lives in a folder and has index.js as an entry point.

# Getting started

Do 

```npm install crib -g``` 


Download the micro services of interest and place them into a folder. 

Define the CRIB_HOME environment variable with the path to the folder. Download the microservices of interest into CRIB_HOME.

Some default services are mandatory: crib-mg, crib-log and crib-storage.

# Logging
 Logging is done via loggly and in order to setup connections the environment variables need to be set with your account data from loggly:
     
     * CRIB_LOGGLY_TOKEN
     * CRIB_LOGGLY_DOMAIN
     
# The message queue
  
The machine that that hosts the message queue will be the hub for the communication in crib. This info is required by 
the services in order to connect to the system. Define the url to use for conneting in

* CRIB_BUSS_URL

Example value:
```
    http://localhost:8900
```

# The structure of a micro service

# Genereic services does not make a hime automation system
