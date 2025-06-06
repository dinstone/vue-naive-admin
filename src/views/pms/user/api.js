/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/05 21:29:51
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import { request } from '@/utils'

export default {
  search: (params = {}) => request.get('/user/list', { params }),
  create: data => request.post('/user', data),
  update: data => request.put(`/user/${data.id}`, data),
  delete: id => request.delete(`/user/${id}`),

  resetPwd: (id, data) => request.put(`/user/${id}`, data),

  getAllRoles: () => request.get('/role/list?enable=1'),
}
