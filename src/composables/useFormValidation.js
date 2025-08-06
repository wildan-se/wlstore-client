import { ref } from 'vue'

/**
 * Composable untuk validasi form umum
 * Dapat digunakan untuk login dan register page
 */
export function useFormValidation() {
  // Email validation
  const isValidEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Username validation
  const isValidUsername = username => {
    return username && username.length >= 3
  }

  // Password validation
  const isValidPassword = password => {
    return password && password.length >= 6
  }

  // Name validation
  const isValidName = name => {
    return name && name.length >= 2
  }

  // Phone validation (optional)
  const isValidPhone = phone => {
    if (!phone) return true // Phone is optional
    const phoneRegex = /^[\d\s+()-]+$/
    return phoneRegex.test(phone) && phone.length >= 10
  }

  // Password confirmation validation
  const isPasswordMatch = (password, confirmPassword) => {
    return password === confirmPassword
  }

  return {
    isValidEmail,
    isValidUsername,
    isValidPassword,
    isValidName,
    isValidPhone,
    isPasswordMatch,
  }
}

/**
 * Composable untuk menampilkan pesan
 */
export function useMessage() {
  const message = ref('')
  const messageType = ref('error')

  const clearMessage = () => {
    message.value = ''
    messageType.value = 'error'
  }

  const showMessage = (msg, type = 'error') => {
    message.value = msg
    messageType.value = type
    setTimeout(clearMessage, 5000)
  }

  return {
    message,
    messageType,
    clearMessage,
    showMessage,
  }
}
