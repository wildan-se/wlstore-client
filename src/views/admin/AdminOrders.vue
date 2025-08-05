<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside
      class="fixed top-0 left-0 w-72 h-screen bg-white border-r border-gray-200 flex flex-col z-10"
    >
      <div class="p-6 border-b border-gray-200">
        <div class="flex items-center gap-3 font-bold text-gray-900">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-8 h-8 text-blue-600"
          >
            <path d="M12 2L2 7L12 12L22 7L12 2Z" />
            <path d="M2 17L12 22L22 17" />
            <path d="M2 12L12 17L22 12" />
          </svg>
          <span>WLStore Admin</span>
        </div>
      </div>

      <nav class="flex-1 p-6 flex flex-col gap-8">
        <div class="flex flex-col gap-4">
          <h3
            class="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-0"
          >
            Manajemen
          </h3>
          <ul class="list-none m-0 p-0 flex flex-col gap-1">
            <li>
              <router-link
                to="/admin/dashboard"
                class="flex items-center gap-3 px-4 py-3 rounded-md text-gray-600 no-underline font-medium transition-all duration-200 cursor-pointer hover:bg-gray-100 hover:text-gray-900"
              >
                <svg viewBox="0 0 24 24" fill="none" class="w-5 h-5 stroke-2">
                  <rect
                    x="3"
                    y="3"
                    width="7"
                    height="9"
                    stroke="currentColor"
                  />
                  <rect
                    x="14"
                    y="3"
                    width="7"
                    height="5"
                    stroke="currentColor"
                  />
                  <rect
                    x="14"
                    y="12"
                    width="7"
                    height="9"
                    stroke="currentColor"
                  />
                  <rect
                    x="3"
                    y="16"
                    width="7"
                    height="5"
                    stroke="currentColor"
                  />
                </svg>
                Dashboard
              </router-link>
            </li>
            <li>
              <router-link
                to="/admin/products"
                class="flex items-center gap-3 px-4 py-3 rounded-md text-gray-600 no-underline font-medium transition-all duration-200 cursor-pointer hover:bg-gray-100 hover:text-gray-900"
              >
                <svg viewBox="0 0 24 24" fill="none" class="w-5 h-5 stroke-2">
                  <path
                    d="M21 16V8C21 7.4 20.6 7 20 7H4C3.4 7 3 7.4 3 8V16C3 16.6 3.4 17 4 17H20C20.6 17 21 16.6 21 16Z"
                    stroke="currentColor"
                  />
                  <path d="M3 10H21" stroke="currentColor" />
                </svg>
                Kelola Produk
              </router-link>
            </li>
            <li>
              <router-link
                to="/admin/orders"
                class="flex items-center gap-3 px-4 py-3 rounded-md bg-blue-50 text-blue-600 no-underline font-medium transition-all duration-200 cursor-pointer"
              >
                <svg viewBox="0 0 24 24" fill="none" class="w-5 h-5 stroke-2">
                  <path
                    d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5"
                    stroke="currentColor"
                  />
                  <circle cx="9" cy="20" r="1" stroke="currentColor" />
                  <circle cx="20" cy="20" r="1" stroke="currentColor" />
                </svg>
                Kelola Pesanan
              </router-link>
            </li>
          </ul>
        </div>

        <div class="flex flex-col gap-4">
          <h3
            class="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-0"
          >
            Sistem
          </h3>
          <ul class="list-none m-0 p-0 flex flex-col gap-1">
            <li>
              <a
                @click="handleLogout"
                class="flex items-center gap-3 px-4 py-3 rounded-md text-red-500 no-underline font-medium transition-all duration-200 cursor-pointer hover:bg-red-50 hover:text-red-600"
              >
                <svg viewBox="0 0 24 24" fill="none" class="w-5 h-5 stroke-2">
                  <path
                    d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                    stroke="currentColor"
                  />
                  <path d="M16 17L21 12L16 7" stroke="currentColor" />
                  <path d="M21 12H9" stroke="currentColor" />
                </svg>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 ml-72 flex flex-col overflow-hidden">
      <!-- Header -->
      <header class="bg-white border-b border-gray-200 p-6">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-1">
              Kelola Pesanan
            </h1>
            <p class="text-gray-600 m-0">Pantau dan proses pesanan masuk</p>
          </div>
          <div class="flex gap-6">
            <div class="flex flex-col items-end">
              <span class="text-sm text-gray-600">Total Pesanan</span>
              <span class="text-xl font-bold text-gray-900">{{
                orders.length
              }}</span>
            </div>
            <div class="flex flex-col items-end">
              <span class="text-sm text-gray-600">Total Pendapatan</span>
              <span class="text-xl font-bold text-gray-900"
                >Rp {{ formatCurrency(totalRevenue) }}</span
              >
            </div>
          </div>
        </div>
      </header>

      <!-- Content -->
      <div class="flex-1 p-6 overflow-auto">
        <!-- Filters -->
        <div class="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div class="flex gap-4 items-end flex-wrap">
            <div class="flex flex-col gap-2 min-w-[200px]">
              <label class="text-sm font-medium text-gray-900"
                >Cari Pesanan</label
              >
              <div class="relative">
                <svg
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 stroke-2"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle cx="11" cy="11" r="8" stroke="currentColor" />
                  <path d="M21 21L16.65 16.65" stroke="currentColor" />
                </svg>
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Cari ID / Pelanggan"
                  class="w-full pl-11 pr-3 py-3 border border-gray-200 rounded-md text-sm transition-all duration-200 focus:outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-50"
                />
              </div>
            </div>

            <div class="flex flex-col gap-2 min-w-[200px]">
              <label class="text-sm font-medium text-gray-900">Status</label>
              <select
                v-model="statusFilter"
                class="px-3 py-3 border border-gray-200 rounded-md text-sm bg-white transition-all duration-200 text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-50"
              >
                <option value="">Semua Status</option>
                <option value="pending">Menunggu</option>
                <option value="processing">Diproses</option>
                <option value="shipped">Dikirim</option>
                <option value="delivered">Terkirim</option>
                <option value="cancelled">Dibatalkan</option>
              </select>
            </div>

            <div class="flex flex-col gap-2 min-w-[200px]">
              <label class="text-sm font-medium text-gray-900"
                >Rentang Tanggal</label
              >
              <select
                v-model="dateFilter"
                class="px-3 py-3 border border-gray-200 rounded-md text-sm bg-white transition-all duration-200 text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-50"
              >
                <option value="">Semua Waktu</option>
                <option value="today">Hari Ini</option>
                <option value="week">Minggu Ini</option>
                <option value="month">Bulan Ini</option>
                <option value="year">Tahun Ini</option>
              </select>
            </div>

            <button
              @click="clearFilters"
              class="flex items-center gap-2 px-4 py-3 bg-gray-100 border border-gray-200 rounded-md text-black cursor-pointer transition-all duration-200 h-fit hover:bg-gray-200"
            >
              <svg viewBox="0 0 24 24" fill="none" class="w-4 h-4">
                <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" />
                <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" />
              </svg>
              Bersihkan
            </button>
          </div>
        </div>

        <!-- Orders Table -->
        <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div class="overflow-x-auto">
            <table
              class="w-full border-collapse"
              v-if="filteredOrders.length > 0"
            >
              <thead>
                <tr>
                  <th
                    class="bg-gray-50 px-4 py-4 text-left font-semibold text-black border-b border-gray-200 text-sm"
                  >
                    ID Pesanan
                  </th>
                  <th
                    class="bg-gray-50 px-4 py-4 text-left font-semibold text-black border-b border-gray-200 text-sm"
                  >
                    Pelanggan
                  </th>
                  <th
                    class="bg-gray-50 px-4 py-4 text-left font-semibold text-black border-b border-gray-200 text-sm"
                  >
                    Produk
                  </th>
                  <th
                    class="bg-gray-50 px-4 py-4 text-left font-semibold text-black border-b border-gray-200 text-sm"
                  >
                    Tanggal
                  </th>
                  <th
                    class="bg-gray-50 px-4 py-4 text-left font-semibold text-black border-b border-gray-200 text-sm"
                  >
                    Total
                  </th>
                  <th
                    class="bg-gray-50 px-4 py-4 text-left font-semibold text-black border-b border-gray-200 text-sm"
                  >
                    Status
                  </th>
                  <th
                    class="bg-gray-50 px-4 py-4 text-left font-semibold text-black border-b border-gray-200 text-sm"
                  >
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="order in paginatedOrders"
                  :key="order.id"
                  class="order-row"
                >
                  <td class="px-4 py-4 border-b border-gray-200 text-sm">
                    <span class="font-semibold text-blue-600"
                      >#{{ order.id }}</span
                    >
                  </td>
                  <td class="px-4 py-4 border-b border-gray-200 text-sm">
                    <div class="flex flex-col gap-1">
                      <span class="font-medium text-gray-900">{{
                        order.customerName
                      }}</span>
                      <span class="text-gray-600 text-xs">{{
                        order.customerEmail
                      }}</span>
                    </div>
                  </td>
                  <td class="px-4 py-4 border-b border-gray-200 text-sm">
                    <div class="flex flex-col gap-1">
                      <span class="font-medium text-gray-900"
                        >{{ order.items.length }} item(s)</span
                      >
                      <div class="text-gray-600 text-xs">
                        <span
                          v-for="(item, index) in order.items.slice(0, 2)"
                          :key="index"
                        >
                          {{ item.name
                          }}{{
                            index < Math.min(order.items.length, 2) - 1
                              ? ', '
                              : ''
                          }}
                        </span>
                        <span
                          v-if="order.items.length > 2"
                          class="text-gray-600 italic"
                        >
                          +{{ order.items.length - 2 }} more
                        </span>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-4 border-b border-gray-200 text-sm">
                    <div class="flex flex-col gap-1">
                      <span class="font-medium text-gray-900">{{
                        formatDate(order.date)
                      }}</span>
                      <span class="text-gray-600 text-xs">{{
                        formatTime(order.date)
                      }}</span>
                    </div>
                  </td>
                  <td class="px-4 py-4 border-b border-gray-200 text-sm">
                    <span class="font-semibold text-gray-900"
                      >Rp {{ formatCurrency(order.total) }}</span
                    >
                  </td>
                  <td class="px-4 py-4 border-b border-gray-200 text-sm">
                    <span
                      :class="[
                        'status-badge',
                        order.status.toLowerCase(),
                        'px-3 py-1 rounded-full text-xs font-medium capitalize',
                      ]"
                    >
                      {{ order.status }}
                    </span>
                  </td>
                  <td class="px-4 py-4 border-b border-gray-200 text-sm">
                    <div class="flex gap-2">
                      <button
                        @click="viewOrder(order)"
                        class="w-8 h-8 rounded-md border border-gray-200 bg-white flex items-center justify-center cursor-pointer transition-all duration-200 text-sky-600 hover:bg-sky-50 hover:border-sky-600"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          class="w-4 h-4 stroke-2"
                        >
                          <path
                            d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z"
                            stroke="currentColor"
                          />
                          <circle cx="12" cy="12" r="3" stroke="currentColor" />
                        </svg>
                      </button>
                      <button
                        @click="updateOrderStatus(order)"
                        class="w-8 h-8 rounded-md border border-gray-200 bg-white flex items-center justify-center cursor-pointer transition-all duration-200 text-amber-600 hover:bg-amber-50 hover:border-amber-600"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          class="w-4 h-4 stroke-2"
                        >
                          <path
                            d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                            stroke="currentColor"
                          />
                          <path
                            d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z"
                            stroke="currentColor"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- Empty State -->
            <div v-else class="text-center py-8 text-gray-600">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                class="w-16 h-16 mb-4 mx-auto stroke-current"
              >
                <path
                  d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <circle
                  cx="9"
                  cy="20"
                  r="1"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="1"
                  stroke="currentColor"
                  stroke-width="2"
                />
              </svg>
              <h3 class="mb-2 text-gray-900 m-0">Belum Ada Pesanan</h3>
              <p class="m-0">
                {{
                  searchQuery || statusFilter || dateFilter
                    ? 'Tidak ada pesanan yang sesuai dengan filter.'
                    : 'Belum ada pesanan yang masuk.'
                }}
              </p>
            </div>
          </div>

          <!-- Pagination -->
          <div
            v-if="filteredOrders.length > 0 && totalPages > 1"
            class="flex justify-between items-center px-6 py-4 border-t border-gray-200 bg-gray-50"
          >
            <button
              @click="currentPage = Math.max(1, currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-4 py-2 border border-gray-200 rounded-md bg-white text-gray-900 cursor-pointer transition-all duration-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sebelumnya
            </button>

            <div class="text-sm text-gray-600">
              Halaman {{ currentPage }} dari {{ totalPages }} ({{
                filteredOrders.length
              }}
              pesanan)
            </div>

            <button
              @click="currentPage = Math.min(totalPages, currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-4 py-2 border border-gray-200 rounded-md bg-white text-gray-900 cursor-pointer transition-all duration-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Order Detail Modal -->
    <div
      v-if="selectedOrder"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click="closeModal"
    >
      <div
        class="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-auto"
        @click.stop
      >
        <div
          class="flex justify-between items-center p-6 border-b border-gray-200"
        >
          <h3 class="m-0 text-xl font-semibold text-gray-900">
            Detail Pesanan - #{{ selectedOrder.id }}
          </h3>
          <button
            @click="closeModal"
            class="w-8 h-8 border-none bg-none rounded-md flex items-center justify-center cursor-pointer text-gray-600 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
          >
            <svg viewBox="0 0 24 24" fill="none" class="w-5 h-5">
              <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" />
              <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" />
            </svg>
          </button>
        </div>

        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div class="flex flex-col gap-4">
              <h4
                class="m-0 text-base font-semibold text-gray-900 border-b border-gray-200 pb-2"
              >
                Informasi Pelanggan
              </h4>
              <div class="flex justify-between items-center gap-4">
                <span class="font-medium text-gray-600">Nama:</span>
                <span class="text-gray-900">{{
                  selectedOrder.customerName
                }}</span>
              </div>
              <div class="flex justify-between items-center gap-4">
                <span class="font-medium text-gray-600">Email:</span>
                <span class="text-gray-900">{{
                  selectedOrder.customerEmail
                }}</span>
              </div>
              <div class="flex justify-between items-center gap-4">
                <span class="font-medium text-gray-600">Telepon:</span>
                <span class="text-gray-900">{{
                  selectedOrder.customerPhone || 'Tidak Ada'
                }}</span>
              </div>
            </div>

            <div class="flex flex-col gap-4">
              <h4
                class="m-0 text-base font-semibold text-gray-900 border-b border-gray-200 pb-2"
              >
                Informasi Pesanan
              </h4>
              <div class="flex justify-between items-center gap-4">
                <span class="font-medium text-gray-600">Tanggal:</span>
                <span class="text-gray-900"
                  >{{ formatDate(selectedOrder.date) }}
                  {{ formatTime(selectedOrder.date) }}</span
                >
              </div>
              <div class="flex justify-between items-center gap-4">
                <span class="font-medium text-gray-600">Status:</span>
                <span
                  :class="[
                    'status-badge',
                    selectedOrder.status.toLowerCase(),
                    'px-3 py-1 rounded-full text-xs font-medium capitalize',
                  ]"
                  >{{ getStatusText(selectedOrder.status) }}</span
                >
              </div>
              <div class="flex justify-between items-center gap-4">
                <span class="font-medium text-gray-600">Total:</span>
                <span class="text-gray-900"
                  >Rp {{ formatCurrency(selectedOrder.total) }}</span
                >
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-4">
            <h4
              class="m-0 text-base font-semibold text-gray-900 border-b border-gray-200 pb-2"
            >
              Item Pesanan
            </h4>
            <div class="flex flex-col gap-3">
              <div
                v-for="item in selectedOrder.items"
                :key="item.id"
                class="flex justify-between items-center p-3 border border-gray-200 rounded-md"
              >
                <div class="flex flex-col gap-1">
                  <span class="font-medium text-gray-900">{{ item.name }}</span>
                  <span class="text-sm text-gray-600"
                    >{{ item.quantity }}x @ Rp
                    {{ formatCurrency(item.price) }}</span
                  >
                </div>
                <div class="font-semibold text-gray-900">
                  Rp {{ formatCurrency(item.quantity * item.price) }}
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-4 mt-6">
            <h4
              class="m-0 text-base font-semibold text-gray-900 border-b border-gray-200 pb-2"
            >
              Perbarui Status
            </h4>
            <div class="flex gap-3 items-center">
              <select
                v-model="updatedStatus"
                class="flex-1 px-3 py-3 border border-gray-200 rounded-md text-sm bg-white"
              >
                <option value="pending">Menunggu</option>
                <option value="processing">Diproses</option>
                <option value="shipped">Dikirim</option>
                <option value="delivered">Terkirim</option>
                <option value="cancelled">Dibatalkan</option>
              </select>
              <button
                @click="saveStatusUpdate"
                class="px-4 py-3 bg-blue-600 text-white border-none rounded-md font-medium cursor-pointer transition-all duration-200 hover:bg-blue-700"
              >
                Perbarui Status
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AuthService from '@/services/auth.service'

export default {
  name: 'AdminOrders',
  setup() {
    const router = useRouter()

    // Check if user is admin
    if (!AuthService.isAdmin()) {
      router.push('/login')
      return
    }

    const orders = ref([])
    const searchQuery = ref('')
    const statusFilter = ref('')
    const dateFilter = ref('')
    const currentPage = ref(1)
    const itemsPerPage = 10
    const selectedOrder = ref(null)
    const updatedStatus = ref('')

    // Mock orders data - replace with actual API call
    const generateMockOrders = () => {
      const statuses = [
        'pending',
        'processing',
        'shipped',
        'delivered',
        'cancelled',
      ]
      const customers = [
        { name: 'John Doe', email: 'john@example.com', phone: '081234567890' },
        {
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '081234567891',
        },
        {
          name: 'Bob Johnson',
          email: 'bob@example.com',
          phone: '081234567892',
        },
        {
          name: 'Alice Brown',
          email: 'alice@example.com',
          phone: '081234567893',
        },
        {
          name: 'Charlie Wilson',
          email: 'charlie@example.com',
          phone: '081234567894',
        },
      ]

      const products = [
        { name: 'iPhone 14 Pro', price: 18000000 },
        { name: 'Samsung Galaxy S23', price: 15000000 },
        { name: 'MacBook Air M2', price: 20000000 },
        { name: 'iPad Pro', price: 12000000 },
        { name: 'AirPods Pro', price: 3500000 },
      ]

      const mockOrders = []
      for (let i = 1; i <= 25; i++) {
        const customer = customers[Math.floor(Math.random() * customers.length)]
        const status = statuses[Math.floor(Math.random() * statuses.length)]
        const itemCount = Math.floor(Math.random() * 3) + 1
        const orderItems = []
        let total = 0

        for (let j = 0; j < itemCount; j++) {
          const product = products[Math.floor(Math.random() * products.length)]
          const quantity = Math.floor(Math.random() * 3) + 1
          const item = {
            id: `item-${i}-${j}`,
            name: product.name,
            price: product.price,
            quantity: quantity,
          }
          orderItems.push(item)
          total += product.price * quantity
        }

        mockOrders.push({
          id: `ORD${String(i).padStart(3, '0')}`,
          customerName: customer.name,
          customerEmail: customer.email,
          customerPhone: customer.phone,
          items: orderItems,
          date: new Date(
            Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
          ),
          total: total,
          status: status,
        })
      }

      return mockOrders.sort((a, b) => new Date(b.date) - new Date(a.date))
    }

    const filteredOrders = computed(() => {
      let filtered = orders.value

      // Search filter
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(
          order =>
            order.id.toLowerCase().includes(query) ||
            order.customerName.toLowerCase().includes(query) ||
            order.customerEmail.toLowerCase().includes(query),
        )
      }

      // Status filter
      if (statusFilter.value) {
        filtered = filtered.filter(order => order.status === statusFilter.value)
      }

      // Date filter
      if (dateFilter.value) {
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

        filtered = filtered.filter(order => {
          const orderDate = new Date(order.date)

          switch (dateFilter.value) {
            case 'today': {
              return orderDate >= today
            }
            case 'week': {
              const weekAgo = new Date(
                today.getTime() - 7 * 24 * 60 * 60 * 1000,
              )
              return orderDate >= weekAgo
            }
            case 'month': {
              const monthAgo = new Date(
                today.getFullYear(),
                today.getMonth() - 1,
                today.getDate(),
              )
              return orderDate >= monthAgo
            }
            case 'year': {
              const yearAgo = new Date(
                today.getFullYear() - 1,
                today.getMonth(),
                today.getDate(),
              )
              return orderDate >= yearAgo
            }
            default:
              return true
          }
        })
      }

      return filtered
    })

    const totalPages = computed(() => {
      return Math.ceil(filteredOrders.value.length / itemsPerPage)
    })

    const paginatedOrders = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage
      const end = start + itemsPerPage
      return filteredOrders.value.slice(start, end)
    })

    const totalRevenue = computed(() => {
      return orders.value.reduce((sum, order) => sum + order.total, 0)
    })

    const formatCurrency = amount => {
      return new Intl.NumberFormat('id-ID').format(amount)
    }

    const formatDate = date => {
      return new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).format(new Date(date))
    }

    const formatTime = date => {
      return new Intl.DateTimeFormat('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(date))
    }

    const getStatusText = status => {
      const statusMap = {
        pending: 'Menunggu',
        processing: 'Diproses',
        shipped: 'Dikirim',
        delivered: 'Terkirim',
        cancelled: 'Dibatalkan',
      }
      return statusMap[status] || status
    }

    const clearFilters = () => {
      searchQuery.value = ''
      statusFilter.value = ''
      dateFilter.value = ''
      currentPage.value = 1
    }

    const viewOrder = order => {
      selectedOrder.value = order
      updatedStatus.value = order.status
    }

    const updateOrderStatus = order => {
      viewOrder(order)
    }

    const closeModal = () => {
      selectedOrder.value = null
      updatedStatus.value = ''
    }

    const saveStatusUpdate = () => {
      if (selectedOrder.value && updatedStatus.value) {
        // Find the order and update its status
        const orderIndex = orders.value.findIndex(
          o => o.id === selectedOrder.value.id,
        )
        if (orderIndex !== -1) {
          orders.value[orderIndex].status = updatedStatus.value
          selectedOrder.value.status = updatedStatus.value
        }

        // In real app, make API call here
        console.log(
          `Updated order ${selectedOrder.value.id} status to ${updatedStatus.value}`,
        )

        closeModal()
      }
    }

    const handleLogout = () => {
      AuthService.logout()
    }

    onMounted(() => {
      orders.value = generateMockOrders()
    })

    return {
      orders,
      searchQuery,
      statusFilter,
      dateFilter,
      currentPage,
      selectedOrder,
      updatedStatus,
      filteredOrders,
      paginatedOrders,
      totalPages,
      totalRevenue,
      formatCurrency,
      formatDate,
      formatTime,
      getStatusText,
      clearFilters,
      viewOrder,
      updateOrderStatus,
      closeModal,
      saveStatusUpdate,
      handleLogout,
    }
  },
}
</script>

<style scoped>
/* Minimal custom CSS - 98% replaced with Tailwind + DaisyUI */

/* Enhanced hover effects for orders table */
.order-row:hover {
  background-color: rgb(249 250 251);
}

/* Custom status badge colors not available in DaisyUI */
.status-badge.pending {
  background: rgb(254 249 195);
  color: rgb(217 119 6);
}

.status-badge.processing {
  background: rgb(240 249 255);
  color: rgb(8 145 178);
}

.status-badge.shipped {
  background: rgb(239 246 255);
  color: rgb(37 99 235);
}

.status-badge.delivered {
  background: rgb(240 253 244);
  color: rgb(22 163 74);
}

.status-badge.cancelled {
  background: rgb(254 242 242);
  color: rgb(220 38 38);
}

/* Active status indicator animation */
.status-dot.active {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Smooth transitions for all interactive elements */
* {
  transition: all 0.2s ease;
}

/* Responsive layout for mobile */
@media (max-width: 1024px) {
  .admin-layout .ml-72 {
    margin-left: 0;
  }

  .admin-layout .w-72 {
    width: 100%;
    position: relative;
    height: auto;
  }

  .admin-layout {
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .filters-group {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-item {
    min-width: auto;
  }

  .table-container {
    overflow-x: scroll;
  }

  .orders-table {
    min-width: 800px;
  }

  .pagination {
    flex-direction: column;
    gap: 0.5rem;
  }

  .order-details-grid {
    grid-template-columns: 1fr;
  }
}
</style>
