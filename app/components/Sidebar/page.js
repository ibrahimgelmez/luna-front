import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-1/5 bg-blue-900 text-white p-5 flex flex-col justify-between h-screen fixed">
      <div>
        <h1 className="text-lg font-bold">Luna</h1>
        <div className="flex items-center mb-5 mt-5">
          <h2 className="text-xl">Şirket Adı</h2>
        </div>
        <nav className="space-y-4">
          <Link href="/" className="flex justify-between p-3 hover:bg-white hover:text-blue-900 rounded">Anasayfa</Link>
          <Link href="/add-project" className="flex justify-between p-3 hover:bg-white hover:text-blue-900 rounded">Proje Ekle</Link>
          <Link href="/projects" className="flex justify-between p-3 hover:bg-white hover:text-blue-900 rounded">Projelerim</Link>
          <Link href="/project-tracking" className="flex justify-between p-3 hover:bg-white hover:text-blue-900 rounded">Proje Takip ve Talepler</Link>
          <Link href="/" className="flex justify-between p-3 hover:bg-white hover:text-blue-900 rounded">Takvim</Link>
        </nav>
      </div>
      <Link href="/logout" className="flex items-center justify-center bg-red-600 p-3 rounded hover:bg-red-700">Çıkış Yap</Link>
    </div>
  );
};

export default Sidebar;