export const Action=Object.freeze({
    login:'login',
    logout:'logout',
});

export function login(user){
    return{
        type:Action.login,
        payload:user,
    };
}

export function logout(){
    return{
        type:Action.logout,
    };
}