<template>
  <div class="login">
    <el-card class="box-card">
      <template #header>
        <div class="clearfix">
          <span>后台管理系统</span>
        </div>
      </template>
      <el-form
        label-width="80px"
        :model="loginUser"
        ref="loginForm"
        :rules="formRules"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginUser.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginUser.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="toLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { setToken } from "@/utils/auth";
import { login } from "@/api/user";
import { LoginUser } from "@/types";
import { getCurrentInstance, reactive, ref } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { useRouter } from "vue-router";

const { proxy } = getCurrentInstance()!;
const router = useRouter();
const loginForm = ref<FormInstance>();
let loginUser: LoginUser = reactive({
  username: "dily",
  password: "123456",
});
const formRules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 4, max: 12, message: "长度在6-12位字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 6, max: 12, message: "长度在6-12位字符", trigger: "blur" },
  ],
};
const toLogin = () => {
  loginForm.value!.validate((v: any) => {
    if (v) {
      login(loginUser).then((res: any) => {
        if (res.data.status === 200) {
          setToken("username", res.data.username);
          ElMessage.success(res.data.message);
          router.push("/home");
        }
      });
    } else {
      console.log("失败");
    }
  });
};
</script>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100%;
  position: absolute;
  background: url("@/assets/img/login-background.png") center no-repeat;

  .el-card {
    background: #65768557;
  }

  .box-card {
    margin: 200px auto; // 左右居中，上200px
    width: 450px;

    ::v-deep .el-form .el-form-item__label {
      color: #fff;
    }

    ::v-deep .el-card__header {
      font-size: 34px;
    }

    .el-button {
      width: 100%;
    }
  }
}
</style>
