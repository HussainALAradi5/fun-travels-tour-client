export const UserRequestStatus  = {
  PENDING : 'PENDING',
  APPROVED : 'APPROVED',
  REJECTED : 'REJECTED',
  CONFIRMED : 'CONFIRMED',
  CANCELLED : 'CANCELLED',
  COMPLETED : 'COMPLETED',
  ACTIVE : 'ACTIVE',
  INACTIVE : 'INACTIVE',
  SOLVED : 'SOLVED',
  UNSOLVED : 'UNSOLVED'
}
export type UserRequestStatus = (typeof UserRequestStatus)[keyof typeof UserRequestStatus];