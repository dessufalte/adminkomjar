import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    console.log("📥 Data diterima API:", username, password); // DEBUG

    const dummyUsername = "adminkomjar";
    const dummyPassword = "admin123";

    if (username === dummyUsername && password === dummyPassword) {
      console.log("✅ Login berhasil");
      return NextResponse.json({ message: "Login berhasil!" }, { status: 200 });
    } else {
      console.log("❌ Login gagal - data tidak cocok");
      return NextResponse.json(
        { error: "Username atau password salah." },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("🔥 Error saat sign-in:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat proses login." },
      { status: 500 }
    );
  }
}
