
// wait until the DOM specified in <body> has loaded before executing the
// function, if you have ever used jQuery $(document).ready() it is
// basically the same thing.
$(function() {
    // create a new Vue.js instance and specify the template as well as the
    // data that should be displayed in it.
    var app = new Vue({
        el: "#app",
        data: {
            status: "Please select the images you wish to upload",
            files: [],
            images: []
        },//end data

        watch:{
            images: function(){
                console.log(this.images);
            }
        },//end watch

        computed: {
            fileStatus: function(){
                if(this.files.length == 0)
                    return "Choose file";

                if(this.files.length == 1)
                    return this.files[0].name;
                else
                    return `${this.files.length} files`;
            }
        },

        methods: {
            assignFiles: function() {
                this.files = this.$refs.myFiles.files;

                this.uploadImages();
            }, //end assignFiles

            uploadImages: function(){
                this.status = "Scanning files";

                let r = new FileReader();
                r.onload = function(data){
                    var img = {
                        name: "",
                        desc: "",
                        data: data.target.result
                    }//end img

                    app.images.push(img);
                }//end onload

                for(var i = 0; i < this.files.length; ++i){
                    //if file is not an image, skip it
                    if(!this.files[i].type.includes("image"))
                        continue;



                    r.readAsDataURL(this.files[i]);
                }//end for
            },//end render
        }//end methods

    });//end Vue instance
});//end body onload