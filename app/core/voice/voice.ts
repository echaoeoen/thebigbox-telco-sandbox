export interface Voice {
  callee: string
  content: string
  caller?: string
  duration?: number
  ringing_duration?: number
}
