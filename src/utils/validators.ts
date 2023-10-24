export const isEmailValid = (email: string) => {
  return (
    String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) !== null
  )
}

export const hasUrlOnText = (text: string) => {
  return String(text).match(/(?:https?|www|ftp)\S+(?:\.com)?\S*/gi) !== null
}
