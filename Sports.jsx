import React, { useState, useMemo } from "react";

// ---------- Helpers ----------
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });
  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

function Modal({ isOpen, title, children, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 overflow-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button className="text-gray-600" onClick={onClose}>✖</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ---------- Seed Data ----------
const seedCoaches = [
  { id: 1, name: "كابتن أحمد", sport: "سباحة", phone: "+20 100 111 2222", rating: 4.8, bio: "خبرة 10 سنوات مع فرق الناشئين.", image: "" },
  { id: 2, name: "كابتن سلمى", sport: "كرة سلة", phone: "+20 120 333 4444", rating: 4.6, bio: "متخصصة في تطوير المهارات الفردية.", image: "" },
];
const seedPlayers = [
  { id: 1, name: "محمد رضا", age: 16, sport: "سباحة", team: "Power Sharks", guardian: "رضا محمد", phone: "+20 101 777 8888", image: "" },
];
const seedCourses = [
  { id: 1, title: "أساسيات السباحة", sport: "سباحة", level: "مبتدئ", price: 3000, durationWeeks: 8, seats: 20, enrolled: 12 },
];
const seedMatches = [
  { id: 1, title: "Power Sharks vs Blue Waves", date: "2025-09-10", location: "القاهرة", status: "قادمة" },
];
const seedVideos = [
  { id: 1, url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
];

// ---------- Forms ----------
function CoachForm({ initial = {}, onSave, onCancel }) {
  const [name, setName] = useState(initial.name || "");
  const [sport, setSport] = useState(initial.sport || "");
  const [phone, setPhone] = useState(initial.phone || "");
  const [bio, setBio] = useState(initial.bio || "");
  const [image, setImage] = useState(initial.image || "");
  const submit = () => {
    if (!name || !sport) return alert("ادخل الاسم والرياضة");
    onSave({ id: initial.id || Date.now(), name, sport, phone, bio, image, rating: initial.rating || 4.5 });
  };
  return (
    <div className="space-y-3">
      <input placeholder="الاسم" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border rounded" />
      <input placeholder="الرياضة" value={sport} onChange={e => setSport(e.target.value)} className="w-full p-2 border rounded" />
      <input placeholder="الهاتف" value={phone} onChange={e => setPhone(e.target.value)} className="w-full p-2 border rounded" />
      <textarea placeholder="نبذة" value={bio} onChange={e => setBio(e.target.value)} className="w-full p-2 border rounded" />
      <input placeholder="رابط الصورة" value={image} onChange={e => setImage(e.target.value)} className="w-full p-2 border rounded" />
      <div className="flex justify-end gap-2">
        <button onClick={onCancel} className="px-3 py-1 bg-gray-200 rounded">إلغاء</button>
        <button onClick={submit} className="px-3 py-1 bg-green-600 text-white rounded">حفظ</button>
      </div>
    </div>
  );
}

function PlayerForm({ initial = {}, onSave, onCancel }) {
  const [name, setName] = useState(initial.name || "");
  const [age, setAge] = useState(initial.age || "");
  const [sport, setSport] = useState(initial.sport || "");
  const [team, setTeam] = useState(initial.team || "");
  const [guardian, setGuardian] = useState(initial.guardian || "");
  const [phone, setPhone] = useState(initial.phone || "");
  const [image, setImage] = useState(initial.image || "");
  const submit = () => {
    if (!name) return alert("ادخل اسم اللاعب");
    onSave({ id: initial.id || Date.now(), name, age: +age, sport, team, guardian, phone, image });
  };
  return (
    <div className="space-y-3">
      <input placeholder="الاسم" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border rounded" />
      <input placeholder="العمر" value={age} onChange={e => setAge(e.target.value)} className="w-full p-2 border rounded" />
      <input placeholder="الرياضة" value={sport} onChange={e => setSport(e.target.value)} className="w-full p-2 border rounded" />
      <input placeholder="الفريق" value={team} onChange={e => setTeam(e.target.value)} className="w-full p-2 border rounded" />
      <input placeholder="ولي الأمر" value={guardian} onChange={e => setGuardian(e.target.value)} className="w-full p-2 border rounded" />
      <input placeholder="الهاتف" value={phone} onChange={e => setPhone(e.target.value)} className="w-full p-2 border rounded" />
      <input placeholder="رابط الصورة" value={image} onChange={e => setImage(e.target.value)} className="w-full p-2 border rounded" />
      <div className="flex justify-end gap-2">
        <button onClick={onCancel} className="px-3 py-1 bg-gray-200 rounded">إلغاء</button>
        <button onClick={submit} className="px-3 py-1 bg-green-600 text-white rounded">حفظ</button>
      </div>
    </div>
  );
}

// ---------- Main App ----------
function SportsManager() {
  const [coaches, setCoaches] = useLocalStorage("coaches", seedCoaches);
  const [players, setPlayers] = useLocalStorage("players", seedPlayers);
  const [tab, setTab] = useState("overview");

  // Modals
  const [coachModalOpen, setCoachModalOpen] = useState(false);
  const [coachEdit, setCoachEdit] = useState(null);
  const [playerModalOpen, setPlayerModalOpen] = useState(false);
  const [playerEdit, setPlayerEdit] = useState(null);

  const addOrUpdateCoach = c => setCoaches(prev => prev.map(x => x.id === c.id ? c : x).concat(prev.find(x => x.id !== c.id ? [] : []).length === 0 ? [c] : []));
  const addOrUpdatePlayer = p => setPlayers(prev => prev.map(x => x.id === p.id ? p : x).concat(prev.find(x => x.id !== p.id ? [] : []).length === 0 ? [p] : []));

  return (
    <div className="p-4">
      <nav className="flex gap-2 mb-4">
        {["overview", "coaches", "players"].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-3 py-1 rounded ${tab === t ? "bg-green-600 text-white" : "bg-white border"}`}>
            {t === "overview" ? "الرئيسية" : t === "coaches" ? "المدربون" : "اللاعبون"}
          </button>
        ))}
      </nav>

      {tab === "overview" && (
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 border rounded shadow">عدد المدربين: {coaches.length}</div>
          <div className="p-4 border rounded shadow">عدد اللاعبين: {players.length}</div>
        </div>
      )}

      {tab === "coaches" && (
        <div>
          <button onClick={() => { setCoachEdit(null); setCoachModalOpen(true); }} className="mb-4 px-3 py-1 bg-blue-600 text-white rounded">إضافة مدرب</button>
          <div className="grid md:grid-cols-2 gap-4">
            {coaches.map(c => (
              <div key={c.id} className="border p-3 rounded shadow">
                <button onClick={() => { setCoachEdit(c); setCoachModalOpen(true); }} className="text-lg font-bold text-blue-600">{c.name}</button>
                <p>رياضة: {c.sport}</p>
                <p>هاتف: {c.phone}</p>
                <p>تقييم: {c.rating}</p>
                <p>نبذة: {c.bio}</p>
                {c.image && <img src={c.image} alt="coach" className="w-full h-40 object-cover mt-2 rounded" />}
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "players" && (
        <div>
          <button onClick={() => { setPlayerEdit(null); setPlayerModalOpen(true); }} className="mb-4 px-3 py-1 bg-blue-600 text-white rounded">إضافة لاعب</button>
          <div className="grid md:grid-cols-2 gap-4">
            {players.map(p => (
              <div key={p.id} className="border p-3 rounded shadow">
                <button onClick={() => { setPlayerEdit(p); setPlayerModalOpen(true); }} className="text-lg font-bold text-green-600">{p.name}</button>
                <p>رياضة: {p.sport}</p>
                <p>عمر: {p.age}</p>
                <p>فريق: {p.team}</p>
                <p>ولي الأمر: {p.guardian}</p>
                {p.image && <img src={p.image} alt="player" className="w-full h-40 object-cover mt-2 rounded" />}
              </div>
            ))}
          </div>
        </div>
      )}

      <Modal isOpen={coachModalOpen} title={coachEdit ? "تعديل مدرب" : "إضافة مدرب"} onClose={() => setCoachModalOpen(false)}>
        <CoachForm initial={coachEdit} onSave={c => { addOrUpdateCoach(c); setCoachModalOpen(false); }} onCancel={() => setCoachModalOpen(false)} />
      </Modal>

      <Modal isOpen={playerModalOpen} title={playerEdit ? "تعديل لاعب" : "إضافة لاعب"} onClose={() => setPlayerModalOpen(false)}>
        <PlayerForm initial={playerEdit} onSave={p => { addOrUpdatePlayer(p); setPlayerModalOpen(false); }} onCancel={() => setPlayerModalOpen(false)} />
      </Modal>
    </div>
  );
}

// ---------- Render ----------
export default function App() {
  return <SportsManager />;
}
