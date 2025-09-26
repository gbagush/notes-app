const brand = {
  id: "Catatan",
  en: "Notes",
};

const profile = {
  id: {
    loginButton: "Masuk",
    logoutButton: "Keluar",
  },
  en: {
    loginButton: "Login",
    logoutButton: "Logout",
  },
};

const login = {
  id: {
    header: "Masuk ke akun Anda",
    description: "Masukkan email dan kata sandi Anda untuk masuk ke akun",
    footer: "Belum punya akun?",
    button: "Masuk",
    success: "Berhasil masuk",
    failed: "Email atau kata sandi salah",
    signup: "Daftar",
  },
  en: {
    header: "Login to your account",
    description: "Enter your email and password below to login to your account",
    footer: "Don't have an account?",
    button: "Login",
    success: "Successfully logged in",
    failed: "Invalid email or password",
    signup: "Sign up",
  },
};

const signup = {
  id: {
    header: "Buat akun baru",
    description: "Masukkan detail Anda di bawah untuk mendaftar",
    name: "Nama",
    confirmPassword: "Konfirmasi Kata Sandi",
    footer: "Sudah punya akun?",
    button: "Daftar",
    errors: {
      passwordMismatch: "Konfirmasi kata sandi tidak cocok",
      failed: "Pendaftaran gagal",
    },
    success: "Pendaftaran berhasil, silakan login",
    signin: "Masuk",
  },
  en: {
    header: "Create a new account",
    description: "Enter your details below to sign up",
    name: "Name",
    confirmPassword: "Confirm Password",
    footer: "Already have an account?",
    button: "Sign Up",
    errors: {
      passwordMismatch: "Passwords do not match",
      failed: "Registration failed",
    },
    success: "Registration successful, please login",
    signin: "Sign in",
  },
};

const dashboard = {
  id: {
    activeNotesTitle: "Catatan aktif",
    archiveNotesTitle: "Catatan diarsipkan",
    searchPlaceholder: "Cari catatan",
    addButton: "Tambah Catatan",
    emptyMessage: "Catatan yang Anda cari tidak tersedia.",
    errorPrefix: "Terjadi kesalahan",
  },
  en: {
    activeNotesTitle: "Active notes",
    archiveNotesTitle: "Archive notes",
    searchPlaceholder: "Search notes",
    addButton: "Add Note",
    emptyMessage: "The note you are looking for is not available.",
    errorPrefix: "An error occurred",
  },
};

const note = {
  id: {
    backButton: "Kembali",
    actionButton: "Aksi",
    errorPrefix: "Terjadi kesalahan",
    noteNotFound: "Catatan tidak ditemukan",
    actions: {
      archive: "Arsipkan",
      unarchive: "Keluarkan Arsip",
      delete: "Hapus",
    },
    toast: {
      archived: "Catatan diarsipkan",
      unarchived: "Catatan dikeluarkan dari arsip",
      deleted: "Catatan dihapus",
      failed: "Aksi gagal",
    },
  },
  en: {
    backButton: "Back",
    actionButton: "Actions",
    errorPrefix: "An error occurred",
    noteNotFound: "Note not found",
    actions: {
      archive: "Archive",
      unarchive: "Unarchive",
      delete: "Delete",
    },
    toast: {
      archived: "Note archived",
      unarchived: "Note unarchived",
      deleted: "Note deleted",
      failed: "Action failed",
    },
  },
};

const addNote = {
  id: {
    header: "Tambah catatan",
    titlePlaceholder: "Judul",
    editorPlaceholder: "Mulai mengetik ...",
    button: "Tambah catatan",
    saving: "Menyimpan...",
    success: "Catatan ditambahkan",
    failed: "Gagal menambahkan catatan",
    errors: {
      titleRequired: "Judul wajib diisi",
      contentEmpty: "Konten kosong",
    },
  },
  en: {
    header: "Add note",
    titlePlaceholder: "Title",
    editorPlaceholder: "Start typing ...",
    button: "Add note",
    saving: "Saving...",
    success: "Note added",
    failed: "Failed to add note",
    errors: {
      titleRequired: "Title is required",
      contentEmpty: "Content is empty",
    },
  },
};

const notFound = {
  id: {
    message: "Halaman yang Anda cari tidak ditemukan",
    backHome: "Kembali ke beranda",
  },
  en: {
    message: "The page you are looking for is not found",
    backHome: "Back to Home",
  },
};

export { brand, profile, login, signup, dashboard, note, addNote, notFound };
