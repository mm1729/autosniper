function ping (host, callback){
    //do http request here.
    //when finish, call "callback"
    console.log('ping HOST: ' + host);
    callback(host);
}

function query_host (host){
    ping(host, function (status) {
        console.log('in query_host HOST : ' + host + ' STATUS :' + status);
        //..  do stuff like saving status in database, etc.
        //setTimeout (query_host(host), 2000); //queue for next ping in the next predefined interval
    });
}

list_of_hosts = ['a', 'b', 'c'];
//main
for (var host in list_of_hosts)
{
    setTimeout (query_host(host), 2000) //queue job. Every 2 seconds, query_host will be called.
}
