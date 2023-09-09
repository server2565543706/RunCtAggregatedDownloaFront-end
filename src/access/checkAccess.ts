import ACCESS_ENUM from "@/access/ACCESSNUM";

/**
 * 检查权限（判断当前用户是否具有某个权限）
 * @param loginUser 当前用户
 * @param needAccess 需要权限
 * @return boolean 有无权限
 * **/
const checkAccess = (loginUser: any, needAccess = ACCESS_ENUM.NOT_LOGIN) => {
    const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN
    if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
        return true;
    }
    if (needAccess === ACCESS_ENUM.USER) {
        if (loginUserAccess !== ACCESS_ENUM.NOT_LOGIN) {
            return false
        }
    }
    if (needAccess === ACCESS_ENUM.ADMIN) {
        if (loginUserAccess !== ACCESS_ENUM.ADMIN) {
            return false
        }
    }
    return true

}
// const checkAccess = (loginUser: any, needAccess = ACCESS_ENUM.NOT_LOGIN) => {
//     const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN;
//
//     if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
//         return loginUserAccess !== ACCESS_ENUM.NOT_LOGIN;
//     }
//
//     if (needAccess === ACCESS_ENUM.USER) {
//         if (loginUserAccess !== ACCESS_ENUM.NOT_LOGIN) {
//             return false;
//         }
//     }
//
//     if (needAccess === ACCESS_ENUM.ADMIN) {
//         if (loginUserAccess !== ACCESS_ENUM.ADMIN) {
//             return false;
//         }
//     }
//
//     return true;
// };

export default checkAccess