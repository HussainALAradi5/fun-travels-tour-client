export const UserRequestType =  {
  SUPPORT : 'SUPPORT',
  SUGGESTION : 'SUGGESTION'
}

export type UserRequestType = (typeof UserRequestType)[keyof typeof UserRequestType];