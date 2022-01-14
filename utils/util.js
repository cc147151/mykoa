module.exports = {
    pager({pageNum=1,pageSize=10}){
        pageNum*=1;
        pageSize*=1;
        const skipIndex = (pageNum-1)*pageSize;
        return {
            page:{
                pageNum,
                pageSize
            },
            skipIndex
        }
    },
    success({data={},code=200,msg=""}) {
        return {
            code,data,msg
        }
    },
    fail({data={},code=40001,msg=""}) {
        return {
            code,data,msg
        }
    }
}