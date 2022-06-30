var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true});

var blogSchema = new mongoose.Schema({
            title: 
                {type:String,
                required:true
                },
            data:
            {type:String,
                required:true
                }
        });
 
var blogModel=mongoose.model('blogdata',blogSchema);
 
module.exports =blogModel;