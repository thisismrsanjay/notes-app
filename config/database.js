if(process.env.NODE_ENV=== 'production')
{
    module.exports = {
        mongoURI : 'mongodb://<dbuser>:<dbpassword>@ds141889.mlab.com:41889/notes-app'
    }
    
}else{
        module.exports = {
            mongoURI : 'mongodb://localhost/notes-dev'
        }
}