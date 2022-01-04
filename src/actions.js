export const Action=Object.freeze({
    login:'login',
    logout:'logout',
});

export const url="http://localhost:8080";

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