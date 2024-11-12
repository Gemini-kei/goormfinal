import exp from 'constants';


export type PostApiMembersRequest = {
  email: string;
  password: string;
  name: string;
}

export type PostApiMembersLoginRequest = {
  email: string;
  password: string;
}

export type PostApiMembersLoginResponse = {
  accessToken: string
}

export type GetApiMembersRequest = {
  accessToken: string
}

export type GetApiMembersResponse = {
  id:number,
  email: string,
  name: string,
}

//export type GetApiMembersLoginKakao

export type PatchApiMembersNameRequest = {
  accessToken:string,
  name:string,
}
export type PatchApiMembersPasswordRequest = {
  accessToken:string,
  password:string,
}
export type PatchApiMembersDeleteRequest = {
  accessToken:string,
  password:string,
}



export type GetApiMembersSignUpResponse = {
  accessToken: string;
  refreshToken: string;
  message: string,
  userId: string,
}

export type GetApiMembersEmailCheckResponse = {
  
    isDuplicate : boolean,
    message : string

}

export type GetApiMembersInfoResponse = {
  id: number,
  email: string,
  name: string
}