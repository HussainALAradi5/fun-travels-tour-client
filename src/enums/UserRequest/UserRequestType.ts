export const UserRequestType =  {
  SUPPORT : 'SUPPORT',
  SUGGESTION : 'SUGGESTION'
} as const;

export type UserRequestType = (typeof UserRequestType)[keyof typeof UserRequestType];

export const UserRequestTypeColor = {
  SUPPORT: "orange", SUGGESTION: "purple",
} as const;
