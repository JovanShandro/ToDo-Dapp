(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[3],{"1e44":function(t,e,s){"use strict";var a=s("712d"),n=s.n(a);n.a},"712d":function(t,e,s){},7471:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-item",{class:t.task.completed?"bg-green-1":"bg-orange-1",attrs:{clickable:""},on:{click:function(e){return t.updateStatus(t.id)}}},[s("q-item-section",{attrs:{side:""}},[s("q-checkbox",{attrs:{value:t.task.completed}})],1),s("q-item-section",[s("q-item-label",[t._v(" "+t._s(t.task.text))])],1),s("q-item-section",{attrs:{side:""}},[s("div",{staticClass:"row"},[s("q-btn",{attrs:{flat:"",round:"",dense:"",color:"red",icon:"delete"},on:{click:function(e){return e.stopPropagation(),t.deleteItemPopUp(t.id)}}})],1)])],1)},n=[],o={props:["task","id"],methods:{updateStatus:function(t){this.$store.dispatch("todo/updateStatus",t)},deleteItemPopUp:function(t){var e=this;this.$q.dialog({title:"Confirm",message:"Are you sure you want to delete this item?",ok:{push:!0},cancel:{color:"negative"},persistent:!0}).onOk((function(){e.$store.dispatch("todo/deleteTask",t)}))}}},c=o,r=s("2877"),i=s("eebe"),l=s.n(i),d=s("66e5"),u=s("4074"),p=s("8f8e"),b=s("0170"),m=s("9c40"),f=Object(r["a"])(c,a,n,!1,null,null,null);e["default"]=f.exports;l()(f,"components",{QItem:d["a"],QItemSection:u["a"],QCheckbox:p["a"],QItemLabel:b["a"],QBtn:m["a"]})},"83f6":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("q-card",[s("q-card-section",{staticClass:"row"},[s("div",{staticClass:"text-h6"},[t._v("\n      Add Task\n    ")]),s("q-space"),s("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{flat:"",round:"",dense:"",icon:"close"}})],1),s("q-form",{on:{submit:function(e){return e.preventDefault(),t.onSubmit(e)}}},[s("q-card-section",[s("div",{staticClass:"row q-mb-sm"},[s("q-input",{staticClass:"col",attrs:{outlined:"",label:"Task Text",autofocus:"","lazy-rules":"",clearable:"",rules:[function(t){return!!t||"Text cannot be empty!"}]},model:{value:t.text,callback:function(e){t.text=e},expression:"text"}})],1)]),s("q-card-actions",{attrs:{align:"right"}},[s("q-btn",{attrs:{label:"Save",color:"primary",type:"submit"}})],1)],1)],1)},n=[],o={data:function(){return{text:""}},methods:{onSubmit:function(){this.$store.dispatch("todo/addTask",this.text),this.$emit("close")}}},c=o,r=s("2877"),i=s("eebe"),l=s.n(i),d=s("f09f"),u=s("a370"),p=s("2c91"),b=s("9c40"),m=s("0378"),f=s("27f9"),v=s("4b7e"),k=s("7f67"),h=Object(r["a"])(c,a,n,!1,null,null,null);e["default"]=h.exports;l()(h,"components",{QCard:d["a"],QCardSection:u["a"],QSpace:p["a"],QBtn:b["a"],QForm:m["a"],QInput:f["a"],QCardActions:v["a"]}),l()(h,"directives",{ClosePopup:k["a"]})},"8b24":function(t,e,s){"use strict";s.r(e);var a={};s.r(a),s.d(a,"NETWORKS",(function(){return l}));var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",{class:{"cursor-wait":t.isWriting}},[t.stats.metamask?a("div",{staticClass:"row"},[a("div",{staticClass:"col q-pb-lg q-ma-sm"},[a("div",{staticStyle:{height:"200px"}}),t.R.isEmpty(t.todoTasks)?t._e():a("tasks",{attrs:{completed:!1,tasks:t.todoTasks}},[t._v("\n        To do\n      ")])],1),a("div",{staticClass:"block overflow-hidden q-mt-xl q-ma-sm col q-pt-xl",staticStyle:{height:"280px !important"}},[a("div",{staticClass:"text-center"},[a("div",[a("img",{attrs:{src:s("ca70"),id:"userIcon",alt:""}})]),a("span",{staticClass:"text-bold"},[t._v(" Network:")]),t._v("\n        "+t._s(t.util.NETWORKS[t.stats.netId])+" "),a("br"),a("br"),a("span",{staticClass:"text-bold"},[t._v("Active account: ")]),t._v(t._s(t.stats.activeAccount)+" "),a("br"),a("br"),a("span",{staticClass:"text-bold"},[t._v("Balance of account: ")]),t._v(t._s(t.stats.web3().utils.fromWei(t.stats.balance,"ether"))+" "),a("br"),a("br"),a("span",{staticClass:"text-bold"},[t._v("List address: ")]),t._v(t._s(t.listAddress)+" "),a("br")])]),a("div",{staticClass:"col q-pb-lg col q-ma-sm"},[a("div",{staticStyle:{height:"200px"}}),t.R.isEmpty(t.completedTasks)?t._e():a("tasks",{attrs:{completed:!0,tasks:t.completedTasks}},[t._v("\n        Completed\n      ")])],1),a("div",{staticClass:"absolute-bottom q-ma-sm text-center q-mb-lg no-pointer-events"},[a("q-btn",{staticClass:"all-pointer-events",attrs:{color:"primary",round:"",size:"24px",icon:"add"},on:{click:function(e){t.showAddTask=!0}}})],1)]):a("q-banner",{staticClass:" absolute-center",staticStyle:{height:"200px"}},[a("div",{staticClass:"row q-pb-md"},[a("img",{attrs:{src:s("ba67"),id:"metamask",alt:""}})]),a("div",{staticClass:"column",staticStyle:{"font-size":"18px"}},[a("p",{staticClass:"text-center"},[t._v("\n        Could not detect Metamask.\n        "),a("br"),t._v("\n        Please make sure to connect to the Metamask extension and refresh the\n        page.\n      ")])])]),a("q-dialog",{model:{value:t.showAddTask,callback:function(e){t.showAddTask=e},expression:"showAddTask"}},[a("add-task-dialog",{on:{close:function(e){t.showAddTask=!1}}})],1)],1)},o=[],c=(s("8e6e"),s("8a81"),s("ac6a"),s("cadf"),s("06db"),s("456d"),s("c47a")),r=s.n(c),i=s("2f62"),l={1:"Main Net",2:"Deprecated Morden test network",3:"Ropsten test network",4:"Rinkeby test network",42:"Kovan test network"},d=s("b17e");function u(t,e){var s=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),s.push.apply(s,a)}return s}function p(t){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{};e%2?u(Object(s),!0).forEach((function(e){r()(t,e,s[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):u(Object(s)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(s,e))}))}return t}var b={name:"PageIndex",data:function(){return{util:a,R:d,showAddTask:!1}},computed:p({},Object(i["c"])("todo",["stats","listAddress","isLoaded","isWriting"]),{},Object(i["b"])("todo",["todoTasks","completedTasks"])),beforeCreate:function(){this.$store.dispatch("todo/setWeb3")},components:{tasks:s("fc2e").default,"add-task-dialog":s("83f6").default}},m=b,f=(s("1e44"),s("2877")),v=s("eebe"),k=s.n(v),h=s("9989"),g=s("9c40"),x=s("54e1"),q=s("24e8"),w=Object(f["a"])(m,n,o,!1,null,"bef18702",null);e["default"]=w.exports;k()(w,"components",{QPage:h["a"],QBtn:g["a"],QBanner:x["a"],QDialog:q["a"]})},ba67:function(t,e,s){t.exports=s.p+"img/metamask.023762b6.png"},ca70:function(t,e,s){t.exports=s.p+"img/user.7b528d63.jpeg"},fc2e:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("q-banner",{class:{"bg-green-4":t.completed,"bg-orange-4":!t.completed,"text-center":!0},attrs:{dense:""}},[s("span",{staticClass:"text-bold text-subtitle1"},[t._t("default")],2),s("q-list",{attrs:{separator:"",bordered:""}},t._l(t.tasks,(function(t,e){return s("task",{key:e,attrs:{task:t,id:e}})})),1)],1)],1)},n=[],o={props:["tasks","completed"],components:{task:s("7471").default}},c=o,r=s("2877"),i=s("eebe"),l=s.n(i),d=s("54e1"),u=s("1c1c"),p=Object(r["a"])(c,a,n,!1,null,null,null);e["default"]=p.exports;l()(p,"components",{QBanner:d["a"],QList:u["a"]})}}]);