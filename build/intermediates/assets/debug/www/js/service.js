app.factory('dataShare', function () {

   var dataStore = {};
    var dataDetail = {};
           return {
            storedata:function(key,value){
             dataStore[key] = value;
            },
           getdata:function(key){
             return dataStore[key];
            },
            detailShare:function(key,value){
            dataDetail[key]=value
            },
            getdetailShare:function(key){
             return dataDetail[key];
            },
             setTemp:function(key,value){
                        dataDetail[key]=value
                        },
                        geTemp:function(key){
                         return dataDetail[key];
                        }


           };
   });
