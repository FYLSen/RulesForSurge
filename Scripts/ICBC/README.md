## 说明
此脚本来自群内分享，所有权归属原作者。

## 配置 (Surge)

```properties
[MITM]
icbc1.wlphp.com:8444

[Script]
icbc = type=cron,cronexp=5 0 * * *,script-path=https://cdn.jsdelivr.net/gh/Rhysn/RulesForSurge@main/Scripts/ICBC/icbc_sign.min.js,script-update-interval=0

icbc = type=http-request,pattern=^https:\/\/icbc1\.wlphp\.com:8444\/js\/api\/index\/signIn,requires-body=1,max-size=0,script-path=https://cdn.jsdelivr.net/gh/Rhysn/RulesForSurge@main/Scripts/ICBC/icbc_cookies_sign.min.js,script-update-interval=0

```