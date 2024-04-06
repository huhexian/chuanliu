

const {
    createApp
} = Vue;

const app = createApp({
    delimiters: ['{[', ']}'],
    data() {
        return {
            items: [],
            moreBtnShow: "More",
            nav:navConfig,
        }
    },
    computed: {
        isMobile() {
            return window.innerWidth <= 768;
        },

    },
    methods: {
         handleLink(param){
            if (param != undefined && param != "" && param.url != undefined && param.url != ""){
                s = param.url.split('://');
                if (s.length == 1){
                    return s[0];
                }
                return s[0]+"://"+s[1].split("/")[0];
            }
        },
        next() {
            page++;
            const that = this;
            gets(that,
            function(data) {
                that.items.push(...data);
            });

        },
        format(times) {
            return format(times);
        },
         watch(blogId, id) {
            watch(blogId, id);
        },
        typeChange(type){
            blogType = type;
            this.items = [];
            this.moreBtnShow = "More"
            page = 1;
            const that = this;
            gets(that,
            function(data) {
                that.items.push(...data);
            });
        }
    },
    mounted: function() {

        const that = this;
        gets(that,
        function(data) {
            that.items.push(...data);
        });
    }
});

const vm = app.mount('#app');

/*** 初始化 vue end***/
function watch(blogId, id){
     var url = server + "article/watch";
    var promise = fetch(url,
        {
            method: 'PUT',
            // headers: {
            //     'Content-Type': 'application/json'
            // },
            body: JSON.stringify({
                "id": id,
                "blog_id":blogId
            })
        }).then(function(response) {
        if (response.status === 200) {
            return response.json();
        } else {
            return {}
        }
    });

    promise = promise.then(function(data) {

    }).
    catch(function(err) {
        console.log(err);
    });
}

function gets(that, callback) {
    // that = this;
    if (that.moreBtnShow == "Nothing"){
        return;
    }
    var url = server + "article?star=2&page_number="+ page + "&page_size="+limit;
    url += blogType == 0 ? "":"&type="+blogType;
    var promise = fetch(url).then(function(response) {
        if (response.status === 200) {
            return response.json();
        } else {
            return {}
        }
    });

    promise = promise.then(function(data) {
        if (data == undefined || data.code != 100000 || data.data == null || data.data.length == 0) {
            vm.$data.moreBtnShow = "Nothing";
            return;
        }
        getitemsuccess(data.data, callback);

    }).
    catch(function(err) {
        console.log(err);
    });
}

function getitemsuccess(data, callback) {
    // console.log(data);
    callback(data);
};

