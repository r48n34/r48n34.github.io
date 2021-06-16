let k = "Yolooo world?"
let j = [1,2,2,33,4]
let obj = {
    message: k,
    otherMessage : "Ga ha",
}

obj["ha"] = "hehe";

var appHa = new Vue({
    el: '#appJJ',
    data: obj,
    methods: {
        addData: function (){
            this.ha = "Yoloooooo";
        }

    },  

})

setTimeout(appHa.addData, 2000);


var appYo = new Vue({
    el: '#appKK',
    data: {
        a: 69,
        list: [1,2,3,44,56],
        styleObject: {
            color: 'red',
        },
        ok: false,
    },
    methods: {
        addOne: function (){
            this.a ++ ;
        },

        pushList: function (value){
            this.list.push(value);
            console.log(value);
            this.ok = true;
        }

    },
    computed: {
        aAdder: function (){
            return this.a + 69;
        }
    }, 

})

setTimeout(appYo.pushList, 3000,69);


Vue.component('hahahaha', {
    props: ['it'],
    template: '<li>{{ it.text }} {{ it.id }}</li> '
})
  
var app7 = new Vue({
    el: '#appComp',
    data: {
      lst: [
        { id: 0, text: 'JJ' },
        { id: 1, text: 'KK' },
        { id: 2, text: 'Whatever' }
      ]
    }
})
