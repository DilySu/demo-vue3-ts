// 用户名正则匹配
export function validateUsername(rule: any, value: string, callback: any) {
  const reg = /(^[a-zA-Z0-9]{4,10}$)/;
  if (value === "") {
    callback(new Error("请输入用户名"));
  } else if (!reg.test(value)) {
    callback(new Error("请输入4-10位用户名"));
  }
  callback();
}

// 密码正则匹配
export function validatePass(rule: any, value: string, callback: any) {
  // 6-12位密码包含大小写字母和数字以及特殊符号
  const reg =
    /^\S*(?=\S{6,12})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/;
  if (value === "") {
    callback(new Error("请输入用户名"));
  } else if (!reg.test(value)) {
    callback(new Error("6-12位密码包含大小写字母和数字以及特殊符号"));
  }
  callback();
}
