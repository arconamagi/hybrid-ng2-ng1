# Proof of concept
A sample of Angular2 &amp; Angular1 hybrid application with a SyncService
which synchronizes values between two sample AngularJS and Angular 2 services.
Synchronization occurs when any change happens in Angular 2 zone.

## Application Scheme

Notes:
- `ng1` means Angular 1
- `ng2` means Angular 2

  
    ----------------- 
    | <ng1appRoot>  |
    | ng1 directive |
    -----------------
             |
             v
    -----------------         ------------------
    |   <ng2app>    |         | optionsService |
    | ng2 component |   -->   |  ng2 service   |
    -----------------         ------------------
             |                        ^
             |                        |
             |                ------------------
             |                |  SyncService   |
             |                |  ng2 service   |
             |                ------------------
             |                        |
             v                        v
    -----------------         ------------------
    | <ng1appForm>  |         |   dataFormat   |
    | ng1 directive |   -->   |   ng1 service  |
    -----------------         ------------------

SyncService is Angular 2 service which synchronizes values between 
`optionsService` Angular 2 service and `dataFormat` AngularJS service.



## Quick start

```bash
# install 
npm install

# run
npm run go
```

Then visit [http://localhost:8080](http://localhost:8080) in your browser. 


## MIT License
Copyright (c) 2016 Grid Dynamics
