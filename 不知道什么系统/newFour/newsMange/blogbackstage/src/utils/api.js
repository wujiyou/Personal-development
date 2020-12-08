import service from './axios';

// 登录接口
export const login = (divisionName) => {
    console.log(divisionName)
    return service({
        url: '/user/login',
        method: 'post',
        data:divisionName
    })
};


// 获取侧边长劲鹿
export const cjlwlkj =()=>{
    return service({
        url: 'unit/findByUnitId',
        method: 'get'
    })
}
// 角色管理查询分页
export const adminuser =(page,rows,createdTime,type)=>{
    return service({
        url: `/role/findPage?page=${page}&rows=${rows}&createdTime=${createdTime}&type=${type}`,
        method: 'get'
    })
}

// 角色管理条件查询
export const adminusersou =(page,rows,resDate,type)=>{
    return service({
        url: `/role/findPage?page=${page}&rows=${rows}&createdTime=${resDate}&type=${type}`,
        method: 'get'
    })
}

// 角色管理新增
export const adminuserfrom =(from)=>{
    return service({
        url: '/role',
        method: 'post',
        data:from
    })
}
// 角色管理修改
export const adminusereditUserForm =(editUserForm)=>{
    return service({
        url: '/role',
        method: 'put',
        data:editUserForm
    })
}

// 角色管理批量删除
export const adminuserdelete =(delarr)=>{
    return service({
        url: '/role/delete',
        method: 'post',
        data:delarr
    })
}
// 角色管理权限分配显示
export const adminuserfindAll =()=>{
    return service({
        url: '/Permission/findAll',
        method: 'get'
    })
}

// 角色管理权限分配默认值
export const adminuserrole =(currRolesId)=>{
    return service({
        url:`/role-permission/role/${currRolesId}`,
        method: 'get'
    })
}

// 角色管理权限分配发送请求
export const adminuserpermission =(userId,currRolesId)=>{
    return service({
        url:`/role-permission/${currRolesId}`,
        method: 'post',
        data:userId
    })
}