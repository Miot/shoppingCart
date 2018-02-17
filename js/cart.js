// 全局过滤器
Vue.filter("money", function( value, type ){
    return "￥"+ value.toFixed(2) + type;
});

new Vue({
    el:'#app',
    data:{
        checkAllFlag: false,
        delFlag: false,
        productList : [],
        totalMoney : 0,
        curProduct : ''
    },
    // 过滤器
    filters:{
        formatMoney: function( value ){
            return "￥ "+ value.toFixed(2);
        }
    },
    mounted: function(){
        this.cartView();
    },
    methods:{
        cartView: function(){
            this.$http.get("data/cartData.json",{"id":123}).then(res=>{
                // console.log(res);
                this.productList = res.data.result.list;
                // this.totalMoney = res.data.result.totalMoney;
            })
        },
        changeMoney: function(product, way){
            if(way === 1){
                product.productQuantity++;
            }else if(way === 2){
                product.productQuantity--;
                if(product.productQuantity<1){
                    return product.productQuantity = 1
                }
            }
            this.calcTotalPrice();
        },
        selectedProduct: function(item){
            if(typeof item.checked == 'undefined'){
                // 全局注册 checked
                // Vue.set(item, "checked", true);
                // 局部注册 checked
                this.$set(item, "checked", true);
            }else{
                item.checked = !item.checked;
            }
            this.calcTotalPrice();
        },
        checkAll: function(flag){
            this.checkAllFlag = flag;
            var that = this;
            this.productList.forEach(function(item, index){
                if(typeof item.checked == 'undefined', that.checkAllFlag){
                    that.$set(item, "checked", that.checkAllFlag);
                }else{
                    item.checked = that.checkAllFlag;
                }
            });
            this.calcTotalPrice();
        },
        calcTotalPrice: function(){
            var that = this;
            that.totalMoney = 0;
            this.productList.forEach(function(item, index){
                if(item.checked){
                    that.totalMoney += item.productQuantity * item.productPrice;
                }
            });
        },
        delConfirm: function(item){
            this.delFlag = true;
            this.curProduct = item;
        },
        delProduct: function(){
            var index = this.productList.indexOf(this.curProduct);
            this.productList.splice(index,1);
            this.delFlag = false;
        }
    }
});
