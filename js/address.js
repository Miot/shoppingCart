new Vue({
    el:'.container',
    data:{
        limitNum: 3,
        addressList: [],
        curIndex: 0,
        shippingMethod: 1,
        delFlag: false,
        addFlag: false,
        curItem : ''
    },
    mounted: function(){
        this.$nextTick(function(){
            this.getAddressList();
        });
    },
    computed:{
        filterAddress: function(){
            return this.addressList.slice( 0, this.limitNum );
        }
    },
    methods:{
        getAddressList: function(){
            this.$http.get('data/address.json').then(response => {
                var res = response.data;
                if(res.status == '0'){
                    this.addressList = res.result;
                }
            });
        },
        setDefault: function(addressId){
            this.addressList.forEach(function(address, index){
                if(address.addressId == addressId){
                    address.isDefault = true;
                }else{
                    address.isDefault = false;
                }
            })
        },
        delConfirm: function(item){
            this.delFlag = true;
            this.curItem = item;
            // console.log(item);
        },
        delItem: function(){
            var index = this.addressList.indexOf(this.curItem);
            this.addressList.splice(index,1);
            this.delFlag = false;
        },
        saveItem: function(item){
            console.log(item);
            this.addFlag = false;
        }
    },
    
});