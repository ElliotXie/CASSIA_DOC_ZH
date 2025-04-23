# 故障排除指南

如果有任何问题或者报错，请参考以下指南。如果问题依旧存在，请在github上提交issue，或者email联系我们（xie227@wisc.edu）。我们欢迎任何形式的反馈交流或者合作！


## 身份验证错误 (错误 401)

### 常见原因
*   API 密钥未正确加载
*   API 密钥无效或已过期
*   API 积分不足

### 解决方案
```r
# 验证 API 密钥是否已正确设置
key <- Sys.getenv("ANTHROPIC_API_KEY")
print(key)  # 应显示您的 API 密钥，而不是空字符串

# 如果需要，重置 API 密钥
setLLMApiKey("your_anthropic_api_key", provider = "anthropic", persist = TRUE)
```

请确保：
*   验证您的平台账户中有足够的积分
*   如有必要，通过平台的计费门户充值

## 文件未找到错误

### 常见原因
*   文件路径不正确
*   缺少输入文件
*   CASSIA 自动文件匹配问题

### 解决方案
```r
# 验证文件路径是否正确且文件存在
file.exists("your_input_file.csv")  # 如果文件存在，返回 TRUE
```

指定路径时：
*   必要时使用绝对路径：
    *   不正确: `"data/input.csv"`
    *   正确: `"C:/Users/YourName/Project/data/input.csv"`
*   确保输入和输出文件名符合 CASSIA 的要求：
    *   严格遵循命名约定
    *   检查文件扩展名是否符合所需格式

## 权限错误

### 常见原因
*   文件已存在且被锁定/正在使用
*   写入权限不足
*   目录访问限制

### 解决方案
```r
# 如果文件存在，请在继续之前将其删除
if(file.exists("output.csv")) {
    file.remove("output.csv")
}
```

其他步骤：
*   检查文件是否已在其他程序中打开
*   关闭任何正在使用该文件的程序
*   等待几秒钟后再重试
*   如果需要，使用不同的输出文件名

## 最佳实践
*   确保 API 密钥安全，切勿共享
*   在覆盖文件之前务必备份重要数据
*   在运行操作之前仔细检查文件路径和权限
*   保持足够的 API 积分以确保持续处理