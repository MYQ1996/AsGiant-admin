import { setToken, removeToken, getToken } from '@/util/auth'
import { setStore, getStore } from '@/util/store'
import { isURL, validatenull } from '@/util/validate'
import { deepClone } from '@/util/util'
import webiste from '@/config/website'
import {authMenu} from '@/router/menu/menu'

function addPath(ele, first) {
    const menu = webiste.menu;
    const propsConfig = menu.props;
    const propsDefault = {
        label: propsConfig.label || 'label',
        path: propsConfig.path || 'path',
        icon: propsConfig.icon || 'icon',
        children: propsConfig.children || 'children'
    }
    const icon = ele[propsDefault.icon];
    ele[propsDefault.icon] = validatenull(icon) ? menu.iconDefault : icon;
    const isChild = ele[propsDefault.children] && ele[propsDefault.children].length !== 0;
    if (!isChild && first && !isURL(ele[propsDefault.path])) {
        ele[propsDefault.path] = ele[propsDefault.path] + '/index'
    } else {
        ele[propsDefault.children].forEach(child => {
            if (!isURL(child[propsDefault.path])) {
                child[propsDefault.path] = `${ele[propsDefault.path]}/${child[propsDefault.path] ? child[propsDefault.path] : 'index'}`
            }
            addPath(child);
        })
    }

}
const user = {
    state: {
        userInfo: {},
        permission: {},
        roles: [],
        menu: getStore({ name: 'menu' }) || [],
        menuAll: [],
        token: getStore({ name: 'token' }) || '',
    },
    actions: {
        //根据用户名登录
        LoginByUsername({ commit }, userInfo) {
            return new Promise((resolve) => {
                    commit('SET_TOKEN', userInfo.token);
                    commit('DEL_ALL_TAG');
                    commit('CLEAR_LOCK');
                    resolve();
            })
        },
        //根据手机号登录
        LoginByPhone({ commit }) {
            return new Promise((resolve) => {
                    const data = new Date().getTime() + '';
                    commit('SET_TOKEN', data);
                    commit('DEL_ALL_TAG');
                    commit('CLEAR_LOCK');
                    resolve();
            })
        },
        GetUserInfo({ commit }) {
            return new Promise(resolve => {
                    const data = {
                            userInfo: {
                                username: 'admin',
                                name: 'avue',
                                avatar: 'https://gitee.com/uploads/61/632261_smallweigit.jpg',
                            },
                            roles: 'admin',
                            permission: [
                                'sys_crud_btn_add',
                                'sys_crud_btn_export',
                                'sys_menu_btn_add',
                                'sys_menu_btn_edit',
                                'sys_menu_btn_del',
                                'sys_role_btn1',
                                'sys_role_btn2',
                                'sys_role_btn3',
                                'sys_role_btn4',
                                'sys_role_btn5',
                                'sys_role_btn6',
                            ], //权限级别
                    };
                    commit('SET_USERIFNO', data.userInfo);
                    commit('SET_ROLES', data.roles);
                    commit('SET_PERMISSION', data.permission)
                    resolve(data);
              
            })
        },
        //刷新token
        RefeshToken({ commit }) {
            return new Promise((resolve) => {
                    const data = getToken();
                    commit('SET_TOKEN', data);
                    resolve(data);
            })
        },
        // 登出
        LogOut({ commit }) {
            return new Promise((resolve) => {
                    commit('SET_TOKEN', '')
                    commit('SET_MENU', [])
                    commit('SET_ROLES', [])
                    commit('DEL_ALL_TAG');
                    commit('CLEAR_LOCK');
                    removeToken()
                    resolve()
            })
        },
        //注销session
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                commit('SET_MENU', [])
                commit('SET_ROLES', [])
                commit('DEL_ALL_TAG');
                commit('CLEAR_LOCK');
                removeToken()
                resolve()
            })
        },
        GetTopMenu() {
            return new Promise(resolve => {
                    const data = []
                    resolve(data)
            })
        },
        //获取系统菜单
        GetMenu({ commit }) {
            return new Promise(resolve => {
                const data = authMenu
                let menu = deepClone(data);
                menu.forEach(ele => {
                    addPath(ele, true);
                })
                commit('SET_MENU', menu)
                resolve(menu)
            })
        },
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            setToken(token)
            state.token = token;
            setStore({ name: 'token', content: state.token, type: 'session' })
        },
        SET_USERIFNO: (state, userInfo) => {
            state.userInfo = userInfo;
        },
        SET_MENU: (state, menu) => {
            state.menu = menu
            setStore({ name: 'menu', content: state.menu, type: 'session' })
        },
        SET_MENU_ALL: (state, menuAll) => {
            state.menuAll = menuAll;
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles;
        },
        SET_PERMISSION: (state, permission) => {
            state.permission = {};
            permission.forEach(ele => {
                state.permission[ele] = true;
            });
        }
    }

}
export default user