export default function Sidebar() {
  return (
    <aside className="w-64 bg-zinc-900 text-white h-screen p-6 space-y-4">
      <h2 className="text-lg font-semibold mb-4">Navigation</h2>
      <ul className="space-y-2">
        <li className="hover:text-yellow-300 cursor-pointer">Dashboard</li>
        <li className="hover:text-yellow-300 cursor-pointer">App Generator</li>
        <li className="hover:text-yellow-300 cursor-pointer">Templates</li>
        <li className="hover:text-yellow-300 cursor-pointer">Marketplace</li>
        <li className="hover:text-yellow-300 cursor-pointer">Settings</li>
      </ul>
    </aside>
  );
}
