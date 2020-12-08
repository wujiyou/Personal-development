import service from './axios';

export const getNav = (divisionName) => {
    
    console.log(divisionName)
    return service({
        url: "/nav.json?t="+ (new Date()).getTime().toString(),
        method: 'get',
        params: {
            divisionName : divisionName
        }
    })
};

export const login = (divisionName) => {
    console.log(divisionName)
    return service({
        url: '/user/login',
        method: 'post',
        params: divisionName
    })
};
//导出excel模板
export const downExcelMoudle = (divisionName) => {
    console.log(divisionName)
    return service({
        url: '/file/template/download',
        method: 'post',
        headers:{
             "Content-Type": "application/x-download",
             "Authorization":"bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiYXV0aCJdLCJ1c2VyX25hbWUiOiJjamxfYWRtaW4iLCJzY29wZSI6WyJhbGwiXSwicm9sZXMiOlsiYWRtaW4iXSwidW5pdElkIjpudWxsLCJleHAiOjE1OTc4MDE4NDcsInVzZXJJZCI6IjBkZDg3OWZlLTg3OTktMTFlYS05ODhlLTFjNjk3YTM2Mjg2ZCIsImF1dGhvcml0aWVzIjpbImFsbCIsInJlZ3VsYXRvcnkuY3lsaW5kZXIuZGVsZXRlIiwicmVndWxhdG9yeS5jeWxpbmRlci51cGRhdGUiLCJyZWd1bGF0b3J5LmN5bGluZGVyLnNhdmUiLCJyZWd1bGF0b3J5LnR1Y2tDb21iIl0sImp0aSI6Ijg2ZjZiZmQ2LWE2MWYtNDRlMi05NmY3LTBhMDc0NGRkMTk4OCIsImNsaWVudF9pZCI6ImF1dGgifQ.NhW5kkbXSLfthSgbHlNv5Kc_NDf0p1CM6sgtAxMtBxg"

        },
        params: divisionName
    })
};