export const useValidate = () => {
  const required = (...args) => {
    let isBlank = false
    for (let i = 0; i < args.length; i = (i + 1) | 0) {
      if (args[i] === '') {
        isBlank = true
      } else if (args[i] === null) {
        isBlank = true
      } else if (args[i].length === 0) {
        isBlank = true
      }
    }
    return isBlank
  }

  const emailFormat = (mail: string) => {
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    return regex.test(mail)
  }

  return { required, emailFormat }
}
