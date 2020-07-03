const webConfig = Object.freeze({

    /*图片服务器*/
    apiResourceHost: process.env.VUE_APP_API_RESOURCE_HOST,
    apiResourceUpload: "/upload",
    apiResourceG: "/g",
    apiHost: process.env.VUE_APP_API_HOST,
    apiHosts: process.env.VUE_APP_API_HOSTS,

    authTokenName: "mer-auth",
    authTokenPrefix: "",
    httpSuccessStatus: 2000000000,
    loginExpire: "200302",
    permissionDenied: "30002",
    authRefreshTokenName: "refresh-auth"

});
export default webConfig;