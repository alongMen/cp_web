

import {API} from "../utils/http"


// 用户名登录
export const login =(params)=>{
  return API.post("/user/login" , params);
}

// 手机登录注册
export const loginByMobile =(params)=>{
  return API.post("/user/login/by-mobile" , params);
}

//手机注册
export const registerByMobile =(params)=>{
  return API.post("/user/user/mobile" , params);
}

// 邮箱登录注册
export const loginByEmail =(params)=>{
  return API.post("/user/login/by-email" , params);
}

// 邮箱注册
export const registerByEmail =(params)=>{
  return API.post("/user/user/email" , params);
}

// 注册
export const register =(params)=>{
  return API.post("/user/by-username" , params);
}

// 获取手机验证码

export const getMobileCode =(type,mobile)=>{
  return API.get(`/captcha/sms/${type}/${mobile}`);
}

// 获取邮箱验证码
export const getEmailCode =(type,email)=>{
  return API.get(`/captcha/email/${type}/${email}`);
}

// 修改密码
export const change_password =(query)=>{
  return API.patch(`/user/login-password`,query);
}

// 创建银行卡
export const add_bank =(query)=>{
  return API.post(`/user-bank-card`,query);
}

/**
 * 查询银行卡
 * @returns
 */
export const get_my_bank_list = ()=>{
  return API.get(`/user-bank-card`);
}

/**
 * 查询广告
 *
 * @returns
 */
export const get_advertise_list = ()=>{
  return API.get("/app-advertise");
}


/**
 * 查询个人信息
 *
 * @returns
 */
export const get_userinfo = ()=>{
  return API.get('/user')
}


/**
 * 获取充值列表
 *
 * @param {*} page
 * @param {*} limit
 * @param {*} query
 */
export const get_recharge_record = (page , limit , query)=>{
  return API.get(`/app-charge/offline/${page}/${limit}` , query);
}



/**
 * 获取线下充值方式
 *
 * @returns
 */
export const get_offline_charge_list = ()=>{
  return API.get(`/app-charge/offline`)
}

/**
 * 确认线下充值
 *
 * @param {*} params
 * @returns
 */
export const offline_charge_confirm = (params)=>{
  return API.post(`/app-charge/offline` , params);
}


/**
 * 获取置顶广告
 *
 */
export const get_top_board_list = ()=>{
  return API.get('/app-board/top');
}



/**
 * 获取提现记录
 *
 * @param {*} page
 * @param {*} limit
 * @param {*} query
 * @returns
 */
export const get_withdraw_record = (page , limit , query)=>{

  return API.get(`/app-withdraw/${page}/${limit}` , query);
}
/**
 * 查看提现设置
 *
 */
export const get_withdraw_setting = ()=>{
  return API.get('/app-withdraw/setting');
}


/**
 * 发起提现
 *
 */
export const set_withdraw = (params)=>{
  return API.post('/app-withdraw',params);
}


/**
 * 用户获取账单
 *
 * @param {*} page
 * @param {*} limit
 * @param {*} query
 * @returns
 */
export const get_bill_record = (page , limit , query)=>{

  return API.get(`/bill-change/${page}/${limit}` , query);
}

/**
 * 初始化用户名
 *
 * @returns
 */
export const set_username = (username)=>{

  return API.patch(`/user/init-username` , username);
}

/**
 * 绑定手机
 *
 * @returns
 */
export const set_user_mobile = (params)=>{
  return API.patch(`/user/mobile/bind` , params);
}

/**
 * 绑定邮箱
 *
 * @returns
 */
export const set_user_email = (params)=>{
  return API.patch(`/user/email/bind` , params);
}

/**
 * 初始化密码
 *
 * @returns
 */
export const set_user_initpass = (params)=>{
  return API.patch(`/user/login-password/init` , params);
}

/**
 * 初始化支付密码
 *
 * @returns
 */
export const set_init_payPass = (params)=>{
  return API.patch(`/user/pay-password/init` , params);
}

/**
 * 修改用户支付密码
 *
 * @returns
 */
export const set_payPass = (params)=>{
  return API.patch(`/user/pay-password` , params);
}

/**
 * 修改用户登录密码
 *
 * @returns
 */
export const set_user_login_Pass = (params)=>{
  return API.patch(`/user/login-password` , params);
}

/**
 * 获取游戏
 *
 * @returns
 */
export const get_games = (id)=>{
  return API.get(`/app-game/games`)
}



/**
 * 获取游戏房间
 *
 * @param {*} id
 * @returns
 */
export const get_room_detail = (id)=>{
  return API.get(`/app-game/room/${id}`)
}


/**
 * 获取游戏赔率
 *
 * @param {*} id
 * @returns
 */
export const get_game_odds = (id)=>{
  return API.get(`/app-game/game/${id}/odds`)
}


 /**
 *  获取房间详情
 *
 * @param {*} id
 * @param {*} type
 * @returns
 */
export const get_rooms_detail = (id,type)=>{

  return API.get(`/app-game/game/${id}/room/${type}`)
}


/**
 * pccdd buy
 *
 * @param {*} params
 * @returns
 */
export const pcdd_bet = (params)=>{
  return API.post(`/app-game/pcdd/bet` , params);
}




/**
 * 获取当前期数
 *
 * @param {*} params
 * @returns
 */
export const get_current_stage = (id)=>{
  return API.get(`/app-game/game/${id}/current_stage`);
}

/**
 * 获取前十期结果
 *
 * @param {*} params
 * @returns
 */
export const get_ten_stages = (id)=>{
  return API.get(`/app-game/game/${id}/stages`);
}



/**
 * 获取游戏结果
 *
 * @param {*} id
 * @param {*} page
 * @param {*} limit
 * @returns
 */
export const get_game_result_list = (id , page , limit)=>{

  return API.get(`/app-game/game/${id}/stages/${page}/${limit}`)
}


/**
 * 获取游戏订单
 *
 * @param {*} id
 * @param {*} page
 * @param {*} limit
 * @returns
 */
export const get_game_order_list = (id , page , limit,query)=>{

  return API.get(`/app-game/game/${id}/orders/${page}/${limit}`,query)
}



/**
 * 游戏列表option
 *
 * @returns
 */
export const get_game_option = ()=>{

  return API.get(`/app-game/games/key`)
}


 /**
 *  获取自己的代理信息
 *
 * @returns
 */
export const get_agent_info = ()=>{
  return API.get('/agent-center/info')
}


/**
 * 确认邀请码有效
 *
 * @param {*} code
 * @returns
 */
export const check_invite_code = (code)=>{
  return API.get(`/user/invite-code/${code}`);
}



/**
 * 获取下级用户列表
 *
 * @param {*} page
 * @param {*} limit
 * @returns
 */
 export const get_user_list = (page , limit)=>{

  return API.get(`/agent-center/user-list/${page}/${limit}`);
}


/**
 * 设置昵称
 *
 * @param {*} params
 * @returns
 */
export const set_nickname = (params) =>{

  return API.patch(`/user/set-nickname` , params);
}



/**
 * 设置头像
 *
 * @param {*} params
 * @returns
 */
export const set_avatar = (params) =>{

  return API.patch(`/user/set-avatar` , params);
}

