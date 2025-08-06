# Komposabel (Composables)

Direktori ini berisi komposabel Vue 3 yang dapat digunakan kembali untuk mengelola logika aplikasi. Komposabel menggunakan Composition API untuk memberikan fungsionalitas yang dapat dibagikan di seluruh komponen.

## Daftar Komposabel

### 1. `useAuth.js`

Mengelola autentikasi pengguna termasuk login, register, logout, dan pemeriksaan status autentikasi.

**Fungsi yang tersedia:**

- `login(credentials, showMessage)` - Login pengguna
- `register(userData, showMessage)` - Registrasi pengguna baru
- `logout()` - Logout pengguna
- `isAuthenticated()` - Cek status autentikasi
- `isAdmin()` - Cek apakah user adalah admin
- `getCurrentUser()` - Ambil data user saat ini

**State reaktif:**

- `isLoading` - Status loading untuk operasi auth

**Contoh penggunaan:**

```javascript
import { useAuth } from '@/composables/useAuth.js'

export default {
  setup() {
    const { login, logout, isAuthenticated, isLoading } = useAuth()

    const handleLogin = async () => {
      await login({ username: 'user', password: 'pass' }, showMessage)
    }

    return { handleLogin, logout, isAuthenticated, isLoading }
  },
}
```

### 2. `useFormValidation.js`

Menyediakan utilitas validasi form dan pengelolaan pesan.

**Fungsi yang tersedia:**

- `isValidEmail(email)` - Validasi format email
- `isValidUsername(username)` - Validasi username
- `isValidPassword(password)` - Validasi password
- `isValidName(name)` - Validasi nama
- `isValidPhone(phone)` - Validasi nomor telepon

**Komposabel pesan:**

- `useMessage()` - Mengelola pesan dan tipe pesan

**Contoh penggunaan:**

```javascript
import {
  useFormValidation,
  useMessage,
} from '@/composables/useFormValidation.js'

export default {
  setup() {
    const { isValidEmail, isValidPassword } = useFormValidation()
    const { message, messageType, showMessage } = useMessage()

    return { isValidEmail, isValidPassword, message, messageType, showMessage }
  },
}
```

### 3. `useCart.js`

Mengelola keranjang belanja dengan persistensi localStorage.

**State reaktif:**

- `cartItems` - Array item di keranjang
- `cartItemCount` - Jumlah total item
- `cartTotal` - Total harga
- `isCartEmpty` - Status keranjang kosong

**Fungsi yang tersedia:**

- `addToCart(product, quantity)` - Tambah produk ke keranjang
- `removeFromCart(productId)` - Hapus produk dari keranjang
- `updateQuantity(productId, newQuantity)` - Update jumlah produk
- `clearCart()` - Kosongkan keranjang
- `getCartItem(productId)` - Ambil item tertentu
- `isInCart(productId)` - Cek apakah produk ada di keranjang
- `loadCart()` - Muat keranjang dari localStorage

**Contoh penggunaan:**

```javascript
import { useCart } from '@/composables/useCart.js'

export default {
  setup() {
    const { cartItems, cartItemCount, addToCart, removeFromCart } = useCart()

    const handleAddToCart = product => {
      addToCart(product, 1)
    }

    return { cartItems, cartItemCount, handleAddToCart, removeFromCart }
  },
}
```

### 4. `useProduct.js`

Mengelola operasi CRUD produk dan interaksi dengan API.

**State reaktif:**

- `products` - Array semua produk
- `product` - Detail produk tunggal
- `isLoading` - Status loading
- `error` - Pesan error

**Fungsi yang tersedia:**

- `fetchProducts()` - Ambil semua produk
- `fetchProduct(id)` - Ambil detail produk
- `createProduct(productData)` - Buat produk baru (admin)
- `updateProduct(id, productData)` - Update produk (admin)
- `deleteProduct(id)` - Hapus produk (admin)
- `searchProducts(query)` - Cari produk
- `filterProductsByCategory(categoryId)` - Filter berdasarkan kategori
- `sortProducts(products, sortBy, order)` - Urutkan produk
- `reset()` - Reset state

**Contoh penggunaan:**

```javascript
import { useProduct } from '@/composables/useProduct.js'

export default {
  setup() {
    const { products, isLoading, fetchProducts, createProduct } = useProduct()

    onMounted(async () => {
      await fetchProducts()
    })

    return { products, isLoading, createProduct }
  },
}
```

### 5. `useNotification.js`

Mengelola notifikasi global aplikasi.

**Fungsi yang tersedia:**

- `showNotification(message, type, duration)` - Tampilkan notifikasi
- `showSuccess(message, duration)` - Notifikasi sukses
- `showError(message, duration)` - Notifikasi error
- `showInfo(message, duration)` - Notifikasi info
- `showWarning(message, duration)` - Notifikasi peringatan
- `removeNotification(id)` - Hapus notifikasi

**State reaktif:**

- `notifications` - Array notifikasi aktif

**Contoh penggunaan:**

```javascript
import { useNotification } from '@/composables/useNotification.js'

export default {
  setup() {
    const { showSuccess, showError, notifications } = useNotification()

    const handleSuccess = () => {
      showSuccess('Operasi berhasil!')
    }

    return { handleSuccess, notifications }
  },
}
```

## Keuntungan Menggunakan Komposabel

1. **Reusability** - Logika dapat digunakan di berbagai komponen
2. **Separation of Concerns** - Pemisahan logika dari tampilan
3. **Type Safety** - Dukungan TypeScript yang lebih baik
4. **Testing** - Lebih mudah untuk ditest secara unit
5. **Maintainability** - Kode lebih mudah dipelihara dan dikembangkan

## Best Practices

1. Gunakan prefix `use` untuk nama komposabel
2. Return object dengan nama yang deskriptif
3. Berikan dokumentasi yang jelas untuk setiap fungsi
4. Gunakan reactive refs untuk state yang perlu direaktivasi
5. Handle error dengan baik dan berikan pesan yang informatif
6. Pisahkan logika berdasarkan domain/fitur

## Struktur File

```
composables/
├── useAuth.js           # Autentikasi pengguna
├── useCart.js           # Keranjang belanja
├── useFormValidation.js # Validasi form
├── useNotification.js   # Notifikasi global
└── useProduct.js        # Manajemen produk
```

Setiap komposabel dirancang untuk berdiri sendiri namun dapat bekerja sama dengan komposabel lain untuk membangun fungsionalitas yang kompleks.
