if(process.env.NODE_ENV=== 'production')
{
    module.exports = {
        mongoURI : 'mongodb://sanjay:sanjay123@ds141889.mlab.com:41889/notes-app'
    }
    
}else{
        module.exports = {
            mongoURI : 'mongodb://sanjay:sanjay123@ds141889.mlab.com:41889/notes-app'
        }
}