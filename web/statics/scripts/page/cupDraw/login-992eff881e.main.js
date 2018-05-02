(function () {
'use strict';

var vue = new Vue({
    el: '#app',
    data: {
        status: 1,
        telephone: '',
        password: '',
        againpassword: '',
        yzm: '',
        logincount: 0,
        yzmimg: ''
    },
    mounted: function mounted() {
        this.yzmimg = 'localhost:8002/activity/getVerificationCode';
    },

    methods: {
        changestatus: function changestatus(index) {
            this.status = index;
        }
    }
});

}());

//# sourceMappingURL=login.main.js.map

//# sourceMappingURL=login.main.js.map
